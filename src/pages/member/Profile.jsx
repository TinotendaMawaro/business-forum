import React, { useState } from 'react';
import useAuthStore from '../../store/authStore';
import { Mail, Phone, MapPin, Edit3, Save, Shield } from 'lucide-react';

function Profile() {
  const { user, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    category: user?.category || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const inputBase =
    'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500';

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 page-enter">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Profile</h1>
        <p className="mt-1 text-slate-500">Manage your account information and preferences</p>

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-red-50 text-3xl font-bold text-red-700">{user?.avatar}</div>
            <h2 className="mt-4 text-center text-xl font-bold text-slate-900">{user?.name}</h2>
            <div className="mt-1 text-center text-sm text-slate-500">{user?.category}</div>
            <div className="mx-auto mt-4 w-fit rounded-full bg-green-50 px-4 py-1.5 text-center text-xs font-bold text-green-700 capitalize">{user?.status} Member</div>
            <div className="mt-2 text-center text-xs text-slate-400">Reg No: {user?.registrationNo}</div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Profile Information</h2>
                  <p className="text-sm text-slate-500">Update your personal and business details</p>
                </div>
                {!isEditing && (
                  <button onClick={() => setIsEditing(true)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100">
                    <Edit3 size={16} /> Edit Profile
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-900">Full Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputBase} />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-900">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputBase} />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-900">Phone</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputBase} />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-900">Location</label>
                      <input type="text" name="location" value={formData.location} onChange={handleChange} className={inputBase} />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
                      <Save size={16} /> Save Changes
                    </button>
                    <button type="button" onClick={() => setIsEditing(false)} className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Cancel</button>
                  </div>
                </form>
              ) : (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    { label: 'Email', value: user?.email },
                    { label: 'Registration No.', value: user?.registrationNo },
                    { label: 'Member Since', value: user?.joinDate },
                    { label: 'Business Category', value: user?.category },
                    { label: 'Phone', value: user?.phone || 'Not provided' },
                    { label: 'Location', value: user?.location || 'Not provided' },
                  ].map((field) => (
                    <div key={field.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">{field.label}</div>
                      <div className="mt-1 text-sm font-semibold text-slate-900">{field.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Account Security</h2>
                  <p className="text-sm text-slate-500">Password and authentication settings</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100">
                  <Shield size={16} /> Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
