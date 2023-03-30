import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/App';
import AuthContextProvider from './context/AuthContext';
import ModalContextProvider from './context/ModalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <ModalContextProvider>
        <App />
      </ModalContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
