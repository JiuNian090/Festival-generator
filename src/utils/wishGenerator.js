// 祝福语生成工具 - 包含基础和高级祝福语生成逻辑

// 基础祝福语模板库
const basicTemplates = {
  // 默认模板 - 当分类不存在时使用
  default: [
    '{festival}快乐！愿{recipient}的生活充满阳光与欢笑，{elements}！',
    '在这个特别的{festival}，送上我最诚挚的祝福：愿{recipient}幸福安康，{elements}！',
    '祝福{recipient}在{festival}收获满满，{elements}，万事如意！'
  ],
  // 国际节日模板
  international: [
    '{festival}快乐！愿{recipient}的生活像{elements}般绚烂多彩，幸福美满！',
    '在{festival}这个特别的日子，祝愿{recipient}收获{elements}般的甜蜜与惊喜！',
    '{festival}祝福：愿{recipient}的生活如节日般{elements}，充满欢乐与祝福！'
  ],
  // 传统节日模板
  traditional: [
    '{festival}到，祝福到！愿{recipient}在这美好的日子里，{elements}，心情愉悦，万事顺意！',
    '值此{festival}佳节，遥寄祝福与{recipient}：愿佳节的喜悦与您常伴，{elements}，幸福安康！',
    '{festival}来临，愿{recipient}的生活如节日般精彩，{elements}，阖家欢乐，幸福美满！'
  ],
  // 法定节日模板
  national: [
    '{festival}到了，向辛勤的{recipient}致以最诚挚的祝福，愿您{elements}，事业蒸蒸日上，生活幸福美满！',
    '在这{festival}的特殊日子里，祝愿{recipient}节日快乐，{elements}，前程似锦，万事如意！',
    '值此{festival}之际，谨向{recipient}致以节日的问候与美好的祝愿，愿您{elements}，收获满满！'
  ],
  // 职业节日模板
  professional: [
    '{festival}来临，向{recipient}致以最崇高的敬意！感谢您的{elements}，祝您节日快乐，工作顺利！',
    '在这个特别的{festival}，愿{recipient}的付出都有回报，{elements}，事业更上一层楼！',
    '值此{festival}之际，向{recipient}致以节日的祝福：愿您{elements}，生活美满，事业辉煌！'
  ]
};

// 祝福对象修饰词库 - 根据关系亲疏和节日类型提供多样化选择
const recipientModifiers = {
  friend: ['亲爱的', '挚友', '亲爱的朋友', '我亲爱的'],
  family: ['亲爱的', '尊敬的', '挚爱的', '我最亲爱的'],
  colleague: ['尊敬的', '亲爱的', '敬爱的', '亲爱的同事'],
  teacher: ['敬爱的', '尊敬的', '亲爱的老师', '我敬爱的'],
  default: ['亲爱的', '尊敬的', '敬爱的']
};

// 生成祝福语的核心函数
export function generateWish(festival, recipientType, customDescription) {
  // 获取节日分类
  // 获取节日分类并验证
  const category = festival?.category || 'default';
  // 获取祝福对象修饰词并验证
  const modifier = recipientModifiers[recipientType] || recipientModifiers.default;
  const randomModifier = modifier[Math.floor(Math.random() * modifier.length)];
  // 获取节日元素，确保有默认值
  const defaultElements = ['阳光', '欢笑', '温暖', '喜悦'];
  const elements = festival?.elements?.length ? festival.elements : defaultElements;
  // 获取自定义描述或使用默认元素组合
  const description = customDescription || elements.join('、');
  // 获取对应节日类型的模板
  let templates;
  if (festival.mode === 'advanced') {
    // 高级模式：优先使用高级模板，否则回退到基础模板
    templates = advancedTemplates[category] || basicTemplates[category] || basicTemplates.default;
  } else {
    // 基础模式：使用基础模板
    templates = basicTemplates[category] || basicTemplates.default;
  }
  // 随机选择一个模板
  const template = templates[Math.floor(Math.random() * templates.length)];
  // 替换模板中的占位符
  return template
    .replace('{recipient}', randomModifier + ' ' + recipientType)
    .replace('{festival}', festival.name)
    .replace('{elements}', description)
    // 添加随机表情符号增强祝福效果
    + ' ' + ['🎉', '祝福您！', '😊', '愿您开心！', '🌟'][Math.floor(Math.random() * 5)];
}

// 高级模式模板（包含古诗词引用和高级表达）
const advancedTemplates = {
  traditional: [
    '{festival}时节倍思亲，遥寄祝福与{recipient}]，愿{elements}，事业有成，生活幸福！'
  ]
};
