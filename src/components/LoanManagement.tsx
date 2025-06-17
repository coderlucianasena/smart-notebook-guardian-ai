
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, User, Computer, Clock, Search, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LoanManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { toast } = useToast();

  const [loans] = useState([
    {
      id: '1',
      equipmentName: 'Notebook Dell Latitude 5520',
      equipmentId: 'DL5520-001',
      borrowerName: 'João Silva',
      borrowerEmail: 'joao.silva@empresa.com',
      department: 'TI',
      loanDate: '2024-06-10',
      expectedReturnDate: '2024-06-24',
      actualReturnDate: null,
      status: 'Ativo',
      isOverdue: false
    },
    {
      id: '2',
      equipmentName: 'Mouse Logitech MX Master 3',
      equipmentId: 'LG-MX3-002',
      borrowerName: 'Maria Santos',
      borrowerEmail: 'maria.santos@empresa.com',
      department: 'Vendas',
      loanDate: '2024-06-08',
      expectedReturnDate: '2024-06-15',
      actualReturnDate: null,
      status: 'Em Atraso',
      isOverdue: true
    },
    {
      id: '3',
      equipmentName: 'Tablet Samsung Galaxy Tab S9',
      equipmentId: 'SM-T970-003',
      borrowerName: 'Carlos Oliveira',
      borrowerEmail: 'carlos.oliveira@empresa.com',
      department: 'Marketing',
      loanDate: '2024-06-05',
      expectedReturnDate: '2024-06-12',
      actualReturnDate: '2024-06-11',
      status: 'Devolvido',
      isOverdue: false
    },
    {
      id: '4',
      equipmentName: 'Notebook HP EliteBook 840',
      equipmentId: 'HP-EB840-004',
      borrowerName: 'Ana Costa',
      borrowerEmail: 'ana.costa@empresa.com',
      department: 'Financeiro',
      loanDate: '2024-06-12',
      expectedReturnDate: '2024-06-26',
      actualReturnDate: null,
      status: 'Ativo',
      isOverdue: false
    },
    {
      id: '5',
      equipmentName: 'Teclado Mecânico Corsair K95',
      equipmentId: 'CR-K95-005',
      borrowerName: 'Pedro Lima',
      borrowerEmail: 'pedro.lima@empresa.com',
      department: 'Desenvolvimento',
      loanDate: '2024-06-01',
      expectedReturnDate: '2024-06-08',
      actualReturnDate: null,
      status: 'Em Atraso',
      isOverdue: true
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'bg-blue-100 text-blue-800';
      case 'Em Atraso':
        return 'bg-red-100 text-red-800';
      case 'Devolvido':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const calculateDaysOverdue = (expectedDate: string) => {
    const today = new Date();
    const expected = new Date(expectedDate);
    const diffTime = today.getTime() - expected.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = loan.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.equipmentId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || loan.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const activeLoans = loans.filter(loan => loan.status === 'Ativo').length;
  const overdueLoans = loans.filter(loan => loan.isOverdue).length;
  const returnedThisMonth = loans.filter(loan => 
    loan.status === 'Devolvido' && 
    new Date(loan.actualReturnDate!).getMonth() === new Date().getMonth()
  ).length;

  const handleReturnEquipment = (loanId: string, equipmentName: string) => {
    toast({
      title: "Equipamento devolvido",
      description: `${equipmentName} foi marcado como devolvido com sucesso.`,
    });
  };

  const handleSendReminder = (borrowerName: string, equipmentName: string) => {
    toast({
      title: "Lembrete enviado",
      description: `Lembrete de devolução enviado para ${borrowerName} sobre ${equipmentName}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Gestão de Empréstimos</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="gradient-card border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Empréstimos Ativos
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {activeLoans}
                </p>
              </div>
              <User className="w-8 h-8 text-blue-500" />
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
                  {overdueLoans}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Devoluções do Mês
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {returnedThisMonth}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por equipamento, usuário ou departamento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Em Atraso">Em Atraso</SelectItem>
                <SelectItem value="Devolvido">Devolvido</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Loans List */}
      <div className="space-y-4">
        {filteredLoans.map((loan) => (
          <Card key={loan.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {loan.equipmentName}
                      </h3>
                      <p className="text-sm text-gray-500">ID: {loan.equipmentId}</p>
                    </div>
                    <Badge className={getStatusColor(loan.status)}>
                      {loan.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-medium">{loan.borrowerName}</p>
                        <p className="text-gray-500">{loan.department}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-medium">Empréstimo: {formatDate(loan.loanDate)}</p>
                        <p className="text-gray-500">Previsão: {formatDate(loan.expectedReturnDate)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div>
                        {loan.actualReturnDate ? (
                          <p className="font-medium text-green-600">
                            Devolvido: {formatDate(loan.actualReturnDate)}
                          </p>
                        ) : loan.isOverdue ? (
                          <p className="font-medium text-red-600">
                            {calculateDaysOverdue(loan.expectedReturnDate)} dias em atraso
                          </p>
                        ) : (
                          <p className="font-medium text-blue-600">
                            Em uso
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {loan.status !== 'Devolvido' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSendReminder(loan.borrowerName, loan.equipmentName)}
                      >
                        Lembrete
                      </Button>
                      <Button
                        size="sm"
                        className="gradient-bg text-white"
                        onClick={() => handleReturnEquipment(loan.id, loan.equipmentName)}
                      >
                        Marcar Devolução
                      </Button>
                    </>
                  )}
                  <Button variant="outline" size="sm">
                    Histórico
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLoans.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Computer className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum empréstimo encontrado
            </h3>
            <p className="text-gray-500">
              Tente ajustar os filtros ou verificar novamente
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LoanManagement;
