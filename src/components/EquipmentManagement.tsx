
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Computer, Notebook, Tablet, Search, Plus, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EquipmentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const { toast } = useToast();

  const [equipment] = useState([
    {
      id: '1',
      barcode: '1234567890',
      name: 'Notebook Dell Latitude 5520',
      type: 'Notebook',
      brand: 'Dell',
      model: 'Latitude 5520',
      serialNumber: 'DL5520-001',
      status: 'Disponível',
      location: 'Almoxarifado - Setor A',
      specs: 'Intel i7, 16GB RAM, 512GB SSD',
      acquisitionDate: '10/01/2024',
      assignedTo: null
    },
    {
      id: '2',
      barcode: '9876543210',
      name: 'Mouse Logitech MX Master 3',
      type: 'Acessório',
      brand: 'Logitech',
      model: 'MX Master 3',
      serialNumber: 'LG-MX3-002',
      status: 'Em Uso',
      location: 'João Silva - Setor TI',
      specs: 'Wireless, Bluetooth, USB-C',
      acquisitionDate: '05/12/2023',
      assignedTo: 'João Silva'
    },
    {
      id: '3',
      barcode: '5555666677',
      name: 'Tablet Samsung Galaxy Tab S9',
      type: 'Tablet',
      brand: 'Samsung',
      model: 'Galaxy Tab S9',
      serialNumber: 'SM-T970-003',
      status: 'Manutenção',
      location: 'Oficina Técnica',
      specs: '11", 8GB RAM, 256GB, S-Pen',
      acquisitionDate: '15/08/2023',
      assignedTo: null
    },
    {
      id: '4',
      barcode: '1111222233',
      name: 'Notebook HP EliteBook 840',
      type: 'Notebook',
      brand: 'HP',
      model: 'EliteBook 840',
      serialNumber: 'HP-EB840-004',
      status: 'Em Uso',
      location: 'Maria Santos - Vendas',
      specs: 'Intel i5, 8GB RAM, 256GB SSD',
      acquisitionDate: '20/02/2024',
      assignedTo: 'Maria Santos'
    },
    {
      id: '5',
      barcode: '7777888899',
      name: 'Teclado Mecânico Corsair K95',
      type: 'Acessório',
      brand: 'Corsair',
      model: 'K95 RGB',
      serialNumber: 'CR-K95-005',
      status: 'Disponível',
      location: 'Almoxarifado - Setor B',
      specs: 'Cherry MX Brown, RGB, USB',
      acquisitionDate: '03/11/2023',
      assignedTo: null
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponível':
        return 'bg-green-100 text-green-800';
      case 'Em Uso':
        return 'bg-yellow-100 text-yellow-800';
      case 'Manutenção':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Notebook':
        return <Notebook className="w-5 h-5" />;
      case 'Tablet':
        return <Tablet className="w-5 h-5" />;
      default:
        return <Computer className="w-5 h-5" />;
    }
  };

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddEquipment = () => {
    toast({
      title: "IA Assistente",
      description: "Funcionalidade de cadastro com IA será implementada em breve!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Gestão de Equipamentos</h2>
        <Button onClick={handleAddEquipment} className="gradient-bg text-white">
          <Plus className="w-4 h-4 mr-2" />
          Novo Equipamento
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome, marca, modelo ou número de série..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="Notebook">Notebooks</SelectItem>
                <SelectItem value="Tablet">Tablets</SelectItem>
                <SelectItem value="Acessório">Acessórios</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="Disponível">Disponível</SelectItem>
                <SelectItem value="Em Uso">Em Uso</SelectItem>
                <SelectItem value="Manutenção">Manutenção</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEquipment.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="text-blue-600">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight">{item.name}</CardTitle>
                    <p className="text-sm text-gray-500">{item.brand} - {item.model}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(item.status)}>
                  {item.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <label className="font-medium text-gray-500">Série:</label>
                  <p className="truncate">{item.serialNumber}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-500">Código:</label>
                  <p className="truncate">{item.barcode}</p>
                </div>
              </div>
              
              <div>
                <label className="font-medium text-gray-500">Localização:</label>
                <p className="text-sm">{item.location}</p>
              </div>
              
              {item.assignedTo && (
                <div className="flex items-center space-x-2 text-sm">
                  <User className="w-4 h-4 text-blue-500" />
                  <span>Atribuído a: {item.assignedTo}</span>
                </div>
              )}
              
              <div>
                <label className="font-medium text-gray-500">Especificações:</label>
                <p className="text-sm text-gray-600">{item.specs}</p>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Editar
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 gradient-bg text-white"
                  disabled={item.status === 'Manutenção'}
                >
                  {item.status === 'Disponível' ? 'Emprestar' : 'Devolver'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEquipment.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Computer className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum equipamento encontrado
            </h3>
            <p className="text-gray-500">
              Tente ajustar os filtros ou adicionar novos equipamentos
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EquipmentManagement;
