// main page

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

	  if (res.ok) {
        router.push('/products');
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } catch {
      setError('An error occurred');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-96 p-6 border rounded">
        <h2 className="text-2xl mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button onClick={handleLogin} className="w-full p-2 bg-blue-500 text-white">
          Login
        </button>
      </div>
    </div>
  );
}