import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Brain, Mail, ArrowRight, Github, Twitter, Linkedin, Instagram, ChevronRight, Zap, Sparkles, Satellite } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative bg-[#050508] text-white border-t border-white/5 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 neural-grid opacity-[0.03]"></div>
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-purple-600/5 blur-[120px]"></div>

      <div className="relative max-w-7xl mx-auto px-6 z-10 font-sans">

        {/* Top CTA Section - Highly Immersive */}
        <div className="py-16 border-b border-white/5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-none mb-4">
                Initialize <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-purple-800">Optimization.</span>
              </h2>
              <p className="text-gray-500 font-bold tracking-widest text-[10px] uppercase">Ready to synchronize your institutional data matrix?</p>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/login">
                <Button size="lg" className="h-16 px-12 rounded-2xl bg-white text-black hover:bg-purple-600 hover:text-white font-black text-xs uppercase tracking-widest transition-all duration-500 shadow-2xl group relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    Commence Uplink <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-2 transition-transform duration-500" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-24">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-16">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-8">
              <Link to="/" className="flex items-center space-x-4 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-600/40 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white/[0.03] border border-white/10 p-2.5 rounded-xl group-hover:bg-purple-600/10 transition-colors duration-300">
                    <Brain className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
                <span className="text-2xl font-black tracking-tighter text-white uppercase italic">Campus<span className="text-purple-400">Sathi</span></span>
              </Link>
              <p className="text-gray-500 text-xs font-medium leading-relaxed max-w-[240px]">
                Architecting the next generation of academic intelligence. Redefining boundaries with neural-inspired operational protocols.
              </p>
              <div className="flex gap-4 pt-4">
                {[
                  { icon: Twitter, href: "#", color: "hover:text-blue-400" },
                  { icon: Linkedin, href: "#", color: "hover:text-blue-600" },
                  { icon: Github, href: "#", color: "hover:text-white" },
                  { icon: Instagram, href: "#", color: "hover:text-pink-500" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className={`p-3 rounded-xl bg-white/[0.03] border border-white/5 text-gray-500 ${social.color} hover:border-white/20 transition-all duration-300 hover:-translate-y-1`}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white italic ml-1 flex items-center space-x-3">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                <span>Operational_Map</span>
              </h3>
              <ul className="space-y-4">
                {['Home', 'About Us', 'Experiences', 'Inventory'].map((item) => {
                  const path = item === 'Home' ? '/' : item === 'About Us' ? '/about' : item === 'Experiences' ? '/events' : '/lost-and-found';
                  return (
                    <li key={item}>
                      <Link
                        to={path}
                        className="group flex items-center text-gray-500 hover:text-white transition-all duration-300 text-xs font-bold uppercase tracking-widest"
                      >
                        <span className="h-0.5 w-0 bg-purple-500 mr-0 group-hover:w-4 group-hover:mr-3 transition-all duration-300"></span>
                        {item}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Infrastructure */}
            <div className="space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white italic ml-1 flex items-center space-x-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                <span>Neural_Grid</span>
              </h3>
              <ul className="space-y-4">
                {['Documentation', 'API_Override', 'Shield_Protocol', 'Privacy_Matrix'].map((item) => (
                  <li key={item}>
                    <a href="#" className="group flex items-center text-gray-500 hover:text-white transition-all duration-300 text-xs font-bold uppercase tracking-widest">
                      <span className="h-0.5 w-0 bg-blue-500 mr-0 group-hover:w-4 group-hover:mr-3 transition-all duration-300"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Matrix Uplink (Newsletter) */}
            <div className="space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white italic ml-1 flex items-center space-x-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Sync_Broadcast</span>
              </h3>
              <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 space-y-6">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                    <Input
                      placeholder="AGENT_EMAIL"
                      className="pl-12 bg-black/20 border-white/10 text-[10px] h-12 rounded-xl focus-visible:ring-purple-500/30 uppercase tracking-widest font-black"
                    />
                  </div>
                  <Button className="w-full h-12 text-[10px] font-black uppercase tracking-widest bg-white/[0.05] hover:bg-white text-white hover:text-black border border-white/5 transition-all duration-500">
                    JOIN_MATRIX
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em] flex items-center space-x-4">
              <span>© {new Date().getFullYear()} Campus_Sathi Control Matrix</span>
              <span className="h-1 w-1 bg-gray-800 rounded-full"></span>
              <span className="italic">Institutional Sovereignty Guaranteed</span>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center space-x-3 text-[10px] uppercase tracking-widest text-emerald-500/50 font-black italic">
                <Satellite className="h-4 w-4 animate-pulse" />
                <span>Orbiting Node: STABLE</span>
              </div>
              <div className="h-4 w-[1px] bg-white/10"></div>
              <div className="text-[10px] text-gray-700 uppercase tracking-[0.5em] font-black">
                CORE_v2.4.0
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
