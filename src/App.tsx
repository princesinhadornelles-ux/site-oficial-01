import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar, Footer, WhatsAppButton } from './components/Shared';
import { BlogHome } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { TestePage } from './pages/Teste';
import { ComprarPage } from './pages/Comprar';
import { CompletoPage } from './pages/Completo';
import { PrivacyPage, TermsPage, AboutPage, ContactPage } from './pages/Legal';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/saibamais' || location.pathname === '/planos' || location.pathname === '/sabermais';
  const isTestePage = location.pathname === '/saibamais';
  const isLandingWithWhatsApp = location.pathname === '/saibamais' || location.pathname === '/sabermais';

  return (
    <div className="flex flex-col min-h-screen">
      {!isLandingPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<BlogHome />} />
          <Route path="/blog" element={<BlogHome />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/saibamais" element={<TestePage />} />
          <Route path="/planos" element={<ComprarPage />} />
          <Route path="/sabermais" element={<CompletoPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/privacidade" element={<PrivacyPage />} />
          <Route path="/termos" element={<TermsPage />} />
        </Routes>
      </main>
      {!isLandingPage && <Footer />}
      {isLandingWithWhatsApp && <WhatsAppButton />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}
