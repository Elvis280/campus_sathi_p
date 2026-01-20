import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Send, User, LogOut, Calendar, Package, Globe, Settings, Info, UserCircle, Lightbulb, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { UserProfile } from '@/components/UserProfile';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { queryDocuments, listDocuments, type QueryResponse } from '@/lib/api';

interface Message {
  role: 'user' | 'bot';
  content: string;
  time: string;
  reasoning?: string;
  sources?: Array<{
    page: string | number;
    chunk_type: string;
    document: string;
    relevance_score: number;
  }>;
  entities?: Record<string, any>;
  processingTime?: number;
}

interface Document {
  document_id: string;
  filename: string;
  chunk_count: number;
}

export const UserDashboard = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<string>("");

  // Load documents on mount
  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const response = await listDocuments();
      setDocuments(response.documents);
    } catch (error) {
      console.error('Failed to load documents:', error);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      role: 'user',
      content: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    try {
      const response = await queryDocuments({
        query: currentInput,
        document_id: selectedDocument || undefined,
        top_k: 5
      });

      const botMsg: Message = {
        role: 'bot',
        content: response.answer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reasoning: response.reasoning,
        sources: response.sources,
        entities: response.entities,
        processingTime: response.processing_time_ms
      };
      setMessages(prev => [...prev, botMsg]);

      toast.success("Query Processed", {
        description: `Response generated in ${response.processing_time_ms}ms`,
      });
    } catch (error) {
      const errorMsg: Message = {
        role: 'bot',
        content: `ERROR: ${error instanceof Error ? error.message : 'Failed to process query. Please ensure the backend is running and documents are indexed.'}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);

      toast.error("Query Failed", {
        description: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    } finally {
      setIsTyping(false);
    }
  };

  const exampleQuestions = [
    "When is the DBMS exam?",
    "What exams are on 15th January?",
    "Show schedule for roll number 2301025"
  ];

  return (
    <TooltipProvider>
      <div className="h-screen bg-gradient-to-br from-[#1a1d2e] via-[#252945] to-[#1a1d2e] text-white selection:bg-purple-500/30 overflow-hidden font-sans">
        <Navigation />

        {/* Background effects */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
        </div>

        {/* Profile Dialog */}
        <Dialog open={showProfile} onOpenChange={setShowProfile}>
          <DialogContent className="bg-[#1a1d2e] border-white/10 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
            <UserProfile />
          </DialogContent>
        </Dialog>

        {/* Main Layout */}
        <div className="flex h-screen pt-16 relative z-10">
          {/* Left Sidebar */}
          <aside className="w-80 bg-[#1a1d2e]/80 backdrop-blur-xl border-r border-white/10 p-6 space-y-8 overflow-y-auto">
            {/* Document Selection */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-purple-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider">Select Document</h2>
              </div>
              <Select value={selectedDocument} onValueChange={setSelectedDocument}>
                <SelectTrigger className="bg-[#252945] border-white/10 h-12 rounded-xl">
                  <SelectValue placeholder="Select a document..." />
                </SelectTrigger>
                <SelectContent className="bg-[#252945] border-white/10 text-white">
                  <SelectItem value="all">All Documents</SelectItem>
                  {documents.map((doc) => (
                    <SelectItem key={doc.document_id} value={doc.document_id}>
                      {doc.filename}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tips Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-yellow-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider">Tips</h2>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start space-x-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Select a document above to start</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Ask specific questions about dates, exams, or schedules</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Include roll numbers for personalized answers</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Check sources for page references</span>
                </li>
              </ul>
            </div>

            {/* Example Questions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider">Example Questions</h2>
              </div>
              <div className="space-y-2">
                {exampleQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(question)}
                    className="w-full text-left p-3 bg-[#252945]/50 hover:bg-[#252945] border border-white/5 rounded-lg text-sm text-gray-300 hover:text-white transition-all"
                  >
                    <span className="text-purple-400">"</span>{question}<span className="text-purple-400">"</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <Button
                onClick={() => setShowProfile(true)}
                variant="outline"
                className="w-full justify-start bg-white/5 hover:bg-white/10 border-white/10 text-white"
              >
                <UserCircle className="h-4 w-4 mr-2" />
                View Profile
              </Button>
              <Button
                onClick={logout}
                variant="outline"
                className="w-full justify-start bg-red-500/10 hover:bg-red-500/20 border-red-500/20 text-red-400 hover:text-red-300"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col">
            {/* Messages Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-8 py-8 space-y-6"
            >
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-4 max-w-2xl">
                    <div className="text-6xl mb-4">👋</div>
                    <h2 className="text-3xl font-bold">Welcome to Campus Sathi!</h2>
                    <p className="text-gray-400 text-lg">
                      Select a document from the sidebar and ask me anything about it.
                    </p>
                  </div>
                </div>
              ) : (
                <AnimatePresence>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${msg.role === 'user' ? 'bg-purple-600' : 'bg-[#252945]'} rounded-2xl p-6 shadow-lg`}>
                        {/* Message Content */}
                        <div className="prose prose-invert max-w-none">
                          <p className="text-sm leading-relaxed whitespace-pre-wrap m-0">{msg.content}</p>
                        </div>

                        {/* Reasoning Section (Bot only) */}
                        {msg.role === 'bot' && msg.reasoning && (
                          <details className="mt-4 group">
                            <summary className="cursor-pointer list-none">
                              <div className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all">
                                <div className="flex items-center space-x-2">
                                  <svg className="h-4 w-4 text-purple-400 transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">View Reasoning Process</span>
                                </div>
                                <Badge className="bg-purple-600/30 text-purple-300 text-[10px] border-0">AI Explanation</Badge>
                              </div>
                            </summary>
                            <div className="mt-2 p-4 bg-black/20 rounded-lg border border-white/5">
                              <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">{msg.reasoning}</p>
                            </div>
                          </details>
                        )}

                        {/* Sources Section (Bot only) */}
                        {msg.role === 'bot' && msg.sources && msg.sources.length > 0 && (
                          <details className="mt-4 group">
                            <summary className="cursor-pointer list-none">
                              <div className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all">
                                <div className="flex items-center space-x-2">
                                  <svg className="h-4 w-4 text-blue-400 transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">View Sources</span>
                                </div>
                                <Badge className="bg-blue-600/30 text-blue-300 text-[10px] border-0">{msg.sources.length} Reference{msg.sources.length > 1 ? 's' : ''}</Badge>
                              </div>
                            </summary>
                            <div className="mt-2 space-y-2">
                              {msg.sources.map((source, idx) => (
                                <div key={idx} className="p-3 bg-black/20 rounded-lg border border-white/5">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                      <FileText className="h-3 w-3 text-blue-400" />
                                      <span className="text-xs font-semibold text-white">{source.document}</span>
                                    </div>
                                    <Badge className="bg-emerald-600/30 text-emerald-300 text-[10px] border-0">
                                      {(source.relevance_score * 100).toFixed(1)}% Match
                                    </Badge>
                                  </div>
                                  <div className="flex items-center space-x-3 text-[10px] text-gray-400">
                                    <span>Page {source.page}</span>
                                    <span>•</span>
                                    <span className="capitalize">{source.chunk_type.replace('_', ' ')}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </details>
                        )}

                        {/* Metadata Footer */}
                        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400">
                          <span>{msg.time}</span>
                          <div className="flex items-center space-x-2">
                            {msg.processingTime && (
                              <>
                                <span className="text-gray-500">•</span>
                                <span className="text-purple-400 font-semibold">{msg.processingTime}ms</span>
                              </>
                            )}
                            {msg.role === 'bot' && (
                              <>
                                <span className="text-gray-500">•</span>
                                <span className="text-emerald-400">AI Generated</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-[#252945] rounded-2xl p-5 flex items-center space-x-2">
                        <div className="h-2 w-2 bg-purple-400 rounded-full animate-bounce" />
                        <div className="h-2 w-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="h-2 w-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-white/10 bg-[#1a1d2e]/80 backdrop-blur-xl">
              <div className="max-w-4xl mx-auto flex items-center space-x-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question about the selected document..."
                  className="flex-1 h-14 bg-[#252945] border-white/10 rounded-xl px-5 text-white placeholder:text-gray-500"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="h-14 px-8 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};
