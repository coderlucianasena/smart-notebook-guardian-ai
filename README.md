

# Sistema de Controle de Estoque da TI v.s.

## Visão Geral

O Sistema de Controle de Estoque da TI versão Sena (v.s.) é uma aplicação web desenvolvida para gerenciar notebooks e acessórios de tecnologia da informação. O sistema oferece funcionalidades completas de controle de entrada e saída de equipamentos, scanner de código de barras, relatórios e assistente de IA.

## Tecnologias Utilizadas

- **Frontend**: React 18 com TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Gráficos**: Recharts
- **Ícones**: Lucide React
- **Roteamento**: React Router DOM

## Funcionalidades Principais

### 1. Dashboard Principal
- Visão geral do estoque com estatísticas em tempo real
- Gráficos interativos mostrando distribuição por setores
- Cards com informações de equipamentos disponíveis, em uso e em atraso
- Modo claro e escuro alternável

### 2. Gestão de Equipamentos
- Listagem completa de todos os equipamentos
- Filtros por tipo, status e busca por texto
- Visualização detalhada de cada equipamento
- Status: Disponível, Em Uso, Manutenção

### 3. Gestão de Entrada e Saída
- Controle de empréstimos de equipamentos
- Registro de usuários responsáveis
- Acompanhamento de prazos de devolução
- Alertas para equipamentos em atraso
- Histórico completo de movimentações

### 4. Scanner de Código de Barras
- Leitura automática de códigos patrimoniais
- Formato padrão: 04B-IN001577 (alfanumérico)
- Acesso rápido às informações do equipamento
- Funcionalidades de edição e histórico
- Integração com suporte Dell para abertura de chamados

### 5. Assistente de IA
- Chatbot inteligente para suporte ao usuário
- Respostas sobre disponibilidade de equipamentos
- Orientações sobre processos do sistema
- Informações estatísticas em tempo real
- Sugestões rápidas de perguntas frequentes

## Estrutura de Equipamentos

### Tipos de Equipamentos Suportados
- **Notebooks**: Dell, HP, Lenovo e outras marcas
- **Acessórios**: Mouses, teclados, cabos
- **Tablets**: Samsung, Apple e outros
- **Monitores**: Diversos tamanhos e marcas

### Códigos Patrimoniais
- Formato: XXX-XXXXXXXX (exemplo: 04B-IN001577)
- Primeira parte: Identificação da categoria
- Segunda parte: Número sequencial único

## Funcionalidades Especiais

### Integração Dell
- Abertura automática de chamados de suporte
- Preenchimento automático de e-mail com:
  - Tag de serviço
  - Número de série
  - Descrição do defeito
  - Informações do equipamento

### Relatórios e Gráficos
- Distribuição por setores
- Taxa de utilização de equipamentos
- Equipamentos disponíveis vs em uso
- Histórico de movimentações
- Gráficos interativos com Recharts

## Estrutura do Projeto

```
src/
├── components/
│   ├── ui/                     # Componentes base shadcn/ui
│   ├── AIChat.tsx             # Assistente de IA
│   ├── Dashboard.tsx          # Dashboard principal
│   ├── EquipmentManagement.tsx # Gestão de equipamentos
│   ├── EquipmentScanner.tsx   # Scanner de códigos
│   ├── LoanManagement.tsx     # Gestão de entrada/saída
│   └── Login.tsx              # Tela de login
├── pages/
│   └── Index.tsx              # Página principal
└── hooks/
    └── use-toast.ts           # Hook para notificações
```

## Configuração e Instalação

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <repository-url>

# Navegue para o diretório
cd sistema-estoque-ti

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

### Build para Produção
```bash
npm run build
```

## Credenciais de Acesso

### Usuários de Teste
- **Administrador**
  - Usuário: `admin`
  - Senha: `admin123`

- **Operador**
  - Usuário: `operador`
  - Senha: `operador123`

- **Teste**
  - Usuário: `teste`
  - Senha: `123456`

## Fluxos de Trabalho

### 1. Entrada de Novo Equipamento
1. Acesse "Gestão de Equipamentos"
2. Clique em "Novo Equipamento"
3. Preencha as informações necessárias
4. Escaneie ou digite o código patrimonial
5. Confirme o cadastro

### 2. Saída de Equipamento (Empréstimo)
1. Acesse "Gestão de Entrada e Saída"
2. Clique em "Nova Operação"
3. Escaneie o código do equipamento
4. Informe dados do responsável
5. Defina prazo de devolução
6. Confirme a operação

### 3. Devolução de Equipamento
1. Acesse "Gestão de Entrada e Saída"
2. Localize o empréstimo ativo
3. Clique em "Marcar Devolução"
4. Confirme a devolução

### 4. Scanner de Equipamentos
1. Acesse seção "Scanner"
2. Permita acesso à câmera
3. Posicione o código de barras na área de leitura
4. Aguarde a leitura automática
5. Visualize informações do equipamento
6. Execute ações disponíveis (Editar/Histórico)

### 5. Abertura de Chamado Dell
1. Escaneie um equipamento Dell
2. Clique em "Abrir Chamado Dell"
3. Descreva o defeito encontrado
4. Clique em "Abrir E-mail"
5. E-mail será aberto automaticamente preenchido

## Assistente de IA - Comandos Úteis

### Perguntas Frequentes
- "Quantos notebooks temos disponíveis?"
- "Quantos equipamentos temos no total?"
- "Como fazer entrada e saída?"
- "Como usar o scanner?"
- "Como abrir chamado Dell?"

### Informações Disponíveis
- Status atual do estoque
- Procedimentos do sistema
- Orientações sobre funcionalidades
- Estatísticas em tempo real

## Configurações do Sistema

### Tema Visual
- Alternância entre modo claro e escuro
- Botão no cabeçalho para mudança de tema
- Persistência da preferência do usuário

### Notificações
- Toasts para feedback de ações
- Alertas para equipamentos em atraso
- Confirmações de operações realizadas

## Manutenção e Suporte

### Logs do Sistema
- Console do navegador para debug
- Histórico de operações no sistema
- Registro de erros e exceções

### Backup de Dados
- Dados armazenados localmente no navegador
- Exportação manual de relatórios
- Histórico de movimentações preservado

## Segurança

### Autenticação
- Sistema de login com credenciais
- Diferentes níveis de acesso (Admin/Operador)
- Timeout de sessão automático

### Validações
- Verificação de códigos patrimoniais
- Validação de dados de entrada
- Prevenção de operações inválidas

## Performance

### Otimizações
- Componentes React otimizados
- Carregamento lazy de recursos
- Compressão de assets
- Tree-shaking automático

### Compatibilidade
- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Responsivo para diferentes tamanhos de tela
- Suporte a dispositivos móveis

## Roadmap Futuro

### Próximas Funcionalidades
- Integração com banco de dados
- Relatórios em PDF
- Notificações por e-mail
- API para integração externa
- Controle de acesso mais granular

### Melhorias Planejadas
- Interface ainda mais intuitiva
- Mais opções de relatórios
- Integração com outros fornecedores
- Sistema de backup automático

## Suporte Técnico

Para suporte técnico ou dúvidas sobre o sistema:
- Consulte o Assistente de IA integrado
- Verifique a documentação completa
- Entre em contato com a equipe de TI

---

**Sistema de Controle de Estoque da TI v.s.**  
*Versão Sena - Desenvolvido para necessidades empresariais de gestão de TI*

