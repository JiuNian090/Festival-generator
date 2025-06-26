// 节日数据文件 - 包含所有节日类型和相关信息

const festivals = [
  // 新增国际节日
  {
    id: 'valentine',
    name: '情人节',
    category: 'international',
    elements: ['玫瑰','巧克力','浪漫约会','情书'],
    description: '西方传统爱情节日',
    date: '2月14日'
  },
  {
    id: 'halloween',
    name: '万圣节',
    category: 'international',
    elements: ['南瓜灯','糖果','变装派对','鬼怪'],
    description: '西方传统狂欢节日',
    date: '10月31日'
  },
  // 中国传统节日
  {
    id: 'spring',
    name: '春节',
    category: 'traditional',
    elements: ['团圆', '红包', '春联', '鞭炮', '年夜饭'],
    description: '农历新年，中国最重要的传统节日',
    date: '农历正月初一',
    specialFeatures: '包含生肖元素，如2023年是兔年'
  },
  {
    id: 'lantern',
    name: '元宵节',
    category: 'traditional',
    elements: ['元宵', '灯笼', '猜灯谜', '赏花灯'],
    description: '春节之后的第一个重要节日，赏灯猜谜',
    date: '农历正月十五'
  },
  {
    id: 'tombSweeping',
    name: '清明节',
    category: 'traditional',
    elements: ['扫墓', '踏青', '缅怀先人', '放风筝'],
    description: '纪念祖先和扫墓的节日',
    date: '公历4月4日或5日'
  },
  {
    id: 'dragonBoat',
    name: '端午节',
    category: 'traditional',
    elements: ['粽子', '龙舟', '艾草', '雄黄酒'],
    description: '纪念屈原的传统节日',
    date: '农历五月初五'
  },
  {
    id: 'midAutumn',
    name: '中秋节',
    category: 'traditional',
    elements: ['月亮', '月饼', '团圆', '赏月'],
    description: '象征团圆的重要传统节日',
    date: '农历八月十五'
  },
  {
    id: 'doubleSeventh',
    name: '七夕节',
    category: 'traditional',
    elements: ['牛郎织女', '鹊桥', '爱情', '浪漫'],
    description: '中国传统情人节，牛郎织女相会的日子',
    date: '农历七月初七'
  },
  {
    id: 'doubleNinth',
    name: '重阳节',
    category: 'traditional',
    elements: ['登高', '敬老', '菊花', '茱萸'],
    description: '登高望远、敬老爱老的传统节日',
    date: '农历九月初九'
  },

  // 法定节日与纪念日
  {
    id: 'labor',
    name: '劳动节',
    category: 'national',
    elements: ['劳动', '奋斗', '贡献', '休息'],
    description: '庆祝劳动者贡献的节日',
    date: '5月1日'
  },
  {
    id: 'nationalDay',
    name: '国庆节',
    category: 'national',
    elements: ['国旗', '阅兵', '爱国', '庆典'],
    description: '庆祝国家成立的重要节日',
    date: '10月1日'
  },
  {
    id: 'teachersDay',
    name: '教师节',
    category: 'national',
    elements: ['桃李', '园丁', '感恩', '教育'],
    description: '感谢教师贡献的节日',
    date: '9月10日'
  },
  {
    id: 'childrensDay',
    name: '儿童节',
    category: 'national',
    elements: ['童趣', '成长', '欢乐', '礼物'],
    description: '庆祝儿童健康成长的节日',
    date: '6月1日'
  },

  // 职业节日与特色节日
  {
    id: 'mothersDay',
    name: '母亲节',
    category: 'professional',
    elements: ['康乃馨', '感恩', '母爱', '家庭'],
    description: '感谢母亲的节日',
    date: '五月第二个星期日'
  },
  {
    id: 'fathersDay',
    name: '父亲节',
    category: 'professional',
    elements: ['稳重', '担当', '感恩', '家庭'],
    description: '感谢父亲的节日',
    date: '六月第三个星期日'
  },
  {
    id: 'nursesDay',
    name: '护士节',
    category: 'professional',
    elements: ['白衣天使', '关爱', '健康', '奉献'],
    description: '致敬护士职业的节日',
    date: '5月12日'
  }
];

export default festivals;