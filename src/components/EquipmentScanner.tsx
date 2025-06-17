import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Barcode, Computer, User, Calendar, Search, Mail, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EquipmentScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [scannedEquipment, setScannedEquipment] = useState<any>(null);
  const [issueDescription, setIssueDescription] = useState('');
  const { toast } = useToast();

  // Equipamentos simulados
  const equipmentDatabase = {
    '1234567890': {
      id: '1234567890',
      name: 'Notebook Dell Latitude 5520',
      type: 'Notebook',
      model: 'Latitude 5520',
      brand: 'Dell',
      serialNumber: 'DL5520-001',
      serviceTag: 'HWTG3K3',
      status: 'Disponível',
      location: 'Almoxarifado - Setor A',
      specs: 'Intel i7, 16GB RAM, 512GB SSD',
      lastMaintenance: '15/03/2024',
      acquisitionDate: '10/01/2024',
      warranty: 'Até 10/01/2027'
    },
    '9876543210': {
      id: '9876543210',
      name: 'Mouse Logitech MX Master 3',
      type: 'Acessório',
      model: 'MX Master 3',
      brand: 'Logitech',
      serialNumber: 'LG-MX3-002',
      serviceTag: 'N/A',
      status: 'Em Uso',
      location: 'João Silva - Setor TI',
      specs: 'Wireless, Bluetooth, USB-C',
      lastMaintenance: '20/02/2024',
      acquisitionDate: '05/12/2023',
      warranty: 'Até 05/12/2025'
    },
    '5555666677': {
      id: '5555666677',
      name: 'Tablet Samsung Galaxy Tab S9',
      type: 'Tablet',
      model: 'Galaxy Tab S9',
      brand: 'Samsung',
      serialNumber: 'SM-T970-003',
      serviceTag: 'N/A',
      status: 'Manutenção',
      location: 'Oficina Técnica',
      specs: '11", 8GB RAM, 256GB, S-Pen',
      lastMaintenance: '01/06/2024',
      acquisitionDate: '15/08/2023',
      warranty: 'Até 15/08/2025'
    }
  };

  const startScanning = () => {
    setIsScanning(true);
    // Simular processo de escaneamento
    setTimeout(() => {
      const randomCodes = Object.keys(equipmentDatabase);
      const randomCode = randomCodes[Math.floor(Math.random() * randomCodes.length)];
      setBarcode(randomCode);
      handleBarcodeDetected(randomCode);
      setIsScanning(false);
    }, 3000);
  };

  const handleBarcodeDetected = (code: string) => {
    const equipment = equipmentDatabase[code];
    if (equipment) {
      setScannedEquipment(equipment);
      toast({
        title: "Código de barras detectado!",
        description: `Equipamento: ${equipment.name}`,
      });
    } else {
      toast({
        title: "Equipamento não encontrado",
        description: "Este código de barras não está cadastrado no sistema",
        variant: "destructive",
      });
    }
  };

  const handleManualSearch = () => {
    if (barcode.trim()) {
      handleBarcodeDetected(barcode.trim());
    }
  };

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

  const handleOpenDellTicket = () => {
    if (!scannedEquipment || !issueDescription.trim()) {
      toast({
        title: "Informações incompletas",
        description: "Por favor, preencha a descrição do defeito",
        variant: "destructive",
      });
      return;
    }

    const equipment = scannedEquipment;
    const subject = "Abertura de chamado";
    const body = `Prezados,

Solicitamos abertura de chamado para o equipamento abaixo:

INFORMAÇÕES DO EQUIPAMENTO:
- Modelo: ${equipment.name}
- Tag de Serviço: ${equipment.serviceTag}
- Número de Série: ${equipment.serialNumber}
- Data de Aquisição: ${equipment.acquisitionDate}

DESCRIÇÃO DO DEFEITO:
${issueDescription}

LOCALIZAÇÃO:
${equipment.location}

Aguardamos retorno para prosseguimento do atendimento.

Atenciosamente,
Equipe de TI`;

    const mailtoUrl = `mailto:support@dell.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    try {
      window.location.href = mailtoUrl;
      toast({
        title: "Email aberto com sucesso",
        description: "O cliente de email foi aberto com as informações do chamado",
      });
    } catch (error) {
      toast({
        title: "Erro ao abrir email",
        description: "Não foi possível abrir o cliente de email",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Scanner de Equipamentos</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Barcode className="w-5 h-5" />
              <span>Scanner de Código de Barras</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Camera Simulation */}
            <div className="relative w-full h-64 bg-gray-900 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {isScanning ? (
                  <div className="text-white text-center">
                    <Barcode className="w-12 h-12 mx-auto mb-2 animate-pulse" />
                    <p>Escaneando...</p>
                    <div className="mt-4 w-full h-1 bg-gray-700 rounded">
                      <div className="scanner-beam h-full w-full relative overflow-hidden rounded"></div>
                    </div>
                  </div>
                ) : (
                  <div className="text-white text-center">
                    <Barcode className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Câmera pronta para escaneamento</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={startScanning}
                disabled={isScanning}
                className="w-full gradient-bg text-white hover:opacity-90"
              >
                {isScanning ? 'Escaneando...' : 'Iniciar Escaneamento'}
              </Button>

              <div className="relative">
                <Input
                  placeholder="Ou digite o código de barras manualmente"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  className="pr-10"
                />
                <Button
                  size="sm"
                  onClick={handleManualSearch}
                  className="absolute right-1 top-1 h-8 w-8 p-0"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equipment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Computer className="w-5 h-5" />
              <span>Detalhes do Equipamento</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {scannedEquipment ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{scannedEquipment.name}</h3>
                    <p className="text-sm text-gray-500">{scannedEquipment.brand} - {scannedEquipment.model}</p>
                  </div>
                  <Badge className={getStatusColor(scannedEquipment.status)}>
                    {scannedEquipment.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="font-medium text-gray-500">Tipo:</label>
                    <p>{scannedEquipment.type}</p>
                  </div>
                  <div>
                    <label className="font-medium text-gray-500">Número de Série:</label>
                    <p>{scannedEquipment.serialNumber}</p>
                  </div>
                  <div>
                    <label className="font-medium text-gray-500">Tag de Serviço:</label>
                    <p>{scannedEquipment.serviceTag}</p>
                  </div>
                  <div>
                    <label className="font-medium text-gray-500">Aquisição:</label>
                    <p>{scannedEquipment.acquisitionDate}</p>
                  </div>
                </div>

                <div>
                  <label className="font-medium text-gray-500">Localização:</label>
                  <p className="text-sm mt-1">{scannedEquipment.location}</p>
                </div>

                <div>
                  <label className="font-medium text-gray-500">Especificações:</label>
                  <p className="text-sm mt-1">{scannedEquipment.specs}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="font-medium text-gray-500">Última Manutenção:</label>
                    <p>{scannedEquipment.lastMaintenance}</p>
                  </div>
                  <div>
                    <label className="font-medium text-gray-500">Garantia:</label>
                    <p>{scannedEquipment.warranty}</p>
                  </div>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button className="flex-1" variant="outline">
                    Editar
                  </Button>
                  <Button className="flex-1 gradient-bg text-white">
                    {scannedEquipment.status === 'Disponível' ? 'Emprestar' : 'Ver Histórico'}
                  </Button>
                </div>

                {/* Dell Support Ticket Button - Only show for Dell equipment */}
                {scannedEquipment.brand === 'Dell' && (
                  <div className="border-t pt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full" variant="outline">
                          <Mail className="w-4 h-4 mr-2" />
                          <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
                          Abrir Chamado Dell
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle className="flex items-center space-x-2">
                            <Mail className="w-5 h-5" />
                            <span>Abertura de Chamado Dell</span>
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="text-sm text-gray-600">
                            <p><strong>Equipamento:</strong> {scannedEquipment.name}</p>
                            <p><strong>Tag de Serviço:</strong> {scannedEquipment.serviceTag}</p>
                            <p><strong>Série:</strong> {scannedEquipment.serialNumber}</p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Descrição do Defeito *
                            </label>
                            <textarea
                              value={issueDescription}
                              onChange={(e) => setIssueDescription(e.target.value)}
                              placeholder="Descreva detalhadamente o problema encontrado no equipamento..."
                              className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          
                          <Button 
                            onClick={handleOpenDellTicket}
                            className="w-full gradient-bg text-white"
                            disabled={!issueDescription.trim()}
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Abrir Email com Chamado
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Computer className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>Escaneie um código de barras para ver os detalhes do equipamento</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EquipmentScanner;
