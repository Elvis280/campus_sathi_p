import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, Users, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const events = [
    {
        id: 1,
        title: "TechNova 2024",
        category: "Hackathon",
        date: "March 15-17, 2024",
        time: "48 Hours",
        location: "Innovation Hub",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        description: "The annual flagship hackathon. Build the future with AI, Blockchain, and IoT. Over $10k in prizes.",
        attendees: "500+"
    },
    {
        id: 2,
        title: "Cultural Mosaic",
        category: "Cultural",
        date: "April 05, 2024",
        time: "10:00 AM - 10:00 PM",
        location: "Main Auditorium",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
        description: "A celebration of diversity through music, dance, and art. Experience performances from around the globe.",
        attendees: "1200+"
    },
    {
        id: 3,
        title: "Future of AI Workshop",
        category: "Workshops",
        date: "March 22, 2024",
        time: "2:00 PM - 5:00 PM",
        location: "Lecture Hall B",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
        description: "Deep dive into Large Language Models and Generative AI with industry experts from Google and Microsoft.",
        attendees: "200+"
    },
    {
        id: 4,
        title: "RoboWars Championship",
        category: "Tech",
        date: "April 12, 2024",
        time: "9:00 AM - 6:00 PM",
        location: "Sports Complex",
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800",
        description: "Witness the ultimate battle of bots. Teams compete for glory in this high-octane engineering showdown.",
        attendees: "800+"
    },
    {
        id: 5,
        title: "Startup Summit",
        category: "Business",
        date: "March 28, 2024",
        time: "10:00 AM - 4:00 PM",
        location: "Conference Center",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800",
        description: "Pitch your ideas to venture capitalists and angel investors. Network with successful alumni entrepreneurs.",
        attendees: "300+"
    },
    {
        id: 6,
        title: "CodeSprint",
        category: "Hackathon",
        date: "April 20, 2024",
        time: "12 Hours",
        location: "Computer Labs",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        description: "Competitive programming contest. Solve algorithmic challenges and win exciting gadgets.",
        attendees: "150+"
    }
];

const categories = ["All", "Hackathon", "Cultural", "Tech", "Workshops", "Business"];

