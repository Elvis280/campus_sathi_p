import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, MapPin, Calendar, Plus, Package, Clock, Phone, Mail, Sparkles, Brain, Zap, Shield, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LostItem {
    id: number;
    title: string;
    category: string;
    location: string;
    date: string;
    status: 'lost' | 'found';
    description: string;
    image: string;
}

const initialItems: LostItem[] = [
    {
        id: 1,
        title: "Silver MacBook Pro 14\"",
        category: "Electronics",
        location: "Library Second Floor",
        date: "March 10, 2024",
        status: 'lost',
        description: "MacBook Pro with a distinctive sticker of a rocket ship on the back. Was last seen near the study carrels.",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        title: "Black Leather Wallet",
        category: "Personal Items",
        location: "Student Center Cafeteria",
        date: "March 12, 2024",
        status: 'found',
        description: "Found a black leather wallet near the coffee station. Contains some cash but no ID found inside.",
        image: "https://images.unsplash.com/photo-1627123430985-63dfd6a6bbad?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        title: "AirPods Pro Gen 2",
        category: "Electronics",
        location: "Main Gym",
        date: "March 11, 2024",
        status: 'lost',
        description: "AirPods Pro in a clear protective case. Possibly dropped near the treadmills.",
        image: "https://images.unsplash.com/photo-1588423770574-91021160df63?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 4,
        title: "Blue Denim Jacket",
        category: "Clothing",
        location: "Lecture Hall A",
        date: "March 09, 2024",
        status: 'found',
        description: "Levi's denim jacket found on the back of seat 42 in Lecture Hall A.",
        image: "https://images.unsplash.com/photo-1576842267721-457e823b8c79?auto=format&fit=crop&q=80&w=800"
    }
];

