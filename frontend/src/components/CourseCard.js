import React from 'react';
import { Clock, User, BookOpen } from 'lucide-react';

const CourseCard = ({ course, onEnroll, isEnrolled, showEnrollButton = true }) => {
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
      )}
    </div>
  );
};

export default CourseCard;