import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

const VirtualAgent = ({ courses, onCourseRecommend }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Olá! Sou o assistente virtual do SEST SENAT. Como posso ajudá-lo a encontrar o curso ideal?'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const chatButtonStyle = {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    cursor: 'pointer',
    boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)',
    transition: 'transform 0.3s',
    zIndex: 1000
  };

  const chatWindowStyle = {
    position: 'fixed',
    bottom: '5rem',
    right: '2rem',
    width: '350px',
    height: '500px',
    background: 'white',
    borderRadius: '1rem',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1001
  };

  const chatHeaderStyle = {
    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    color: 'white',
    padding: '1rem',
    borderRadius: '1rem 1rem 0 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const messagesStyle = {
    flex: 1,
    padding: '1rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  };

  const messageStyle = (type) => ({
    padding: '0.75rem',
    borderRadius: '1rem',
    maxWidth: '80%',
    alignSelf: type === 'user' ? 'flex-end' : 'flex-start',
    background: type === 'user' ? '#3b82f6' : '#f3f4f6',
    color: type === 'user' ? 'white' : '#1f2937',
    fontSize: '0.875rem',
    lineHeight: '1.4'
  });

  const inputAreaStyle = {
    padding: '1rem',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    gap: '0.5rem'
  };

  const inputStyle = {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
    outline: 'none'
  };

  const sendButtonStyle = {
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '0.75rem',
    cursor: 'pointer'
  };

  const quickActionsStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.5rem'
  };

  const quickActionStyle = {
    background: '#e5e7eb',
    border: 'none',
    borderRadius: '1rem',
    padding: '0.5rem 1rem',
    fontSize: '0.75rem',
    cursor: 'pointer',
    transition: 'background 0.3s'
  };

  const quickActions = [
    'Cursos de liderança',
    'Cursos comportamentais',
    'Cursos de transporte',
    'Curso mais rápido',
    'Todos os cursos'
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = { type: 'user', text: inputText };
    setMessages(prev => [...prev, userMessage]);

    // Simular resposta do bot
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText);
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputText('');
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('liderança') || input.includes('lider')) {
      const leadershipCourses = courses.filter(c => c.category === 'lideranca');
      return {
        type: 'bot',
        text: `Encontrei ${leadershipCourses.length} curso(s) de liderança para você! Estes cursos desenvolvem habilidades de gestão e liderança no setor de transporte.`,
        courses: leadershipCourses
      };
    }
    
    if (input.includes('comportamental') || input.includes('comportamento')) {
      const behavioralCourses = courses.filter(c => c.category === 'comportamental');
      return {
        type: 'bot',
        text: `Temos ${behavioralCourses.length} curso(s) comportamental(is)! Focados em segurança e atitudes no trânsito.`,
        courses: behavioralCourses
      };
    }
    
    if (input.includes('transporte') || input.includes('frota')) {
      const transportCourses = courses.filter(c => c.category === 'transporte');
      return {
        type: 'bot',
        text: `Perfeito! Temos ${transportCourses.length} curso(s) técnico(s) de transporte sobre gestão de frotas e logística.`,
        courses: transportCourses
      };
    }
    
    if (input.includes('rápido') || input.includes('curto')) {
      const shortestCourse = courses.reduce((prev, current) => 
        prev.duration < current.duration ? prev : current
      );
      return {
        type: 'bot',
        text: `O curso mais rápido é "${shortestCourse.title}" com ${shortestCourse.duration}h de duração!`,
        courses: [shortestCourse]
      };
    }
    
    if (input.includes('todos') || input.includes('disponível')) {
      return {
        type: 'bot',
        text: `Temos ${courses.length} cursos disponíveis nas áreas de Liderança, Comportamental e Transporte. Todos focados no desenvolvimento profissional!`,
        courses: courses
      };
    }

    return {
      type: 'bot',
      text: 'Posso ajudá-lo a encontrar cursos por categoria (liderança, comportamental, transporte) ou características específicas. O que você procura?'
    };
  };

  const handleQuickAction = (action) => {
    setInputText(action);
    handleSendMessage();
  };

  return (
    <>
      <button
        style={chatButtonStyle}
        onClick={() => setIsOpen(!isOpen)}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isOpen && (
        <div style={chatWindowStyle}>
          <div style={chatHeaderStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bot size={20} />
              <span style={{ fontWeight: 'bold' }}>Assistente SEST SENAT</span>
            </div>
            <button
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <div style={messagesStyle}>
            {messages.map((message, index) => (
              <div key={index}>
                <div style={messageStyle(message.type)}>
                  {message.text}
                </div>
                {message.courses && (
                  <div style={{ marginTop: '0.5rem' }}>
                    {message.courses.map(course => (
                      <div
                        key={course.id}
                        style={{
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '0.5rem',
                          padding: '0.75rem',
                          marginBottom: '0.5rem',
                          cursor: 'pointer'
                        }}
                        onClick={() => onCourseRecommend && onCourseRecommend(course)}
                      >
                        <div style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                          {course.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          {course.duration}h • {course.instructor}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {messages.length === 1 && (
              <div style={quickActionsStyle}>
                {quickActions.map(action => (
                  <button
                    key={action}
                    style={quickActionStyle}
                    onClick={() => handleQuickAction(action)}
                    onMouseOver={(e) => e.target.style.background = '#d1d5db'}
                    onMouseOut={(e) => e.target.style.background = '#e5e7eb'}
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={inputAreaStyle}>
            <input
              type="text"
              style={inputStyle}
              placeholder="Digite sua pergunta..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button style={sendButtonStyle} onClick={handleSendMessage}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default VirtualAgent;