import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Mock API URL - in a real app, this would be your backend API
const API_URL = 'https://api.example.com'; // Replace with your actual API URL

type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// For demonstration purposes - in a real app, this would be handled by your backend
interface JwtPayload {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
  exp: number;
}

// Mock users for demonstration
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@campus.edu',
    password: 'admin123',
    role: 'admin' as const,
  },
  {
    id: '2',
    name: 'Student User',
    email: 'student@campus.edu',
    password: 'student123',
    role: 'student' as const,
  },
];

// JWT helpers
const generateToken = (user: typeof MOCK_USERS[0]): string => {
  // This is a simplified example - in a real app, JWT would be generated on the server
  const { password, ...payload } = user;
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const now = Math.floor(Date.now() / 1000);
  const exp = now + 60 * 60; // 1 hour expiration
  const data = btoa(JSON.stringify({ ...payload, exp }));
  const signature = btoa('secret'); // Not secure, just for demo
  return `${header}.${data}.${signature}`;
};

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.exp < Date.now() / 1000;
  } catch {
    return true;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken && !isTokenExpired(savedToken)) {
      return savedToken;
    }
    return null;
  });
  
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUser({
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
        });
      } catch (error) {
        console.error('Invalid token:', error);
        setToken(null);
        localStorage.removeItem('token');
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call:
      // const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      // setToken(response.data.token);
      
      // Simulated API call for demonstration
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundUser = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );
      
      if (foundUser) {
        const newToken = generateToken(foundUser);
        setToken(newToken);
        localStorage.setItem('token', newToken);
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};