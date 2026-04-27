import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Menu, X, Play } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink, type PoolType } from '@/src/constants';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

export { Logo } from './Logo';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Saiba Mais', path: '/saibamais' },
    { name: 'Planos', path: '/planos' },
    { name: 'Adquirir', path: '/sabermais' },
    { name: 'Blog', path: '/blog' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Contato', path: '/contato' },
  ];

  const isBlog = location.pathname === '/' || location.pathname.startsWith('/blog');

  return (
    <nav className={`h-16 flex items-center border-b shadow-sm sticky top-0 z-50 transition-smooth ${isBlog ? 'bg-[#0a0f1c] border-[#1f2a3e]' : 'bg-white border-slate-200'}`}>
      <div className="container-sleek flex justify-between items-center w-full">
        <div className="flex items-center gap-8">
          <Logo isDark={isBlog} />
          
          {/* Desktop Links */}
          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-smooth ${
                  location.pathname === link.path 
                    ? (isBlog ? 'text-brand-accent font-bold underline' : 'text-brand-accent font-bold underline') 
                    : (isBlog ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-brand-accent')
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${isBlog ? 'text-white' : 'text-slate-600'} p-2`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`absolute top-16 left-0 right-0 md:hidden border-b shadow-lg ${isBlog ? 'bg-[#0a0f1c] border-[#1f2a3e]' : 'bg-white border-slate-200'}`}
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-3 text-sm font-medium rounded-md ${isBlog ? 'text-slate-300 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-2 border-t border-slate-100">
                <a
                  href={getWhatsAppLink("Olá, gostaria de saber mais informações.", "TESTE")}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-brand-success text-white px-4 py-3 rounded-md text-center font-bold text-xs uppercase"
                >
                  Suporte WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  const location = useLocation();
  const isBlog = location.pathname === '/' || location.pathname.startsWith('/blog');

  return (
    <footer className={`w-full border-t py-12 mt-auto transition-smooth ${isBlog ? 'bg-[#070b14] border-[#1f2a3e]' : 'bg-white border-slate-200'}`}>
      <div className="container-sleek grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="text-[11px] leading-relaxed">
          <strong className={`${isBlog ? 'text-white' : 'text-brand-primary'} block mb-2 uppercase tracking-widest opacity-50`}>Transparência</strong>
          <p className={isBlog ? 'text-slate-500' : 'text-slate-500'}>
            O <strong>{SITE_CONFIG.name}</strong> é um portal informativo e de prestação de serviços digitais. {SITE_CONFIG.footerDisclaimer}
          </p>
        </div>
        <div className="text-[11px] leading-relaxed">
          <strong className={`${isBlog ? 'text-white' : 'text-brand-primary'} block mb-2 uppercase tracking-widest opacity-50`}>Contato & Suporte</strong>
          <div className={isBlog ? 'text-slate-500' : 'text-slate-500'}>
            Responsável: {SITE_CONFIG.name}<br />
            E-mail: {SITE_CONFIG.email}<br />
            {SITE_CONFIG.address}<br />
          </div>
          <div className="mt-2 space-y-1">
            <a href={getWhatsAppLink("Olá, quero falar com as vendas.", "TESTE")} target="_blank" rel="noreferrer" className="text-brand-accent font-bold hover:underline block">WhatsApp VENDAS</a>
            <a href={getWhatsAppLink("Olá, preciso de suporte financeiro.", "COMPRA")} target="_blank" rel="noreferrer" className="text-slate-500 font-bold hover:underline block">WhatsApp SUPORTE</a>
          </div>
        </div>
        <div className="text-[11px] leading-relaxed">
          <strong className={`${isBlog ? 'text-white' : 'text-brand-primary'} block mb-2 uppercase tracking-widest opacity-50`}>Legal</strong>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 font-bold text-brand-accent underline">
            <Link to="/privacidade">Privacidade</Link>
            <Link to="/termos">Termos de Uso</Link>
            <Link to="/aviso-legal">Aviso Legal</Link>
            <Link to="/direitos-autorais">Direitos Autorais</Link>
          </div>
          <div className="text-slate-400 mt-2">
            {SITE_CONFIG.copyright}<br />
            CNPJ: {SITE_CONFIG.cnpj}
          </div>
        </div>
      </div>
      <div className={`border-t mt-8 pt-6 text-[10px] text-center leading-relaxed ${isBlog ? 'border-[#1f2a3e] text-slate-600' : 'border-slate-100 text-slate-400'}`}>
        <strong>Filmes My View</strong> é um guia informativo independente. Não vendemos IPTV, listas de canais, streaming próprio ou acesso a filmes, séries e canais. Apenas orientamos usuários sobre plataformas oficiais e legais.
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  const location = useLocation();
  // Se estiver na página de teste, usa TESTE, se estiver em comprar usa COMPRA, se estiver em completo usa COMPLETO
  let pool: PoolType = "TESTE";
  if (location.pathname === '/planos') pool = "COMPRA";
  if (location.pathname === '/sabermais') pool = "COMPLETO";
  
  return (
    <motion.a
      href={getWhatsAppLink("Olá, preciso de ajuda agora.", pool)}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 bg-brand-success text-white p-4 rounded-full shadow-lg hover:opacity-90"
      title="Falar no WhatsApp"
    >
      <MessageCircle size={28} />
    </motion.a>
  );
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = React.useState({ h: 0, m: 5, s: 0, ds: 0 });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.ds > 0) return { ...prev, ds: prev.ds - 1 };
        if (prev.s > 0) return { ...prev, s: prev.s - 1, ds: 9 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59, ds: 9 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59, ds: 9 };
        return prev;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-sleek text-sm md:text-base">
      {String(timeLeft.h).padStart(2, '0')}:
      {String(timeLeft.m).padStart(2, '0')}:
      {String(timeLeft.s).padStart(2, '0')}:
      {String(timeLeft.ds)}
    </div>
  );
}
