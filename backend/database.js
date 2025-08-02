const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const path = require('path');
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Inicializar tabelas
db.serialize(() => {
  // Tabela de usuários
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'student',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabela de cursos
  db.run(`CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    duration INTEGER,
    image_url TEXT,
    instructor TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabela de inscrições
  db.run(`CREATE TABLE IF NOT EXISTS enrollments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    course_id INTEGER,
    enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    progress INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (course_id) REFERENCES courses (id)
  )`);

  // Inserir dados iniciais
  const adminPassword = bcrypt.hashSync('admin123', 10);
  db.run(`INSERT OR IGNORE INTO users (name, email, password, role) 
          VALUES ('Administrador', 'admin@sestsenat.org.br', ?, 'admin')`, [adminPassword]);

  // Cursos iniciais
  const courses = [
    {
      title: 'Liderança Transformacional no Transporte',
      description: 'Desenvolva habilidades de liderança específicas para o setor de transporte',
      category: 'lideranca',
      duration: 40,
      instructor: 'Dr. Carlos Silva'
    },
    {
      title: 'Comportamento Seguro no Trânsito',
      description: 'Práticas e atitudes para um trânsito mais seguro e responsável',
      category: 'comportamental',
      duration: 30,
      instructor: 'Profa. Ana Santos'
    },
    {
      title: 'Gestão de Frotas Eficiente',
      description: 'Otimização e gestão inteligente de frotas de transporte',
      category: 'transporte',
      duration: 50,
      instructor: 'Eng. Roberto Lima'
    }
  ];

  courses.forEach(course => {
    db.run(`INSERT OR IGNORE INTO courses (title, description, category, duration, instructor) 
            VALUES (?, ?, ?, ?, ?)`, 
            [course.title, course.description, course.category, course.duration, course.instructor]);
  });
});

module.exports = db;