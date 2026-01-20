import { useState, useEffect } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'hi' | 'zh';

export interface Translations {
  // Navigation
  home: string;
  about: string;
  contact: string;
  login: string;
  logout: string;
  welcome: string;
  
  // Login Page
  welcomeTitle: string;
  welcomeSubtitle: string;
  adminAccess: string;
  adminDescription: string;
  adminFeatures: {
    manage: string;
    users: string;
    analytics: string;
    moderation: string;
  };
  studentAccess: string;
  studentDescription: string;
  studentFeatures: {
    chat: string;
    documents: string;
    faq: string;
    shortcuts: string;
  };
  signIn: string;
  signInDescription: string;
  username: string;
  password: string;
  usernamePrompt: string;
  passwordPrompt: string;
  signingIn: string;
  demoCredentials: string;
  invalidCredentials: string;
  forgotPassword: string;
  rememberMe: string;
  
  // Home Page
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  getStarted: string;
  learnMore: string;
  featuresTitle: string;
  featuresSubtitle: string;
  
  // Dashboard
  welcomeBack: string;
  dashboardSubtitle: string;
  chatAssistant: string;
  chatHistory: string;
  myFiles: string;
  profile: string;
  clearChat: string;
  chatCleared: string;
  askAnything: string;
  adminDashboard: string;
  manageData: string;
  totalDocuments: string;
  userQueries: string;
  categories: string;
  addNew: string;
  recentQueries: string;
  quickActions: string;
  
  // Common
  language: string;
  theme: string;
  submit: string;
  cancel: string;
  loading: string;
  send: string;
  upload: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    login: 'Login',
    logout: 'Logout',
    welcome: 'Welcome',
    
    // Login Page
    welcomeTitle: 'Campus_Sathi',
    welcomeSubtitle: 'Your Intelligent Campus Assistant',
    adminAccess: 'Administrator Access',
    adminDescription: 'Manage system settings and institutional data',
    adminFeatures: {
      manage: 'Manage institutional data',
      users: 'User management',
      analytics: 'System analytics',
      moderation: 'Content moderation'
    },
    studentAccess: 'Student Access',
    studentDescription: 'Get instant answers and upload documents',
    studentFeatures: {
      chat: 'AI-powered chat assistance',
      documents: 'Document analysis',
      faq: 'FAQ responses',
      shortcuts: 'Quick question shortcuts'
    },
    signIn: 'Sign In',
    signInDescription: 'Enter your credentials to access Campus_Sathi',
    username: 'Username',
    password: 'Password',
    usernamePrompt: 'Enter your username',
    passwordPrompt: 'Enter your password',
    signingIn: 'Signing in...',
    demoCredentials: 'Demo Credentials:',
    invalidCredentials: 'Invalid credentials. Please try again.',
    forgotPassword: 'Forgot your password?',
    rememberMe: 'Remember me',
    
    // Home Page
    heroTitle: 'Campus_Sathi',
    heroSubtitle: 'Your Intelligent Campus Assistant',
    heroDescription: 'Revolutionizing campus communication with AI-powered document analysis, instant support, and intelligent query handling for students and faculty.',
    getStarted: 'Get Started Today',
    learnMore: 'Learn More',
    featuresTitle: 'Powerful Features for Modern Campus Life',
    featuresSubtitle: 'Campus_Sathi combines cutting-edge AI with intuitive design to deliver unparalleled campus support',
    
    // Dashboard
    welcomeBack: 'Welcome back',
    dashboardSubtitle: 'Your intelligent campus assistant for support and information.',
    chatAssistant: 'Chat Assistant',
    chatHistory: 'Chat History',
    myFiles: 'My Files',
    profile: 'Profile',
    clearChat: 'Clear Chat',
    chatCleared: 'Your chat has been cleared and saved to history.',
    askAnything: 'Ask Campus_Sathi anything...',
    adminDashboard: 'Admin Dashboard',
    manageData: 'Manage institutional data and monitor chatbot interactions',
    totalDocuments: 'Total Documents',
    userQueries: 'User Queries',
    categories: 'Categories',
    addNew: 'Add New',
    recentQueries: 'Recent User Queries',
    quickActions: 'Quick Actions',
    
