import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, User, BookOpen, Award, Globe, DollarSign } from 'lucide-react';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dados mockados dos cursos com informações detalhadas
  const courseDetails = {
    1: {
      title: 'Liderança em Transporte',
      category: 'lideranca',
      duration: 40,
      instructor: 'Dr. Carlos Silva',
      description: 'Desenvolva competências essenciais de liderança no setor de transporte.',
      fullDescription: 'Este curso abrangente desenvolve competências essenciais de liderança no setor de transporte. Aprenda técnicas avançadas de gestão de equipes, comunicação eficaz, tomada de decisões estratégicas e como inspirar sua equipe para alcançar resultados excepcionais.',
      modality: 'Online',
      price: 'Gratuito',
      modules: [
        'Fundamentos da Liderança',
        'Comunicação Eficaz',
        'Gestão de Equipes',
        'Tomada de Decisões',
        'Liderança Situacional'
      ],
      requirements: [
        'Ensino médio completo',
        'Experiência no setor de transporte (desejável)',
        'Acesso à internet'
      ],
      objectives: [
        'Desenvolver habilidades de liderança',
        'Melhorar comunicação com equipes',
        'Aprender técnicas de motivação',
        'Dominar gestão de conflitos'
      ]
    },
    2: {
      title: 'Comportamento Seguro no Trânsito',
      category: 'comportamental',
      duration: 30,
      instructor: 'Dra. Ana Santos',
      description: 'Programa focado no desenvolvimento de atitudes e comportamentos seguros.',
      fullDescription: 'Programa focado no desenvolvimento de atitudes e comportamentos seguros no trânsito. Aborda psicologia do trânsito, técnicas de direção defensiva, gestão de estresse ao volante, e como criar uma cultura de segurança.',
      modality: 'Online',
      price: 'Gratuito',
      modules: [
        'Psicologia do Trânsito',
        'Direção Defensiva',
        'Gestão de Estresse',
        'Cultura de Segurança',
        'Prevenção de Acidentes'
      ],
      requirements: [
        'CNH válida',
        'Ensino fundamental completo',
        'Acesso à internet'
      ],
      objectives: [
        'Reduzir comportamentos de risco',
        'Desenvolver direção defensiva',
        'Controlar estresse no trânsito',
        'Promover cultura de segurança'
      ]
    },
    3: {
      title: 'Gestão de Frotas Modernas',
      category: 'transporte',
      duration: 50,
      instructor: 'Eng. Roberto Lima',
      description: 'Curso técnico especializado em gestão moderna de frotas.',
      fullDescription: 'Curso técnico especializado em gestão moderna de frotas. Cobre otimização de rotas, manutenção preventiva, controle de custos, tecnologias de rastreamento, sustentabilidade e compliance regulatório.',
      modality: 'Online',
      price: 'Gratuito',
      modules: [
        'Otimização de Rotas',
        'Manutenção Preventiva',
        'Controle de Custos',
        'Tecnologias de Rastreamento',
        'Sustentabilidade',
        'Compliance Regulatório'
      ],
      requirements: [
        'Ensino médio completo',
        'Conhecimentos básicos de informática',
        'Experiência em logística (desejável)'
      ],
      objectives: [
        'Otimizar operações de frota',
        'Reduzir custos operacionais',
        'Implementar tecnologias modernas',
        'Garantir compliance regulatório'
      ]
    }
  };

  const course = courseDetails[id];

  if (!course) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Curso não encontrado</h2>
        <button onClick={() => navigate('/dashboard')}>Voltar ao Dashboard</button>
      </div>
    );
  }

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    padding: '2rem'
  };

  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '1.5rem',
    overflow: 'hidden',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    color: 'white',
    padding: '2rem',
    position: 'relative'
  };

  const backButtonStyle = {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    color: 'white',
    cursor: 'pointer'
  };

  const bodyStyle = {
    padding: '2rem',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem'
  };

  const sectionStyle = {
    marginBottom: '2rem'
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#1f2937'
  };

  const cardStyle = {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '0.75rem',
    padding: '1.5rem'
  };

  const enrollButtonStyle = {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '0.75rem',
    padding: '1rem 2rem',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
    marginTop: '1rem'
  };

  const categoryColors = {
    'lideranca': '#3b82f6',
    'comportamental': '#10b981',
    'transporte': '#f59e0b'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={headerStyle}>
          <button style={backButtonStyle} onClick={() => navigate('/dashboard')}>
            <ArrowLeft size={20} />
          </button>
          <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
            <div style={{
              display: 'inline-block',
              background: categoryColors[course.category],
              padding: '0.5rem 1rem',
              borderRadius: '1rem',
              fontSize: '0.875rem',
              marginBottom: '1rem'
            }}>
              {course.category.toUpperCase()}
            </div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              {course.title}
            </h1>
            <p style={{ fontSize: '1.125rem', opacity: 0.9 }}>
              {course.description}
            </p>
          </div>
        </div>

        <div style={bodyStyle}>
          <div>
            <div style={sectionStyle}>
              <h2 style={titleStyle}>Sobre o Curso</h2>
              <p style={{ lineHeight: '1.7', color: '#4b5563' }}>
                {course.fullDescription}
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={titleStyle}>Módulos do Curso</h2>
              <div style={cardStyle}>
                {course.modules.map((module, index) => (
                  <div key={index} style={{
                    padding: '0.75rem 0',
                    borderBottom: index < course.modules.length - 1 ? '1px solid #e2e8f0' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <BookOpen size={16} color="#3b82f6" />
                    <span>{module}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={sectionStyle}>
              <h2 style={titleStyle}>Objetivos de Aprendizagem</h2>
              <div style={cardStyle}>
                {course.objectives.map((objective, index) => (
                  <div key={index} style={{
                    padding: '0.5rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Award size={16} color="#10b981" />
                    <span>{objective}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div style={cardStyle}>
              <h3 style={{ ...titleStyle, fontSize: '1.25rem' }}>Informações do Curso</h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Clock size={16} color="#6b7280" />
                  <span><strong>Carga Horária:</strong> {course.duration}h</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <User size={16} color="#6b7280" />
                  <span><strong>Instrutor:</strong> {course.instructor}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Globe size={16} color="#6b7280" />
                  <span><strong>Modalidade:</strong> {course.modality}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <DollarSign size={16} color="#10b981" />
                  <span><strong>Investimento:</strong> {course.price}</span>
                </div>
              </div>

              <button style={enrollButtonStyle}>
                Inscrever-se Agora
              </button>
            </div>

            <div style={{ ...cardStyle, marginTop: '1rem' }}>
              <h3 style={{ ...titleStyle, fontSize: '1.25rem' }}>Pré-requisitos</h3>
              {course.requirements.map((req, index) => (
                <div key={index} style={{
                  padding: '0.25rem 0',
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  • {req}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;