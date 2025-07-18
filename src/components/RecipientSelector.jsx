import React from 'react';
import { motion } from 'framer-motion';


const RecipientSelector = ({ recipients, selectedRecipient, onSelectRecipient }) => {
  // 按类别分组对象
  const groupedRecipients = recipients.reduce((groups, recipient) => {
    const category = recipient.category || 'other';
    if (!groups[category]) groups[category] = [];
    groups[category].push(recipient);
    return groups;
  }, {});

  // 类别显示名称映射
  const categoryNames = {
    family: '家人',
    friend: '朋友',
    colleague: '同事',
    other: '其他'
  };

  const selectedRecipientName = recipients.find(r => r.id === selectedRecipient)?.name;

  return (
    <motion.div
  className="w-full mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: 0.1 }}
>
      <div className="mb-3 text-center">
          <span className="text-lg font-medium text-primary dark:text-primary-light">
               请选择收信对象类型 {selectedRecipientName ? `- 当前: ${selectedRecipientName}` : ''}
             </span>
          </div>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {Object.entries(groupedRecipients).map(([category, items]) => (
              <div key={category} className="relative group">
                <button className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 text-sm whitespace-nowrap">
                  {categoryNames[category] || category}
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 hidden group-hover:block z-10 border border-gray-200 dark:border-gray-700">
                  {items.map(recipient => (
                    <button
                      key={recipient.id}
                      onClick={() => onSelectRecipient(recipient.id)}
                      className={`w-full text-left px-3 py-1.5 rounded text-sm transition-all ${selectedRecipient === recipient.id
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 border-l-2 border-transparent hover:border-blue-500'}
                      `}
                    >
                      <div className="font-medium">{recipient.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{recipient.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {selectedRecipientName && (
            <div className="text-sm font-medium text-primary dark:text-primary-light mt-2">
              已选择: {selectedRecipientName}
            </div>
          )}
        </div>
  </motion.div>
};

export default RecipientSelector;