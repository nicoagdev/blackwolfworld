'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import Button from '@/ui/button';
import Input from '@/ui/input';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      await login({ username: email, password });
      router.push('/');
    } catch (err) {
      setError('Credenciales inválidas. Intentá de nuevo.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-bw-gold/10 flex items-center justify-center">
            <Lock className="w-5 h-5 text-bw-gold" />
          </div>
          <h1 className="font-display font-bold text-2xl uppercase tracking-wide">Iniciar sesión</h1>
          <p className="font-body text-sm text-bw-muted mt-2">Accedé a tu cuenta BlackWolf</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="font-body text-xs text-red-400 text-center">{error}</p>
          )}

          <Button type="submit" variant="primary" className="w-full mt-6">
            Ingresar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;