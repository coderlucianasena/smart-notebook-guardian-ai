
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Computer, Notebook, User, Lock, Barcode, Key } from 'lucide-react';
import EquipmentScanner from './EquipmentScanner';
import EquipmentManagement from './EquipmentManagement';
import LoanManagement from './LoanManagement';

interface DashboardProps {
  user: { name: string; role: string };
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalEquipment: 24,
    availableEquipment: 18,
    onLoan: 6,
    overdueLoans: 2
  });

  const [recentActivity] = useState([
    { id: 1, action: 'Empréstimo', item: 'Notebook Dell Latitude 5520', user: 'João Silva', time: '10:30' },
    { id: 2, action: 'Devolução', item: 'Mouse Logitech MX3', user: 'Maria Santos', time: '09:15' },
    { id: 3, action: 'Cadastro', item: 'Tablet Samsung Galaxy Tab', user: 'Admin', time: '08:45' },
  ]);

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Computer },
    { id: 'scanner', label: 'Scanner', icon: Barcode },
    { id: 'equipment', label: 'Equipamentos', icon: Notebook },
    { id: 'loans', label: 'Empréstimos', icon: Key },
  ];

  const renderContent = () => {
    switch (activeTab) {
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
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          activity.action === 'Empréstimo' ? 'bg-blue-500' :
                          activity.action === 'Devolução' ? 'bg-green-500' : 'bg-purple-500'
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                <Computer className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Sistema de Controle
                </h1>
                <p className="text-sm text-gray-500">
                  Notebooks e Acessórios
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
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
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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
    </div>
  );
};

export default Dashboard;
