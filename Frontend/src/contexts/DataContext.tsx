import React, { createContext, useContext, useState, useEffect } from 'react';

export interface InstitutionalData {
  id: string;
  title: string;
  content: string;
  type: 'circular' | 'notice' | 'faq';
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
  userId?: string;
}

interface DataContextType {
  institutionalData: InstitutionalData[];
  chatMessages: ChatMessage[];
  addInstitutionalData: (data: Omit<InstitutionalData, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateInstitutionalData: (id: string, data: Partial<InstitutionalData>) => void;
  deleteInstitutionalData: (id: string) => void;
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  searchInstitutionalData: (query: string) => string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [institutionalData, setInstitutionalData] = useState<InstitutionalData[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('institutional_data');
    const savedMessages = localStorage.getItem('chat_messages');
    
    if (savedData) {
      setInstitutionalData(JSON.parse(savedData));
    } else {
      // Initialize with comprehensive sample data
      const sampleData: InstitutionalData[] = [
        {
          id: '1',
          title: 'Office Hours',
          content: 'Our office hours are Monday through Friday, 9:00 AM to 5:00 PM. We are closed on weekends and public holidays. For emergency support, please call our 24/7 helpline.',
          type: 'notice',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'How to Apply for Leave',
          content: 'To apply for leave:\n1. Fill out the leave application form on the employee portal\n2. Submit to your direct supervisor at least 3 days in advance\n3. Wait for approval confirmation via email\n4. For medical leave, attach doctor\'s certificate\n5. For extended leave (>7 days), HR approval is required.',
          type: 'faq',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'Password Reset',
          content: 'To reset your password:\n1. Go to the login page\n2. Click "Forgot Password"\n3. Enter your registered email address\n4. Check your email for reset instructions\n5. Follow the link and create a new password\n6. Contact IT support if you don\'t receive the email within 10 minutes.',
          type: 'faq',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '4',
          title: 'IT Support Contact',
          content: 'For IT support:\n• Email: itsupport@company.com\n• Phone: (555) 123-4567 (ext. 101)\n• Help Desk: Room 205, 2nd Floor\n• Emergency Support: Available 24/7\n• Response Time: Within 4 hours for critical issues',
          type: 'faq',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '5',
          title: 'Training Module Requirements',
          content: 'All employees must complete mandatory training modules within 30 days of enrollment. This includes:\n• Safety Training\n• Data Security Awareness\n• Company Policies Overview\n• Role-specific training modules\n\nFailure to complete training may result in account restrictions.',
          type: 'circular',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '6',
          title: 'Expense Reimbursement',
          content: 'To claim expense reimbursement:\n1. Submit receipts within 30 days of expense\n2. Use the expense portal for claims\n3. Attach all original receipts\n4. Include business justification\n5. Manager approval required for amounts >$500\n6. Processing time: 5-7 business days',
          type: 'faq',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '7',
          title: 'Remote Work Policy',
          content: 'Remote work guidelines:\n• Maximum 3 days per week remote work\n• Prior approval from manager required\n• Must be available during core hours (10 AM - 3 PM)\n• Regular check-ins with team mandatory\n• Secure VPN connection required\n• Home office setup guidelines available on portal',
          type: 'circular',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '8',
          title: 'HR Contact Information',
          content: 'Human Resources contacts:\n• General HR: hr@company.com\n• Payroll: payroll@company.com\n• Benefits: benefits@company.com\n• Phone: (555) 123-4567 (ext. 201)\n• Office: Room 301, 3rd Floor\n• Hours: Monday-Friday, 8:30 AM - 5:30 PM',
          type: 'faq',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '9',
          title: 'Holiday Schedule 2024',
          content: 'Official holidays for 2024:\n• New Year\'s Day - January 1\n• Memorial Day - May 27\n• Independence Day - July 4\n• Labor Day - September 2\n• Thanksgiving - November 28-29\n• Christmas - December 25\n\nFloating holidays: 2 additional days per employee per year.',
          type: 'notice',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '10',
          title: 'Building Access and Security',
          content: 'Building access information:\n• Main entrance: 7:00 AM - 7:00 PM (weekdays)\n• After hours: Use keycard at side entrance\n• Visitor policy: All visitors must sign in at reception\n• Lost keycard: Report immediately to security\n• Security office: Ground floor, next to reception\n• Emergency: Dial 911 or press red emergency buttons',
          type: 'faq',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      setInstitutionalData(sampleData);
      localStorage.setItem('institutional_data', JSON.stringify(sampleData));
    }
    
    if (savedMessages) {
      setChatMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('institutional_data', JSON.stringify(institutionalData));
  }, [institutionalData]);

  useEffect(() => {
    localStorage.setItem('chat_messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const addInstitutionalData = (data: Omit<InstitutionalData, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newData: InstitutionalData = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setInstitutionalData(prev => [...prev, newData]);
  };

  const updateInstitutionalData = (id: string, data: Partial<InstitutionalData>) => {
    setInstitutionalData(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, ...data, updatedAt: new Date().toISOString() }
          : item
      )
    );
  };

  const deleteInstitutionalData = (id: string) => {
    setInstitutionalData(prev => prev.filter(item => item.id !== id));
  };

  const addChatMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  const searchInstitutionalData = (query: string): string | null => {
    const lowerQuery = query.toLowerCase().trim();
    
    // Common keywords mapping for better search
    const keywordMappings: { [key: string]: string[] } = {
      'leave': ['leave', 'vacation', 'time off', 'absent', 'holiday'],
      'password': ['password', 'login', 'forgot', 'reset', 'access'],
      'support': ['support', 'help', 'contact', 'assistance', 'problem'],
      'office': ['office', 'hours', 'building', 'location', 'address'],
      'training': ['training', 'course', 'module', 'certification', 'learning'],
      'expense': ['expense', 'reimbursement', 'claim', 'receipt', 'money'],
      'remote': ['remote', 'work from home', 'wfh', 'telework', 'home office'],
      'hr': ['hr', 'human resources', 'payroll', 'benefits', 'personnel'],
      'holiday': ['holiday', 'vacation days', 'time off', 'calendar'],
      'security': ['security', 'access', 'keycard', 'building', 'entrance'],
    };

    // First, try exact matching
    let bestMatch: InstitutionalData | null = null;
    let bestScore = 0;

    for (const item of institutionalData) {
      let score = 0;
      const titleLower = item.title.toLowerCase();
      const contentLower = item.content.toLowerCase();
      
      // Direct matches get highest score
      if (titleLower.includes(lowerQuery) || contentLower.includes(lowerQuery)) {
        score += 10;
      }
      
      // Check keyword mappings
      for (const [mainKeyword, synonyms] of Object.entries(keywordMappings)) {
        if (synonyms.some(synonym => lowerQuery.includes(synonym))) {
          if (titleLower.includes(mainKeyword) || contentLower.includes(mainKeyword)) {
            score += 8;
          }
        }
      }
      
      // Word matching
      const queryWords = lowerQuery.split(' ').filter(word => word.length > 2);
      for (const word of queryWords) {
        if (titleLower.includes(word)) score += 3;
        if (contentLower.includes(word)) score += 1;
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    }
    
    if (bestMatch && bestScore > 0) {
      const typeLabel = bestMatch.type === 'faq' ? 'FAQ' : 
                       bestMatch.type === 'notice' ? 'Notice' : 'Circular';
      return `📋 **${typeLabel}: ${bestMatch.title}**\n\n${bestMatch.content}`;
    }
    
    // If no match found, return null
    return null;
  };

  return (
    <DataContext.Provider value={{
      institutionalData,
      chatMessages,
      addInstitutionalData,
      updateInstitutionalData,
      deleteInstitutionalData,
      addChatMessage,
      searchInstitutionalData,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};