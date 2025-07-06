import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './components/UI/Toast';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'), {
  onRecoverableError: (error) => {
    console.error('Recoverable error occurred:', error);
    // 可以在这里添加错误上报或用户提示逻辑
  }
});
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>
);