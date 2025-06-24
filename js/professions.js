// 职业数据
const professions = [
    {
        id: 'teacher',
        name: '教师',
        description: '从事教育教学工作的专业人员',
        honorifics: ['尊敬的', '敬爱的', '亲爱的'],
        adjectives: ['辛勤的', '博学的', '敬业的', '无私奉献的', '教书育人的'],
        keywords: ['教育', '知识', '学生', '教学', '课堂', '成长']
    },
    {
        id: 'doctor',
        name: '医生',
        description: '从事疾病诊疗工作的专业人员',
        honorifics: ['尊敬的', '敬爱的', '亲爱的'],
        adjectives: ['救死扶伤的', '仁心仁术的', '白衣天使般的', '专业的', '无私的'],
        keywords: ['健康', '治疗', '病人', '医院', '医学', '生命']
    },
    {
        id: 'police',
        name: '警察',
        description: '维护社会治安和公共安全的执法人员',
        honorifics: ['尊敬的', '敬爱的', '英勇的'],
        adjectives: ['英勇无畏的', '忠诚的', '守护平安的', '正义的', '尽职尽责的'],
        keywords: ['安全', '正义', '执法', '保护', '平安', '责任']
    },
    {
        id: 'soldier',
        name: '军人',
        description: '保卫国家安全的武装力量人员',
        honorifics: ['尊敬的', '敬爱的', '英勇的'],
        adjectives: ['英勇的', '忠诚的', '保家卫国的', '无畏的', '可敬的'],
        keywords: ['国家', '安全', '保卫', '荣誉', '使命', '奉献']
    },
    {
        id: 'nurse',
        name: '护士',
        description: '从事护理工作的专业人员',
        honorifics: ['尊敬的', '敬爱的', '亲爱的'],
        adjectives: ['白衣天使般的', '温柔的', '细心的', '无私奉献的', '专业的'],
        keywords: ['护理', '健康', '病人', '医院', '关爱', '照顾']
    },
    {
        id: 'journalist',
        name: '记者',
        description: '从事新闻采访和报道的专业人员',
        honorifics: ['尊敬的', '敬爱的', '亲爱的'],
        adjectives: ['客观公正的', '敏锐的', '勇敢的', '追求真相的', '敬业的'],
        keywords: ['新闻', '真相', '报道', '事实', '责任', '传播']
    },
    {
        id: 'engineer',
        name: '工程师',
        description: '从事工程技术工作的专业人员',
        honorifics: ['尊敬的', '敬爱的', '亲爱的'],
        adjectives: ['智慧的', '创新的', '严谨的', '精益求精的', '专业的'],
        keywords: ['技术', '创新', '建设', '工程', '设计', '解决']
    },
    {
        id: 'businessman',
        name: '企业家',
        description: '从事商业经营管理的人员',
        honorifics: ['尊敬的', '敬爱的', '亲爱的'],
        adjectives: ['有远见的', '勤奋的', '创新的', '成功的', '睿智的'],
        keywords: ['事业', '创新', '发展', '合作', '成功', '责任']
    },
    {
        id: 'parent',
        name: '父母',
        description: '生育并抚养子女的人',
        honorifics: ['亲爱的', '敬爱的'],
        adjectives: ['伟大的', '无私的', '慈爱的', '辛劳的', '温暖的'],
        keywords: ['亲情', '关爱', '养育', '家庭', '温暖', '支持']
    },
    {
        id: 'friend',
        name: '朋友',
        description: '志同道合、互相关心的人',
        honorifics: ['亲爱的', '尊敬的'],
        adjectives: ['真诚的', '亲密的', '仗义的', '友善的', '珍贵的'],
        keywords: ['友情', '支持', '陪伴', '理解', '快乐', '分享']
    },
    {
        id: 'colleague',
        name: '同事',
        description: '在同一单位工作的人',
        honorifics: ['尊敬的', '亲爱的'],
        adjectives: ['勤奋的', '合作的', '专业的', '友善的', '得力的'],
        keywords: ['工作', '合作', '团队', '互助', '进步', '支持']
    }
];

// 导出职业数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = professions;
} else {
    window.professions = professions;
}