export const LostAndFound = () => {
    const [items, setItems] = useState<LostItem[]>(initialItems);
    const [searchQuery, setSearchQuery] = useState("");
    const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<LostItem | null>(null);
    const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
    const [isSubmittingContact, setIsSubmittingContact] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [newItem, setNewItem] = useState({
        title: '',
        category: 'Electronics',
        location: '',
        date: '',
        status: 'lost' as 'lost' | 'found',
        description: '',
        image: 'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&q=80&w=800'
    });

    const handleReportItem = (e: React.FormEvent) => {
        e.preventDefault();
        const item: LostItem = {
            id: items.length + 1,
            ...newItem as any
        };
        setItems([item, ...items]);
        setIsReportDialogOpen(false);
        setNewItem({
            title: '',
            category: 'Electronics',
            location: '',
            date: '',
            status: 'lost',
            description: '',
            image: 'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&q=80&w=800'
        });
    };

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmittingContact(true);
        await new Promise(r => setTimeout(r, 1500));
        setIsSubmittingContact(false);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setIsContactDialogOpen(false);
            setContactForm({ name: '', email: '', message: '' });
        }, 2000);
    };

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

                <div className="absolute inset-0 neural-grid opacity-[0.05]" />
            </div>

            <div className="relative z-10 px-6">
                {/* Space Hero Section */}
                <div className="max-w-7xl mx-auto pt-40 pb-20 md:pt-48 md:pb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <ScrollReveal>
                            <div className="relative">
                                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-8 backdrop-blur-md">
                                    <Package className="h-4 w-4 text-purple-400 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 italic">Central Recovery Grid Active</span>
                                </div>
                                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.8] uppercase italic">
                                    Lost & <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-purple-800">Found.</span>
                                </h1>
                                <p className="text-xl text-gray-400 max-w-xl font-medium leading-relaxed mb-12">
                                    Track and recover items via the institutional neural network. Real-time synchronization of misplaced operational hardware.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-6">
                                    <div className="relative flex-1 group">
                                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                                        <Input
                                            placeholder="SCAN REPOSITORY..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="h-16 pl-16 rounded-2xl bg-white/[0.02] border-white/10 focus:border-purple-500/50 text-white font-medium transition-all"
                                        />
                                    </div>
                                    <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button className="h-16 px-10 rounded-2xl bg-white text-black hover:bg-purple-600 hover:text-white font-black uppercase tracking-widest text-sm transition-all duration-500 shadow-2xl">
                                                <Plus className="mr-3 h-5 w-5" />
                                                Log Inventory
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[600px] bg-[#0a0a0f]/95 border-white/10 backdrop-blur-3xl text-white rounded-[2.5rem] p-10">
                                            <DialogHeader className="mb-8">
                                                <DialogTitle className="text-4xl font-black italic tracking-tighter uppercase mb-2">Initialize <span className="text-purple-400">Log.</span></DialogTitle>
                                                <DialogDescription className="text-gray-500 font-bold tracking-widest text-[10px] uppercase">Submit data to the central recovery matrix</DialogDescription>
                                            </DialogHeader>
                                            <form onSubmit={handleReportItem} className="space-y-8">
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <Label className="uppercase text-[10px] font-black tracking-widest text-gray-500 ml-2">Hardware Entity</Label>
                                                        <Input
                                                            required
                                                            placeholder="e.g. MacBook Pro"
                                                            className="bg-white/[0.03] border-white/5 h-14 rounded-xl"
                                                            value={newItem.title}
                                                            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="uppercase text-[10px] font-black tracking-widest text-gray-500 ml-2">Status Code</Label>
                                                        <select
                                                            className="w-full h-14 bg-white/[0.03] border border-white/5 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none"
                                                            value={newItem.status}
                                                            onChange={(e) => setNewItem({ ...newItem, status: e.target.value as any })}
                                                        >
                                                            <option value="lost">LOST_VECTOR</option>
                                                            <option value="found">FOUND_VECTOR</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="uppercase text-[10px] font-black tracking-widest text-gray-500 ml-2">Last Known Coordinates</Label>
                                                    <Input
                                                        required
                                                        placeholder="e.g. Library 3rd Floor"
                                                        className="bg-white/[0.03] border-white/5 h-14 rounded-xl"
                                                        value={newItem.location}
                                                        onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="uppercase text-[10px] font-black tracking-widest text-gray-500 ml-2">Item Description / Neural Metadata</Label>
                                                    <Textarea
                                                        required
                                                        placeholder="Provide distinctive features for identity verification..."
                                                        className="bg-white/[0.03] border-white/5 min-h-[120px] rounded-xl"
                                                        value={newItem.description}
                                                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                                    />
                                                </div>
                                                <Button type="submit" className="w-full h-16 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black uppercase tracking-widest transition-all">
                                                    Transmit Signal
                                                </Button>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* System Metrics Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { label: "Lost Vectors", value: "24", icon: Package, color: "text-purple-400" },
                                { label: "Recovered Nodes", value: "142", icon: Shield, color: "text-blue-400" },
                                { label: "Sync Latency", value: "0.4ms", icon: Activity, color: "text-emerald-400" },
                                { label: "Security Tier", value: "MAX", icon: Zap, color: "text-orange-400" }
                            ].map((stat, i) => (
                                <ScrollReveal key={i} delay={i * 0.1}>
                                    <motion.div
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="glass-morphism p-8 rounded-[2.5rem] border-white/5 group relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                                            <stat.icon className="h-24 w-24" />
                                        </div>
                                        <stat.icon className={`h-8 w-8 ${stat.color} mb-4`} />
                                        <div className="text-4xl font-black mb-1">{stat.value}</div>
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{stat.label}</div>
                                    </motion.div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Inventory Grid */}
                <div className="max-w-7xl mx-auto pb-40">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        <AnimatePresence mode="popLayout">
                            {filteredItems.map((item, index) => (
                                <ScrollReveal key={item.id} delay={index * 0.1}>
                                    <motion.div
                                        layout
                                        whileHover={{ y: -10 }}
                                        className="h-full group"
                                    >
                                        <Card className="stellar-card h-full flex flex-col group">
                                            <div className="relative h-64 overflow-hidden rounded-[2.5rem] m-2">
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent z-10 opacity-60" />
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                                                />
                                                <div className="absolute top-5 left-5 z-20">
                                                    <Badge className={`${item.status === 'lost' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'} backdrop-blur-xl px-4 py-1.5 font-black uppercase tracking-[0.2em] text-[8px] italic`}>
                                                        {item.status.toUpperCase()}_VECTOR
                                                    </Badge>
                                                </div>
                                                <div className="absolute bottom-5 right-5 z-20">
                                                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
                                                        <Package className="h-5 w-5 text-purple-400" />
                                                    </div>
                                                </div>
                                            </div>

                                            <CardContent className="p-8 flex-1 flex flex-col justify-between">
                                                <div className="space-y-6">
                                                    <div>
                                                        <div className="flex items-center gap-3 text-purple-400 font-black uppercase tracking-[0.2em] text-[9px] mb-3">
                                                            <Calendar className="h-3 w-3" />
                                                            {item.date}
                                                        </div>
                                                        <h3 className="text-2xl font-black text-white leading-none uppercase italic mb-4 group-hover:text-purple-400 transition-colors">
                                                            {item.title}
                                                        </h3>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <div className="flex items-center text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                                            <MapPin className="h-4 w-4 mr-3 text-purple-500" />
                                                            {item.location}
                                                        </div>
                                                        <div className="flex items-center text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                                            <Brain className="h-4 w-4 mr-3 text-purple-500" />
                                                            {item.category}
                                                        </div>
                                                    </div>

                                                    <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-2">
                                                        {item.description}
                                                    </p>
                                                </div>

                                                <div className="mt-10 pt-6 border-t border-white/5">
                                                    <Dialog open={isContactDialogOpen && selectedItem?.id === item.id} onOpenChange={(open) => {
                                                        if (!open) {
                                                            setIsContactDialogOpen(false);
                                                            setSelectedItem(null);
                                                        }
                                                    }}>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                onClick={() => {
                                                                    setSelectedItem(item);
                                                                    setIsContactDialogOpen(true);
                                                                }}
                                                                className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white text-white hover:text-black font-black uppercase tracking-widest text-[10px] transition-all duration-500"
                                                            >
                                                                {item.status === 'lost' ? 'REPORT_FOUND' : 'CONTACT_OWNER'}
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[500px] bg-[#0a0a0f]/95 border-white/10 backdrop-blur-3xl text-white rounded-[2.5rem] p-10">
                                                            <AnimatePresence mode="wait">
                                                                {!showSuccess ? (
                                                                    <motion.div
                                                                        key="form"
                                                                        initial={{ opacity: 0, y: 10 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        exit={{ opacity: 0, scale: 0.9 }}
                                                                    >
                                                                        <DialogHeader className="mb-8">
                                                                            <DialogTitle className="text-4xl font-black italic tracking-tighter uppercase mb-2">Initialize <span className="text-purple-400">Comms.</span></DialogTitle>
                                                                            <DialogDescription className="text-gray-500 font-bold tracking-widest text-[10px] uppercase">Routing message through secure neural channel</DialogDescription>
                                                                        </DialogHeader>

                                                                        <form onSubmit={handleContactSubmit} className="space-y-6">
                                                                            <div className="space-y-4">
                                                                                <div className="space-y-2">
                                                                                    <Label className="uppercase text-[10px] font-black tracking-widest text-gray-500 ml-2">Identify Payload</Label>
                                                                                    <div className="relative group">
                                                                                        <Package className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400 opacity-50" />
                                                                                        <Input disabled value={selectedItem?.title} className="bg-white/[0.03] border-white/5 h-14 pl-12 rounded-xl text-purple-400 font-black italic" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="space-y-2">
                                                                                    <Label className="uppercase text-[10px] font-black tracking-widest text-gray-500 ml-2">Your Name / Agent ID</Label>
                                                                                    <div className="relative">
                                                                                        <Brain className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                                                                                        <Input
                                                                                            required
                                                                                            placeholder="OPERATOR_NAME"
                                                                                            className="bg-white/[0.03] border-white/5 h-14 pl-12 rounded-xl"
                                                                                            value={contactForm.name}
                                                                                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="space-y-2">
                                                                                    <Label className="uppercase text-[10px] font-black tracking-widest text-gray-500 ml-2">Neural Vector (Email)</Label>
                                                                                    <div className="relative">
                                                                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                                                                                        <Input
                                                                                            required
                                                                                            type="email"
                                                                                            placeholder="COMM_CHANNEL@INSTITUTION.EDU"
                                                                                            className="bg-white/[0.03] border-white/5 h-14 pl-12 rounded-xl"
                                                                                            value={contactForm.email}
                                                                                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="space-y-2">
                                                                                    <Label className="uppercase text-[10px] font-black tracking-widest text-gray-500 ml-2">Transmission Data</Label>
                                                                                    <Textarea
                                                                                        required
                                                                                        placeholder="Specify recovery coordinates or verification data..."
                                                                                        className="bg-white/[0.03] border-white/5 min-h-[100px] rounded-xl"
                                                                                        value={contactForm.message}
                                                                                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <Button disabled={isSubmittingContact} type="submit" className="w-full h-16 rounded-xl bg-white text-black hover:bg-purple-600 hover:text-white font-black uppercase tracking-widest transition-all">
                                                                                {isSubmittingContact ? "TRANSMITTING..." : "INITIALIZE BURST"}
                                                                            </Button>
                                                                        </form>
                                                                    </motion.div>
                                                                ) : (
                                                                    <motion.div
                                                                        key="success"
                                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                                        animate={{ opacity: 1, scale: 1 }}
                                                                        className="py-12 text-center"
                                                                    >
                                                                        <div className="relative inline-block mb-8">
                                                                            <div className="absolute -inset-8 bg-emerald-500/20 rounded-full blur-2xl animate-pulse" />
                                                                            <div className="relative p-8 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                                                                <Zap className="h-12 w-12 text-emerald-400 animate-bounce" />
                                                                            </div>
                                                                        </div>
                                                                        <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Burst <span className="text-emerald-400">Complete.</span></h3>
                                                                        <p className="text-gray-500 font-bold tracking-widest text-[10px] uppercase">Neural packet successfully routed</p>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </DialogContent>
                                                    </Dialog>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </ScrollReveal>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};
