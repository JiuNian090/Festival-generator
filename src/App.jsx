import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './styles/index.css';

const App = () => {
  // 状态管理
  const [activeFestival, setActiveFestival] = useState('');
  const [recipient, setRecipient] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [wishes, setWishes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState([]);
  const [themeMode, setThemeMode] = useState('light');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [generationMode, setGenerationMode] = useState('basic'); // basic or advanced
  const [styleMode, setStyleMode] = useState('warm'); // warm/humorous/formal/playful
  const [lengthMode, setLengthMode] = useState('medium'); // short/medium/long

  // 节日数据
  const festivals = [
    // 中国传统节日
    { id: 'spring', name: '春节', category: 'traditional', elements: ['团圆', '红包', '春联', '鞭炮', '年夜饭'] },
    { id: 'lantern', name: '元宵节', category: 'traditional', elements: ['元宵', '灯笼', '猜灯谜'] },
    { id: 'tombSweeping', name: '清明节', category: 'traditional', elements: ['扫墓', '踏青', '缅怀先人'] },
    { id: 'dragonBoat', name: '端午节', category: 'traditional', elements: ['粽子', '龙舟', '艾草'] },
    { id: 'midAutumn', name: '中秋节', category: 'traditional', elements: ['月亮', '月饼', '团圆'] },
    { id: 'doubleSeventh', name: '七夕节', category: 'traditional', elements: ['牛郎织女', '鹊桥', '爱情'] },
    // 法定节日与纪念日
    { id: 'labor', name: '劳动节', category: 'national', elements: ['劳动', '奋斗', '贡献'] },
    { id: 'nationalDay', name: '国庆节', category: 'national', elements: ['国旗', '阅兵', '爱国'] },
    { id: 'teachersDay', name: '教师节', category: 'national', elements: ['桃李', '园丁', '感恩'] },
    // 更多节日将在后续添加
  ];

  // 生成祝福语
  const generateWishes = () => {
    setIsGenerating(true);
    // 模拟API请求延迟
    setTimeout(() => {
      // 简单的祝福语生成逻辑
      const festival = festivals.find(f => f.id === activeFestival) || { name: activeFestival };
      // 调用外部生成函数生成祝福
      const wish = generateWish(festival, recipientType, customDescription);
      setWishes(wish);
      setIsGenerating(false);
      // 保存到历史记录
      setHistory(prev => [
        ...prev,
        { id: Date.now(), festival: festival.name, recipient, wish, date: new Date().toLocaleString() }
      ].slice(-10)); // 只保留最近10条记录
    }, 1500);
  };

  // 切换主题
  const toggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen flex flex-col ${themeMode === 'dark' ? 'bg-gray-900 text-white' : 'bg-neutral text-dark'}`}>
      {/* 头部区域 */}
      <header className="py-6 px-4 md:px-8 bg-white dark:bg-gray-800 shadow-md transition-all duration-300">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold font-source-sans">节日祝福语生成器</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            aria-label="切换主题"
          >
            {themeMode === 'light' ? '🌙 切换深色' : '☀️ 切换浅色'}
          </button>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧控制面板 */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-xl font-semibold mb-4 font-source-sans">生成设置</h2>

              {/* 节日选择器 */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">节日类型</label>
                <select
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={activeFestival}
                  onChange={(e) => setActiveFestival(e.target.value)}
                >
                  <option value="">-- 请选择节日 --</option>
                  {festivals.map(festival => (
                    <option key={festival.id} value={festival.id}>{festival.name}</option>
                  ))}
                </select>
              </div>

              {/* 祝福对象输入 */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">祝福对象类型</label>
                <select
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={recipientType}
                  onChange={(e) => setRecipientType(e.target.value)}
                >
                  <option value="family">家人</option>
                  <option value="friend">朋友</option>
                  <option value="colleague">同事</option>
                  <option value="teacher">老师</option>
                  <option value="other">其他</option>
                </select>
              </div>

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
                  className="text-sm text-primary hover:underline"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  {showAdvanced ? '收起高级选项' : '显示高级选项'}
                </button>

                {showAdvanced && (
                  <div className="mt-4 space-y-4 animate-fadeIn">
                    <div>
                      <label className="block text-sm font-medium mb-2">生成模式</label>
                      <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                          <input type="radio" name="generationMode" value="basic" checked={generationMode === 'basic'} onChange={() => setGenerationMode('basic')} className="mr-2" />
                          基础模式
                        </label>
                        <label className="inline-flex items-center">
                          <input type="radio" name="generationMode" value="advanced" checked={generationMode === 'advanced'} onChange={() => setGenerationMode('advanced')} className="mr-2" />
                          高级模式
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">风格选择</label>
                      <select
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        value={styleMode}
                        onChange={(e) => setStyleMode(e.target.value)}
                      >
                        <option value="warm">温馨风格</option>
                        <option value="humorous">幽默风格</option>
                        <option value="formal">正式风格</option>
                        <option value="playful">俏皮风格</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">祝福语长度</label>
                      <select
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        value={lengthMode}
                        onChange={(e) => setLengthMode(e.target.value)}
                      >
                        <option value="short">简短 (30-50字)</option>
                        <option value="medium">中等 (80-120字)</option>
                        <option value="long">长篇 (150-200字)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* 生成按钮 */}
              <button
                onClick={generateWishes}
                disabled={!activeFestival || !recipient || isGenerating}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg'}`}
              >
                {isGenerating ? '生成中...' : '生成祝福语'}
              </button>
            </div>
          </div>

          {/* 右侧结果展示区域 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 生成结果卡片 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-xl font-semibold mb-4 font-source-sans">生成的祝福语</h2>
              {isGenerating ? (
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
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-xl font-semibold mb-4 font-source-sans">历史记录</h2>
              {history.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-6">暂无历史记录</p>
              ) : (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {history.map(item => (
                    <div key={item.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-neutral/50 dark:hover:bg-gray-700/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{item.festival} - {item.recipient}</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{item.date}</span>
                      </div>
                      <p className="text-sm mt-1 line-clamp-2">{item.wish}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
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