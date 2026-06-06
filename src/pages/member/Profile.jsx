import React, { useState } from 'react';
import useAuthStore from '../../store/authStore';
import { Mail, Phone, MapPin, Edit3, Save } from 'lucide-react';

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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="bg-white rounded-lg shadow p-6 h-fit">
            <div className="w-24 h-24 bg-red-100 text-red-700 rounded-lg flex items-center justify-center font-bold text-3xl mx-auto mb-4">
              {user?.avatar}
            </div>
            <h2 className="text-xl font-bold text-gray-900 text-center mb-2">{user?.name}</h2>
            <div className="text-sm text-gray-600 text-center mb-4">{user?.category}</div>
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-center text-sm font-bold capitalize">
              {user?.status} Member
            </div>
            <div className="text-xs text-gray-500 text-center mt-2">
              Reg No: {user?.registrationNo}
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Profile Information</h3>
                {!isEditing && (
                  <button onClick={() => setIsEditing(true)} className="text-red-700 hover:text-red-800 flex items-center gap-2">
                    <Edit3 size={18} /> Edit
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700" />
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="px-6 py-2 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800 flex items-center gap-2">
                      <Save size={18} /> Save
                    </button>
                    <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50">
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Email</label>
                    <p className="text-gray-600">{user?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Registration No.</label>
                    <p className="text-gray-600">{user?.registrationNo}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Member Since</label>
                    <p className="text-gray-600">{user?.joinDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Business Category</label>
                    <p className="text-gray-600">{user?.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Phone</label>
                    <p className="text-gray-600">{user?.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Location</label>
                    <p className="text-gray-600">{user?.location || 'Not provided'}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Account Security</h3>
              <button className="px-6 py-2 border-2 border-red-700 text-red-700 rounded-lg font-bold hover:bg-red-50">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

