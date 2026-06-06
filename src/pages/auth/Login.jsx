import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { Mail, Lock, Eye, EyeOff, LogIn, ShieldAlert } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-700 text-white rounded-full flex items-center justify-center font-bold text-2xl">
              H
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">HMFBF</div>
              <div className="text-xs text-gray-500">Fellowship Business Forum</div>
            </div>
          </div>
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600 mb-8">Sign in to your account to continue</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
              <ShieldAlert size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-red-700 hover:underline font-medium">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-700 text-white py-2 rounded-lg font-bold hover:bg-red-800 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <LogIn size={18} />
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <button
            onClick={handleAdminLogin}
            disabled={loading}
            className="w-full border-2 border-red-700 text-red-700 py-2 rounded-lg font-bold hover:bg-red-50 transition disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Demo: Admin Login'}
          </button>
        </div>

        <div className="text-center bg-white rounded-xl p-6 shadow-lg">
          <p className="text-gray-600 mb-4">Don't have an account?</p>
          <Link
            to="/register"
            className="inline-block w-full px-6 py-2 border-2 border-red-700 text-red-700 rounded-lg font-bold hover:bg-red-50 transition"
          >
            Create Account
          </Link>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <strong>Demo Credentials:</strong><br />
          Email: john@hmfbf.co.zw<br />
          Password: password123
        </div>
      </div>
    </div>
  );
}

export default Login;
