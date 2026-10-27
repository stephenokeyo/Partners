import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Check, X, Lock, Key, ArrowRight, UserCheck } from 'lucide-react';

export const SecurityMatrixModal: React.FC = () => {
  const { isSecurityModalOpen, setIsSecurityModalOpen, currentUser, switchUser, allUsers } = useApp();

  if (!isSecurityModalOpen) return null;

  const matrixRows = [
    {
      feature: 'Browse Global Catalog & All Products',
      category: 'Public Showcase',
      client: true,
      aurum: true,
      veloce: true,
      serenite: true,
      admin: true,
      ruleText: 'All clients can browse all designer pieces.'
    },
    {
      feature: 'Visit Dedicated Partner Boutique Webpages',
      category: 'Boutique Pages',
      client: true,
      aurum: true,
      veloce: true,
      serenite: true,
      admin: true,
      ruleText: 'Clicking any product redirects client directly to that partner’s bespoke page.'
    },
    {
      feature: 'Chat on Partner Webpages (Pre-Purchase)',
      category: 'Concierge Inquiry',
      client: true,
      aurum: true,
      veloce: true,
      serenite: true,
      admin: true,
      ruleText: 'Clients can chat with chosen partner on any boutique webpage.'
    },
    {
      feature: 'Maison Aurum Proprietary File Vault (Tech Packs, CAD)',
      category: 'Partner File Isolation',
      client: false,
      aurum: true,
      veloce: false,
      serenite: false,
      admin: true,
      ruleText: 'Partners can view ONLY their own files. Competing partners are strictly locked out.'
    },
    {
      feature: 'Atelier Veloce Proprietary Files & Patterns',
      category: 'Partner File Isolation',
      client: false,
      aurum: false,
      veloce: true,
      serenite: false,
      admin: true,
      ruleText: 'Atelier Veloce files are invisible to Maison Aurum and other houses.'
    },
    {
      feature: 'Client Purchase & Communication (Sophia & Aurum Gown)',
      category: 'Purchase Isolation Guarantee',
      client: true, // Sophia
      aurum: true,  // Maison Aurum (Seller)
      veloce: false, // Atelier Veloce (Blocked!)
      serenite: false, // Sérénité Noir (Blocked!)
      admin: true,  // Super Admin (Allowed)
      ruleText: 'CRITICAL: When client purchases, NO competing partner can see the dialogue unless logged in as Admin.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-neutral-950 border border-white/20 rounded max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-neutral-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-2xl text-white font-medium">
                Role-Based Access Control & Privacy Isolation Matrix
              </h3>
              <p className="text-xs text-neutral-400 font-light">
                Verifying partner file vaults, boutique redirects, and cross-partner communication quarantine
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSecurityModalOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-white/10 text-sm"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Active Persona Callout */}
          <div className="p-4 bg-white/[0.03] border border-white/10 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div>
              <span className="text-[#a1a1aa] uppercase text-[10px] tracking-wider block">Currently Testing As:</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c5a059]" />
                <strong className="text-white text-sm">{currentUser.name}</strong>
                <span className="text-[#c5a059] font-mono uppercase text-[11px]">
                  ({currentUser.role === 'partner' ? currentUser.partnerName : currentUser.role})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-neutral-400 text-[11px]">Quick Switch:</span>
              {allUsers.map(u => (
                <button
                  key={u.id}
                  onClick={() => switchUser(u)}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                    currentUser.id === u.id
                      ? 'bg-[#c5a059] text-black font-semibold'
                      : 'bg-white/5 hover:bg-white/10 text-neutral-300'
                  }`}
                >
                  {u.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* The Matrix Table */}
          <div className="overflow-x-auto border border-white/10 rounded">
            <table className="w-full text-xs text-left divide-y divide-white/10">
              <thead className="bg-neutral-900/90 text-neutral-300 uppercase text-[10px] font-mono tracking-wider">
                <tr>
                  <th className="py-3 px-4">Feature / Resource</th>
                  <th className="py-3 px-3 text-center">Client (Sophia)</th>
                  <th className="py-3 px-3 text-center">Partner: Aurum</th>
                  <th className="py-3 px-3 text-center">Partner: Veloce</th>
                  <th className="py-3 px-3 text-center">Partner: Sérénité</th>
                  <th className="py-3 px-3 text-center">Super Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-neutral-950">
                {matrixRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-medium text-white block">{row.feature}</span>
                      <span className="text-[11px] text-neutral-400 font-light">{row.ruleText}</span>
                    </td>

                    {/* Client */}
                    <td className="py-3 px-3 text-center">
                      {row.client ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                          <X className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </td>

                    {/* Partner: Aurum */}
                    <td className="py-3 px-3 text-center">
                      {row.aurum ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-red-500/10 text-red-400 border border-red-500/20" title="Quarantined">
                          <Lock className="w-3 h-3" />
                        </span>
                      )}
                    </td>

                    {/* Partner: Veloce */}
                    <td className="py-3 px-3 text-center">
                      {row.veloce ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-red-500/10 text-red-400 border border-red-500/20" title="Quarantined">
                          <Lock className="w-3 h-3" />
                        </span>
                      )}
                    </td>

                    {/* Partner: Sérénité */}
                    <td className="py-3 px-3 text-center">
                      {row.serenite ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-red-500/10 text-red-400 border border-red-500/20" title="Quarantined">
                          <Lock className="w-3 h-3" />
                        </span>
                      )}
                    </td>

                    {/* Super Admin */}
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-amber-500/15 text-amber-300 border border-amber-500/40 font-bold" title="Admin Omni-Access">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-neutral-900 border border-white/10 rounded space-y-2 text-xs">
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider text-[#c5a059]">
              How the System Enforces Your Exact Requirements:
            </h4>
            <ol className="list-decimal pl-4 space-y-1.5 text-neutral-300 font-light leading-relaxed">
              <li>
                <strong>Partner Webpages Included:</strong> Each partner has a full bespoke webpage with their brand aesthetic, lookbook, and product catalog.
              </li>
              <li>
                <strong>View Only Their Files:</strong> In the Partner Dashboard, each house is isolated to their own directory. If Marco Rossi from Atelier Veloce tries to browse Maison Aurum’s files, a 403 Access Denied block occurs.
              </li>
              <li>
                <strong>Global Catalog to Partner Redirect:</strong> Clients view all products together, and clicking any piece routes directly into that partner’s page.
              </li>
              <li>
                <strong>Chat on Chosen Webpage:</strong> The live concierge chat is embedded on every partner page for direct artisan conversation.
              </li>
              <li>
                <strong>Post-Purchase Communication Quarantine:</strong> Once an order is made, that communication thread is locked to only the buyer and the seller partner. Competing partners have zero read or write access unless authenticated as Platform Admin.
              </li>
            </ol>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 flex items-center justify-end bg-neutral-900/60">
          <button
            onClick={() => setIsSecurityModalOpen(false)}
            className="px-5 py-2 bg-[#c5a059] hover:bg-[#d4b069] text-black font-semibold text-xs tracking-wider uppercase rounded"
          >
            Close Matrix Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
