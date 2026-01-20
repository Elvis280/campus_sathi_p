import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Brain, Zap, Satellite } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-purple-500/30 font-sans">
      {/* Deep Space Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 z-0">
          <div className="stars absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse" />
        </div>

        {/* Nebula Glows */}
        <div className="nebula-glow top-[10%] left-[20%] w-[60%] h-[60%] bg-purple-900/10 animate-orb" />
        <div className="nebula-glow bottom-[10%] right-[20%] w-[50%] h-[50%] bg-blue-900/10 animate-orb" style={{ animationDelay: '3s' }} />

        <div className="absolute inset-0 neural-grid opacity-[0.05]" />
      </div>

      <div className="relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.5, type: "spring" }}
          className="inline-block p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl mb-16 shadow-3xl"
        >
          <div className="relative">
            <div className="absolute -inset-8 bg-purple-600/20 rounded-full blur-2xl animate-pulse" />
            <Brain className="h-20 w-20 text-purple-400 relative z-10" />
            <div className="absolute top-0 right-0">
              <Zap className="h-6 w-6 text-orange-400 animate-bounce" />
            </div>
          </div>
        </motion.div>

        <div className="relative mb-12">
          <h1 className="text-[15rem] md:text-[25rem] font-black italic tracking-tighter mb-4 opacity-[0.02] leading-none select-none -mt-40">404</h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center translate-y-12">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-[0.8] italic">
              Lost in the<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-purple-800">Digital Void.</span>
            </h2>
            <p className="text-gray-500 font-black tracking-[0.5em] uppercase text-[10px] mb-16 max-w-md mx-auto">
              The requested vector could not be located in the neural matrix. Institutional data stream disrupted at {location.pathname}.
            </p>

            <Link to="/">
              <Button size="lg" className="h-24 px-16 rounded-[2.5rem] bg-white text-black hover:bg-purple-600 hover:text-white font-black uppercase tracking-widest text-sm group transition-all duration-700 shadow-3xl relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  <ArrowLeft className="mr-6 h-6 w-6 group-hover:-translate-x-3 transition-transform duration-500" />
                  Return to Nexus
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-12 flex items-center space-x-6 text-gray-700">
        <div className="p-3 bg-white/[0.02] rounded-2xl border border-white/5">
          <Satellite className="h-5 w-5 animate-pulse" />
        </div>
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] block mb-1">Matrix Error // ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
          <div className="flex items-center space-x-2">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500/50 animate-pulse" />
            <span className="text-[8px] font-bold text-gray-800 uppercase tracking-widest">Signal Terminal Disconnect</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
