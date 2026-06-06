import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { User, Mail, Phone, Lock, MapPin, Briefcase, Check, ChevronRight } from 'lucide-react';
import { mockCategories } from '../../data/mockData';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    category: '',
    address: '',
    employer: '',
    registrationType: 'qualified',
  });
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      register(formData);
      navigate('/dashboard');
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
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

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join HMFBF</h1>
          <p className="text-gray-600">Register to buy and sell on Zimbabwe's trusted marketplace</p>
        </div>

        <div className="flex items-center justify-between mb-8 max-w-md mx-auto">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s ? 'bg-red-700 text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step > s ? <Check size={20} /> : s}
              </div>
              {s < 3 && (
                <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-red-700' : 'bg-gray-300'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700"
                        placeholder="John"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700"
                        placeholder="Moyo"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700"
                      placeholder="+263 ..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-red-700 text-white py-2 rounded-lg font-bold hover:bg-red-800 transition flex items-center justify-center gap-2"
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Business Information</h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Registration Type *
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'trainee', label: 'Trainee' },
                      { value: 'graduate', label: 'Graduate Trainee' },
                      { value: 'qualified', label: 'Qualified' },
                    ].map(option => (
                      <label key={option.value} className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-red-700">
                        <input
                          type="radio"
                          name="registrationType"
                          value={option.value}
                          checked={formData.registrationType === option.value}
                          onChange={handleChange}
                          className="w-4 h-4 text-red-700"
                        />
                        <span className="text-sm font-medium">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Business Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700"
                  >
                    <option value="">Select a category</option>
                    {mockCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Contact Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700"
                      placeholder="Your address"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Current Employer
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="employer"
                      value={formData.employer}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700"
                      placeholder="Employer name (optional)"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-2 rounded-lg font-bold hover:bg-gray-50 transition"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 bg-red-700 text-white py-2 rounded-lg font-bold hover:bg-red-800 transition flex items-center justify-center gap-2"
                  >
                    Next <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Terms & Conditions</h2>

                <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 max-h-64 overflow-y-auto text-sm text-gray-600">
                  <strong>Declaration:</strong> I, the undersigned, declare that information given is correct and I agree to abide by the rules, regulations and benefits as amended from time to time by the Marketplace Fellowship Business Forum should my registration go through.
                  <br /><br />
                  I understand that if any information provided is incorrect or false, I shall be disqualified from opportunities availed to develop skills under MFBF platforms and its member businesses.
                  <br /><br />
                  I understand that should I be called to be trained and offer my services as HMFBF team of Member Business Assessment Officers and Trainers, I will not charge the Business Forum any fee or salary for such services as this will be part of HMFBF's effort to develop my skills and give me exposure to many businesses and operations.
                  <br /><br />
                  I agree to be bound by the Business Forum's constitution and regulations and to comply with every term therein.
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-red-700">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-5 h-5 text-red-700 mt-1"
                    />
                    <div className="text-sm">
                      <strong className="text-gray-900">I agree to the Declaration and Terms & Conditions</strong>
                      <p className="text-gray-600 text-xs mt-1">I understand that registration is subject to admin approval</p>
                    </div>
                  </label>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-2 rounded-lg font-bold hover:bg-gray-50 transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!agreeTerms || loading}
                    className="flex-1 bg-red-700 text-white py-2 rounded-lg font-bold hover:bg-red-800 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="text-center">
          <p className="text-gray-600">Already have an account?{' '}
            <Link to="/login" className="text-red-700 font-bold hover:underline">
              Sign in
        </Link>

        <Link to="/" className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-700 hover:border-red-300 hover:text-red-700 transition">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Back to Home
          </span>
        </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
