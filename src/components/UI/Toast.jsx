import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiInfo, FiAlertCircle, FiX } from 'react-icons/fi';

// Toast 上下文
const ToastContext = React.createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [toastId, setToastId] = useState(0);

  // 显示提示
  const showToast = (message, type = 'info', duration = 3000) => {
    const id = toastId;
    setToastId(prev => prev + 1);

    const newToast = {
      id,
      message,
      type,
      timestamp: Date.now()
    };

    setToasts(prev => [...prev, newToast]);

    // 自动关闭提示
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  // 移除提示
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };



  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`p-4 rounded-lg shadow-lg flex items-center gap-3 ${
              toast.type === 'success' ? 'bg-green-50 border-l-4 border-green-500 text-green-800'
              : toast.type === 'error' ? 'bg-red-50 border-l-4 border-red-500 text-red-800'
              : toast.type === 'warning' ? 'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800'
              : 'bg-blue-50 border-l-4 border-blue-500 text-blue-800'
            }`}
          >
            {toast.type === 'success' && <FiCheckCircle className="text-green-500" size={20} />}
            {toast.type === 'error' && <FiAlertCircle className="text-red-500" size={20} />}
            {toast.type === 'warning' && <FiAlertCircle className="text-yellow-500" size={20} />}
            {toast.type === 'info' && <FiInfo className="text-blue-500" size={20} />}

            <p className="flex-grow text-sm">{toast.message}</p>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <FiX size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastProvider;