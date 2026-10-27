import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { PersonaBar } from './components/PersonaBar';
import { Navbar } from './components/Navbar';
import { ProductCatalog } from './components/ProductCatalog';
import { PartnerWebpage } from './components/PartnerWebpage';
import { PartnerDashboard } from './components/PartnerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { OrdersView } from './components/OrdersView';
import { LiveChatWidget } from './components/LiveChatWidget';
import { CheckoutModal } from './components/CheckoutModal';
import { SecurityMatrixModal } from './components/SecurityMatrixModal';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { currentView, currentUser, selectedPartnerId } = useApp();

  return (
    <div className="min-h-screen bg-[#0c0d0e] flex flex-col font-sans selection:bg-[#c5a059] selection:text-black">
      {/* Multi-role Persona Switching & RBAC indicator bar */}
      <PersonaBar />

      {/* Main Top Bar navigation adhering to Top Bar Contract */}
      <Navbar />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {currentView === 'catalog' && <ProductCatalog />}
        {currentView === 'partner' && <PartnerWebpage />}
        {currentView === 'dashboard' && (
          currentUser.role === 'admin' && !selectedPartnerId ? (
            <AdminDashboard />
          ) : (
            <PartnerDashboard />
          )
        )}
        {currentView === 'orders' && <OrdersView />}
      </main>

      {/* Persistent Footer */}
      <Footer />

      {/* Modals and Floating Interactive Widgets */}
      <LiveChatWidget />
      <CheckoutModal />
      <SecurityMatrixModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
