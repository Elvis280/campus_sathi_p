import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, ArrowLeft, Shield, User, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';

export const Login = () => {
  const { user, selectRole } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  const handleRoleSelect = (role: 'admin' | 'user') => {
    selectRole(role);
    navigate(role === 'admin' ? '/admin' : '/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-purple-500/30 relative overflow-hidden flex flex-col items-center justify-center p-6 font-sans">
      {/* Deep Space Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 z-0">
          <div className="stars absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse" />
        </div>

        {/* Nebula Glows */}
        <div className="nebula-glow top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 animate-orb" />
        <div className="nebula-glow bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 animate-orb" style={{ animationDelay: '5s' }} />

        <div className="absolute inset-0 neural-grid opacity-[0.05]" />
      </div>

      <Link to="/" className="absolute top-12 left-12 z-50 group flex items-center space-x-4 text-white/50 hover:text-white transition-all duration-500">
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-all">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Return to Nexus</span>
      </Link>

      <ScrollReveal>
        <div className="relative z-10 w-full max-w-5xl">
          <div className="text-center mb-16 px-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, type: "spring" }}
              className="relative inline-block mb-10"
            >
              <div className="absolute -inset-12 bg-purple-600/20 rounded-full blur-[80px] animate-pulse" />
              <div className="relative p-8 rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl shadow-2xl">
                <Brain className="h-14 w-14 text-purple-400" />
              </div>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 leading-[0.8] uppercase italic">
              Select<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-purple-800">Portal.</span>
            </h1>
            <p className="text-gray-500 font-bold tracking-[0.4em] uppercase text-[10px]">Choose Your Access Level</p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 px-4">
            {/* Student Portal Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="glass-morphism rounded-[3rem] overflow-hidden group hover:border-purple-500/50 transition-all duration-700 h-full">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] -mr-[200px] -mt-[200px] pointer-events-none group-hover:bg-purple-600/10 transition-all duration-1000" />

                <CardContent className="p-10 md:p-12 relative z-10 flex flex-col items-center text-center space-y-8">
                  <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 group-hover:bg-white/[0.05] transition-all duration-500">
                    <User className="h-16 w-16 text-purple-400" />
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-4xl font-black uppercase tracking-tighter italic">
                      Student<br />Portal
                    </h2>
                    <p className="text-gray-500 text-xs uppercase tracking-[0.3em] font-bold">
                      Access Documents & Query System
                    </p>
                  </div>

                  <div className="space-y-2 text-left w-full">
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <Sparkles className="h-4 w-4 text-purple-400" />
                      <span>Ask questions about documents</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <Sparkles className="h-4 w-4 text-purple-400" />
                      <span>Upload and manage PDFs</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <Sparkles className="h-4 w-4 text-purple-400" />
                      <span>View AI-powered answers</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleRoleSelect('user')}
                    className="h-20 w-full rounded-[2rem] bg-white text-black hover:bg-purple-600 hover:text-white font-black text-xl uppercase tracking-[0.2em] group/btn transition-all duration-700 overflow-hidden relative shadow-3xl mt-6"
                  >
                    <div className="relative z-10 flex items-center justify-center">
                      <span>Enter Student Portal</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Admin Portal Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="glass-morphism rounded-[3rem] overflow-hidden group hover:border-purple-500/50 transition-all duration-700 h-full">
                <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] -ml-[200px] -mt-[200px] pointer-events-none group-hover:bg-blue-600/10 transition-all duration-1000" />

                <CardContent className="p-10 md:p-12 relative z-10 flex flex-col items-center text-center space-y-8">
                  <div className="p-8 rounded-[2rem] bg-purple-600/10 border border-purple-500/20 group-hover:bg-purple-600/20 transition-all duration-500">
                    <Shield className="h-16 w-16 text-purple-400" />
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-4xl font-black uppercase tracking-tighter italic">
                      Admin<br />Portal
                    </h2>
                    <p className="text-gray-500 text-xs uppercase tracking-[0.3em] font-bold">
                      Full System Access & Control
                    </p>
                  </div>

                  <div className="space-y-2 text-left w-full">
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <Zap className="h-4 w-4 text-purple-400" />
                      <span>Manage all documents</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <Zap className="h-4 w-4 text-purple-400" />
                      <span>View system analytics</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <Zap className="h-4 w-4 text-purple-400" />
                      <span>Administrative controls</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleRoleSelect('admin')}
                    className="h-20 w-full rounded-[2rem] bg-purple-600 text-white hover:bg-white hover:text-black font-black text-xl uppercase tracking-[0.2em] group/btn transition-all duration-700 overflow-hidden relative shadow-2xl mt-6"
                  >
                    <div className="relative z-10 flex items-center justify-center">
                      <span>Enter Admin Portal</span>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mt-16 text-center text-gray-600 text-[10px] font-black uppercase tracking-[0.8em]"
          >
            Institutional Gateway • No Authentication Required • v2.4.0
          </motion.div>
        </div>
      </ScrollReveal>

      {/* Decorative Sidebar Visuals */}
      <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 w-[500px] h-[500px] border border-white/[0.02] rounded-full opacity-0 lg:opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-[-5%] -translate-y-1/2 w-[600px] h-[600px] border border-purple-500/[0.02] rounded-full opacity-0 lg:opacity-10 pointer-events-none" />
    </div>
  );
};
