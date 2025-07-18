import React, { useState } from 'react';
import { ChevronDownIcon } from '../icons';
import { motion } from 'framer-motion';

const FestivalSelector = ({ festivals, selectedFestival, onSelectFestival }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // 按类别分组节日
  const groupedFestivals = festivals.reduce((groups, festival) => {
    const category = festival.category || 'other';
    if (!groups[category]) groups[category] = [];
    groups[category].push(festival);
    return groups;
  }, {});

  // 类别显示名称映射
  const categoryNames = {
    traditional: '传统节日',
    national: '法定节日',
    international: '国际节日',
    professional: '职业节日',
    other: '其他节日'
  };

  return (
    <motion.div
   className="w-full mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
   initial={{ opacity: 0, y: 10 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.3 }}
 >
      <div onClick={() => setIsExpanded(!isExpanded)} className="p-6 cursor-pointer flex justify-between items-center">
       <label className="block text-lg font-medium text-primary dark:text-primary-light">
         请选择节日类型 {selectedFestival ? `- 当前: ${selectedFestival}` : ''}
       </label>
       <ChevronDownIcon className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} />
     </div>
     <div className="px-6 pb-6 transition-all duration-300">
       <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(groupedFestivals).map(([category, items]) => (
          <div key={category} className="relative group">
            <button className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 transition-colors text-sm whitespace-nowrap">
              {categoryNames[category] || category}
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 hidden group-hover:block z-10 border border-gray-200 dark:border-gray-700">
              {items.map(festival => (
                <button
                  key={festival.id}
                  onClick={() => onSelectFestival(festival.id, festival.name)}
                  className={`w-full text-left px-3 py-1.5 rounded text-sm transition-all ${selectedFestival === festival.id
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 border-l-2 border-transparent hover:border-blue-500'}
                  `}
                >
                  {festival.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {selectedFestival && (
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          已选择: {selectedFestival}
        </div>
      )}
     </div>
      </motion.div>
  );
};

export default FestivalSelector;