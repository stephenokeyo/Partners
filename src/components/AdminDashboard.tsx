import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  ShieldCheck,
  FolderLock,
  MessageSquare,
  Lock,
  ShoppingBag,
  Eye,
  FileText,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    partners,
    files,
    orders,
    chatThreads,
    navigateTo,
    switchUser,
    allUsers
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'communications' | 'files' | 'orders'>('overview');
  const [inspectedThreadId, setInspectedThreadId] = useState<string | null>(chatThreads[0]?.id || null);

  // Calculate platform totals
  const totalGMV = orders.reduce((sum, o) => sum + o.productPrice, 0);
  const purchasedThreads = chatThreads.filter(t => t.hasPurchase);

  const inspectedThread = chatThreads.find(t => t.id === inspectedThreadId) || chatThreads[0];

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-[#f4f2ee]">
      {/* Top Banner */}
      <section className="bg-neutral-900 border-b border-amber-500/20 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 uppercase tracking-widest font-mono mb-1">
              <Shield className="w-4 h-4" />
              <span>Executive Platform Control & Audit Oversight</span>
            </div>
            <h1 className="text-3xl font-editorial font-medium text-white">
              Global Platform Executive Console
            </h1>
            <p className="text-xs text-neutral-400 font-light mt-0.5">
              Super Admin clearance: Omni-visibility over all partner houses, client communications, and isolated vaults
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Full Audit Clearance Active</span>
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="max-w-7xl mx-auto flex items-center gap-4 mt-6 pt-2 border-t border-white/5 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2 border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'overview' ? 'border-amber-400 text-white font-semibold' : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <span>Guild Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('communications')}
            className={`pb-2 border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'communications' ? 'border-amber-400 text-white font-semibold' : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-sky-400" />
            <span>Universal Communications Auditor</span>
            <span className="font-mono text-[11px] text-sky-400">({chatThreads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('files')}
            className={`pb-2 border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'files' ? 'border-amber-400 text-white font-semibold' : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <FolderLock className="w-4 h-4 text-[#c5a059]" />
            <span>All Partner Files Registry</span>
            <span className="font-mono text-[11px] text-[#c5a059]">({files.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-2 border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'orders' ? 'border-amber-400 text-white font-semibold' : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <span>All Orders & Transactions</span>
            <span className="font-mono text-[11px] text-emerald-400">({orders.length})</span>
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded bg-neutral-950 border border-white/10 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400">Total Guild GMV</span>
                <p className="text-2xl font-mono font-medium text-white">€{totalGMV.toLocaleString()}</p>
                <span className="text-[10px] text-neutral-500">Across {orders.length} bespoke commissions</span>
              </div>

              <div className="p-5 rounded bg-neutral-950 border border-white/10 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400">Partner Houses</span>
                <p className="text-2xl font-mono font-medium text-[#c5a059]">{partners.length}</p>
                <span className="text-[10px] text-neutral-500">All operating dedicated boutique pages</span>
              </div>

              <div className="p-5 rounded bg-neutral-950 border border-white/10 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400">Proprietary Files</span>
                <p className="text-2xl font-mono font-medium text-emerald-400">{files.length}</p>
                <span className="text-[10px] text-neutral-500">Isolated across 4 partner vaults</span>
              </div>

              <div className="p-5 rounded bg-neutral-950 border border-white/10 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400">Confidential Purchases</span>
                <p className="text-2xl font-mono font-medium text-amber-400">{purchasedThreads.length}</p>
                <span className="text-[10px] text-neutral-500">Communications sealed from other partners</span>
              </div>
            </div>

            {/* The 4 Houses Status Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-editorial text-xl text-white font-medium">
                  Active Partner Houses
                </h3>
                <span className="text-xs text-neutral-400">Click to inspect vault or impersonate director</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {partners.map(p => {
                  const houseFiles = files.filter(f => f.partnerId === p.id);
                  const houseOrders = orders.filter(o => o.partnerId === p.id);
                  const partnerDirector = allUsers.find(u => u.partnerId === p.id);

                  return (
                    <div
                      key={p.id}
                      className="p-5 rounded bg-neutral-950 border border-white/10 space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#c5a059] font-medium uppercase text-[10px] tracking-wider">{p.location}</span>
                          <span className="font-mono text-neutral-500 text-[10px]">Est. {p.founded}</span>
                        </div>
                        <h4 className="font-editorial text-lg text-white font-medium">{p.name}</h4>
                        <p className="text-xs text-neutral-400 line-clamp-2">{p.specialty}</p>

                        <div className="pt-2 text-[11px] text-neutral-300 space-y-1 border-t border-white/5">
                          <div className="flex justify-between">
                            <span>Vault Files:</span>
                            <span className="font-mono text-white font-medium">{houseFiles.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Commissions:</span>
                            <span className="font-mono text-white font-medium">{houseOrders.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Lead Artisan:</span>
                            <span className="text-neutral-400">{p.leadDesigner}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 space-y-2">
                        <button
                          onClick={() => navigateTo('dashboard', p.id)}
                          className="w-full py-1.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded text-xs transition-colors flex items-center justify-center gap-1.5"
                        >
                          <FolderLock className="w-3.5 h-3.5 text-[#c5a059]" />
                          <span>Inspect Vault</span>
                        </button>

                        {partnerDirector && (
                          <button
                            onClick={() => switchUser(partnerDirector)}
                            className="w-full py-1.5 px-3 bg-[#c5a059]/10 hover:bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/30 rounded text-[11px] transition-colors flex items-center justify-center gap-1"
                          >
                            <span>Test Login as {partnerDirector.name.split(' ')[0]}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB: COMMUNICATIONS AUDITOR (Fulfilling admin-only privilege) */}
        {activeTab === 'communications' && (
          <div className="space-y-6">
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded text-xs text-amber-200">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Admin Privacy Oversight Privilege:</strong> Competing partners are strictly locked out of client purchase threads. As Platform Admin, you possess universal oversight to inspect dialogues, verify trade compliance, and mediate bespoke commissions.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[550px]">
              {/* Thread selector */}
              <div className="lg:col-span-5 bg-neutral-950 border border-white/10 rounded flex flex-col overflow-hidden">
                <div className="p-3.5 border-b border-white/10 text-xs font-semibold text-neutral-300">
                  All Client-Partner Communication Channels
                </div>
                <div className="flex-1 overflow-y-auto divide-y divide-white/5">
                  {chatThreads.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setInspectedThreadId(t.id)}
                      className={`w-full text-left p-3.5 transition-colors flex flex-col gap-1 ${
                        inspectedThreadId === t.id ? 'bg-white/10 border-l-2 border-amber-400' : 'hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white">{t.clientName}</span>
                        <span className="text-[10px] text-neutral-500 font-mono">{t.lastMessageAt}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#c5a059] font-medium">{t.partnerName}</span>
                        {t.hasPurchase ? (
                          <span className="text-emerald-400 font-mono text-[10px] flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" />
                            <span>Purchase Sealed</span>
                          </span>
                        ) : (
                          <span className="text-neutral-500 text-[10px]">Inquiry</span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-400 truncate">
                        {t.messages[t.messages.length - 1]?.content || 'Empty channel'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Thread Inspector Window */}
              <div className="lg:col-span-7 bg-neutral-950 border border-white/10 rounded flex flex-col overflow-hidden">
                {inspectedThread ? (
                  <>
                    <div className="p-3.5 border-b border-white/10 bg-white/[0.02] flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{inspectedThread.clientName}</span>
                          <span className="text-neutral-500">↔</span>
                          <span className="text-[#c5a059] font-semibold">{inspectedThread.partnerName}</span>
                        </div>
                        <span className="text-[11px] text-neutral-400">
                          Channel ID: <span className="font-mono">{inspectedThread.id}</span>
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded text-[10px] font-mono uppercase">
                          Admin Decryption View
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                      {inspectedThread.messages.map(msg => (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${
                            msg.isSystemNotice
                              ? 'items-center my-2'
                              : msg.senderRole === 'partner'
                              ? 'items-end'
                              : 'items-start'
                          }`}
                        >
                          {msg.isSystemNotice ? (
                            <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs rounded text-center max-w-lg leading-relaxed">
                              {msg.content}
                            </div>
                          ) : (
                            <div
                              className={`max-w-[80%] rounded px-3.5 py-2.5 text-xs leading-relaxed ${
                                msg.senderRole === 'partner'
                                  ? 'bg-[#c5a059] text-black font-medium'
                                  : 'bg-white/10 text-neutral-200 border border-white/10'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3 text-[10px] opacity-75 mb-1">
                                <span className="font-semibold">{msg.senderName}</span>
                                <span>{msg.timestamp}</span>
                              </div>
                              <p>{msg.content}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center text-xs text-neutral-500">
                    Select a channel to inspect.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB: ALL FILES */}
        {activeTab === 'files' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-editorial text-xl text-white font-medium">
                Universal Partner Document Vaults
              </h3>
              <span className="text-xs text-neutral-400 font-mono">
                {files.length} total technical files registered across {partners.length} houses
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {files.map(file => {
                const house = partners.find(p => p.id === file.partnerId);

                return (
                  <div
                    key={file.id}
                    className="p-5 rounded bg-neutral-950 border border-white/10 space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                        <span className="text-[#c5a059] font-medium uppercase text-[10px] tracking-wider">
                          {house?.name || file.partnerId}
                        </span>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-neutral-300">
                          {file.classification}
                        </span>
                      </div>

                      <h4 className="text-sm font-semibold text-white break-words">{file.fileName}</h4>
                      <p className="text-xs text-neutral-400 line-clamp-2 mt-1.5 font-light">{file.notes}</p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                      <span>Size: {file.fileSize}</span>
                      <span>By: {file.uploadedBy}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB: ALL ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-editorial text-xl text-white font-medium">
                Guild Transaction Ledger
              </h3>
              <span className="text-xs text-neutral-400 font-mono">
                Total Volume: €{totalGMV.toLocaleString()}
              </span>
            </div>

            {orders.map(order => (
              <div
                key={order.id}
                className="p-4 rounded bg-neutral-950 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={order.productImage}
                    alt={order.productTitle}
                    className="w-16 h-16 rounded object-cover border border-white/10"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[#c5a059] font-medium">{order.id}</span>
                      <span className="text-white/20">·</span>
                      <span className="text-neutral-400">{order.partnerName}</span>
                    </div>
                    <h4 className="font-editorial text-base text-white font-medium">{order.productTitle}</h4>
                    <p className="text-neutral-400">
                      Buyer: <strong className="text-white">{order.clientName}</strong> · Size: {order.selectedSize}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-mono font-medium text-white block">
                    €{order.productPrice.toLocaleString()}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-emerald-400 font-mono text-[10px] border border-white/10 uppercase">
                    Status: {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
