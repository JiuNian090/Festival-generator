import React from 'react';
import { motion } from 'framer-motion';
import { TrashIcon, CopyIcon } from '../icons';


const HistoryList = ({ history, onDeleteHistory, onCopyHistory }) => {


  if (history.length === 0) {
    return (
      <motion.div
        className="text-center py-12 text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <p>暂无历史记录</p>
        <p className="text-sm mt-1">生成祝福语后将显示在这里</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center justify-center text-primary dark:text-primary-light">
        历史记录
        <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
          ({history.length}条记录)
        </span>
      </h3>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {history.map((item) => (
          <motion.div
            key={item.id}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {item.festival} - {item.recipientType}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.date}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onCopyHistory(item.wish)}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="复制祝福语"
                >
                  <CopyIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                  onClick={() => onDeleteHistory(item.id)}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="删除记录"
                >
                  <TrashIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {item.wish}
            </p>
          </motion.div>
        ))}
      </div>

      {history.length > 0 && (
        <button
          onClick={() => onDeleteHistory('all')}
          className="mt-4 text-sm text-red-500 hover:text-red-600 flex items-center justify-center"
        >
          清空所有历史记录
        </button>
      )}
    </motion.div>
  );
};

export default HistoryList;