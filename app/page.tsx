// main login page

'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  interface Credentials {
    username: string;
    password: string;
  }

  interface ChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }

  const handleChange = useCallback((e: ChangeEvent) => {
    const { name, value } = e.target;
    setCredentials((prev: Credentials) => ({ ...prev, [name]: value }));
    setError('');
  }, []);

  const validateInputs = useCallback(() => {
    if (!credentials.username || !credentials.password) {
      setError('Username and password are required');
      return false;
    }
    return true;
  }, [credentials]);

  const handleLogin = useCallback(async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (res.ok) {
        router.push('/products');
      } else {
        const data = await res.json();
        setError(data.message || 'Login failed');
      }
    } catch {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  }, [credentials, validateInputs, router]);


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-96 p-6 border rounded">
        <h2 className="text-2xl mb-4">Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          className="w-full p-2 mb-4 border"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full p-2 bg-blue-500 text-white"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </div>
    </div>
  );
}