import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, Bot, User } from 'lucide-react';

interface AIChatProps {
  onClose: () => void;
  stats: {
    totalEquipment: number;
    availableEquipment: number;
    onLoan: number;
    overdueLoans: number;
  };
}

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
}

const AIChat: React.FC<AIChatProps> = ({ onClose, stats }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: 'Olá! Sou seu assistente do Sistema de Controle de Estoque da TI da Agropalma v.s. Como posso ajudar você hoje? Posso fornecer informações sobre equipamentos, entrada e saída, relatórios e procedimentos do sistema.',
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

  // Dados dos equipamentos
  const equipmentData = {
    notebooks: { total: 24, disponivel: 18, emUso: 6 },
    mouses: { total: 33, disponivel: 25, emUso: 8 },
    teclados: { total: 27, disponivel: 22, emUso: 5 },
    monitores: { total: 18, disponivel: 15, emUso: 3 },
    cabos: { total: 57, disponivel: 45, emUso: 12 }
  };

  // Respostas aprimoradas da IA
  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('quantos') && (message.includes('notebook') || message.includes('computador'))) {
      return `Temos ${equipmentData.notebooks.disponivel} notebooks disponíveis de um total de ${equipmentData.notebooks.total} unidades. Atualmente ${equipmentData.notebooks.emUso} estão em uso.`;
    }
    
    if (message.includes('quantos') && message.includes('equipamento')) {
      return `No momento temos:\n• ${stats.totalEquipment} equipamentos no total\n• ${stats.availableEquipment} equipamentos disponíveis\n• ${stats.onLoan} equipamentos em uso\n• ${stats.overdueLoans} equipamentos em atraso\n\nDetalhamento por tipo:\n• Notebooks: ${equipmentData.notebooks.disponivel} disponíveis\n• Mouses: ${equipmentData.mouses.disponivel} disponíveis\n• Teclados: ${equipmentData.teclados.disponivel} disponíveis\n• Monitores: ${equipmentData.monitores.disponivel} disponíveis\n• Cabos: ${equipmentData.cabos.disponivel} disponíveis`;
    }
    
    if (message.includes('notebook') || message.includes('laptop')) {
      return `Informações sobre notebooks:\n• Total: ${equipmentData.notebooks.total} unidades\n• Disponíveis: ${equipmentData.notebooks.disponivel}\n• Em uso: ${equipmentData.notebooks.emUso}\n\nPara dar entrada ou saída de um notebook, vá até a seção "Entrada e Saída" e selecione o equipamento desejado.`;
    }
    
    if (message.includes('mouse') || message.includes('teclado')) {
      return `Acessórios disponíveis:\n• Mouses: ${equipmentData.mouses.disponivel} de ${equipmentData.mouses.total} disponíveis\n• Teclados: ${equipmentData.teclados.disponivel} de ${equipmentData.teclados.total} disponíveis\n\nEstes acessórios podem ser registrados para entrada e saída através do sistema.`;
    }
    
    if (message.includes('entrada') || message.includes('saída')) {
      return 'Para registrar entrada e saída: 1) Acesse a seção "Entrada e Saída", 2) Clique em "Nova Operação", 3) Escaneie ou digite o código do equipamento (formato: 04B-IN001577), 4) Informe os dados do responsável, 5) Confirme a operação.';
    }
    
    if (message.includes('código') || message.includes('patrimônio')) {
      return 'Os códigos patrimoniais seguem o formato alfanumérico: 04B-IN001577. Cada equipamento possui um código único que pode ser escaneado ou digitado manualmente no sistema.';
    }
    
    if (message.includes('scanner') || message.includes('código de barras')) {
      return 'O scanner de código de barras está disponível na seção "Scanner". Você pode usar a câmera do dispositivo para ler códigos patrimoniais dos equipamentos e acessar rapidamente suas informações para edição ou visualização do histórico.';
    }
    
    if (message.includes('relatório') || message.includes('gráfico')) {
      return 'Os relatórios e gráficos estão disponíveis na seção "Gráficos". Lá você pode visualizar estatísticas por setor, status dos equipamentos, taxa de utilização e outras métricas importantes do estoque da TI.';
    }
    
    if (message.includes('dell') || message.includes('chamado')) {
      return 'Para equipamentos Dell, é possível abrir chamados de suporte diretamente pelo sistema. Após escanear um equipamento Dell, aparecerá a opção "Abrir Chamado Dell" que preencherá automaticamente um e-mail com as informações necessárias.';
    }
    
    if (message.includes('dark') || message.includes('escuro') || message.includes('tema')) {
      return 'O sistema possui modo claro e escuro. Você pode alternar entre os temas clicando no botão com ícone de lua/sol no cabeçalho da aplicação.';
    }
    
    if (message.includes('agropalma') || message.includes('versão sena')) {
      return 'Este é o Sistema de Controle de Estoque da TI da Agropalma versão Sena (v.s.). Foi desenvolvido especificamente para gerenciar notebooks e acessórios da empresa, incluindo funcionalidades de scanner, relatórios e integração com suporte Dell.';
    }
    
    if (message.includes('ajuda') || message.includes('help')) {
      return 'Posso ajudar com:\n• Informações sobre equipamentos disponíveis\n• Processo de entrada e saída\n• Como usar o scanner de código de barras\n• Cadastro de novos equipamentos\n• Consulta de relatórios e gráficos\n• Abertura de chamados Dell\n• Funcionalidades do sistema\n\nQual dessas opções você gostaria de saber mais?';
    }
    
    return `Entendi sua pergunta sobre o sistema de controle de estoque da Agropalma. Atualmente temos ${stats.availableEquipment} equipamentos disponíveis. Para uma resposta mais específica, posso ajudar com informações sobre equipamentos, entrada e saída, scanner, relatórios ou funcionalidades do sistema. Sobre qual dessas áreas você gostaria de saber mais?`;
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
            <span>Assistente IA - Agropalma v.s.</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col space-y-4 p-4">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-4 border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
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
                      : 'bg-white dark:bg-gray-700 border'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
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
                  <div className="bg-white dark:bg-gray-700 border rounded-lg p-3">
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
              onClick={() => setInputMessage('Quantos notebooks temos disponíveis?')}
            >
              Notebooks disponíveis
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputMessage('Quantos equipamentos temos no total?')}
            >
              Total de equipamentos
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputMessage('Como fazer entrada e saída?')}
            >
              Entrada e saída
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIChat;
