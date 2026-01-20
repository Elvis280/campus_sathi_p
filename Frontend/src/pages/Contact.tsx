import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, Phone, MapPin, Send, Satellite, Globe, Cpu, Sparkles, Brain, Zap, Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-purple-500/30 overflow-hidden font-sans">
      <Navigation />

      {/* Deep Space Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 z-0">
          <div className="stars absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse" />
        </div>

        {/* Nebula Glows */}
        <div className="nebula-glow top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-900/10 animate-orb" />
        <div className="nebula-glow bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-900/10 animate-orb" style={{ animationDelay: '5s' }} />

        <div className="absolute inset-0 neural-grid opacity-[0.05]" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="pt-40 pb-20 md:pt-48 md:pb-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <ScrollReveal>
                <div className="relative">
                  <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-8 backdrop-blur-md">
                    <Satellite className="h-4 w-4 text-purple-400 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 italic">Neural Nexus Hub Ready</span>
                  </div>
                  <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.8] uppercase italic">
                    Active <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-purple-800">Uplink.</span>
                  </h1>
                  <p className="text-xl text-gray-400 max-w-xl font-medium leading-relaxed mb-12">
                    Establish a direct neural connection with the Campus Sathi Core. Our institutional intelligence matrix is ready for synchronization.
                  </p>

                  {/* Contact Nodes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                    {[
                      { icon: Mail, label: 'Neural Channel', value: 'core@campussathi.edu', color: 'text-purple-400' },
                      { icon: Phone, label: 'Voice Uplink', value: '+1 (234) 567-890', color: 'text-blue-400' },
                      { icon: MapPin, label: 'Coordinates', value: 'Innovation Hub, Sector 7', color: 'text-emerald-400' },
                      { icon: Globe, label: 'Global Matrix', value: 'www.campussathi.edu', color: 'text-orange-400' },
                    ].map((node, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ x: 5 }}
                        className="glass-morphism p-6 rounded-[2rem] border-white/5 flex items-center space-x-4 group"
                      >
                        <div className={`p-4 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:border-purple-500/30 transition-colors`}>
                          <node.icon className={`h-6 w-6 ${node.color}`} />
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">{node.label}</div>
                          <div className="text-sm font-bold text-white mt-1">{node.value}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Contact Form Section */}
              <ScrollReveal delay={0.2}>
                <div className="relative group">
                  <div className="absolute -inset-4 bg-purple-600/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="glass-morphism-strong rounded-[3rem] p-10 md:p-14 border-white/10 relative z-10">
                    <AnimatePresence mode="wait">
                      {!isSubmitted ? (
                        <motion.form
                          key="form"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, y: -20 }}
                          onSubmit={handleSubmit}
                          className="space-y-8"
                        >
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 ml-4">Subject Identifier</label>
                            <Input
                              required
                              placeholder="ENTER YOUR NAME"
                              value={formState.name}
                              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                              className="h-16 rounded-2xl bg-white/[0.03] border-white/10 focus:border-purple-500/50 text-white font-medium pl-6 transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 ml-4">Neural Vector (Email)</label>
                            <Input
                              required
                              type="email"
                              placeholder="YOUR@ADDRESS.EDU"
                              value={formState.email}
                              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                              className="h-16 rounded-2xl bg-white/[0.03] border-white/10 focus:border-purple-500/50 text-white font-medium pl-6 transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 ml-4">Transmission Payload</label>
                            <Textarea
                              required
                              placeholder="INPUT DATA STREAM..."
                              value={formState.message}
                              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                              className="min-h-[150px] rounded-2xl bg-white/[0.03] border-white/10 focus:border-purple-500/50 text-white font-medium pl-6 pt-6 transition-all"
                            />
                          </div>
                          <Button
                            disabled={isSubmitting}
                            className="w-full h-20 rounded-2xl bg-white text-black hover:bg-purple-600 hover:text-white font-black uppercase tracking-widest text-lg transition-all duration-500 shadow-2xl group flex items-center justify-center space-x-4"
                          >
                            {isSubmitting ? (
                              <div className="flex items-center space-x-3">
                                <div className="h-5 w-5 border-4 border-black border-t-transparent rounded-full animate-spin group-hover:border-white group-hover:border-t-transparent" />
                                <span>TRANSMITTING...</span>
                              </div>
                            ) : (
                              <>
                                <span>INITIALIZE BURST</span>
                                <Send className="h-6 w-6 group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform duration-500" />
                              </>
                            )}
                          </Button>
                        </motion.form>
                      ) : (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="py-20 text-center"
                        >
                          <div className="relative inline-block mb-10">
                            <div className="absolute -inset-10 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
                            <div className="relative p-10 rounded-full bg-purple-600/10 border border-purple-500/20">
                              <Zap className="h-20 w-20 text-purple-400 animate-bounce" />
                            </div>
                          </div>
                          <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-4">Transmission <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-purple-800">Successful.</span></h2>
                          <p className="text-gray-500 font-bold tracking-[0.3em] uppercase text-xs">Neural Packet Received in Sync</p>
                          <Button
                            onClick={() => setIsSubmitted(false)}
                            variant="ghost"
                            className="mt-12 text-gray-400 hover:text-white font-black uppercase tracking-widest text-[10px]"
                          >
                            RE-INITIALIZE UPLINK
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Social Nexus Section */}
        <section className="relative py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-20">
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-8 backdrop-blur-md">
                  <Cpu className="h-4 w-4 text-purple-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 italic">Social Matrix Deployment</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.8] uppercase italic">
                  Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-purple-800">Nexus.</span>
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
                  Synchronize with our external operational nodes across the digital stratosphere.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Github, label: 'Source Node', platform: 'GitHub', color: 'text-white' },
                { icon: Twitter, label: 'Broadcast Node', platform: 'Twitter', color: 'text-blue-400' },
                { icon: Linkedin, label: 'Professional Node', platform: 'LinkedIn', color: 'text-blue-600' },
                { icon: Instagram, label: 'Visual Node', platform: 'Instagram', color: 'text-pink-500' },
              ].map((social, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="glass-morphism p-10 rounded-[3rem] border-white/5 text-center group transition-all duration-500 hover:bg-white/[0.05]"
                  >
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-white/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      <social.icon className={`relative h-12 w-12 ${social.color}`} />
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">{social.label}</div>
                    <div className="text-lg font-black text-white">{social.platform}</div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};