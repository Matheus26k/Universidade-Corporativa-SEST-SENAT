import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { coursesAPI } from '../services/api';
import CourseCard from '../components/CourseCard';
import { Truck, Plus, Search, Filter } from 'lucide-react';
import VirtualAgent from '../components/VirtualAgent';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: 'comportamental',
    duration: '',
    instructor: ''
  });
  const { user, isAdmin } = useAuth();

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    backgroundImage: 'url("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop&overlay=0f172a&blend=multiply&sat=-50&exp=10")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    position: 'relative',
    padding: '2rem'
  };

  const bannerStyle = {
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(30, 64, 175, 0.9) 100%)',
    borderRadius: '1.5rem',
    padding: '2rem',
    marginBottom: '2rem',
    color: 'white',
    textAlign: 'center',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '3rem'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '0.5rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
  };

  const subtitleStyle = {
    fontSize: '1.125rem',
    color: '#e2e8f0'
  };

  const tabsStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2rem'
  };

  const tabStyle = (isActive) => ({
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s',
    background: isActive ? '#3b82f6' : 'rgba(255, 255, 255, 0.9)',
    color: isActive ? 'white' : '#1f2937',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  });

  const filtersStyle = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  };

  const searchStyle = {
    position: 'relative',
    minWidth: '300px'
  };

  const searchInputStyle = {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 3rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '0.75rem',
    fontSize: '1rem',
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  const searchIconStyle = {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6b7280'
  };

  const selectStyle = {
    padding: '0.75rem 1rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '0.75rem',
    fontSize: '1rem',
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem'
  };

  const createButtonStyle = {
    position: 'fixed',
    bottom: '2rem',
    left: '2rem',
    background: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    cursor: 'pointer',
    boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
    transition: 'transform 0.3s'
  };

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  const formStyle = {
    background: 'white',
    borderRadius: '1rem',
    padding: '2rem',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflowY: 'auto'
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [coursesRes, myCoursesRes] = await Promise.all([
        coursesAPI.getAll(),
        coursesAPI.getMyCourses()
      ]);
      setCourses(coursesRes.data);
      setMyCourses(myCoursesRes.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await coursesAPI.enroll(courseId);
      loadData();
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao se inscrever');
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      await coursesAPI.create(newCourse);
      setShowCreateForm(false);
      setNewCourse({
        title: '',
        description: '',
        category: 'comportamental',
        duration: '',
        instructor: ''
      });
      loadData();
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao criar curso');
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const displayCourses = activeTab === 'all' ? filteredCourses : myCourses;
  const enrolledCourseIds = myCourses.map(course => course.id);

  if (loading) {
    return (
      <div style={{...containerStyle, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{fontSize: '1.5rem', color: '#e2e8f0'}}>Carregando...</div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={bannerStyle}>
        <h1 style={{...titleStyle, fontSize: '2.5rem', marginBottom: '1rem'}}>
          🚛 Bem-vindo à Universidade do Transporte, {user.name}!
        </h1>
        <p style={{...subtitleStyle, fontSize: '1.25rem', marginBottom: '1rem'}}>
          Desenvolva suas competências em Liderança, Comportamento e Gestão de Transporte
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          marginTop: '1.5rem',
          flexWrap: 'wrap'
        }}>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '2rem', fontWeight: 'bold'}}>{courses.length}</div>
            <div style={{fontSize: '0.875rem', opacity: 0.9}}>Cursos Disponíveis</div>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '2rem', fontWeight: 'bold'}}>{myCourses.length}</div>
            <div style={{fontSize: '0.875rem', opacity: 0.9}}>Suas Inscrições</div>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '2rem', fontWeight: 'bold'}}>24/7</div>
            <div style={{fontSize: '0.875rem', opacity: 0.9}}>Acesso Total</div>
          </div>
        </div>
      </div>

      <div style={tabsStyle}>
        <button
          style={tabStyle(activeTab === 'all')}
          onClick={() => setActiveTab('all')}
        >
          <Truck size={20} style={{display: 'inline', marginRight: '0.5rem'}} />
          Todos os Cursos
        </button>
        <button
          style={tabStyle(activeTab === 'my')}
          onClick={() => setActiveTab('my')}
        >
          Meus Cursos ({myCourses.length})
        </button>
      </div>

      {activeTab === 'all' && (
        <div style={filtersStyle}>
          <div style={searchStyle}>
            <Search size={20} style={searchIconStyle} />
            <input
              type="text"
              placeholder="Buscar cursos..."
              style={searchInputStyle}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            style={selectStyle}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Todas as categorias</option>
            <option value="lideranca">Liderança</option>
            <option value="comportamental">Comportamental</option>
            <option value="transporte">Transporte</option>
          </select>
        </div>
      )}

      <div style={gridStyle}>
        {displayCourses.map(course => (
          <div key={course.id} id={`course-${course.id}`}>
            <CourseCard
              course={course}
              onEnroll={handleEnroll}
              isEnrolled={enrolledCourseIds.includes(course.id)}
              showEnrollButton={activeTab === 'all'}
            />
          </div>
        ))}
      </div>

      {displayCourses.length === 0 && (
        <div style={{textAlign: 'center', color: '#e2e8f0', fontSize: '1.125rem'}}>
          {activeTab === 'all' ? 'Nenhum curso encontrado' : 'Você ainda não se inscreveu em nenhum curso'}
        </div>
      )}

      <VirtualAgent 
        courses={courses} 
        onCourseRecommend={(course) => {
          // Scroll para o curso recomendado
          const courseElement = document.getElementById(`course-${course.id}`);
          if (courseElement) {
            courseElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            courseElement.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
            setTimeout(() => {
              courseElement.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
            }, 3000);
          }
        }}
      />

      {isAdmin && (
        <button
          style={createButtonStyle}
          onClick={() => setShowCreateForm(true)}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          <Plus size={24} />
        </button>
      )}

      {showCreateForm && (
        <div style={modalStyle} onClick={() => setShowCreateForm(false)}>
          <form style={formStyle} onClick={(e) => e.stopPropagation()} onSubmit={handleCreateCourse}>
            <h3 style={{marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold'}}>
              Criar Novo Curso
            </h3>
            
            <input
              type="text"
              placeholder="Título do curso"
              style={{...searchInputStyle, marginBottom: '1rem'}}
              value={newCourse.title}
              onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
              required
            />
            
            <textarea
              placeholder="Descrição do curso"
              style={{...searchInputStyle, minHeight: '100px', marginBottom: '1rem'}}
              value={newCourse.description}
              onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
              required
            />
            
            <select
              style={{...selectStyle, width: '100%', marginBottom: '1rem'}}
              value={newCourse.category}
              onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
            >
              <option value="comportamental">Comportamental</option>
              <option value="lideranca">Liderança</option>
              <option value="transporte">Transporte</option>
            </select>
            
            <input
              type="number"
              placeholder="Duração (horas)"
              style={{...searchInputStyle, marginBottom: '1rem'}}
              value={newCourse.duration}
              onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
              required
            />
            
            <input
              type="text"
              placeholder="Instrutor"
              style={{...searchInputStyle, marginBottom: '1.5rem'}}
              value={newCourse.instructor}
              onChange={(e) => setNewCourse({...newCourse, instructor: e.target.value})}
              required
            />
            
            <div style={{display: 'flex', gap: '1rem'}}>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  background: 'white',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: 'none',
                  borderRadius: '0.5rem',
                  background: '#10b981',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Criar Curso
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;