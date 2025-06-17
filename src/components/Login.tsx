
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { User, Lock, Computer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginProps {
  onLogin: (user: { name: string; role: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular autenticação com credenciais de teste
    setTimeout(() => {
      // Credenciais de teste
      const validCredentials = [
        { username: 'admin', password: 'admin123', role: 'Administrador' },
        { username: 'operador', password: 'operador123', role: 'Operador' },
        { username: 'teste', password: '123456', role: 'Operador' }
      ];

      const validUser = validCredentials.find(
        cred => cred.username === credentials.username && cred.password === credentials.password
      );

      if (validUser) {
        const user = {
          name: validUser.username,
          role: validUser.role
        };
        onLogin(user);
        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo(a), ${user.name}!`,
        });
      } else {
        toast({
          title: "Erro no login",
          description: "Usuário ou senha incorretos",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full animate-pulse-slow"></div>
      </div>
      
      <Card className="w-full max-w-md glass-effect border-white/20 shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
            <Computer className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Sistema de Controle
          </CardTitle>
          <p className="text-white/80 text-sm">
            Notebooks e Acessórios
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white/90">
                Usuário
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-white/60" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Digite seu usuário"
                  className="pl-10 glass-effect border-white/20 text-white placeholder:text-white/50"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-white/60" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  className="pl-10 glass-effect border-white/20 text-white placeholder:text-white/50"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
          
          <div className="mt-6 text-center space-y-2">
            <p className="text-white/60 text-xs">
              Credenciais de teste:
            </p>
            <div className="text-white/80 text-xs space-y-1">
              <p><strong>Admin:</strong> admin / admin123</p>
              <p><strong>Operador:</strong> operador / operador123</p>
              <p><strong>Teste:</strong> teste / 123456</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
