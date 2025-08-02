require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database');
const { authenticateToken, requireAdmin } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

// Rota de login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  });
});

// Rota de registro
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ message: 'Email já cadastrado' });
        }
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }

      const token = jwt.sign(
        { id: this.lastID, email, role: 'student' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        token,
        user: {
          id: this.lastID,
          name,
          email,
          role: 'student'
        }
      });
    }
  );
});

// Listar cursos
app.get('/api/courses', (req, res) => {
  db.all('SELECT * FROM courses ORDER BY created_at DESC', (err, courses) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar cursos' });
    }
    res.json(courses);
  });
});

// Buscar curso por ID
app.get('/api/courses/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM courses WHERE id = ?', [id], (err, course) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar curso' });
    }
    if (!course) {
      return res.status(404).json({ message: 'Curso não encontrado' });
    }
    res.json(course);
  });
});

// Inscrever em curso
app.post('/api/enrollments', authenticateToken, (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.id;

  db.get('SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?',
    [userId, courseId],
    (err, existing) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }

      if (existing) {
        return res.status(400).json({ message: 'Já inscrito neste curso' });
      }

      db.run('INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)',
        [userId, courseId],
        function(err) {
          if (err) {
            return res.status(500).json({ message: 'Erro ao inscrever no curso' });
          }
          res.status(201).json({ message: 'Inscrição realizada com sucesso' });
        }
      );
    }
  );
});

// Listar inscrições do usuário
app.get('/api/my-courses', authenticateToken, (req, res) => {
  const userId = req.user.id;

  db.all(`SELECT c.*, e.enrolled_at, e.progress 
          FROM courses c 
          JOIN enrollments e ON c.id = e.course_id 
          WHERE e.user_id = ?`,
    [userId],
    (err, courses) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao buscar cursos' });
      }
      res.json(courses);
    }
  );
});

// Criar curso (admin)
app.post('/api/courses', authenticateToken, requireAdmin, (req, res) => {
  const { title, description, category, duration, instructor } = req.body;

  db.run('INSERT INTO courses (title, description, category, duration, instructor) VALUES (?, ?, ?, ?, ?)',
    [title, description, category, duration, instructor],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Erro ao criar curso' });
      }
      res.status(201).json({ id: this.lastID, message: 'Curso criado com sucesso' });
    }
  );
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando na porta ${PORT}`);
  console.log(`📡 API disponível em: http://localhost:${PORT}/api`);
});