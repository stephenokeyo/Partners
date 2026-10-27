import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Partner, Product, PartnerFile, ChatThread, ChatMessage, Order, UserRole } from '../types';
import {
  INITIAL_PARTNERS,
  INITIAL_PRODUCTS,
  INITIAL_FILES,
  DEMO_USERS,
  INITIAL_ORDERS,
  INITIAL_CHATS
} from '../data/mockData';

interface AppContextType {
  currentUser: User;
  allUsers: User[];
  switchUser: (user: User) => void;
  partners: Partner[];
  products: Product[];
  files: PartnerFile[];
  orders: Order[];
  chatThreads: ChatThread[];
  
  // Navigation & View State
  currentView: 'catalog' | 'partner' | 'product' | 'dashboard' | 'orders' | 'security';
  selectedPartnerId: string | null;
  selectedProductId: string | null;
  navigateTo: (view: 'catalog' | 'partner' | 'product' | 'dashboard' | 'orders' | 'security', partnerId?: string, productId?: string) => void;
  
  // RBAC Access Control checks
  canAccessPartnerFiles: (partnerId: string) => boolean;
  canAccessCommunication: (thread: ChatThread) => boolean;
  canAccessOrder: (order: Order) => boolean;
  
  // Partner File Actions
  getPartnerFiles: (partnerId: string) => PartnerFile[];
  uploadPartnerFile: (file: Omit<PartnerFile, 'id' | 'uploadedAt' | 'uploadedBy'>) => void;
  deletePartnerFile: (fileId: string) => void;
  
  // Chat Actions
  activeChatThreadId: string | null;
  openChatForPartner: (partnerId: string, productId?: string) => void;
  closeChat: () => void;
  sendChatMessage: (threadId: string, content: string) => void;
  
