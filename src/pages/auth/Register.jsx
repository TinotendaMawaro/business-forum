import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { User, Mail, Phone, Lock, MapPin, Briefcase, Check, ChevronRight, Home } from 'lucide-react';
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

  const inputBase =
    'w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 transition focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500';

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12 page-enter">
      <div className="mx-auto max-w-2xl">
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

        <div className="mt-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">Join HMFBF</h1>
          <p className="mt-1 text-slate-400">Register to buy and sell on Zimbabwe&apos;s trusted marketplace</p>
        </div>

        <div className="mx-auto mt-8 flex max-w-md items-center justify-between">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                  step >= s
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-900/20'
                    : 'border border-slate-800 bg-slate-900 text-slate-500'
                }`}
              >
                {step > s ? <Check size={16} /> : s}
              </div>
              {s < 3 && (
                <div className={`h-1 flex-1 rounded-full bg-slate-800 ${step > s ? '!bg-red-600' : ''}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Personal Information</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Tell us a bit about yourself to get started.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-200">First Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-slate-500" size={16} />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className={inputBase}
                        placeholder="John"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-200">Last Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-slate-500" size={16} />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className={inputBase}
                        placeholder="Moyo"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-200">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-slate-500" size={16} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={inputBase}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-200">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-slate-500" size={16} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={inputBase}
                      placeholder="+263 ..."
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-200">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-slate-500" size={16} />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className={inputBase}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-950/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-500/30"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Business Information</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Help us understand your business better.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-200">Registration Type *</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'trainee', label: 'Trainee' },
                      { value: 'graduate', label: 'Graduate Trainee' },
                      { value: 'qualified', label: 'Qualified' },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`cursor-pointer rounded-xl border px-3 py-2 text-center text-sm font-medium transition ${
                          formData.registrationType === option.value
                            ? 'border-red-500 bg-red-500/10 text-red-400'
                            : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="registrationType"
                          value={option.value}
                          checked={formData.registrationType === option.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-200">Business Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  >
                    <option value="" className="bg-slate-950 text-slate-300">
                      Select a category
                    </option>
                    {mockCategories.map((cat) => (
                      <option key={cat} value={cat} className="bg-slate-950 text-slate-300">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-200">Contact Address *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-slate-500" size={16} />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className={inputBase}
                      placeholder="Your address"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-200">Current Employer</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 text-slate-500" size={16} />
                    <input
                      type="text"
                      name="employer"
                      value={formData.employer}
                      onChange={handleChange}
                      className={inputBase}
                      placeholder="Employer name (optional)"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm font-bold text-slate-300 transition hover:border-slate-600 hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-950/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-500/30"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Terms & Conditions</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Please review our terms before completing registration.
                  </p>
                </div>

                <div className="max-h-64 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950 p-5 text-sm leading-relaxed text-slate-400">
                  <strong className="font-semibold text-slate-200">Declaration:</strong> I, the undersigned, declare
                  that information given is correct and I agree to abide by the rules, regulations and benefits as
                  amended from time to time by the Marketplace Fellowship Business Forum should my registration
                  go through.
                  <br />
                  <br />
                  I understand that if any information provided is incorrect or false, I shall be disqualified from
                  opportunities availed to develop skills under MFBF platforms and its member businesses.
                  <br />
                  <br />
                  I understand that should I be called to be trained and offer my services as HMFBF team of Member
                  Business Assessment Officers and Trainers, I will not charge the Business Forum any fee or salary
                  for such services as this will be part of HMFBF&apos;s effort to develop my skills and give me exposure
                  to many businesses and operations.
                  <br />
                  <br />
                  I agree to be bound by the Business Forum&apos;s constitution and regulations and to comply with every
                  term therein.
                </div>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4 transition hover:border-red-500/60">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-950 text-red-600"
                  />
                  <div className="text-sm">
                    <strong className="text-slate-200">I agree to the Declaration and Terms & Conditions</strong>
                    <p className="mt-1 text-slate-400">Registration is subject to admin approval.</p>
                  </div>
                </label>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm font-bold text-slate-300 transition hover:border-slate-600 hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!agreeTerms || loading}
                    className="flex-1 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-950/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-500/30 disabled:opacity-50"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-red-500 transition hover:text-red-400">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-700 hover:text-white"
          >
            <Home size={14} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
