import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Computer, Notebook, User, Lock, Barcode, Key, MessageCircle, PieChart, Moon, Sun } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import EquipmentScanner from './EquipmentScanner';
import EquipmentManagement from './EquipmentManagement';
import LoanManagement from './LoanManagement';
import AIChat from './AIChat';

interface DashboardProps {
  user: { name: string; role: string };
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showChat, setShowChat] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const [stats, setStats] = useState({
    totalEquipment: 24,
    availableEquipment: 18,
    onLoan: 6,
    overdueLoans: 2
  });

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Dados para gráficos
  const sectorData = [
    { name: 'TI', value: 12, color: '#16a34a' },
    { name: 'RH', value: 4, color: '#059669' },
    { name: 'Financeiro', value: 3, color: '#10b981' },
    { name: 'Marketing', value: 5, color: '#34d399' },
  ];

  const equipmentByType = [
    { name: 'Notebooks', disponivel: 18, emprestado: 6, total: 24 },
    { name: 'Mouses', disponivel: 25, emprestado: 8, total: 33 },
    { name: 'Teclados', disponivel: 22, emprestado: 5, total: 27 },
    { name: 'Monitores', disponivel: 15, emprestado: 3, total: 18 },
    { name: 'Cabos', disponivel: 45, emprestado: 12, total: 57 },
  ];

  const [recentActivity] = useState([
    { id: 1, action: 'Entrada', item: 'Notebook Dell Latitude 5520', user: 'João Silva', time: '10:30' },
    { id: 2, action: 'Saída', item: 'Mouse Logitech MX3', user: 'Maria Santos', time: '09:15' },
    { id: 3, action: 'Cadastro', item: 'Tablet Samsung Galaxy Tab', user: 'Admin', time: '08:45' },
  ]);

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Computer },
    { id: 'analytics', label: 'Gráficos', icon: PieChart },
    { id: 'scanner', label: 'Scanner', icon: Barcode },
    { id: 'equipment', label: 'Equipamentos', icon: Notebook },
    { id: 'loans', label: 'Entrada e Saída', icon: Key },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de Pizza - Equipamentos por Setor */}
              <Card>
                <CardHeader>
                  <CardTitle>Equipamentos por Setor</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={sectorData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {sectorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Gráfico de Barras - Equipamentos por Tipo */}
              <Card>
                <CardHeader>
                  <CardTitle>Status dos Equipamentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={equipmentByType}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="disponivel" fill="#16a34a" name="Disponível" />
                      <Bar dataKey="emprestado" fill="#dc2626" name="Em Uso" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Cards de estatísticas detalhadas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-green-600">Taxa de Utilização</h3>
                    <p className="text-3xl font-bold text-green-700">75%</p>
                    <p className="text-sm text-muted-foreground">Equipamentos em uso</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-blue-600">Setor com Mais Equipamentos</h3>
                    <p className="text-2xl font-bold text-blue-700">TI</p>
                    <p className="text-sm text-muted-foreground">12 equipamentos</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-orange-600">Tipo Mais Solicitado</h3>
                    <p className="text-2xl font-bold text-orange-700">Notebooks</p>
                    <p className="text-sm text-muted-foreground">24 unidades totais</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'scanner':
        return <EquipmentScanner />;
      case 'equipment':
        return <EquipmentManagement />;
      case 'loans':
        return <LoanManagement />;
      default:
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="gradient-card border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Total de Equipamentos
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        {stats.totalEquipment}
                      </p>
                    </div>
                    <Computer className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Disponíveis
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        {stats.availableEquipment}
                      </p>
                    </div>
                    <Notebook className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Em Uso
                      </p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {stats.onLoan}
                      </p>
                    </div>
                    <User className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Em Atraso
                      </p>
                      <p className="text-2xl font-bold text-red-600">
                        {stats.overdueLoans}
                      </p>
                    </div>
                    <Lock className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Atividades Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          activity.action === 'Entrada' ? 'bg-blue-500' :
                          activity.action === 'Saída' ? 'bg-green-500' : 'bg-purple-500'
                        }`}></div>
                        <div>
                          <p className="font-medium">{activity.action}: {activity.item}</p>
                          <p className="text-sm text-muted-foreground">Por: {activity.user}</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                <Computer className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Sistema de Controle de Estoque da TI v.s.
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Gestão de Notebooks e Acessórios
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center space-x-2"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>{darkMode ? 'Light' : 'Dark'}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowChat(!showChat)}
                className="flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Assistente IA</span>
              </Button>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
              </div>
              <Button variant="outline" onClick={onLogout}>
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar Navigation */}
          <div className="w-64 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-l-4 border-blue-700'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* AI Chat Modal */}
      {showChat && <AIChat onClose={() => setShowChat(false)} stats={stats} />}
    </div>
  );
};

export default Dashboard;
