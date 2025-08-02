import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

const VirtualAgent = ({ courses, onCourseRecommend }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Olá! 🚀 Sou o assistente virtual da Universidade do Transporte SEST SENAT! Estou aqui para te ajudar a navegar pela plataforma, encontrar cursos ideais e tirar todas as suas dúvidas. Como posso ajudar hoje?'
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
    'Olá! Como funciona?',
    'Como me inscrever?',
    'Cursos são grátis?',
    'Tem certificado?',
    'Sobre o SEST SENAT',
    'Ver todos os cursos'
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
    
    // Saudações e apresentação
    if (input.includes('oi') || input.includes('olá') || input.includes('bom dia') || input.includes('boa tarde') || input.includes('boa noite')) {
      return {
        type: 'bot',
        text: 'Olá! 🚀 Sou o assistente virtual do SEST SENAT! Estou aqui para ajudá-lo a navegar pela nossa plataforma de cursos. Posso ajudar você a encontrar cursos, tirar dúvidas sobre inscrições e muito mais. Como posso ajudar hoje?'
      };
    }
    
    // Sobre o SEST SENAT
    if (input.includes('sest') || input.includes('senat') || input.includes('sobre') && input.includes('empresa')) {
      return {
        type: 'bot',
        text: 'O SEST SENAT é a Universidade do Transporte! 🚛 Somos especialistas em capacitação profissional para o setor de transporte. Oferecemos cursos gratuitos nas áreas de Liderança, Comportamental e Gestão de Transporte, todos com certificado reconhecido nacionalmente!'
      };
    }
    
    // Navegação do site
    if (input.includes('como') && (input.includes('navegar') || input.includes('usar') || input.includes('site'))) {
      return {
        type: 'bot',
        text: 'Navegar é fácil! 📱 No dashboard você encontra: • Abas "Todos os Cursos" e "Meus Cursos" • Filtros por categoria • Busca por nome • Botão "Saiba mais" para detalhes • "Ver Detalhes" para página completa. Quer que eu mostre algum curso específico?'
      };
    }
    
    // Perguntas sobre inscrição
    if (input.includes('como') && (input.includes('inscrever') || input.includes('matricular'))) {
      return {
        type: 'bot',
        text: 'Super fácil se inscrever! 🎓 Você pode: 1️⃣ Clicar em "Inscrever-se" direto no card do curso, 2️⃣ Ou clicar em "Saiba mais" → "Ver Detalhes" para conhecer melhor o curso, 3️⃣ Ou até mesmo me pedir para te inscrever aqui no chat! 😉'
      };
    }
    
    // Certificados
    if (input.includes('certificado') || input.includes('diploma')) {
      return {
        type: 'bot',
        text: 'Claro que sim! 🏆 Todos os nossos cursos oferecem certificado de conclusão reconhecido nacionalmente. Você recebe automaticamente após completar 100% do conteúdo. É digital, válido em todo Brasil e pode ser usado para comprovação profissional!'
      };
    }
    
    // Modalidade e acesso
    if (input.includes('modalidade') || input.includes('online') || input.includes('presencial') || input.includes('acesso')) {
      return {
        type: 'bot',
        text: 'Nossos cursos são 100% online! 💻 Isso significa total flexibilidade: estude quando quiser, onde estiver, no seu ritmo. Acesso 24/7 pelo computador, tablet ou celular. Perfeito para quem tem rotina corrida no transporte! 🕰️'
      };
    }
    
    // Preços e custos
    if (input.includes('preço') || input.includes('valor') || input.includes('custa') || input.includes('grátis') || input.includes('pagar')) {
      return {
        type: 'bot',
        text: 'Todos os cursos são 100% GRATUITOS! 🎉 O SEST SENAT investe na capacitação do setor de transporte. Zero custos, zero pegadinhas, zero mensalidades. Só conhecimento de qualidade para você! 💰✨'
      };
    }
    
    // Duração e tempo
    if (input.includes('quanto tempo') || input.includes('duração') || input.includes('demora')) {
      return {
        type: 'bot',
        text: `Nossos cursos variam de ${Math.min(...courses.map(c => c.duration))}h a ${Math.max(...courses.map(c => c.duration))}h! ⏰ Mas lembre-se: você estuda no seu ritmo. Pode fazer em dias ou semanas, como preferir. Quer saber a duração de algum curso específico?`
      };
    }
    
    // Instrutores
    if (input.includes('professor') || input.includes('instrutor') || input.includes('quem ensina')) {
      return {
        type: 'bot',
        text: 'Temos instrutores especialistas! 👨‍🏫 Profissionais com vasta experiência no setor de transporte: Dr. Carlos Silva (Liderança), Dra. Ana Santos (Comportamental), Eng. Roberto Lima (Gestão). Todos com formação sólida e prática no mercado!'
      };
    }
    
    // Busca por categoria - Liderança
    if (input.includes('liderança') || input.includes('lider') || input.includes('gestão') || input.includes('gerenciar')) {
      const leadershipCourses = courses.filter(c => c.category === 'lideranca');
      return {
        type: 'bot',
        text: `Excelente escolha! 👑 Encontrei ${leadershipCourses.length} curso(s) de liderança. Estes cursos desenvolvem habilidades de gestão, comunicação e liderança no setor de transporte. Perfeito para quem quer crescer na carreira!`,
        courses: leadershipCourses,
        showEnrollButton: true
      };
    }
    
    // Busca por categoria - Comportamental
    if (input.includes('comportamental') || input.includes('comportamento') || input.includes('segurança') || input.includes('trânsito')) {
      const behavioralCourses = courses.filter(c => c.category === 'comportamental');
      return {
        type: 'bot',
        text: `Segurança em primeiro lugar! 🛡️ Temos ${behavioralCourses.length} curso(s) comportamental(is) focados em segurança no trânsito, direção defensiva e atitudes responsáveis. Essencial para todo profissional do transporte!`,
        courses: behavioralCourses,
        showEnrollButton: true
      };
    }
    
    // Busca por categoria - Transporte
    if (input.includes('transporte') || input.includes('frota') || input.includes('logística') || input.includes('caminhão')) {
      const transportCourses = courses.filter(c => c.category === 'transporte');
      return {
        type: 'bot',
        text: `Perfeito para o setor! 🚛 ${transportCourses.length} curso(s) técnico(s) de transporte cobrindo gestão de frotas, logística, otimização de rotas e tecnologias modernas. O que todo gestor de transporte precisa saber!`,
        courses: transportCourses,
        showEnrollButton: true
      };
    }
    
    // Curso mais rápido
    if (input.includes('rápido') || input.includes('curto') || input.includes('menos tempo')) {
      const shortestCourse = courses.reduce((prev, current) => 
        prev.duration < current.duration ? prev : current
      );
      return {
        type: 'bot',
        text: `Para quem tem pressa! ⚡ O curso mais rápido é "${shortestCourse.title}" com apenas ${shortestCourse.duration}h de conteúdo. Ideal para começar hoje mesmo! Quer se inscrever?`,
        courses: [shortestCourse],
        showEnrollButton: true
      };
    }
    
    // Todos os cursos
    if (input.includes('todos') || input.includes('disponível') || input.includes('catálogo')) {
      return {
        type: 'bot',
        text: `Nosso catálogo completo! 📚 Temos ${courses.length} cursos disponíveis nas áreas de Liderança, Comportamental e Transporte. Todos gratuitos, com certificado e 100% online. Vamos encontrar o ideal para você!`,
        courses: courses,
        showEnrollButton: true
      };
    }
    
    // Ajuda e suporte
    if (input.includes('ajuda') || input.includes('suporte') || input.includes('problema')) {
      return {
        type: 'bot',
        text: 'Estou aqui para ajudar! 🤝 Posso te auxiliar com: • Encontrar cursos ideais • Explicar como se inscrever • Tirar dúvidas sobre certificados • Navegar pelo site • Informações sobre instrutores. O que você precisa?'
      };
    }
    
    // Despedidas
    if (input.includes('tchau') || input.includes('obrigado') || input.includes('valeu') || input.includes('até logo')) {
      return {
        type: 'bot',
        text: 'Foi um prazer ajudar! 😊 Lembre-se: estou sempre aqui quando precisar. Bons estudos na Universidade do Transporte SEST SENAT! 🎓🚛 Até a próxima!'
      };
    }

    // Resposta inteligente padrão
    return {
      type: 'bot',
      text: 'Interessante! 🤔 Posso te ajudar com informações sobre: 📚 Nossos cursos (liderança, comportamental, transporte) ❓ Como se inscrever 📜 Certificados 💰 Preços (spoiler: é grátis!) 💻 Modalidade online. Sobre o que você gostaria de saber mais?'
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
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                          {course.duration}h • {course.instructor} • GRATUITO
                        </div>
                        {message.showEnrollButton && (
                          <button
                            style={{
                              background: '#10b981',
                              color: 'white',
                              border: 'none',
                              borderRadius: '0.25rem',
                              padding: '0.25rem 0.75rem',
                              fontSize: '0.75rem',
                              cursor: 'pointer'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              // Simular inscrição
                              setMessages(prev => [...prev, {
                                type: 'bot',
                                text: `✅ Inscrição realizada com sucesso no curso "${course.title}"! Você já pode acessar o conteúdo.`
                              }]);
                            }}
                          >
                            Inscrever-se
                          </button>
                        )}
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