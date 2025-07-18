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
         选择节日 {selectedFestival ? `- ${selectedFestival}` : ''}
       </label>
       <ChevronDownIcon className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} />
     </div>
     <div className={`px-6 pb-6 transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-stretch mt-2">
        {Object.entries(groupedFestivals).map(([category, items]) => (
          <div key={category} className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm w-full">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
              {categoryNames[category] || category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map(festival => (
                <button
                  key={festival.id}
                  onClick={() => onSelectFestival(festival.id, festival.name)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${selectedFestival === festival.id
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}
                  `}
                >
                  {festival.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
     </div>
      </motion.div>
  );
};

export default FestivalSelector;