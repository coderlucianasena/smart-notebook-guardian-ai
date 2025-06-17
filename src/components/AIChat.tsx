
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, Bot, User } from 'lucide-react';

interface AIChatProps {
  onClose: () => void;
}

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
}

const AIChat: React.FC<AIChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: 'Olá! Sou seu assistente de TI. Como posso ajudar você hoje? Posso auxiliar com informações sobre equipamentos, empréstimos, devoluções e procedimentos do sistema.',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Respostas pré-definidas da IA
  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('notebook') || message.includes('laptop')) {
      return 'Temos 18 notebooks disponíveis no momento. Para emprestar um notebook, vá até a seção "Empréstimos" e selecione o equipamento desejado. Você precisará informar o usuário responsável e a data prevista de devolução.';
    }
    
    if (message.includes('mouse') || message.includes('teclado')) {
      return 'Nosso estoque atual inclui 25 mouses e 22 teclados disponíveis. Estes acessórios podem ser emprestados através do sistema. Posso ajudar com o processo de empréstimo?';
    }
    
    if (message.includes('empréstimo') || message.includes('emprestar')) {
      return 'Para fazer um empréstimo: 1) Acesse a seção "Empréstimos", 2) Clique em "Novo Empréstimo", 3) Escaneie ou digite o código do equipamento, 4) Informe os dados do usuário, 5) Confirme a operação.';
    }
    
    if (message.includes('devolução') || message.includes('devolver')) {
      return 'Para registrar uma devolução: 1) Acesse "Empréstimos", 2) Encontre o empréstimo ativo, 3) Clique em "Devolver", 4) Verifique o estado do equipamento, 5) Confirme a devolução.';
    }
    
    if (message.includes('scanner') || message.includes('código de barras')) {
      return 'O scanner de código de barras está disponível na seção "Scanner". Você pode usar a câmera do dispositivo para ler códigos de barras dos equipamentos e acessar rapidamente suas informações.';
    }
    
    if (message.includes('relatório') || message.includes('gráfico')) {
      return 'Os relatórios e gráficos estão disponíveis na seção "Gráficos". Lá você pode visualizar estatísticas por setor, status dos equipamentos e outras métricas importantes.';
    }
    
    if (message.includes('cadastrar') || message.includes('adicionar')) {
      return 'Para cadastrar novos equipamentos: 1) Vá para "Equipamentos", 2) Clique em "Adicionar Equipamento", 3) Preencha todas as informações necessárias, 4) Gere ou insira o código de barras, 5) Salve o cadastro.';
    }
    
    if (message.includes('ajuda') || message.includes('help')) {
      return 'Posso ajudar com: \n• Informações sobre equipamentos disponíveis\n• Processo de empréstimo e devolução\n• Como usar o scanner de código de barras\n• Cadastro de novos equipamentos\n• Consulta de relatórios\n\nQual dessas opções você gostaria de saber mais?';
    }
    
    return 'Entendi sua pergunta. Para uma resposta mais específica, posso ajudar com informações sobre equipamentos, empréstimos, devoluções, scanner de código de barras, cadastros ou relatórios. Sobre qual dessas áreas você gostaria de saber mais?';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Adicionar mensagem do usuário
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simular delay da IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: getAIResponse(inputMessage),
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-green-600" />
            <span>Assistente de TI</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col space-y-4 p-4">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-4 border rounded-lg p-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-green-500 text-white'
                  }`}>
                    {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="flex space-x-2">
            <Input
              placeholder="Digite sua pergunta..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputMessage('Como emprestar um notebook?')}
            >
              Como emprestar?
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputMessage('Quantos equipamentos temos disponíveis?')}
            >
              Equipamentos disponíveis
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputMessage('Como usar o scanner?')}
            >
              Usar scanner
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIChat;
