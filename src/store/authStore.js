import { create } from 'zustand';
import { mockMembers as initialMembers } from '../data/mockData';

const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  members: initialMembers,
  notifications: [],

  login: (email, password) => {
    const mockUser = {
      id: 1,
      name: 'John Moyo',
      email: email,
      role: 'member',
      category: 'Commercial - Banking',
      avatar: 'JM',
      registrationNo: 'HMFBF-2024-014',
      joinDate: 'March 2024',
      status: 'active',
    };

    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'mock_token_' + Date.now());

    set({
      user: mockUser,
      token: 'mock_token_' + Date.now(),
      isAuthenticated: true,
    });
  },

  loginAsAdmin: () => {
    const adminUser = {
      id: 100,
      name: 'Administrator',
      email: 'admin@hmfbf.co.zw',
      role: 'admin',
      avatar: 'AD',
    };

    localStorage.setItem('user', JSON.stringify(adminUser));
    localStorage.setItem('token', 'admin_token_' + Date.now());

    set({
      user: adminUser,
      token: 'admin_token_' + Date.now(),
      isAuthenticated: true,
    });
  },

  register: (data) => {
    const newUser = {
      id: Math.floor(Math.random() * 10000),
      name: data.firstName + ' ' + data.lastName,
      email: data.email,
      role: 'member',
      category: data.category,
      avatar: data.firstName[0] + data.lastName[0],
      registrationNo: 'HMFBF-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 9000 + 1000),
      joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
      status: 'pending',
    };

    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('token', 'mock_token_' + Date.now());

    set((state) => ({ user: newUser, token: 'mock_token_' + Date.now(), isAuthenticated: true, members: [...state.members, newUser] }));
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  updateProfile: (data) => {
    set((state) => {
      const updated = { ...state.user, ...data };
      localStorage.setItem('user', JSON.stringify(updated));
      return { user: updated };
    });
  },

  approveMember: (memberId) => {
    set((state) => ({
      members: state.members.map((member) =>
        member.id === memberId ? { ...member, status: 'active' } : member
      ),
    }));
  },

  rejectMember: (memberId) => {
    set((state) => ({
      members: state.members.map((member) =>
        member.id === memberId ? { ...member, status: 'rejected' } : member
      ),
    }));
  },

  reactivateMember: (memberId) => {
    set((state) => ({
      members: state.members.map((member) =>
        member.id === memberId ? { ...member, status: 'active' } : member
      ),
    }));
  },

  deactivateMember: (memberId) => {
    set((state) => ({
      members: state.members.map((member) =>
        member.id === memberId ? { ...member, status: 'inactive' } : member
      ),
    }));
  },
}));

export default useAuthStore;