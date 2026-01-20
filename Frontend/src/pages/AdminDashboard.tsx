import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { User, LayoutDashboard, Users, MessageSquare, Database, Activity, Shield, Bot, FileUp, FileText, Trash2, Upload } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { ScrollReveal } from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { listDocuments, uploadDocument, deleteDocument } from '@/lib/api';

interface Document {
  document_id: string;
  filename: string;
  chunk_count: number;
}

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const response = await listDocuments();
      setDocuments(response.documents);
    } catch (error) {
      console.error('Failed to load documents:', error);
      toast.error("Failed to load documents");
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      toast.error("Invalid File Type", {
        description: "Only PDF files are supported.",
      });
      return;
    }

    setIsUploading(true);
    toast.info("Uploading Document", {
      description: `Processing ${file.name}...`,
    });

    try {
      const response = await uploadDocument(file);

      if (response.status === 'already_indexed') {
        toast.warning("Document Exists", {
          description: `${file.name} was already indexed.`,
        });
      } else {
        toast.success("Upload Complete", {
          description: `${file.name} indexed successfully. ${response.chunks_created} chunks created.`,
        });
        loadDocuments();
      }
    } catch (error) {
      toast.error("Upload Failed", {
        description: error instanceof Error ? error.message : 'Failed to upload document',
      });
    } finally {
      setIsUploading(false);
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const handleDeleteDocument = async (docId: string, filename: string) => {
    if (!confirm(`Are you sure you want to delete "${filename}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await deleteDocument(docId);
      toast.success("Document Deleted", {
        description: `${filename} has been removed.`,
      });
      loadDocuments();
    } catch (error) {
      toast.error("Delete Failed", {
        description: error instanceof Error ? error.message : 'Failed to delete document',
      });
    }
  };

  if (user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-purple-500/30 overflow-hidden font-sans">
      <Navigation />

      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 z-0">
          <div className="stars absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse" />
        </div>
        <div className="nebula-glow top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 animate-orb" />
        <div className="nebula-glow bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 animate-orb" style={{ animationDelay: '5s' }} />
        <div className="absolute inset-0 neural-grid opacity-[0.05]" />
      </div>

      <div className="relative z-10 pt-32 px-6 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <ScrollReveal width="100%">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="absolute -inset-4 bg-purple-600/20 rounded-full blur-xl animate-pulse" />
                  <div className="relative p-5 rounded-3xl bg-purple-600/10 border border-purple-500/20">
                    <LayoutDashboard className="h-10 w-10 text-purple-400" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">Admin <span className="text-purple-400">Control.</span></h1>
                  <div className="flex items-center space-x-3 mt-2">
                    <div className="h-2 w-2 rounded-full bg-purple-500 animate-ping" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Document Management System v2.4.0</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* File Input */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf"
            onChange={handleFileUpload}
          />

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { label: "Total Documents", value: documents.length.toString(), icon: FileText, color: "text-purple-400" },
              { label: "Total Chunks", value: documents.reduce((sum, doc) => sum + doc.chunk_count, 0).toString(), icon: Database, color: "text-blue-400" },
              { label: "Active Users", value: "1,248", icon: Users, color: "text-emerald-400" },
              { label: "System Uptime", value: "99.99%", icon: Activity, color: "text-orange-400" }
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1} width="100%">
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-morphism p-8 rounded-[2.5rem] border-white/5 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                    <stat.icon className="h-24 w-24" />
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-2xl bg-white/[0.03] border border-white/5`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-4xl font-black mb-1 italic">{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">{stat.label}</div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Upload Button */}
          <div className="mb-8">
            <ScrollReveal width="100%">
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="h-20 px-12 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black uppercase tracking-widest text-sm transition-all duration-500 shadow-xl group"
              >
                <Upload className="h-6 w-6 mr-3" />
                {isUploading ? 'Uploading...' : 'Upload New Document'}
              </Button>
            </ScrollReveal>
          </div>

          {/* Documents List */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-8">
              <FileText className="h-6 w-6 text-purple-400" />
              <h2 className="text-3xl font-black uppercase tracking-tighter italic">Indexed Documents</h2>
            </div>

            {documents.length === 0 ? (
              <div className="glass-morphism rounded-[2.5rem] p-16 text-center border-white/5">
                <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-black uppercase tracking-tighter text-gray-500 mb-2">No Documents Found</h3>
                <p className="text-gray-600">Upload your first PDF  to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {documents.map((doc, index) => (
                    <ScrollReveal key={doc.document_id} delay={index * 0.05} width="100%">
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="glass-morphism rounded-[2rem] border-white/5 p-6 flex items-center justify-between group hover:border-purple-500/30 transition-all"
                      >
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="p-4 rounded-xl bg-purple-600/10 border border-purple-500/20">
                            <FileText className="h-6 w-6 text-purple-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-1">{doc.filename}</h3>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span className="flex items-center">
                                <Database className="h-3 w-3 mr-1" />
                                {doc.chunk_count} chunks
                              </span>
                              <span className="text-gray-600">•</span>
                              <span className="font-mono text-gray-600">ID: {doc.document_id.substring(0, 8)}...</span>
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={() => handleDeleteDocument(doc.document_id, doc.filename)}
                          variant="ghost"
                          className="h-12 w-12 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all p-0"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </motion.div>
                    </ScrollReveal>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};