  // Commerce & Purchase Action
  placeOrder: (productId: string, selectedSize: string, shippingAddress: string, notes?: string) => { success: boolean; orderId?: string; error?: string };
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  
  // Modals & UI Controls
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isSecurityModalOpen: boolean;
  setIsSecurityModalOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  checkoutProduct: Product | null;
  setCheckoutProduct: (product: Product | null) => void;
  isExportModalOpen: boolean;
  setIsExportModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence in localStorage
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('atelier_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return DEMO_USERS[0]; // Default to Sophia Chen (Client)
  });

  const [partners, setPartners] = useState<Partner[]>(() => {
    const saved = localStorage.getItem('atelier_partners');
    return saved ? JSON.parse(saved) : INITIAL_PARTNERS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('atelier_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [files, setFiles] = useState<PartnerFile[]>(() => {
    const saved = localStorage.getItem('atelier_files');
    return saved ? JSON.parse(saved) : INITIAL_FILES;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('atelier_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [chatThreads, setChatThreads] = useState<ChatThread[]>(() => {
    const saved = localStorage.getItem('atelier_chats');
    return saved ? JSON.parse(saved) : INITIAL_CHATS;
  });

  // Navigation State
  const [currentView, setCurrentView] = useState<'catalog' | 'partner' | 'product' | 'dashboard' | 'orders' | 'security'>('catalog');
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Chat Widget State
  const [activeChatThreadId, setActiveChatThreadId] = useState<string | null>(null);

  // Modals
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('atelier_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('atelier_files', JSON.stringify(files));
  }, [files]);

  useEffect(() => {
    localStorage.setItem('atelier_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('atelier_chats', JSON.stringify(chatThreads));
  }, [chatThreads]);

  const switchUser = (user: User) => {
    setCurrentUser(user);
    // If switching to a partner, automatically suggest navigating to their dashboard or keep current view
    if (user.role === 'partner' && user.partnerId) {
      setSelectedPartnerId(user.partnerId);
    }
  };

  const navigateTo = (view: 'catalog' | 'partner' | 'product' | 'dashboard' | 'orders' | 'security', partnerId?: string, productId?: string) => {
    setCurrentView(view);
    if (partnerId !== undefined) setSelectedPartnerId(partnerId);
    if (productId !== undefined) setSelectedProductId(productId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * RBAC: Can the current user access files of a specific partner?
   * Rule:
   * - Admin can view all partner files.
   * - A partner can ONLY view their own files (user.partnerId === partnerId).
   * - Other partners are strictly denied.
   * - General clients are denied access to private technical files.
   */
  const canAccessPartnerFiles = (partnerId: string): boolean => {
    if (currentUser.role === 'admin') return true;
    if (currentUser.role === 'partner' && currentUser.partnerId === partnerId) return true;
    return false;
  };

  /**
   * RBAC & Privacy Isolation: Can the current user access a specific communication thread?
   * Rule:
   * - Admin: Full supervisory and audit access (True)
   * - Client: Can access if they are the initiator (user.id === thread.clientId)
   * - Partner: Can access ONLY if they are the recipient partner (user.partnerId === thread.partnerId)
   * - NO other partner can see the communication at all!
   */
  const canAccessCommunication = (thread: ChatThread): boolean => {
    if (currentUser.role === 'admin') return true;
    if (currentUser.role === 'client' && currentUser.id === thread.clientId) return true;
    if (currentUser.role === 'partner' && currentUser.partnerId === thread.partnerId) return true;
    return false;
  };

  /**
   * RBAC: Can the current user view an order and its confidential record?
   */
  const canAccessOrder = (order: Order): boolean => {
    if (currentUser.role === 'admin') return true;
    if (currentUser.role === 'client' && currentUser.id === order.clientId) return true;
    if (currentUser.role === 'partner' && currentUser.partnerId === order.partnerId) return true;
    return false;
  };

  const getPartnerFiles = (partnerId: string): PartnerFile[] => {
    if (!canAccessPartnerFiles(partnerId)) {
      return [];
    }
    return files.filter(f => f.partnerId === partnerId);
  };

  const uploadPartnerFile = (fileData: Omit<PartnerFile, 'id' | 'uploadedAt' | 'uploadedBy'>) => {
    const newFile: PartnerFile = {
      ...fileData,
      id: `file-${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0],
      uploadedBy: currentUser.name
    };
    setFiles(prev => [newFile, ...prev]);
  };

  const deletePartnerFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const openChatForPartner = (partnerId: string, productId?: string) => {
    const partner = partners.find(p => p.id === partnerId);
    if (!partner) return;

    // Check if an existing thread exists between this client and partner
    const existingThread = chatThreads.find(
      t => t.partnerId === partnerId && t.clientId === currentUser.id
    );

    if (existingThread) {
      setActiveChatThreadId(existingThread.id);
    } else {
      // Create a fresh thread
      const product = productId ? products.find(p => p.id === productId) : undefined;
      const newThreadId = `thread-${currentUser.id}-${partnerId}-${Date.now()}`;
      const newThread: ChatThread = {
        id: newThreadId,
        partnerId: partner.id,
        partnerName: partner.name,
        clientId: currentUser.id,
        clientName: currentUser.name,
        clientEmail: currentUser.email,
        productId: product?.id,
        productTitle: product?.title,
        productImage: product?.image,
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        lastMessageAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        hasPurchase: false,
        messages: [
          {
            id: `msg-sys-${Date.now()}`,
            senderId: 'system',
            senderName: `${partner.name} Concierge`,
            senderRole: 'partner',
            content: `Welcome to the ${partner.name} bespoke atelier. Our artisan directors are available for sizing inquiries, fabric consultations, and private appointments.`,
            timestamp: 'Just now',
            isSystemNotice: true
          }
        ]
      };
      setChatThreads(prev => [newThread, ...prev]);
      setActiveChatThreadId(newThreadId);
    }
  };

  const closeChat = () => {
    setActiveChatThreadId(null);
  };

  const sendChatMessage = (threadId: string, content: string) => {
    const thread = chatThreads.find(t => t.id === threadId);
    if (!thread) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatThreads(prev =>
      prev.map(t => {
        if (t.id === threadId) {
          return {
            ...t,
            lastMessageAt: 'Just now',
            messages: [...t.messages, newMessage]
          };
        }
        return t;
      })
    );

    // If sent by client, simulate a realistic tailored partner response after 1.5s
    if (currentUser.role === 'client') {
      setTimeout(() => {
        const partner = partners.find(p => p.id === thread.partnerId);
        const replies = [
          `Thank you for your inquiry regarding this piece. We would be pleased to hand-prepare tailored swatches for you.`,
          `Our master patternmaker has received your note. Each silhouette is hand-fitted with bespoke precision.`,
          `We will gladly arrange white-glove direct courier delivery for this commission.`,
          `Understood. We have logged your bespoke specifications with the Paris & Milan ateliers.`
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];

        const partnerReply: ChatMessage = {
          id: `msg-reply-${Date.now()}`,
          senderId: `partner-${thread.partnerId}`,
          senderName: partner ? `${partner.leadDesigner} (${partner.name})` : 'Atelier Director',
          senderRole: 'partner',
          content: randomReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChatThreads(current =>
          current.map(t => {
            if (t.id === threadId) {
              return {
                ...t,
                lastMessageAt: 'Just now',
                messages: [...t.messages, partnerReply]
              };
            }
            return t;
          })
        );
      }, 1400);
    }
  };

  const placeOrder = (productId: string, selectedSize: string, shippingAddress: string, notes?: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return { success: false, error: 'Product not found' };

    const partner = partners.find(p => p.id === product.partnerId);
    if (!partner) return { success: false, error: 'Partner not found' };

    const orderId = `ORD-${partner.id.toUpperCase().slice(0, 5)}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Find or create chat thread with this partner
    let thread = chatThreads.find(t => t.partnerId === product.partnerId && t.clientId === currentUser.id);
    let targetThreadId = thread?.id;

    if (!thread) {
      targetThreadId = `thread-${currentUser.id}-${partner.id}-${Date.now()}`;
      thread = {
        id: targetThreadId,
        partnerId: partner.id,
        partnerName: partner.name,
        clientId: currentUser.id,
        clientName: currentUser.name,
        clientEmail: currentUser.email,
        productId: product.id,
        productTitle: product.title,
        productImage: product.image,
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        lastMessageAt: 'Just now',
        hasPurchase: true,
        orderId: orderId,
        messages: []
      };
      setChatThreads(prev => [thread!, ...prev]);
    }

    const orderNotice: ChatMessage = {
      id: `msg-order-${Date.now()}`,
      senderId: 'system',
      senderName: 'Atelier Security Protocol',
      senderRole: 'admin',
      content: `🔒 CONFIDENTIAL TRANSACTION CONFIRMED: Order #${orderId} (${product.title}, Size: ${selectedSize}) has been registered. Pursuant to strict partner isolation protocols, this communication and customer record are locked solely to ${currentUser.name} and ${partner.name}. No competing partner can view this thread unless authenticated as Platform Admin.`,
      timestamp: 'Just now',
      isSystemNotice: true
    };

    // Update the thread to record the purchase and lockdown
    setChatThreads(prev =>
      prev.map(t => {
        if (t.id === targetThreadId) {
          return {
            ...t,
            hasPurchase: true,
            orderId: orderId,
            productId: product.id,
            productTitle: product.title,
            messages: [...t.messages, orderNotice]
          };
        }
        return t;
      })
    );

    const newOrder: Order = {
      id: orderId,
      clientId: currentUser.id,
      clientName: currentUser.name,
      clientEmail: currentUser.email,
      partnerId: partner.id,
      partnerName: partner.name,
      productId: product.id,
      productTitle: product.title,
      productPrice: product.price,
      productImage: product.image,
      selectedSize,
      shippingAddress,
      notes,
      status: 'Confirmed',
      createdAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      chatThreadId: targetThreadId!,
      confidentialLock: true
    };

    setOrders(prev => [newOrder, ...prev]);

    return { success: true, orderId };
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        allUsers: DEMO_USERS,
        switchUser,
        partners,
        products,
        files,
        orders,
        chatThreads,
        currentView,
        selectedPartnerId,
        selectedProductId,
        navigateTo,
        canAccessPartnerFiles,
        canAccessCommunication,
        canAccessOrder,
        getPartnerFiles,
        uploadPartnerFile,
        deletePartnerFile,
        activeChatThreadId,
        openChatForPartner,
        closeChat,
        sendChatMessage,
        placeOrder,
        updateOrderStatus,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isSecurityModalOpen,
        setIsSecurityModalOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        checkoutProduct,
        setCheckoutProduct,
        isExportModalOpen,
        setIsExportModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
