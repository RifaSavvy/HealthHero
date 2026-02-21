import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Upload,
  Pill,
  Activity,
  MessageSquare,
  Settings,
  LogOut,
  Heart,
  Menu,
  X,
  Bell,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Upload, label: 'Upload Report', path: '/dashboard/upload' },
  { icon: Pill, label: 'Medications', path: '/dashboard/medications' },
  { icon: Activity, label: 'Symptoms', path: '/dashboard/symptoms' },
  { icon: MessageSquare, label: 'Chat Assistant', path: '/dashboard/chat' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-teal-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-b border-gray-200 z-40 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              HealthHero
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed left-0 top-0 h-screen w-72 bg-white/90 backdrop-blur-xl border-r border-gray-200 z-50 flex flex-col lg:translate-x-0"
          >
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center">
                  <Heart className="w-7 h-7 text-white" fill="white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                    HealthHero
                  </h1>
                  <p className="text-xs text-gray-500">Your Health Companion</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:ml-72 pt-16 lg:pt-0">
        {/* Top Bar */}
        <div className="hidden lg:flex items-center justify-between bg-white/50 backdrop-blur-lg border-b border-gray-200 px-8 py-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-all">
              <Bell className="w-6 h-6 text-gray-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-300">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                H
              </div>
              <div>
                <p className="font-semibold text-gray-800">Hero</p>
                <p className="text-xs text-gray-500">hero@healthhero.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white/50 backdrop-blur-lg border-t border-gray-200 px-8 py-6 mt-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                © 2026 HealthHero. Your health data is encrypted and secure.
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <button className="hover:text-blue-600">Privacy Policy</button>
                <button className="hover:text-blue-600">Terms of Service</button>
                <button className="hover:text-blue-600">Data Security</button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
