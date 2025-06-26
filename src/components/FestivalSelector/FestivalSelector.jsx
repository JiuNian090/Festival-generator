import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import festivals from '../../data/festivals';

const FestivalSelector = ({ onSelectFestival, selectedFestivalId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredFestivals, setFilteredFestivals] = useState([]);
  const [showCustomFestival, setShowCustomFestival] = useState(false);
  const [customFestivalName, setCustomFestivalName] = useState('');
  const [customFestivalElements, setCustomFestivalElements] = useState('');

  // 分类节日数据
  const categories = [
    { id: 'all', name: '全部节日' },
    { id: 'traditional', name: '传统节日' },
    { id: 'national', name: '法定节日' },
    { id: 'professional', name: '特色节日' },
    { id: 'custom', name: '自定义节日' }
  ];

  // 过滤节日数据
  useEffect(() => {
    let result = [...festivals];

    // 按分类过滤
    if (activeCategory !== 'all' && activeCategory !== 'custom') {
      result = result.filter(festival => festival.category === activeCategory);
    }

    // 按搜索词过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(festival => 
        festival.name.toLowerCase().includes(query) || 
        (festival.elements && festival.elements.some(el => el.toLowerCase().includes(query)))
      );
    }

    setFilteredFestivals(result);
  }, [activeCategory, searchQuery]);

  // 处理自定义节日添加
  const handleAddCustomFestival = () => {
    if (!customFestivalName.trim()) return;

    const newFestival = {
      id: 'custom_' + Date.now(),
      name: customFestivalName,
      category: 'custom',
      elements: customFestivalElements.split(',').map(el => el.trim()).filter(Boolean),
      description: '用户自定义节日',
      isCustom: true
    };

    // 添加到节日列表
    festivals.push(newFestival);
    setFilteredFestivals([...filteredFestivals, newFestival]);
    setShowCustomFestival(false);
    setCustomFestivalName('');
    setCustomFestivalElements('');
  };

  // 搜索过滤处理
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-6">
      {/* 搜索框 */}
      <div className="relative">
        <input
          type="text"
          placeholder="搜索节日..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full py-3 px-4 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
      </div>

      {/* 分类标签 */}
      <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* 节日列表 */}
      <div className="space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {activeCategory === 'custom' ? (
          // 自定义节日表单
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-medium mb-3">添加自定义节日</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">节日名称</label>
                <input
                  type="text"
                  value={customFestivalName}
                  onChange={(e) => setCustomFestivalName(e.target.value)}
                  placeholder="例如：公司年会"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">节日元素（用逗号分隔）</label>
                <input
                  type="text"
                  value={customFestivalElements}
                  onChange={(e) => setCustomFestivalElements(e.target.value)}
                  placeholder="例如：团聚,庆祝,美食"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                />
              </div>
              <button
                onClick={handleAddCustomFestival}
                disabled={!customFestivalName.trim()}
                className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:bg-gray-300"
              >
                添加自定义节日
              </button>
            </div>
          </div>
        ) : filteredFestivals.length > 0 ? (
          filteredFestivals.map(festival => (
            <motion.div
              key={festival.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => onSelectFestival(festival.id)}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                selectedFestivalId === festival.id
                  ? 'bg-primary/10 border-l-4 border-primary'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium font-source-sans">{festival.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {festival.elements?.slice(0, 3).join(' · ')}
                    {festival.elements && festival.elements.length > 3 ? ' · ...' : ''}
                  </p>
                </div>
                {selectedFestivalId === festival.id && (
                  <span className="text-primary">✓</span>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>未找到匹配的节日</p>
            {activeCategory !== 'custom' && (
              <button
                onClick={() => setActiveCategory('custom')}
                className="text-primary hover:underline mt-2 inline-block"
              >
                添加自定义节日
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FestivalSelector;