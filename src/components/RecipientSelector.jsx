import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from '../icons';

const RecipientSelector = ({ recipients, selectedRecipient, onSelectRecipient }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const selectedRecipientName = recipients.find(r => r.id === selectedRecipient)?.name;

  return (
    <motion.div
  className="w-full mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: 0.1 }}
>
      <label className="block text-lg font-medium text-primary dark:text-primary-light text-center mb-3">
        <div onClick={() => setIsExpanded(!isExpanded)} className="p-6 cursor-pointer flex justify-between items-center">
          <label className="block text-lg font-medium text-primary dark:text-primary-light">
            选择对象 {selectedRecipientName ? `- ${selectedRecipientName}` : ''}
          </label>
          <ChevronDownIcon className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} />
        </div>
        <div className={`px-6 pb-6 transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 justify-items-stretch mt-2">
        {recipients.map(recipient => (
          <button
            key={recipient.id}
            onClick={() => onSelectRecipient(recipient.id)}
            className={`p-3 rounded-lg text-left transition-all w-full border ${selectedRecipient === recipient.id
              ? 'border-primary bg-primary/10 dark:bg-primary/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'}
            `}
          >
            <div className="font-medium mb-1">{recipient.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{recipient.description}</div>
          </button>
        ))}</div>
      </div>
    </label>
  </motion.div> );
};

export default RecipientSelector;