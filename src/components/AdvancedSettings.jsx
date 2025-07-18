import React from 'react';
import { motion } from 'framer-motion';

const AdvancedSettings = ({ showAdvanced, onToggle, generationMode, onGenerationModeChange, styleMode, onStyleModeChange, lengthMode, onLengthModeChange }) => {
  return (
    <motion.div
      className={`mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg overflow-hidden ${showAdvanced ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      initial={false}
      animate={{ height: showAdvanced ? 'auto' : 0, opacity: showAdvanced ? 1 : 0 }}
    >
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h3 className="font-semibold mb-4 text-primary dark:text-primary-light text-center text-lg">高级设置</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 justify-items-stretch">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              生成模式
            </label>
            <select
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              value={generationMode}
              onChange={(e) => onGenerationModeChange(e.target.value)}
            >
              <option value="basic">基础模式</option>
              <option value="advanced">高级模式</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              风格模式
            </label>
            <select
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              value={styleMode}
              onChange={(e) => onStyleModeChange(e.target.value)}
            >
              <option value="classic">经典正式</option>
              <option value="casual">轻松活泼</option>
              <option value="poetic">文艺诗意</option>
              <option value="humorous">幽默风趣</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              长度模式
            </label>
            <select
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              value={lengthMode}
              onChange={(e) => onLengthModeChange(e.target.value)}
            >
              <option value="short">简短精炼</option>
              <option value="medium">中等长度</option>
              <option value="long">详细丰富</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdvancedSettings;