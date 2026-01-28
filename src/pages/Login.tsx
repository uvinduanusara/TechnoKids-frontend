import { useState } from 'react';
import { useLoginMutation } from '../lib/apiSlice';
import { useNavigate } from 'react-router-dom';

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login({ email, password }).unwrap();
      localStorage.setItem('token', user.access_token);
      localStorage.setItem('role', user.role);
      navigate('/dashboard');
    } catch (err) {
      alert("Login failed. Check your NestJS console.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-950 p-4">
      <Card className="w-full max-w-sm bg-zinc-900 border-zinc-800 text-zinc-100">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-blue-500">
            TechnoKids
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Enter your credentials to access the exam portal
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="Enter your Email" 
                required
                className="bg-zinc-800 border-zinc-700 focus:ring-blue-500"
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                type="password" 
                placeholder='Enter your Password'
                required
                className="bg-zinc-800 border-zinc-700 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
          </CardContent>
          <CardFooter className='mt-4'>
            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
            >
              {isLoading ? "Authenticating..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}