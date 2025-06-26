import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { motion } from 'framer-motion';
import { FiCopy, FiShare2, FiHeart, FiRefreshCw, FiChevronDown, FiChevronUp, FiSun, FiMoon, FiHistory } from 'react-icons/fi';
import { useToast } from '../../hooks/useToast';
import { generateWish } from '../../utils/wishGenerator';
import { saveToHistory, getHistory, removeFromHistory } from '../../utils/history';

const WishGenerator = ({ festival, recipient, customDescription, generationMode, styleMode, lengthMode }) => {
  const [generatedWish, setGeneratedWish] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCopiedNotification, setShowCopiedNotification] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [historyWishes, setHistoryWishes] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [activeTab, setActiveTab] = useState('result');
  const canvasRef = useRef(null);
  const { showToast } = useToast();

  // 加载历史记录
  useEffect(() => {
    const loadHistory = async () => {
      const history = await getHistory();
      setHistoryWishes(history);
    };
    loadHistory();
  }, []);

  // 生成祝福语
  const generateWish = async () => {
    if (!festival || !recipient) return;

    setIsGenerating(true);
    setGeneratedWish('');

    try {
      // 模拟生成过程
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 基础模式生成
      const generatedText = generateWish(festival, recipient, customDescription, generationMode, styleMode, lengthMode);
      setGeneratedWish(generatedText);

      // 保存到历史记录
      const newWish = {
        id: Date.now(),
        festival: festival.name,
        recipient,
        wish: generatedText,
        timestamp: new Date().toLocaleString(),
        style: styleMode,
        length: lengthMode
      };
      await saveToHistory(newWish);
      setHistoryWishes(prev => [newWish, ...prev].slice(0, 10));
    } catch (error) {
      console.error('生成祝福语失败:', error);
      showToast('生成祝福语失败，请重试', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  // 复制到剪贴板
  const handleCopy = (text) => {
    return () => {
      navigator.clipboard.writeText(text).then(() => {
        setShowCopiedNotification(true);
        setTimeout(() => setShowCopiedNotification(false), 2000);
        showToast('祝福语已复制到剪贴板', 'success');
      });
    };
  };

  // 渲染生成动画
  const renderGenerationAnimation = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-24 h-24 md:w-32 md:h-32 relative mx-auto mb-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-primary font-medium">生成中...</span>
        </div>
      </div>
      <p className="text-gray-500 dark:text-gray-400 max-w-md">
        正在根据 {festival.name} 和 {recipient} 的特点，为您创作最贴切的祝福语...
      </p>
    </div>
  );

  // 渲染结果卡片
  const renderResultCard = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
      {/* 装饰元素 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full -ml-12 -mb-12"></div>

      <div className="relative z-10">
        <h2 className="text-xl font-semibold mb-4 font-source-sans flex items-center">
          生成的祝福语
          <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
            {festival.name} · {styleMode === 'warm' ? '温馨风格' : styleMode === 'humorous' ? '幽默风格' : '正式风格'}
          </span>
        </h2>

        {generatedWish ? (
          <div className="min-h-[150px] mb-6 font-source-serif leading-relaxed text-lg">
            <p className="whitespace-pre-line break-words">{generatedWish}</p>
          </div>
        ) : (
          <div className="min-h-[150px] flex items-center justify-center text-gray-500 dark:text-gray-400">
            请点击下方"生成祝福语"按钮开始创作
          </div>
        )}

        <div className="flex flex-wrap gap-3 justify-between items-center mt-6">
          <div className="flex space-x-3">
            <button
              onClick={() => navigator.clipboard.writeText(generatedWish).then(() => {
                showToast('祝福语已复制到剪贴板', 'success');
              })}
              disabled={!generatedWish}
              className="px-4 py-2 flex items-center gap-2 rounded-lg border border-primary/30 text-primary hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiCopy size={16} />
              复制
            </button>
            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              disabled={!generatedWish}
              className="px-4 py-2 flex items-center gap-2 rounded-lg border border-primary/30 text-primary hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiShare2 size={16} />
              分享
            </button>
            <button
              onClick={() => {/* 收藏功能实现 */}}
              disabled={!generatedWish}
              className="p-2 rounded-lg border border-primary/30 text-primary hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiHeart size={16} />
            </button>
          </div>

          <button
            onClick={() => setActiveTab('history')}
            className="text-sm text-gray-500 hover:text-primary flex items-center"
          >
            <FiHistory size={16} className="mr-1" />
            历史记录
          </button>
        </div>
      </div>
    </div>
  );

  // 渲染历史记录
  const renderHistory = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold font-source-sans">历史记录</h2>
        <button
          onClick={() => setShowHistory(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          返回
        </button>
      </div>

      {historyWishes.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          暂无历史记录
        </div>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {historyWishes.map((item, index) => (
            <div key={item.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium">{item.festival} - {item.recipient}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{item.timestamp}</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-3">{item.wish}</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {/* 恢复此记录 */}}
                  className="text-xs text-primary hover:text-primary/80"
                >
                  重新使用
                </button>
                <button
                  onClick={() => {/* 删除此记录 */}}
                  className="text-xs text-gray-500 hover:text-red-500"
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* 生成按钮 */}
      <div className="flex justify-center">
        <button
          onClick={generateWish}
          disabled={!festival || !recipient || isGenerating}
          className={`px-8 py-4 rounded-full text-white font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 ${isGenerating || !festival || !recipient
            ? 'bg-gray-400 cursor-not-allowed shadow-md'
            : 'bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl'}
          `}
        >
          {isGenerating ? (
            <div className="flex items-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              生成中...
            </div>
          ) : (
            '生成祝福语'
          )}
        </button>
      </div>

      {/* 结果展示区域 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
        {isGenerating ? (
          renderGenerationAnimation()
        ) : activeTab === 'result' ? (
          renderResultCard()
        ) : (
          renderHistory()
        )}
      </div>
    </div>
  );
};

export default WishGenerator;