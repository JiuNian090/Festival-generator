import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUserPlus, FiSearch, FiCheck, FiX } from 'react-icons/fi';

const RecipientSelector = ({ onSelectRecipient, selectedRecipient }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [customRecipient, setCustomRecipient] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [recentRecipients, setRecentRecipients] = useState([]);

  // 常用祝福对象类型
  const recipientTypes = [
    { id: 'family', name: '家人', examples: ['父母', '祖父母', '兄弟姐妹', '子女'] },
    { id: 'friends', name: '朋友', examples: ['好友', '同学', '闺蜜', '发小'] },
    { id: 'colleagues', name: '同事', examples: ['老板', '下属', '团队成员', '合作伙伴'] },
    { id: 'teachers', name: '师长', examples: ['老师', '导师', '前辈', '恩师'] },
    { id: 'lovers', name: '恋人', examples: ['爱人', '男/女朋友', '配偶'] },
    { id: 'customers', name: '客户', examples: ['客户', '合作伙伴', '供应商'] }
  ];

  // 加载最近使用的收件人
  useEffect(() => {
    try {
      const savedRecipients = localStorage.getItem('recentRecipients');
      if (savedRecipients) {
        setRecentRecipients(JSON.parse(savedRecipients));
      }
    } catch (error) {
      console.error('Failed to load recent recipients:', error);
    }
  }, []);

  // 保存最近使用的收件人
  const saveRecentRecipient = (recipient) => {
    if (!recipient || !recipient.trim()) return;

    const updatedRecipients = [
      recipient,
      ...recentRecipients.filter(r => r !== recipient)
    ].slice(0, 10); // 只保留最近10个

    setRecentRecipients(updatedRecipients);
    localStorage.setItem('recentRecipients', JSON.stringify(updatedRecipients));
  };

  // 选择收件人
  const handleSelectRecipient = (recipientName) => {
    onSelectRecipient(recipientName);
    saveRecentRecipient(recipientName);
  };

  // 处理自定义收件人添加
  const handleAddCustomRecipient = () => {
    if (customRecipient.trim()) {
      handleSelectRecipient(customRecipient.trim());
      setCustomRecipient('');
      setShowCustomInput(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 搜索框 */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="搜索祝福对象..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* 分类标签 */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin">
        {['all', 'family', 'friends', 'colleagues', 'teachers', 'recent'].map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${activeCategory === category ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          >
            {category === 'all' ? '全部' :
             category === 'family' ? '家人' :
             category === 'friends' ? '朋友' :
             category === 'colleagues' ? '同事' :
             category === 'teachers' ? '师长' : '最近使用'}
          </button>
        ))}
      </div>

      {/* 分类内容 */}
      <div className="space-y-4">
        {activeCategory === 'recent' ? (
          // 最近使用的收件人
          <div className="space-y-2">
            {recentRecipients.length > 0 ? (
              recentRecipients.map((recipient, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectRecipient(recipient)}
                  className={`p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors ${selectedRecipient === recipient ? 'bg-primary/10 border-primary/30' : ''}`}
                >
                  <div className="flex justify-between items-center">
                    <span>{recipient}</span>
                    <FiCheck className="text-primary" size={16} />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                暂无最近使用的收件人
              </div>
            )}
          </div>
        ) : activeCategory === 'all' ? (
          // 全部分类视图
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recipientTypes.map(category => (
              <div key={category.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="font-medium mb-3 font-source-sans">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.examples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectRecipient(example)}
                      className="px-3 py-1 text-sm rounded-full border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // 特定分类视图
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-medium mb-4 font-source-sans capitalize">
              {activeCategory === 'family' && '家人'}
              {activeCategory === 'friends' && '朋友'}
              {activeCategory === 'colleagues' && '同事'}
              {activeCategory === 'teachers' && '师长'}
            </h3>
            <div className="space-y-3">
              {recipientTypes.find(cat => cat.id === activeCategory)?.examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectRecipient(example)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${selectedRecipient === example ? 'bg-primary/10 border-l-4 border-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  {example}
                </button>
              ))}

              {/* 添加自定义按钮 */}
              <button
                onClick={() => setShowCustomInput(true)}
                className="w-full text-left p-3 rounded-lg text-primary border border-dashed border-gray-300 dark:border-gray-600 hover:border-primary/50 transition-colors"
              >
                <FiUserPlus className="inline mr-2" /> 添加自定义对象
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 自定义收件人输入框 */}
      {showCustomInput && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="输入自定义祝福对象"
              value={customRecipient}
              onChange={(e) => setCustomRecipient(e.target.value)}
              className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              autoFocus
            />
            <button
              onClick={handleAddCustomRecipient}
              disabled={!customRecipient.trim()}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:bg-gray-300"
            >
              添加
            </button>
            <button
              onClick={() => setShowCustomInput(false)}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <FiX size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default RecipientSelector;