export const Events = () => {
    const [activeTab, setActiveTab] = useState("All");

    const filteredEvents = activeTab === "All"
        ? events
        : events.filter(e => e.category === activeTab);

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-purple-500/30 overflow-hidden font-sans">
            <Navigation />

            {/* Deep Space Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 z-0">
                    <div className="stars absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse" />
                </div>

                {/* Nebula Glows */}
                <div className="nebula-glow top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 animate-orb" />
                <div className="nebula-glow bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 animate-orb" style={{ animationDelay: '5s' }} />
                <div className="nebula-glow top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-900/10 animate-pulse" />

                {/* Neural Grid Grid Pattern */}
                <div className="absolute inset-0 neural-grid opacity-[0.05]" />
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <div className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[85vh] flex items-center px-6">
                    <div className="max-w-7xl mx-auto w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            {/* Left Column - Text Content */}
                            <div className="relative">
                                <ScrollReveal>
                                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-8 backdrop-blur-md">
                                        <Calendar className="h-4 w-4 text-purple-400 animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 italic">Temporal Grid Active</span>
                                    </div>
                                    <h1 className="text-6xl md:text-8xl lg:text-7xl xl:text-8xl font-black tracking-tighter mb-8 leading-[0.8] uppercase">
                                        Upcoming <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-purple-800 italic">Experiences.</span>
                                    </h1>
                                    <p className="text-xl text-gray-400 max-w-2xl font-medium leading-relaxed mb-12">
                                        Discover the pulse of the campus. From high-energy hackathons to immersive cultural festivals, never miss a moment in the neural network.
                                    </p>

                                    {/* Statistics Grid */}
                                    <div className="grid grid-cols-2 gap-6 mb-8 max-w-lg">
                                        {[
                                            { label: "Active Events", value: "12+", icon: Calendar, color: "text-purple-400" },
                                            { label: "Nodes Sync", value: "99%", icon: Sparkles, color: "text-blue-400" }
                                        ].map((stat, i) => (
                                            <motion.div
                                                key={i}
                                                whileHover={{ y: -5, scale: 1.02 }}
                                                className="glass-morphism p-6 rounded-[2rem] border-white/5 group"
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <stat.icon className={`h-8 w-8 ${stat.color} group-hover:scale-110 transition-transform`} />
                                                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                                </div>
                                                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">{stat.label}</div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </ScrollReveal>
                            </div>

                            {/* Right Column - Featured Event Card */}
                            <ScrollReveal delay={0.2}>
                                <motion.div
                                    whileHover={{ scale: 1.02, y: -10 }}
                                    className="relative group"
                                >
                                    {/* Decorative Outer Ring */}
                                    <div className="absolute -inset-4 bg-purple-600/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                    <Card className="glass-morphism-strong overflow-hidden rounded-[3rem] border-white/10 relative z-10 shadow-3xl">
                                        <div className="relative h-80 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent z-10" />
                                            <img
                                                src={events[0].image}
                                                alt={events[0].title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                                            />
                                            <div className="absolute top-8 left-8 z-20">
                                                <Badge className="bg-purple-600 text-white border-0 backdrop-blur-md px-6 py-2 font-black uppercase tracking-[0.2em] text-[10px] italic">
                                                    Featured Sequence
                                                </Badge>
                                            </div>
                                            <div className="absolute bottom-8 left-8 right-8 z-20">
                                                <div className="flex items-center text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                                                    <Clock className="h-4 w-4 mr-3" />
                                                    {events[0].time}
                                                </div>
                                                <h3 className="text-4xl font-black text-white leading-[0.8] tracking-tighter mb-6 uppercase italic">
                                                    {events[0].title}
                                                </h3>
                                                <div className="flex items-center gap-6 text-gray-400 text-xs font-bold uppercase tracking-widest">
                                                    <div className="flex items-center">
                                                        <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                                                        {events[0].date}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <MapPin className="h-4 w-4 mr-2 text-purple-500" />
                                                        {events[0].location}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <CardContent className="p-10">
                                            <p className="text-gray-400 text-lg font-medium leading-relaxed mb-10">
                                                {events[0].description}
                                            </p>
                                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5">
                                                <div className="flex items-center space-x-4">
                                                    <div className="p-3 bg-purple-500/10 rounded-xl">
                                                        <Users className="h-6 w-6 text-purple-400" />
                                                    </div>
                                                    <div>
                                                        <div className="text-white font-black text-xl leading-none">{events[0].attendees}</div>
                                                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mt-1">Expected Nodes</div>
                                                    </div>
                                                </div>
                                                <Button className="h-16 px-12 rounded-2xl bg-white text-black hover:bg-purple-600 hover:text-white font-black uppercase tracking-widest text-sm transition-all duration-500 shadow-2xl group/btn">
                                                    Initialize Portal
                                                    <ArrowRight className="h-5 w-5 ml-4 group-hover:translate-x-2 transition-transform duration-500" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>

                {/* Events Grid Section */}
                <section className="relative py-32 px-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Section Header */}
                        <ScrollReveal>
                            <div className="text-center mb-24">
                                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-8 backdrop-blur-md">
                                    <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 italic">Neural Repository Browser</span>
                                </div>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.8] uppercase italic">
                                    Filter <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-purple-800">Signals.</span>
                                </h2>
                                <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
                                    Select your operational spectrum to view relevant temporal occurrences.
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Enhanced Category Tabs */}
                        <ScrollReveal delay={0.2}>
                            <Tabs defaultValue="All" className="w-full mb-24" onValueChange={setActiveTab}>
                                <div className="flex justify-center scrollbar-hide overflow-x-auto pb-4">
                                    <TabsList className="bg-white/[0.03] border border-white/5 rounded-3xl h-20 p-2 inline-flex gap-2 backdrop-blur-xl shadow-2xl">
                                        {categories.map((cat) => (
                                            <TabsTrigger
                                                key={cat}
                                                value={cat}
                                                className="rounded-2xl px-8 h-full font-black text-[10px] uppercase tracking-[0.2em] data-[state=active]:bg-white data-[state=active]:text-black transition-all duration-700"
                                            >
                                                {cat}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>
                                </div>
                            </Tabs>
                        </ScrollReveal>

                        {/* Enhanced Events Grid with Stellar Aesthetic Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {filteredEvents.map((event, index) => (
                                <ScrollReveal key={event.id} delay={index * 0.1}>
                                    <motion.div
                                        whileHover={{ y: -15 }}
                                        className="h-full group"
                                    >
                                        <Card className="stellar-card h-full flex flex-col hover:shadow-[0_0_50px_rgba(168,85,247,0.1)]">
                                            {/* Image Section */}
                                            <div className="relative h-64 overflow-hidden rounded-[2.5rem] m-2">
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#12121e] via-transparent to-transparent z-10 opacity-60" />
                                                <img
                                                    src={event.image}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                                                />
                                                <div className="absolute top-5 right-5 z-20">
                                                    <div className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
                                                        <span className="text-white font-black uppercase tracking-[0.2em] text-[8px] italic">
                                                            {event.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content Section */}
                                            <CardContent className="p-8 flex-1 flex flex-col justify-between">
                                                <div className="space-y-6">
                                                    <div>
                                                        <div className="flex items-center gap-3 text-purple-400 font-black uppercase tracking-[0.2em] text-[9px] mb-3">
                                                            <Calendar className="h-3 w-3" />
                                                            {event.date}
                                                        </div>
                                                        <h3 className="text-2xl font-black text-white leading-none uppercase italic mb-4 group-hover:text-purple-400 transition-colors">
                                                            {event.title}
                                                        </h3>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <div className="flex items-center text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                                            <MapPin className="h-4 w-4 mr-3 text-purple-500" />
                                                            {event.location}
                                                        </div>
                                                        <div className="flex items-center text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                                            <Clock className="h-4 w-4 mr-3 text-purple-500" />
                                                            {event.time}
                                                        </div>
                                                    </div>

                                                    <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-2">
                                                        {event.description}
                                                    </p>
                                                </div>

                                                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                                    <div className="flex items-center text-gray-600 font-black uppercase tracking-widest text-[9px]">
                                                        <Users className="h-4 w-4 mr-2" />
                                                        {event.attendees} Syncing
                                                    </div>
                                                    <Button variant="ghost" className="p-0 h-auto text-white hover:text-purple-400 hover:bg-transparent font-black uppercase tracking-widest text-[10px] group/btn">
                                                        Portal ID <ArrowRight className="ml-3 h-4 w-4 group-hover/btn:translate-x-2 transition-transform" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </ScrollReveal>
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredEvents.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-40 glass-morphism rounded-[3rem] border-white/5 mt-12"
                            >
                                <Trophy className="h-16 w-16 text-purple-500/30 mx-auto mb-6" />
                                <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">No Signals Detected</h3>
                                <p className="text-gray-500 font-bold tracking-widest text-[10px] uppercase">Operational Spectrum currently vacant</p>
                                <Button
                                    onClick={() => setActiveTab("All")}
                                    className="mt-8 bg-white text-black hover:bg-purple-600 hover:text-white rounded-full px-8 font-black uppercase tracking-widest text-xs h-12"
                                >
                                    Reset Spectrum
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
};
