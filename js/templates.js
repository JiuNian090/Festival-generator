// 祝福语模板 - 按节日ID组织
const templates = {
    // 传统节日
    spring_festival: [
        '{{honorific}}{{recipient}}：{{description}}，新春佳节来临之际，祝您阖家团圆，万事如意，龙年大吉大利，财源滚滚，福寿安康！',
        '值此新春佳节，向{{honorific}}{{recipient}}致以最诚挚的祝福：愿您在新的一年里事业蒸蒸日上，家庭幸福美满，身体健康，笑口常开！',
        '{{honorific}}{{recipient}}，新春快乐！{{description}}。愿您的生活如春天般生机勃勃，事业如旭日般蒸蒸日上，家庭如圆月般团圆美满。'
    ],
    mid_autumn: [
        '{{honorific}}{{recipient}}：{{description}}，中秋佳节，皓月当空。愿这皎洁的月光带给您团圆的喜悦，愿您和家人幸福美满，安康顺遂，中秋快乐！',
        '中秋月圆人团圆，{{honorific}}{{recipient}}，{{description}}。在这美好的节日里，祝您阖家欢乐，幸福安康，万事如意，中秋佳节快乐！',
        '金秋送爽，丹桂飘香。{{honorific}}{{recipient}}，{{description}}，值此中秋佳节，祝您月圆人圆事事圆，心顺意顺事事顺！'
    ],
    dragon_boat: [
        '{{honorific}}{{recipient}}：{{description}}，端午佳节到，祝您身体健康如龙舟竞渡般充满活力，生活如粽子般香甜软糯，事业如鼓声般铿锵有力！',
        '端午安康！{{honorific}}{{recipient}}，{{description}}。愿您在这个充满传统文化气息的节日里，收获安康与喜悦，事事顺心如意！'
    ],
    qingming: [
        '{{honorific}}{{recipient}}：{{description}}，清明时节，缅怀先人，珍惜当下。愿您在这春暖花开的季节里，心情如春光般明媚，生活如春风般温暖。',
        '清明时节雨纷纷，思念之情心中存。{{honorific}}{{recipient}}，{{description}}，愿您在这个特殊的日子里，缅怀先人，珍惜眼前，生活美满。'
    ],
    double_ninth: [
        '{{honorific}}{{recipient}}：{{description}}，九九重阳，久久情长。愿您如菊花般傲骨迎风，如青松般健康长寿，重阳节快乐，福寿绵长！',
        '重阳佳节，登高望远。{{honorific}}{{recipient}}，{{description}}，祝您节日快乐，身体健康，阖家幸福，万事如意！'
    ],
    // 法定节假日
    national_day: [
        '{{honorific}}{{recipient}}：{{description}}，国庆佳节，举国同庆。愿我们的祖国繁荣昌盛，愿您的生活幸福美满，节日快乐，万事如意！',
        '金秋十月，丹桂飘香，喜迎国庆。{{honorific}}{{recipient}}，{{description}}，祝您节日快乐，阖家幸福，事业有成，前程似锦！'
    ],
    labor_day: [
        '{{honorific}}{{recipient}}：{{description}}，五一劳动节快乐！愿您在这个属于劳动者的节日里，放松身心，享受生活，收获满满的幸福与喜悦！',
        '劳动创造价值，奋斗成就梦想。{{honorific}}{{recipient}}，{{description}}，祝您五一劳动节快乐，工作顺利，身体健康，生活美满！'
    ],
    teachers_day: [
        '{{honorific}}{{recipient}}：{{description}}，教师节快乐！感谢您的辛勤付出和无私奉献，愿您桃李满天下，幸福安康，工作顺利！',
        '三尺讲台育桃李，一支粉笔写春秋。{{honorific}}{{recipient}}，{{description}}，祝您教师节快乐，身体健康，万事如意，桃李芬芳！'
    ],
    childrens_day: [
        '{{honorific}}{{recipient}}：{{description}}，六一儿童节快乐！愿你永远保持一颗童心，快乐成长，健康幸福，前程似锦！',
        '童年是最美的时光，愿{{honorific}}{{recipient}}{{description}}，六一儿童节快乐，永远纯真烂漫，笑容灿烂！'
    ],
    // 西方节日
    mothers_day: [
        '{{honorific}}{{recipient}}：{{description}}，母亲节快乐！感谢您的养育之恩，愿您永远年轻美丽，健康幸福，笑容常在！',
        '母爱如春雨般滋润心田，如阳光般温暖心灵。{{honorific}}{{recipient}}，{{description}}，祝您母亲节快乐，幸福安康，万事如意！'
    ],
    fathers_day: [
        '{{honorific}}{{recipient}}：{{description}}，父亲节快乐！感谢您如山般的臂膀和默默的付出，愿您身体健康，幸福快乐，万事如意！',
        '父爱深沉如山，温暖如海。{{honorific}}{{recipient}}，{{description}}，祝您父亲节快乐，身体健康，工作顺利，幸福美满！'
    ],
    valentines_day: [
        '{{honorific}}{{recipient}}：{{description}}，情人节快乐！愿我们的爱情如玫瑰般娇艳，如钻石般永恒，幸福甜蜜，直到永远！',
        '在这个浪漫的日子里，{{honorific}}{{recipient}}，{{description}}，愿爱洋溢在您甜蜜的生活中，让以后的每一个日子，都像今日这般辉煌喜悦！'
    ],
    qixi: [
        '{{honorific}}{{recipient}}：{{description}}，七夕佳节快乐！愿天下有情人终成眷属，愿您的爱情甜蜜美满，幸福长久！',
        '七夕鹊桥相会，情意绵绵。{{honorific}}{{recipient}}，{{description}}，祝您节日快乐，爱情甜蜜，幸福美满，永浴爱河！'
    ],
    christmas: [
        '{{honorific}}{{recipient}}：{{description}}，圣诞快乐！愿圣诞的钟声带给您平安与喜悦，愿您的生活充满阳光与温暖，幸福美满！',
        '在这美好的圣诞佳节，{{honorific}}{{recipient}}，{{description}}，祝您圣诞快乐，新年幸福，身体健康，万事如意！'
    ],
    // 行业节日
    nurses_day: [
        '{{honorific}}{{recipient}}：{{description}}，护士节快乐！感谢您的无私奉献和辛勤付出，愿您身体健康，工作顺利，幸福美满！',
        '白衣天使，守护生命。{{honorific}}{{recipient}}，{{description}}，祝您护士节快乐，愿您被世界温柔以待，幸福安康！'
    ],
    police_day: [
        '{{honorific}}{{recipient}}：{{description}}，警察节快乐！感谢您的忠诚守护和无私奉献，愿您平安健康，工作顺利，阖家幸福！',
        '金色盾牌，热血铸就。{{honorific}}{{recipient}}，{{description}}，祝您警察节快乐，愿您每次出警都平安归来，幸福美满！'
    ],
    journalists_day: [
        '{{honorific}}{{recipient}}：{{description}}，记者节快乐！感谢您的客观公正和辛勤报道，愿您工作顺利，身体健康，万事如意！',
        '铁肩担道义，妙手著文章。{{honorific}}{{recipient}}，{{description}}，祝您记者节快乐，愿您的笔锋永远犀利，报道永远真实！'
    ],
    doctors_day: [
        '{{honorific}}{{recipient}}：{{description}}，医师节快乐！感谢您的仁心仁术和救死扶伤，愿您身体健康，工作顺利，阖家幸福！',
        '医者仁心，大爱无疆。{{honorific}}{{recipient}}，{{description}}，祝您医师节快乐，愿您的付出都有回报，幸福安康！'
    ]
};

// 根据节日和职业智能匹配最合适的祝福语模板
function getMatchingTemplates(holidayId, professionId) {
    // 获取该节日的所有模板
    const holidayTemplates = templates[holidayId] || [];
    if (!holidayTemplates.length) return [];

    // 获取职业信息
    const profession = window.professions ? window.professions.find(p => p.id === professionId) : null;
    if (!profession) return holidayTemplates;

    // 根据职业关键词匹配最合适的模板
    const professionKeywords = profession.keywords || [];
    const scoredTemplates = holidayTemplates.map(template => {
        let score = 0;
        professionKeywords.forEach(keyword => {
            if (template.includes(keyword)) {
                score++;
            }
        });
        return { template, score };
    });

    // 按匹配度排序，返回所有模板（匹配度高的在前）
    scoredTemplates.sort((a, b) => b.score - a.score);
    return scoredTemplates.map(item => item.template);
}

// 导出模板和匹配函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { templates, getMatchingTemplates };
} else {
    window.templates = templates;
    window.getMatchingTemplates = getMatchingTemplates;
}