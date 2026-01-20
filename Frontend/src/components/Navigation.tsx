import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Brain, Menu, X, ArrowRight, LogOut, Layout, UserCircle, RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isAuthenticated = !!user;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAuthPage = location.pathname === '/login';
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin');

  const getInitials = (name?: string) => {
    return name ? name.substring(0, 2).toUpperCase() : 'U';
  };

  const shouldHide = !isNavHovered && (isDashboard || isScrolled);

  return (
    <>
      {/* Hover Trigger Zone */}
      <div
        className="fixed top-0 left-0 right-0 h-4 z-[1001] cursor-pointer"
        onMouseEnter={() => setIsNavHovered(true)}
      />

      <nav
        onMouseEnter={() => setIsNavHovered(true)}
        onMouseLeave={() => setIsNavHovered(false)}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-700 ease-in-out transform
          ${shouldHide ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 pointer-events-auto'}
          ${isScrolled ? 'py-4' : 'py-8 bg-gradient-to-b from-black/80 via-black/40 to-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className={`relative flex items-center justify-between px-8 py-4 rounded-[2.5rem] border transition-all duration-700 ${isScrolled || isAuthPage || location.pathname !== '/'
            ? 'glass-morphism border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
            : 'bg-transparent border-transparent'}`}>

            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-4 group decoration-none hover:no-underline">
                <div className="relative">
                  <div className="absolute -inset-2 bg-purple-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="bg-white/[0.03] border border-white/10 p-2.5 rounded-xl group-hover:rotate-[15deg] transition-all duration-500 relative z-10">
                    <Brain className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-10">
              {['Home', 'About', 'Events', 'Lost & Found', 'Contact'].map((item) => {
                const path = item === 'Home' ? '/' : item === 'Lost & Found' ? '/lost-and-found' : `/${item.toLowerCase()}`;
                const isActive = location.pathname === path;

                return (
                  <Link
                    key={item}
                    to={path}
                    className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 relative group decoration-none hover:no-underline drop-shadow-md ${isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                      }`}
                  >
                    {item}
                    <span className={`absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                      }`}></span>
                  </Link>
                );
              })}

              {isAuthenticated && (
                <Link
                  to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                  className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 relative group decoration-none hover:no-underline flex items-center drop-shadow-md ${isDashboard ? 'text-purple-400' : 'text-gray-300 hover:text-purple-400'
                    }`}
                >
                  <Layout className="h-3 w-3 mr-2" />
                  Dashboard
                  <span className={`absolute -bottom-2 left-0 h-0.5 bg-purple-500 transition-all duration-500 ${isDashboard ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                    }`}></span>
                </Link>
              )}
            </div>

            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center pl-6 border-l border-white/10 h-6">
                <ThemeToggle />
              </div>

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="hidden lg:flex items-center px-4 py-1.5 bg-purple-600/10 rounded-full border border-purple-500/20">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse mr-3" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-purple-400 leading-none italic">Neural active</span>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-12 w-12 rounded-2xl p-0 overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all bg-white/[0.03] group">
                        <Avatar className="h-full w-full">
                          <AvatarImage src="/placeholder-avatar.jpg" alt={user?.username} />
                          <AvatarFallback className="bg-transparent text-white font-black italic">
                            {getInitials(user?.username)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64 bg-[#0a0a0f]/95 border-white/10 backdrop-blur-3xl p-4 rounded-[2rem] mt-4" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal p-4">
                        <div className="flex flex-col space-y-2">
                          <p className="text-lg font-black tracking-tighter uppercase italic">{user?.username}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{user?.email || 'SYSTEM_OPERATOR@CORE.EDU'}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-white/5" />
                      <DropdownMenuItem onClick={() => navigate(user?.role === 'admin' ? '/admin' : '/dashboard')} className="cursor-pointer p-4 rounded-xl hover:bg-white/5 transition-all group">
                        <Layout className="mr-3 h-4 w-4 text-purple-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-white">Command Center</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer p-4 rounded-xl hover:bg-red-500/10 text-red-400 focus:text-red-400 transition-all group">
                        <LogOut className="mr-3 h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Terminate Session</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="hidden md:block">
                    <Button variant="ghost" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-all px-6 rounded-full font-bold">
                      Portal Access
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button className="bg-white text-black hover:bg-purple-600 hover:text-white font-black text-[10px] uppercase tracking-widest px-8 rounded-full h-12 group transition-all duration-500 shadow-2xl relative overflow-hidden">
                      <span className="relative z-10 flex items-center">
                        Initialize
                        <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-2 transition-transform duration-500" />
                      </span>
                    </Button>
                  </Link>
                </div>
              )}

              <button
                className="md:hidden text-white p-3 hover:bg-white/5 rounded-2xl border border-white/5 transition-all"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="absolute top-[100%] left-6 right-6 mt-6 glass-morphism-strong border-white/10 rounded-[3rem] p-10 md:hidden flex flex-col items-center space-y-10 shadow-3xl z-[101]"
            >
              {['Home', 'About', 'Events', 'Lost & Found', 'Contact'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : item === 'Lost & Found' ? '/lost-and-found' : `/${item.toLowerCase()}`}
                  className="text-4xl font-black uppercase tracking-tighter text-gray-500 hover:text-white transition-colors decoration-none hover:no-underline italic"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}

              <div className="w-full pt-10 border-t border-white/5 space-y-6">
                {isAuthenticated ? (
                  <>
                    <Link
                      to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                      className="w-full block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button className="w-full h-20 rounded-3xl bg-purple-600 text-white font-black text-2xl uppercase tracking-widest">
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      onClick={handleLogout}
                      className="w-full h-20 rounded-3xl bg-white/5 border border-red-500/20 text-red-400 font-black text-2xl uppercase tracking-widest"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link to="/login" className="w-full block" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full h-20 rounded-3xl bg-white text-black font-black text-2xl uppercase tracking-widest">
                      Portal Access
                    </Button>
                  </Link>
                )}
                <div className="flex justify-center pt-4">
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};