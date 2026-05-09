'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise((r) => setTimeout(r, 300)); // small UX delay

    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    if (password === adminPassword) {
      sessionStorage.setItem('adminAuth', password);
      router.push('/admin');
    } else {
      setError('Password errata. Riprova.');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🍦</div>
          <h1 className="font-heading text-2xl font-bold text-text-primary">Pannello Admin</h1>
          <p className="text-text-secondary text-sm mt-1">Gelateria Vernaci</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Password Admin
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-field"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="text-error text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="btn-primary"
          >
            {loading ? 'Accesso...' : 'Accedi'}
          </button>
        </form>

        <p className="text-center text-xs text-text-secondary mt-6">
          Solo per uso interno. Accesso riservato.
        </p>
      </div>
    </div>
  );
}
