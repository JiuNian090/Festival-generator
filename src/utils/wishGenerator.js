// 祝福语生成工具 - 包含基础和高级祝福语生成逻辑

// 基础祝福语模板库
const basicTemplates = {
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

// 高级模式模板（包含古诗词引用和高级表达）
const advancedTemplates = {
  traditional: [
    '{festival}时节倍思亲，遥寄祝福与{recipient}]，愿{elements}，事业有成，生活幸福！'
  ]
};
