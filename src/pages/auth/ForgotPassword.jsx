import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Key } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <Key className="w-8 h-8 text-red-700 mr-2" />
          <h2 className="text-2xl font-bold">Reset Password</h2>
        </div>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-700 text-white py-2 rounded hover:bg-red-800"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="mb-4">Password reset link sent to your email.</p>
            <Link to="/login" className="text-red-700">Back to Login</Link>
          </div>
        )}
      </div>
    </div>
  );
}