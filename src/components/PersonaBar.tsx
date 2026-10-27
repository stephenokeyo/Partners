import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, ShieldAlert, UserCheck, Key, Lock, Sparkles } from 'lucide-react';

export const PersonaBar: React.FC = () => {
  const { currentUser, allUsers, switchUser, setIsSecurityModalOpen, setIsLoginModalOpen } = useApp();

  return (
    <div className="bg-[#121417] border-b border-white/10 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Current Active Persona & Role */}
        <div className="flex items-center gap-2">
          <span className="text-[#a1a1aa] uppercase tracking-wider text-[11px] font-medium flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-[#c5a059]" />
            Active Role:
          </span>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded px-2 py-1">
            <span className="w-5 h-5 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center font-bold text-[10px]">
              {currentUser.avatar}
            </span>
            <span className="font-semibold text-white">{currentUser.name}</span>
            <span className="text-white/40">·</span>
            <span className={`uppercase font-mono text-[10px] tracking-wider ${
              currentUser.role === 'admin'
                ? 'text-amber-400 font-bold'
                : currentUser.role === 'partner'
                ? 'text-emerald-400 font-medium'
                : 'text-sky-300 font-medium'
            }`}>
              {currentUser.role === 'admin' ? 'Super Admin (Omni-Access)' : currentUser.role === 'partner' ? `Partner (${currentUser.partnerName})` : 'Client (Buyer)'}
            </span>
          </div>

          <span className="hidden lg:inline text-white/50 text-[11px] ml-2">
            {currentUser.role === 'client' && 'Can browse all houses, visit partner boutiques, chat & purchase securely.'}
            {currentUser.role === 'partner' && 'Strictly isolated to own files, boutique, and direct client chats. Blocked from other partners.'}
            {currentUser.role === 'admin' && 'Omni-access to inspect all communications, all partner files, and platform audit logs.'}
          </span>
        </div>

        {/* Switch Persona Controls */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[#71717a] text-[11px] mr-1 hidden sm:inline">Test Persona:</span>
          {allUsers.map((user) => {
            const isActive = currentUser.id === user.id;
            return (
              <button
                key={user.id}
                onClick={() => switchUser(user)}
                title={user.title}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#c5a059] text-black font-semibold shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/5'
                }`}
              >
                <span>{user.name.split(' ')[0]}</span>
                <span className="text-[9px] opacity-75 uppercase">({user.role === 'partner' ? user.partnerName?.split(' ')[0] : user.role})</span>
              </button>
            );
          })}

          <div className="h-4 w-[1px] bg-white/10 mx-1 hidden sm:block" />

          {/* Privacy Proof / Security Matrix Button */}
          <button
            onClick={() => setIsSecurityModalOpen(true)}
            className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded text-[11px] font-medium flex items-center gap-1 transition-colors whitespace-nowrap"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>RBAC & Privacy Matrix</span>
          </button>
        </div>
      </div>
    </div>
  );
};
