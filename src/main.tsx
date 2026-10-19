// GestAuto: precisa ser o primeiro import (captura a URL de chegada antes do React).
import './gestauto/mkt';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {WhatsAppModal} from './components/WhatsAppModal';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <WhatsAppModal />
  </StrictMode>,
);
