import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Brain, Users, Target, Lightbulb, Award, Zap, ArrowRight, Sparkles, Shield, Database, Activity } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const About = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  const values = [
    { title: "Community Nexus", desc: "Prioritizing the collective intelligence of students and faculty in every data stream.", icon: Users, color: "text-blue-400", glow: "from-blue-500/20" },
    { title: "Infinite Innovation", desc: "Pushing the boundaries of neural processing to deliver stellar academic solutions.", icon: Lightbulb, color: "text-amber-400", glow: "from-amber-500/20" },
    { title: "Universal Targeting", desc: "Ensuring our platform is accessible across all sectors of the academic galaxy.", icon: Target, color: "text-emerald-400", glow: "from-emerald-500/20" },
    { title: "Stellar Excellence", desc: "Maintaining the highest orbits of quality and academic integrity.", icon: Award, color: "text-purple-400", glow: "from-purple-500/20" },
    { title: "Quantum Efficiency", desc: "Streamlining campus orbits to save time for what matters most.", icon: Zap, color: "text-rose-400", glow: "from-rose-500/20" },
    { title: "Neural Intelligence", desc: "Leveraging proprietary AI responsible to augment human capabilities.", icon: Brain, color: "text-cyan-400", glow: "from-cyan-500/20" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-purple-500/30 overflow-hidden font-sans">
      <Navigation />

      {/* Deep Space Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 z-0">
          <div className="stars absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse" />
          <div className="stars2 absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse" style={{ animationDelay: '2s', transform: 'scale(1.5)' }} />
        </div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[150px] animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>

      <div className="relative z-10">
        {/* Cinematic Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
          <div className="max-w-7xl mx-auto text-center">
            <ScrollReveal>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-8 backdrop-blur-md"
              >
                <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400">Our Identity</span>
              </motion.div>

              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.8] uppercase">
                CRAFTING<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-purple-800 italic">INTELLIGENCE</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
                Beyond software, we are building the neural foundation for the modern academic ecosystem.
              </p>
            </ScrollReveal>
          </div>

          <motion.div
            style={{ y: y1 }}
            className="absolute -bottom-20 left-0 right-0 text-[20vw] font-black text-white/[0.01] select-none pointer-events-none whitespace-nowrap z-0"
          >
            CAMPUS SATHI • CAMPUS SATHI • CAMPUS SATHI
          </motion.div>
        </section>

        {/* Narrative Section */}
        <section className="py-40 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-32 items-center">
              <ScrollReveal direction="left">
                <div className="space-y-8">
                  <div className="inline-block">
                    <span className="text-purple-500 font-black uppercase tracking-[0.3em] text-[10px] px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 italic">The Genesis</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 leading-tight uppercase">
                    Bridging the<br />
                    <span className="text-gray-500">Neural Divide.</span>
                  </h2>
                  <div className="space-y-6 text-xl text-gray-400 leading-relaxed font-medium">
                    <p>
                      Campus_Sathi emerged from a simple question: Why is academic information still siloed in static portals?
                    </p>
                    <p>
                      We envisioned a universe where every document speaks, every circular is contextually aware, and every student has a 24/7 intellectual companion.
                    </p>
                  </div>
                  <Link to="/login">
                    <Button size="lg" className="h-16 px-10 rounded-2xl bg-purple-600 text-white hover:bg-purple-700 transition-all group font-bold">
                      Explore Neural Grid
                      <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <div className="relative group">
                  <div className="absolute -inset-10 bg-purple-600/20 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-3xl p-4 transition-all duration-700 group-hover:border-purple-500/30">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-transparent" />
                    <img
                      src="/neural_gateway.png"
                      alt="Neural Architecture"
                      className="w-full h-full object-cover rounded-[2.5rem] animate-float"
                    />

                    <div className="absolute bottom-12 left-12 right-12 p-8 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <h3 className="text-2xl font-black mb-2 flex items-center gap-3">
                        <Brain className="h-6 w-6 text-purple-400" />
                        Neural Core
                      </h3>
                      <p className="text-gray-400 text-sm font-medium">Built on proprietary LLM integration and semantic document processing.</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-40 px-6 relative">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
              <ScrollReveal direction="up">
                <div className="space-y-6">
                  <span className="text-purple-500 font-black uppercase tracking-[0.3em] text-[10px] px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 italic">Our DNA</span>
                  <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">Core<br />Principles.</h2>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.2}>
                <p className="text-xl text-gray-500 max-w-md font-medium leading-relaxed">
                  The foundational pillars guiding our journey towards a smarter academic galaxy.
                </p>
              </ScrollReveal>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((v, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="group relative h-full"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${v.glow} to-transparent opacity-0 group-hover:opacity-100 rounded-[2.5rem] blur-xl transition-opacity duration-500`} />

                    <div className="relative h-full p-12 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl transition-all duration-500 group-hover:border-white/20">
                      <div className={`p-4 rounded-2xl bg-white/[0.03] inline-block mb-8 transition-transform duration-500 group-hover:scale-110`}>
                        <v.icon className={`h-10 w-10 ${v.color}`} />
                      </div>
                      <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-purple-400 transition-colors">{v.title}</h3>
                      <p className="text-gray-400 font-medium leading-relaxed">{v.desc}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section - Redesigned for Maximum Impact */}
        <section className="py-60 px-6 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-spin-slow" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full animate-reverse-spin-slow" />

            {/* Neural Lattice Grid Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="glass-morphism rounded-[4rem] p-12 md:p-24 border border-white/10 relative overflow-hidden group">
              {/* Decorative Corner Accents */}
              <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-purple-500/30 rounded-tl-[4rem]" />
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-purple-500/30 rounded-br-[4rem]" />

              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="text-left space-y-8">
                  <ScrollReveal direction="left">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
                      <div className="h-2 w-2 rounded-full bg-purple-500 animate-ping" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">System Ready</span>
                    </div>

                    <h2 className="text-6xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
                      READY TO<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-purple-800 italic">EVOLVE.</span>
                    </h2>

                    <p className="text-lg text-gray-400 font-medium leading-relaxed max-w-md">
                      Join the mission to transform documentation into conversation. Initialize your neural gateway today and redefine your academic experience.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 pt-8">
                      <Link to="/login">
                        <Button size="lg" className="h-16 px-10 rounded-2xl bg-white text-black hover:bg-purple-600 hover:text-white transition-all duration-500 font-black tracking-tighter group">
                          INITIALIZE PORTAL
                          <Zap className="ml-2 h-4 w-4 fill-current transition-transform group-hover:scale-125" />
                        </Button>
                      </Link>
                      <Link to="/contact">
                        <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-white/10 hover:bg-white/5 backdrop-blur-md font-bold tracking-tighter">
                          CONTACT CORE
                        </Button>
                      </Link>
                    </div>
                  </ScrollReveal>
                </div>

                <div className="relative">
                  <ScrollReveal direction="right">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Active Neurons", val: "2.4M+", icon: Brain, color: "text-purple-400" },
                        { label: "Data Spheres", val: "142", icon: Database, color: "text-blue-400" },
                        { label: "Sync Rate", val: "99.9%", icon: Activity, color: "text-emerald-400" },
                        { label: "Security Level", val: "MAX", icon: Shield, color: "text-rose-400" }
                      ].map((stat, idx) => (
                        <div key={idx} className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-sm group/stat hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300">
                          <stat.icon className={`h-6 w-6 ${stat.color} mb-3 transition-transform group-hover/stat:scale-110`} />
                          <div className="text-2xl font-black text-white mb-1 tracking-tight">{stat.val}</div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Decorative Background for Stats */}
                    <div className="absolute -inset-4 bg-purple-500/5 blur-3xl rounded-full -z-10 animate-pulse" />
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};