    // Common
    language: 'Language',
    theme: 'Theme',
    submit: 'Submit',
    cancel: 'Cancel',
    loading: 'Loading...',
    send: 'Send',
    upload: 'Upload'
  },
  es: {
    // Navigation
    home: 'Inicio',
    about: 'Acerca de',
    contact: 'Contacto',
    login: 'Iniciar Sesión',
    logout: 'Cerrar Sesión',
    welcome: 'Bienvenido',
    
    // Login Page
    welcomeTitle: 'Campus_Sathi',
    welcomeSubtitle: 'Tu Asistente de Campus Inteligente',
    adminAccess: 'Acceso de Administrador',
    adminDescription: 'Gestionar configuraciones del sistema y datos institucionales',
    adminFeatures: {
      manage: 'Gestionar datos institucionales',
      users: 'Gestión de usuarios',
      analytics: 'Análisis del sistema',
      moderation: 'Moderación de contenido'
    },
    studentAccess: 'Acceso de Estudiante',
    studentDescription: 'Obtener respuestas instantáneas y subir documentos',
    studentFeatures: {
      chat: 'Asistencia de chat con IA',
      documents: 'Análisis de documentos',
      faq: 'Respuestas de preguntas frecuentes',
      shortcuts: 'Atajos de preguntas rápidas'
    },
    signIn: 'Iniciar Sesión',
    signInDescription: 'Ingresa tus credenciales para acceder a Campus_Sathi',
    username: 'Nombre de usuario',
    password: 'Contraseña',
    usernamePrompt: 'Ingresa tu nombre de usuario',
    passwordPrompt: 'Ingresa tu contraseña',
    signingIn: 'Iniciando sesión...',
    demoCredentials: 'Credenciales de Demostración:',
    invalidCredentials: 'Credenciales inválidas. Por favor, intenta de nuevo.',
    forgotPassword: '¿Olvidaste tu contraseña?',
    rememberMe: 'Recordarme',
    
    // Home Page
    heroTitle: 'Campus_Sathi',
    heroSubtitle: 'Tu Asistente de Campus Inteligente',
    heroDescription: 'Revolucionando la comunicación del campus con análisis de documentos con IA, soporte instantáneo y manejo inteligente de consultas para estudiantes y profesores.',
    getStarted: 'Comenzar Hoy',
    learnMore: 'Aprender Más',
    featuresTitle: 'Funciones Poderosas para la Vida del Campus Moderno',
    featuresSubtitle: 'Campus_Sathi combina IA de vanguardia con diseño intuitivo para brindar soporte de campus incomparable',
    
    // Dashboard
    welcomeBack: 'Bienvenido de nuevo',
    dashboardSubtitle: 'Tu asistente de campus inteligente para soporte e información.',
    chatAssistant: 'Asistente de Chat',
    chatHistory: 'Historial de Chat',
    myFiles: 'Mis Archivos',
    profile: 'Perfil',
    clearChat: 'Limpiar Chat',
    chatCleared: 'Tu chat ha sido limpiado y guardado en el historial.',
    askAnything: 'Pregunta a Campus_Sathi cualquier cosa...',
    adminDashboard: 'Panel de Administrador',
    manageData: 'Gestionar datos institucionales y monitorear interacciones del chatbot',
    totalDocuments: 'Total de Documentos',
    userQueries: 'Consultas de Usuarios',
    categories: 'Categorías',
    addNew: 'Agregar Nuevo',
    recentQueries: 'Consultas Recientes de Usuarios',
    quickActions: 'Acciones Rápidas',
    
    // Common
    language: 'Idioma',
    theme: 'Tema',
    submit: 'Enviar',
    cancel: 'Cancelar',
    loading: 'Cargando...',
    send: 'Enviar',
    upload: 'Subir'
  },
  fr: {
    // Navigation
    home: 'Accueil',
    about: 'À propos',
    contact: 'Contact',
    login: 'Connexion',
    logout: 'Déconnexion',
    welcome: 'Bienvenue',
    
    // Login Page
    welcomeTitle: 'Campus_Sathi',
    welcomeSubtitle: 'Votre Assistant de Campus Intelligent',
    adminAccess: 'Accès Administrateur',
    adminDescription: 'Gérer les paramètres système et les données institutionnelles',
    adminFeatures: {
      manage: 'Gérer les données institutionnelles',
      users: 'Gestion des utilisateurs',
      analytics: 'Analyses du système',
      moderation: 'Modération de contenu'
    },
    studentAccess: 'Accès Étudiant',
    studentDescription: 'Obtenez des réponses instantanées et téléchargez des documents',
    studentFeatures: {
      chat: 'Assistance de chat IA',
      documents: 'Analyse de documents',
      faq: 'Réponses FAQ',
      shortcuts: 'Raccourcis de questions rapides'
    },
    signIn: 'Se Connecter',
    signInDescription: 'Entrez vos identifiants pour accéder à Campus_Sathi',
    username: 'Nom d\'utilisateur',
    password: 'Mot de passe',
    usernamePrompt: 'Entrez votre nom d\'utilisateur',
    passwordPrompt: 'Entrez votre mot de passe',
    signingIn: 'Connexion en cours...',
    demoCredentials: 'Identifiants de Démonstration:',
    invalidCredentials: 'Identifiants invalides. Veuillez réessayer.',
    forgotPassword: 'Mot de passe oublié?',
    rememberMe: 'Se souvenir de moi',
    
    // Home Page
    heroTitle: 'Campus_Sathi',
    heroSubtitle: 'Votre Assistant de Campus Intelligent',
    heroDescription: 'Révolutionner la communication du campus avec l\'analyse de documents alimentée par l\'IA, le support instantané et la gestion intelligente des requêtes pour les étudiants et le corps professoral.',
    getStarted: 'Commencer Aujourd\'hui',
    learnMore: 'En Savoir Plus',
    featuresTitle: 'Fonctionnalités Puissantes pour la Vie de Campus Moderne',
    featuresSubtitle: 'Campus_Sathi combine l\'IA de pointe avec un design intuitif pour offrir un support de campus inégalé',
    
    // Dashboard
    welcomeBack: 'Bon retour',
    dashboardSubtitle: 'Votre assistant de campus intelligent pour le support et l\'information.',
    chatAssistant: 'Assistant de Chat',
    chatHistory: 'Historique du Chat',
    myFiles: 'Mes Fichiers',
    profile: 'Profil',
    clearChat: 'Effacer le Chat',
    chatCleared: 'Votre chat a été effacé et sauvegardé dans l\'historique.',
    askAnything: 'Demandez n\'importe quoi à Campus_Sathi...',
    adminDashboard: 'Tableau de Bord Admin',
    manageData: 'Gérer les données institutionnelles et surveiller les interactions du chatbot',
    totalDocuments: 'Total des Documents',
    userQueries: 'Requêtes des Utilisateurs',
    categories: 'Catégories',
    addNew: 'Ajouter Nouveau',
    recentQueries: 'Requêtes Récentes des Utilisateurs',
    quickActions: 'Actions Rapides',
    
    // Common
    language: 'Langue',
    theme: 'Thème',
    submit: 'Soumettre',
    cancel: 'Annuler',
    loading: 'Chargement...',
    send: 'Envoyer',
    upload: 'Télécharger'
  },
  de: {
    // Navigation
    home: 'Startseite',
    about: 'Über uns',
    contact: 'Kontakt',
    login: 'Anmelden',
    logout: 'Abmelden',
    welcome: 'Willkommen',
    
    // Login Page
    welcomeTitle: 'Campus_Sathi',
    welcomeSubtitle: 'Ihr Intelligenter Campus-Assistent',
    adminAccess: 'Administrator-Zugang',
    adminDescription: 'Systemeinstellungen und institutionelle Daten verwalten',
    adminFeatures: {
      manage: 'Institutionelle Daten verwalten',
      users: 'Benutzerverwaltung',
      analytics: 'Systemanalyse',
      moderation: 'Inhaltsmoderation'
    },
    studentAccess: 'Studenten-Zugang',
    studentDescription: 'Sofortige Antworten erhalten und Dokumente hochladen',
    studentFeatures: {
      chat: 'KI-gestützte Chat-Unterstützung',
      documents: 'Dokumentenanalyse',
      faq: 'FAQ-Antworten',
      shortcuts: 'Schnelle Fragen-Shortcuts'
    },
    signIn: 'Anmelden',
    signInDescription: 'Geben Sie Ihre Anmeldedaten ein, um auf Campus_Sathi zuzugreifen',
    username: 'Benutzername',
    password: 'Passwort',
    usernamePrompt: 'Geben Sie Ihren Benutzernamen ein',
    passwordPrompt: 'Geben Sie Ihr Passwort ein',
    signingIn: 'Anmeldung läuft...',
    demoCredentials: 'Demo-Anmeldedaten:',
    invalidCredentials: 'Ungültige Anmeldedaten. Bitte versuchen Sie es erneut.',
    forgotPassword: 'Passwort vergessen?',
    rememberMe: 'Angemeldet bleiben',
    
    // Home Page
    heroTitle: 'Campus_Sathi',
    heroSubtitle: 'Ihr Intelligenter Campus-Assistent',
    heroDescription: 'Revolutionierung der Campus-Kommunikation mit KI-gestützter Dokumentenanalyse, sofortiger Unterstützung und intelligenter Abfrageverwaltung für Studenten und Lehrkräfte.',
    getStarted: 'Heute Beginnen',
    learnMore: 'Mehr Erfahren',
    featuresTitle: 'Leistungsstarke Funktionen für das Moderne Campus-Leben',
    featuresSubtitle: 'Campus_Sathi kombiniert modernste KI mit intuitivem Design, um unvergleichliche Campus-Unterstützung zu bieten',
    
    // Dashboard
    welcomeBack: 'Willkommen zurück',
    dashboardSubtitle: 'Ihr intelligenter Campus-Assistent für Unterstützung und Informationen.',
    chatAssistant: 'Chat-Assistent',
    chatHistory: 'Chat-Verlauf',
    myFiles: 'Meine Dateien',
    profile: 'Profil',
    clearChat: 'Chat Löschen',
    chatCleared: 'Ihr Chat wurde gelöscht und im Verlauf gespeichert.',
    askAnything: 'Fragen Sie Campus_Sathi alles...',
    adminDashboard: 'Admin-Dashboard',
    manageData: 'Institutionelle Daten verwalten und Chatbot-Interaktionen überwachen',
    totalDocuments: 'Gesamt Dokumente',
    userQueries: 'Benutzeranfragen',
    categories: 'Kategorien',
    addNew: 'Neu Hinzufügen',
    recentQueries: 'Aktuelle Benutzeranfragen',
    quickActions: 'Schnelle Aktionen',
    
    // Common
    language: 'Sprache',
    theme: 'Thema',
    submit: 'Senden',
    cancel: 'Abbrechen',
    loading: 'Laden...',
    send: 'Senden',
    upload: 'Hochladen'
  },
  hi: {
    // Navigation
    home: 'होम',
    about: 'के बारे में',
    contact: 'संपर्क',
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    welcome: 'स्वागत है',
    
    // Login Page
    welcomeTitle: 'Campus_Sathi',
    welcomeSubtitle: 'आपका बुद्धिमान कैंपस सहायक',
    adminAccess: 'प्रशासक पहुंच',
    adminDescription: 'सिस्टम सेटिंग्स और संस्थागत डेटा प्रबंधित करें',
    adminFeatures: {
      manage: 'संस्थागत डेटा प्रबंधित करें',
      users: 'उपयोगकर्ता प्रबंधन',
      analytics: 'सिस्टम विश्लेषण',
      moderation: 'सामग्री मॉडरेशन'
    },
    studentAccess: 'छात्र पहुंच',
    studentDescription: 'तुरंत उत्तर प्राप्त करें और दस्तावेज़ अपलोड करें',
    studentFeatures: {
      chat: 'AI-संचालित चैट सहायता',
      documents: 'दस्तावेज़ विश्लेषण',
      faq: 'FAQ उत्तर',
      shortcuts: 'त्वरित प्रश्न शॉर्टकट'
    },
    signIn: 'साइन इन करें',
    signInDescription: 'Campus_Sathi तक पहुंच के लिए अपने क्रेडेंशियल दर्ज करें',
    username: 'उपयोगकर्ता नाम',
    password: 'पासवर्ड',
    usernamePrompt: 'अपना उपयोगकर्ता नाम दर्ज करें',
    passwordPrompt: 'अपना पासवर्ड दर्ज करें',
    signingIn: 'साइन इन हो रहे हैं...',
    demoCredentials: 'डेमो क्रेडेंशियल:',
    invalidCredentials: 'अमान्य क्रेडेंशियल। कृपया पुनः प्रयास करें।',
    forgotPassword: 'अपना पासवर्ड भूल गए?',
    rememberMe: 'मुझे याद रखें',
    
    // Home Page
    heroTitle: 'Campus_Sathi',
    heroSubtitle: 'आपका बुद्धिमान कैंपस सहायक',
    heroDescription: 'AI-संचालित दस्तावेज़ विश्लेषण, त्वरित समर्थन और छात्रों और शिक्षकों के लिए बुद्धिमान प्रश्न प्रबंधन के साथ कैंपस संचार में क्रांति ला रहे हैं।',
    getStarted: 'आज शुरू करें',
    learnMore: 'अधिक जानें',
    featuresTitle: 'आधुनिक कैंपस जीवन के लिए शक्तिशाली सुविधाएं',
    featuresSubtitle: 'Campus_Sathi अद्वितीय कैंपस समर्थन प्रदान करने के लिए अत्याधुनिक AI को सहज डिज़ाइन के साथ जोड़ता है',
    
    // Dashboard
    welcomeBack: 'वापसी पर स्वागत है',
    dashboardSubtitle: 'समर्थन और जानकारी के लिए आपका बुद्धिमान कैंपस सहायक।',
    chatAssistant: 'चैट सहायक',
    chatHistory: 'चैट इतिहास',
    myFiles: 'मेरी फ़ाइलें',
    profile: 'प्रोफ़ाइल',
    clearChat: 'चैट साफ़ करें',
    chatCleared: 'आपकी चैट साफ़ कर दी गई है और इतिहास में सहेजी गई है।',
    askAnything: 'Campus_Sathi से कुछ भी पूछें...',
    adminDashboard: 'प्रशासक डैशबोर्ड',
    manageData: 'संस्थागत डेटा प्रबंधित करें और चैटबॉट इंटरैक्शन की निगरानी करें',
    totalDocuments: 'कुल दस्तावेज़',
    userQueries: 'उपयोगकर्ता प्रश्न',
    categories: 'श्रेणियाँ',
    addNew: 'नया जोड़ें',
    recentQueries: 'हाल के उपयोगकर्ता प्रश्न',
    quickActions: 'त्वरित क्रियाएं',
    
    // Common
    language: 'भाषा',
    theme: 'थीम',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    loading: 'लोड हो रहा है...',
    send: 'भेजें',
    upload: 'अपलोड करें'
  },
  zh: {
    // Navigation
    home: '首页',
    about: '关于',
    contact: '联系',
    login: '登录',
    logout: '登出',
    welcome: '欢迎',
    
    // Login Page
    welcomeTitle: 'Campus_Sathi',
    welcomeSubtitle: '您的智能校园助手',
    adminAccess: '管理员访问',
    adminDescription: '管理系统设置和机构数据',
    adminFeatures: {
      manage: '管理机构数据',
      users: '用户管理',
      analytics: '系统分析',
      moderation: '内容审核'
    },
    studentAccess: '学生访问',
    studentDescription: '获取即时答案并上传文档',
    studentFeatures: {
      chat: 'AI驱动的聊天协助',
      documents: '文档分析',
      faq: '常见问题解答',
      shortcuts: '快速问题快捷方式'
    },
    signIn: '登录',
    signInDescription: '输入您的凭据以访问Campus_Sathi',
    username: '用户名',
    password: '密码',
    usernamePrompt: '输入您的用户名',
    passwordPrompt: '输入您的密码',
    signingIn: '正在登录...',
    demoCredentials: '演示凭据：',
    invalidCredentials: '凭据无效。请重试。',
    forgotPassword: '忘记密码？',
    rememberMe: '记住我',
    
    // Home Page
    heroTitle: 'Campus_Sathi',
    heroSubtitle: '您的智能校园助手',
    heroDescription: '通过AI驱动的文档分析、即时支持和智能查询处理，为学生和教职员工革新校园沟通。',
    getStarted: '立即开始',
    learnMore: '了解更多',
    featuresTitle: '现代校园生活的强大功能',
    featuresSubtitle: 'Campus_Sathi将尖端AI与直观设计相结合，提供无与伦比的校园支持',
    
    // Dashboard
    welcomeBack: '欢迎回来',
    dashboardSubtitle: '您的智能校园助手，提供支持和信息。',
    chatAssistant: '聊天助手',
    chatHistory: '聊天历史',
    myFiles: '我的文件',
    profile: '个人资料',
    clearChat: '清除聊天',
    chatCleared: '您的聊天已清除并保存到历史记录。',
    askAnything: '向Campus_Sathi询问任何问题...',
    adminDashboard: '管理仪表板',
    manageData: '管理机构数据并监控聊天机器人交互',
    totalDocuments: '总文档数',
    userQueries: '用户查询',
    categories: '类别',
    addNew: '添加新的',
    recentQueries: '最近的用户查询',
    quickActions: '快速操作',
    
    // Common
    language: '语言',
    theme: '主题',
    submit: '提交',
    cancel: '取消',
    loading: '加载中...',
    send: '发送',
    upload: '上传'
  }
};

const languageNames: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  hi: 'हिंदी',
  zh: '中文'
};

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('campus-sathi-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('campus-sathi-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language];

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const getLanguageName = (lang: Language) => languageNames[lang];

  return {
    language,
    t,
    changeLanguage,
    getLanguageName,
    availableLanguages: Object.keys(languageNames) as Language[],
    languageNames
  };
};