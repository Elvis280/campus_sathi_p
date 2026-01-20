import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Shield, User, Zap, Globe, FileText, Users, BookOpen, ArrowRight, Brain, Clock, Lock, Sparkles, Cpu, Fingerprint } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HeroCanvas } from '@/components/HeroCanvas';
import { ScrollReveal } from '@/components/ScrollReveal';
import { motion, useScroll, useTransform } from 'framer-motion';
import aiAnalysisImage from '@/assets/ai-analysis.jpg';
import { GlobalSpotlight, ParticleCard } from '@/components/MagicBento';

export const Home = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navigation />

      {/* Immersive Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-white/5 py-20 px-6">
        <HeroCanvas />
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-left"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase text-primary">Your Intelligent Campus Companion</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-8xl font-black mb-8 tracking-tighter gradient-text-premium leading-[0.9] break-words">
              Campus<span className="text-primary italic">_</span>Sathi
            </h1>

            <p className="text-lg md:text-xl text-foreground/60 max-w-xl mb-12 font-light leading-relaxed tracking-wide">
              The only AI-powered platform designed to navigate your entire college journey. From <span className="text-primary font-medium">scholarship alerts</span> to <span className="text-primary font-medium">exam schedules</span>, we've got you covered.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/login">
                <Button size="lg" className="h-16 px-10 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all group overflow-hidden relative font-bold text-lg border-0 shadow-lg shadow-primary/20">
                  <span className="relative z-10 flex items-center">
                    Talk to Sathi
                    <MessageSquare className="ml-3 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-white/10 hover:bg-white/5 backdrop-blur-sm transition-all text-lg font-medium">
                  How it Works
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* New Chatbot Visual Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block mt-4 mb-24"
          >
            <div className="relative z-20 group">
              <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity animate-pulse" />
              <img
                src="/chatbot_hero.png"
                alt="Campus Sathi Chatbot"
                className="w-full h-auto max-w-lg mx-auto relative z-10 drop-shadow-[0_0_50px_rgba(var(--primary-rgb),0.3)] animate-float"
              />

              {/* Floating Status Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 -right-10 z-30 bg-background/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-3"
              >
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-foreground/80">Sathi Online</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 -left-10 z-30 bg-background/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl space-y-2 max-w-[200px]"
              >
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <Sparkles className="h-4 w-4" />
                  <span>Proactive Alert</span>
                </div>
                <p className="text-[10px] text-foreground/60 font-medium leading-tight">
                  New scholarship opportunity detected for Computer Science students!
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          style={{ y: y1 }}
          className="absolute bottom-20 left-10 md:left-20 text-[10vw] font-bold text-foreground/[0.01] select-none pointer-events-none whitespace-nowrap z-0"
        >
          ASSIST • GUIDE • EMPOWER
        </motion.div>
      </section>

      {/* Feature Narrative Section */}
      <section className="py-40 relative overflow-hidden bg-foreground/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <ScrollReveal direction="left">
              <div className="relative group rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 bg-background/50 p-4">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>

                <div className="relative z-20 overflow-hidden rounded-[2.5rem]">
                  <img
                    src="/chatbot_scholarship.png"
                    alt="Chatbot resolving campus queries"
                    className="w-full h-[600px] object-cover transform scale-110 group-hover:scale-100 transition-transform duration-1000"
                  />
                </div>
              </div>
            </ScrollReveal>

            <div className="space-y-12">
              <ScrollReveal direction="right">
                <div className="space-y-4">
                  <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] px-4 py-1 rounded-full bg-primary/10 border border-primary/20">The Sathi Advantage</span>
                  <h2 className="text-5xl md:text-6xl font-bold leading-tight tracking-tighter">
                    Never Miss a <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500 italic">Deadline Again.</span>
                  </h2>
                  <p className="text-foreground/50 text-xl font-light">
                    Sathi isn't just a chatbot; it's a personalized campus intelligence layer that keeps you ahead of every academic curve.
                  </p>
                </div>
              </ScrollReveal>

              <div className="space-y-4">
                {[
                  { icon: FileText, title: "Scholarship & Grants", content: "Instant notifications and guided application help for all available campus funding." },
                  { icon: Clock, title: "Exam & Class Schedules", content: "Real-time updates on exam timings, room changes, and personalized study reminders." },
                  { icon: BookOpen, title: "Internal Circulars", content: "Decipher complex college announcements and circulars with conversational AI." }
                ].map((feature, i) => (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="flex items-start space-x-6 p-8 rounded-3xl transition-all border border-white/5 hover:border-white/10 hover:bg-white/[0.02] group"
                    >
                      <div className="flex-shrink-0 bg-primary/10 p-5 rounded-2xl text-primary transition-colors group-hover:bg-primary/20">
                        <feature.icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                        <p className="text-foreground/50 leading-relaxed text-sm font-medium">{feature.content}</p>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "Crazy" Interaction Grid */}
      <section className="py-32 relative bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-24">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 italic tracking-tighter">Multidimensional Core</h2>
              <p className="max-w-xl mx-auto text-foreground/40 tracking-widest uppercase text-[10px] font-black">Everything you need, amplified by intelligence</p>
            </div>
          </ScrollReveal>

          <GlobalSpotlight gridRef={gridRef} />

          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 bento-section">
            {[
              {
                title: "Autonomous Neural Grid",
                subtitle: "Self-healing infrastructure that predicts load spikes before they happen.",
                icon: Cpu,
                stat: "99.999% Uptime",
                colSpan: "lg:col-span-2",
                gradient: "from-primary/20 via-primary/5 to-transparent"
              },
              {
                title: "Quantum-Resistant Security",
                subtitle: "Encrypted at rest, in transit, and during execution.",
                icon: Shield,
                stat: "SOC2 Compliant"
              },
              {
                title: "Planetary Scale",
                subtitle: "Supports millions of concurrent users globally without latency.",
                icon: Globe,
                stat: "Infinite Scaling"
              },
              {
                title: "Universal API Nexus",
                subtitle: "Restful endpoints with <100ms latency for any LMS integration.",
                icon: Zap,
                stat: "<100ms Latency"
              },
              {
                title: "Sovereign Control",
                subtitle: "Granular administrative privileges down to the data field level.",
                icon: Fingerprint,
                stat: "RBAC Level 4"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${item.colSpan || ""}`}
              >
                <ParticleCard
                  className="magic-bento-card h-full p-10 rounded-[2.5rem] border border-foreground/20 bg-background overflow-hidden group hover:shadow-2xl transition-all duration-500"
                  glowColor="132, 0, 255"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${item.gradient || "from-foreground/5 to-transparent"}`}></div>

                  <div className="relative z-10 flex flex-col h-full items-start text-left pointer-events-none">
                    <div className="mb-8 p-4 rounded-2xl bg-foreground/5 border border-foreground/5 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-500">
                      <item.icon className="h-8 w-8 text-foreground/70 group-hover:text-primary transition-colors duration-500" />
                    </div>

                    <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                    <p className="text-foreground/60 text-sm leading-relaxed mb-8 max-w-sm font-medium">{item.subtitle}</p>

                    <div className="mt-auto opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-primary/80">
                      <span>{item.stat}</span>
                      <div className="h-px flex-1 bg-primary/20"></div>
                    </div>
                  </div>
                </ParticleCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Massive CTA Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="relative z-10 text-center px-6">
          <ScrollReveal>
            <h2 className="text-[12vw] font-black leading-none tracking-tighter mb-12 uppercase italic">Elevate.</h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-2xl md:text-3xl max-w-3xl mx-auto mb-16 font-serif italic text-primary-foreground/60">
              The future isn't just coming—it's being computed.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex justify-center">
              <Link to="/login">
                <Button size="lg" className="h-20 px-16 rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-2xl">
                  START NOW
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <motion.div
          style={{ y: y2 }}
          className="absolute -bottom-20 right-0 text-[15vw] font-black text-primary-foreground/[0.03] select-none pointer-events-none whitespace-nowrap uppercase italic"
        >
          ACADEMIC REVOLUTION
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};