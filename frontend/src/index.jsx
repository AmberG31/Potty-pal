import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter as Router } from 'react-router-dom';
import App from './components/app/App';
import AuthContextProvider from './context/AuthContext';
import ModalContextProvider from './context/ModalContext';
import ApiUrlContextProvider from './context/ApiUrlContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <ApiUrlContextProvider>
      <AuthContextProvider>
        <ModalContextProvider>
          <App />
        </ModalContextProvider>
      </AuthContextProvider>
    </ApiUrlContextProvider>
  </Router>
);
