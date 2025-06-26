// 历史记录管理工具 - 处理祝福语历史记录的保存、加载和删除

// 保存生成的祝福语到历史记录
export const saveWishToHistory = async (wishData) => {
  try {
    const history = await getHistory();
    const newWish = {
      id: Date.now().toString(),
      ...wishData,
      timestamp: new Date().toISOString()
    };
    
    // 添加新记录到开头
    const updatedHistory = [newWish, ...history].slice(0, 20); // 限制最多20条记录
    localStorage.setItem('wishHistory', JSON.stringify(updatedHistory));
    return newWish;
  } catch (error) {
    console.error('保存祝福语到历史记录失败:', error);
    throw error;
  }
};

// 获取历史记录
export const getHistory = async () => {
  try {
    const historyJson = localStorage.getItem('wishHistory');
    return historyJson ? JSON.parse(historyJson) : [];
  } catch (error) {
    console.error('加载历史记录失败:', error);
    return [];
  }
};

// 从历史记录中删除特定记录
export const deleteWishFromHistory = async (wishId) => {
  try {
    const history = await getHistory();
    const updatedHistory = history.filter(item => item.id !== wishId);
    localStorage.setItem('wishHistory', JSON.stringify(updatedHistory));
    return updatedHistory;
  } catch (error) {
    console.error('删除历史记录失败:', error);
    throw error;
  }
};

// 清空所有历史记录
export const clearHistory = async () => {
  try {
    localStorage.removeItem('wishHistory');
    return true;
  } catch (error) {
    console.error('清空历史记录失败:', error);
    return false;
  }
};

// 获取特定历史记录
export const getWishById = async (wishId) => {
  try {
    const history = await getHistory();
    return history.find(item => item.id === wishId) || null;
  } catch (error) {
    console.error('获取特定历史记录失败:', error);
    return null;
  }
};

// 按节日类型筛选历史记录
export const filterHistoryByFestival = async (festivalId) => {
  try {
    const history = await getHistory();
    return history.filter(item => item.festivalId === festivalId);
  } catch (error) {
    console.error('筛选历史记录失败:', error);
    return [];
  }
};

// 按祝福对象筛选历史记录
export const filterHistoryByRecipient = async (recipient) => {
  try {
    const history = await getHistory();
    return history.filter(item => item.recipient.includes(recipient));
  } catch (error) {
    console.error('按对象筛选历史记录失败:', error);
    return [];
  }
};

// 格式化日期显示
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

// 获取最近的历史记录（限制数量）
export const getRecentWishes = async (limit = 5) => {
  try {
    const history = await getHistory();
    return history.slice(0, limit);
  } catch (error) {
    console.error('获取最近记录失败:', error);
    return [];
  }
};

// 导出所有历史记录管理函数
export const historyManager = {
  saveWish: saveWishToHistory,
  getHistory,
  deleteWish: deleteWishFromHistory,
  clearHistory,
  getWishById,
  filterByFestival: filterHistoryByFestival,
  filterByRecipient: filterHistoryByRecipient,
  getRecentWishes
};

export default historyManager;