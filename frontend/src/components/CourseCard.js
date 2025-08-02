import React, { useState } from 'react';
import { Clock, User, BookOpen, Info, X, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course, onEnroll, isEnrolled, showEnrollButton = true }) => {
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();
  const cardStyle = {
    background: 'white',
    borderRadius: '1.5rem',
    padding: '0',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    border: '1px solid #e5e7eb',
    overflow: 'hidden'
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
    'lideranca': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop&auto=format',
    'comportamental': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=300&fit=crop&auto=format',
    'transporte': 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=500&h=300&fit=crop&auto=format'
  };

  const detailedDescriptions = {
    'lideranca': 'Este curso abrangente desenvolve competências essenciais de liderança no setor de transporte. Aprenda técnicas avançadas de gestão de equipes, comunicação eficaz, tomada de decisões estratégicas e como inspirar sua equipe para alcançar resultados excepcionais. Inclui estudos de caso reais do setor de transporte e metodologias práticas aplicáveis no dia a dia.',
    'comportamental': 'Programa focado no desenvolvimento de atitudes e comportamentos seguros no trânsito. Aborda psicologia do trânsito, técnicas de direção defensiva, gestão de estresse ao volante, e como criar uma cultura de segurança. Ideal para motoristas profissionais e gestores que desejam reduzir acidentes e promover práticas seguras.',
    'transporte': 'Curso técnico especializado em gestão moderna de frotas. Cobre otimização de rotas, manutenção preventiva, controle de custos, tecnologias de rastreamento, sustentabilidade e compliance regulatório. Essencial para gestores que buscam eficiência operacional e redução de custos.'
  };

  const previewStyle = {
    position: 'absolute',
    top: '100%',
    left: '0',
    right: '0',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    borderRadius: '0 0 1.5rem 1.5rem',
    padding: '1.25rem',
    zIndex: 10,
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    transform: showPreview ? 'translateY(0)' : 'translateY(-15px)',
    opacity: showPreview ? 1 : 0,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    pointerEvents: showPreview ? 'auto' : 'none'
  };

  return (
    <div 
      style={{...cardStyle, position: 'relative'}}
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div style={{
        position: 'relative',
        height: '200px',
        backgroundImage: `url(${courseImages[course.category] || courseImages['comportamental']})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '1rem'
      }}>
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          ...categoryStyle,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
        }}>
          {categoryLabels[course.category] || course.category}
        </div>
        <div style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%'
        }}></div>
      </div>
      
      <div style={{padding: '1.5rem'}}>
        <h3 style={{...titleStyle, fontSize: '1.375rem'}}>{course.title}</h3>
        <p style={{...descriptionStyle, fontSize: '0.9rem'}}>{course.description}</p>
        
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
              style={{...saibaMaisButtonStyle, marginBottom: '0.75rem'}}
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
      </div>
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
                  ...saibaMaisButtonStyle,
                  flex: 1,
                  background: '#6366f1'
                }}
                onClick={() => {
                  navigate(`/course/${course.id}`);
                }}
              >
                <ExternalLink size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Ver Detalhes
              </button>
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
      
      <div style={previewStyle}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.75rem'
        }}>
          <div style={{
            width: '4px',
            height: '20px',
            background: categoryColors[course.category],
            borderRadius: '2px'
          }}></div>
          <div style={{fontSize: '0.875rem', fontWeight: 'bold', color: '#1f2937'}}>
            Prévia do Curso
          </div>
        </div>
        
        <div style={{
          fontSize: '0.8rem',
          color: '#4b5563',
          lineHeight: '1.5',
          marginBottom: '1rem'
        }}>
          {detailedDescriptions[course.category]?.substring(0, 140)}...
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '0.75rem',
          borderTop: '1px solid rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              background: '#10b981',
              color: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.375rem',
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}>
              GRATUITO
            </div>
            <span style={{fontSize: '0.75rem', color: '#6b7280'}}>
              {course.duration}h
            </span>
          </div>
          
          <button
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.5rem 1rem',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              transition: 'transform 0.2s'
            }}
            onClick={() => navigate(`/course/${course.id}`)}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;