import React, { useState, useTransition } from 'react';
import { generateWish } from './utils/wishGenerator';
import { motion } from 'framer-motion';
import { useTheme } from './contexts/ThemeContext';
import { useToast } from './components/UI/Toast';
import festivals from './data/festivals';
import recipients from './data/recipients';

// 传递recipients给RecipientSelector组件
import FestivalSelector from './components/FestivalSelector';
import RecipientSelector from './components/RecipientSelector';
import AdvancedSettings from './components/AdvancedSettings';
import HistoryList from './components/HistoryList';
import './styles/index.css';

const App = () => {
  // 状态管理
  const [activeFestival, setActiveFestival] = useState('');
  const [recipientType, setRecipientType] = useState('family');
  const [customDescription, setCustomDescription] = useState('');
  const [wishes, setWishes] = useState('');
  const [history, setHistory] = useState([]);
  const [isPending, startTransition] = useTransition();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [generationMode, setGenerationMode] = useState('basic'); // basic or advanced
  const [styleMode, setStyleMode] = useState('warm'); // warm/humorous/formal/playful
  const [lengthMode, setLengthMode] = useState('medium'); // short/medium/long

  // 节日数据已从data/festivals.js导入

  // 生成祝福语
  const generateWishes = () => {
    startTransition(() => {
      const festival = festivals.find(f => f.id === activeFestival) || { name: activeFestival };
      const wish = generateWish(festival, recipientType, customDescription);
      setWishes(wish);
      // 保存到历史记录
      setHistory(prev => [
        ...prev,
        { id: Date.now(), festival: festival.name, recipientType, wish, date: new Date().toLocaleString() }
      ].slice(-10)); // 只保留最近10条记录
    });
  };

  // 处理复制历史记录
  const handleCopyHistory = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast('祝福语已复制到剪贴板');
    }).catch(() => {
      showToast('复制失败，请手动复制', 'error');
    });
  };

  // 处理删除历史记录
  const handleDeleteHistory = (id) => {
    if (id === 'all') {
      setHistory([]);
      showToast('所有历史记录已清空');
    } else {
      setHistory(history.filter(item => item.id !== id));
      showToast('记录已删除');
    }
  };

  // 从ThemeContext获取主题切换方法

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* 头部区域 */}
      <header className="py-6 px-4 md:px-8 bg-white dark:bg-gray-800 shadow-md transition-all duration-300">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold font-source-sans">节日祝福语生成器</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            aria-label="切换主题"
          >
            {theme === 'light' ? '🌙 切换深色' : '☀️ 切换浅色'}
          </button>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="flex-grow container mx-auto px-4 py-8 flex justify-center">
        <div className="w-full max-w-2xl">
          {/* 左侧控制面板 */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-xl font-semibold mb-4 font-source-sans">生成设置</h2>

              {/* 节日选择器 */}
              <FestivalSelector
          festivals={festivals}
          selectedFestival={activeFestival}
          onSelectFestival={setActiveFestival}
        />

              {/* 祝福对象输入 */}
              <RecipientSelector
        recipients={recipients}
        selectedRecipient={recipientType}
        onSelectRecipient={setRecipientType}
      />

              {/* 自定义描述 */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">自定义描述</label>
                <textarea
                  placeholder="添加额外的祝福元素或要求"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  rows="3"
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                ></textarea>
              </div>

              {/* 高级选项切换 */}
              <div className="mb-6">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-sm text-primary hover:text-primary/80 flex items-center"
                >
                  {showAdvanced ? '收起高级设置' : '展开高级设置'} {showAdvanced ? '↑' : '↓'}
                </button>

                <AdvancedSettings
                  showAdvanced={showAdvanced}
                  onToggle={() => setShowAdvanced(!showAdvanced)}
                  generationMode={generationMode}
                  onGenerationModeChange={setGenerationMode}
                  styleMode={styleMode}
                  onStyleModeChange={setStyleMode}
                  lengthMode={lengthMode}
                  onLengthModeChange={setLengthMode}
                />
              </div>

              {/* 生成按钮 */}
              <button
                onClick={generateWishes}
                disabled={!activeFestival || !recipientType || isPending}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg'}`}
              >
                {isPending ? '生成中...' : '生成祝福语'}
              </button>
            </div>
          </div>

          {/* 右侧结果展示区域 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 生成结果卡片 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-xl font-semibold mb-4 font-source-sans">生成的祝福语</h2>
              {isPending ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">正在挥毫泼墨创作中...</p>
                </div>
              ) : wishes ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="min-h-[200px] p-6 bg-neutral/50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <p className="text-lg font-source-serif leading-relaxed whitespace-pre-line">{wishes}</p>
                  <div className="mt-4 flex justify-end space-x-3">
                    <button className="text-primary hover:text-primary/80 transition-colors">
                      <i className="mr-1">📋</i> 复制
                    </button>
                    <button className="text-primary hover:text-primary/80 transition-colors">
                      <i className="mr-1">❤️</i> 收藏
                    </button>
                    <button className="text-primary hover:text-primary/80 transition-colors">
                      <i className="mr-1">🔄</i> 重新生成
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="min-h-[200px] flex items-center justify-center text-gray-500 dark:text-gray-400 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  选择节日和祝福对象，点击"生成祝福语"按钮开始创作
                </div>
              )}
            </div>

            {/* 历史记录区域 */}
            <HistoryList
          history={history}
          onDeleteHistory={handleDeleteHistory}
          onCopyHistory={handleCopyHistory}
        />
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="py-6 px-4 text-center text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800">
        <p>节日祝福语生成器 © {new Date().getFullYear()} | 设计与开发</p>
      </footer>
    </div>
  );
};

export default App;