import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { Mail, Lock, Eye, EyeOff, LogIn, ShieldAlert, Home } from 'lucide-react';

function Login() {
  const navigate = useNavigate();
  const { login, loginAsAdmin } = useAuthStore();
  const [email, setEmail] = useState('john@hmfbf.co.zw');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (email && password) {
        login(email, password);
        navigate('/dashboard');
      } else {
        setError('Please fill in all fields');
      }
      setLoading(false);
    }, 500);
  };

  const handleAdminLogin = () => {
    setLoading(true);
    setTimeout(() => {
      loginAsAdmin();
      navigate('/admin/dashboard');
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-16 page-enter">
      <div className="w-full max-w-md">
        <Link to="/" className="flex justify-center">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-rose-500 text-lg font-bold text-white shadow-lg shadow-red-900/20">
              H
            </span>
            <div>
              <div className="text-lg font-bold tracking-tight text-white">Platform</div>
              <div className="text-xs font-medium text-slate-400">Fellowship Business Forum</div>
            </div>
          </div>
        </Link>

        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="mt-1 text-slate-400">Sign in to your account to continue</p>

          {error && (
            <div className="mt-6 flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <ShieldAlert size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 transition hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-red-600" />
                <span className="text-sm text-slate-400">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm font-semibold text-red-500 transition hover:text-red-400">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-950/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-500/30 disabled:opacity-50"
            >
              <LogIn size={16} />
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-800" />
            <span className="text-sm text-slate-500">OR</span>
            <div className="h-px flex-1 bg-slate-800" />
          </div>

          <button
            onClick={handleAdminLogin}
            disabled={loading}
            className="flex w-full items-center justify-center rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:text-white disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Demo: Admin Login'}
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-center shadow-2xl backdrop-blur-xl">
          <p className="text-sm text-slate-400">Don't have an account?</p>
          <Link
            to="/register"
            className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-slate-700 bg-slate-950 px-6 py-2.5 text-sm font-bold text-slate-300 transition hover:border-slate-600 hover:text-white"
          >
            Create Account
          </Link>
        </div>

        <div className="mx-auto mt-6 max-w-md rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-center text-sm text-slate-400">
          <strong className="font-semibold text-slate-200">Demo Credentials:</strong>
          <br />
          Email: john@hmfbf.co.zw
          <br />
          Password: password123
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 transition hover:text-red-400"
          >
            <Home size={14} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
