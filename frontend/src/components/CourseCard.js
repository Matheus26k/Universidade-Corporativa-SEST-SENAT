import React, { useState } from 'react';
import { Clock, User, BookOpen, Info, X } from 'lucide-react';

const CourseCard = ({ course, onEnroll, isEnrolled, showEnrollButton = true }) => {
  const [showModal, setShowModal] = useState(false);
  const cardStyle = {
    background: 'white',
    borderRadius: '1rem',
    padding: '1.5rem',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    border: '1px solid #e5e7eb'
  };

  const categoryColors = {
    'lideranca': '#10b981',
    'comportamental': '#f59e0b',
    'transporte': '#3b82f6'
  };

  const categoryLabels = {
    'lideranca': 'Liderança',
    'comportamental': 'Comportamental',
    'transporte': 'Transporte'
  };

  const categoryStyle = {
    background: categoryColors[course.category] || '#6b7280',
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    display: 'inline-block',
    marginBottom: '1rem'
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.5rem'
  };

  const descriptionStyle = {
    color: '#6b7280',
    marginBottom: '1rem',
    lineHeight: '1.5'
  };

  const metaStyle = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    fontSize: '0.875rem',
    color: '#6b7280'
  };

  const metaItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  };

  const buttonStyle = {
    background: isEnrolled ? '#10b981' : '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    cursor: isEnrolled ? 'default' : 'pointer',
    fontWeight: 'bold',
    width: '100%',
    transition: 'background 0.3s'
  };

  const saibaMaisButtonStyle = {
    background: '#6b7280',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
    transition: 'background 0.3s',
    marginBottom: '0.5rem'
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  const modalContentStyle = {
    background: 'white',
    borderRadius: '1rem',
    padding: '2rem',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflowY: 'auto',
    position: 'relative'
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#6b7280'
  };

  const courseImages = {
    'lideranca': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop',
    'comportamental': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=200&fit=crop',
    'transporte': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop'
  };

  const detailedDescriptions = {
    'lideranca': 'Este curso abrangente desenvolve competências essenciais de liderança no setor de transporte. Aprenda técnicas avançadas de gestão de equipes, comunicação eficaz, tomada de decisões estratégicas e como inspirar sua equipe para alcançar resultados excepcionais. Inclui estudos de caso reais do setor de transporte e metodologias práticas aplicáveis no dia a dia.',
    'comportamental': 'Programa focado no desenvolvimento de atitudes e comportamentos seguros no trânsito. Aborda psicologia do trânsito, técnicas de direção defensiva, gestão de estresse ao volante, e como criar uma cultura de segurança. Ideal para motoristas profissionais e gestores que desejam reduzir acidentes e promover práticas seguras.',
    'transporte': 'Curso técnico especializado em gestão moderna de frotas. Cobre otimização de rotas, manutenção preventiva, controle de custos, tecnologias de rastreamento, sustentabilidade e compliance regulatório. Essencial para gestores que buscam eficiência operacional e redução de custos.'
  };

  return (
    <div 
      style={cardStyle}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div style={categoryStyle}>
        {categoryLabels[course.category] || course.category}
      </div>
      
      <h3 style={titleStyle}>{course.title}</h3>
      <p style={descriptionStyle}>{course.description}</p>
      
      <div style={metaStyle}>
        <div style={metaItemStyle}>
          <Clock size={16} />
          <span>{course.duration}h</span>
        </div>
        <div style={metaItemStyle}>
          <User size={16} />
          <span>{course.instructor}</span>
        </div>
      </div>
      
      {showEnrollButton && (
        <>
          <button 
            style={saibaMaisButtonStyle}
            onClick={() => setShowModal(true)}
            onMouseOver={(e) => e.target.style.background = '#4b5563'}
            onMouseOut={(e) => e.target.style.background = '#6b7280'}
          >
            <Info size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
            Saiba mais
          </button>
          <button 
            style={buttonStyle}
            onClick={() => !isEnrolled && onEnroll(course.id)}
            onMouseOver={(e) => {
              if (!isEnrolled) {
                e.target.style.background = '#2563eb';
              }
            }}
            onMouseOut={(e) => {
              if (!isEnrolled) {
                e.target.style.background = '#3b82f6';
              }
            }}
          >
            <BookOpen size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
            {isEnrolled ? 'Inscrito' : 'Inscrever-se'}
          </button>
        </>
      )}
      {showModal && (
        <div style={modalOverlayStyle} onClick={() => setShowModal(false)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <button 
              style={closeButtonStyle}
              onClick={() => setShowModal(false)}
            >
              <X size={24} />
            </button>
            
            <div style={categoryStyle}>
              {categoryLabels[course.category] || course.category}
            </div>
            
            <h2 style={{...titleStyle, fontSize: '1.75rem', marginBottom: '1rem'}}>
              {course.title}
            </h2>
            
            <img 
              src={courseImages[course.category] || courseImages['comportamental']}
              alt={course.title}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '0.75rem',
                marginBottom: '1.5rem'
              }}
            />
            
            <div style={metaStyle}>
              <div style={metaItemStyle}>
                <Clock size={16} />
                <span>{course.duration}h de conteúdo</span>
              </div>
              <div style={metaItemStyle}>
                <User size={16} />
                <span>Instrutor: {course.instructor}</span>
              </div>
            </div>
            
            <h3 style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937'}}>
              Sobre o curso
            </h3>
            
            <p style={{...descriptionStyle, lineHeight: '1.7', marginBottom: '2rem'}}>
              {detailedDescriptions[course.category] || course.description}
            </p>
            
            <div style={{display: 'flex', gap: '1rem'}}>
              <button 
                style={{
                  ...buttonStyle,
                  flex: 1
                }}
                onClick={() => {
                  if (!isEnrolled) {
                    onEnroll(course.id);
                    setShowModal(false);
                  }
                }}
              >
                <BookOpen size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                {isEnrolled ? 'Já inscrito' : 'Inscrever-se agora'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCard;