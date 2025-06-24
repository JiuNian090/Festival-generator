// 节日数据 - 按类别组织
const holidays = {
    traditional: [
        {
            id: 'spring_festival',
            name: '春节',
            description: '中国传统节日，农历新年',
            date: '农历正月初一',
            icon: '🎆',
            keywords: ['新年', '春节', '农历', '团圆', '红包']
        },
        {
            id: 'mid_autumn',
            name: '中秋节',
            description: '中国传统节日，赏月吃月饼',
            date: '农历八月十五',
            icon: '🌕',
            keywords: ['中秋', '月亮', '月饼', '团圆']
        },
        {
            id: 'dragon_boat',
            name: '端午节',
            description: '纪念屈原，赛龙舟吃粽子',
            date: '农历五月初五',
            icon: '龙舟',
            keywords: ['端午', '粽子', '龙舟', '屈原']
        },
        {
            id: 'qingming',
            name: '清明节',
            description: '祭祖和扫墓的节日',
            date: '公历4月4-6日',
            icon: '🌿',
            keywords: ['清明', '祭祖', '踏青']
        },
        {
            id: 'double_ninth',
            name: '重阳节',
            description: '敬老、登高的传统节日',
            date: '农历九月初九',
            icon: '⛰️',
            keywords: ['重阳', '敬老', '登高', '菊花']
        }
    ],
    legal: [
        {
            id: 'national_day',
            name: '国庆节',
            description: '庆祝中华人民共和国成立',
            date: '10月1日',
            icon: '🇨🇳',
            keywords: ['国庆', '祖国', '华诞', '庆典']
        },
        {
            id: 'labor_day',
            name: '劳动节',
            description: '庆祝劳动者的节日',
            date: '5月1日',
            icon: '🛠️',
            keywords: ['劳动', '五一', '工作', '奋斗']
        },
        {
            id: 'teachers_day',
            name: '教师节',
            description: '感谢教师的节日',
            date: '9月10日',
            icon: '📚',
            keywords: ['教师', '教育', '感恩', '师长']
        },
        {
            id: 'childrens_day',
            name: '儿童节',
            description: '庆祝儿童健康成长',
            date: '6月1日',
            icon: '🧒',
            keywords: ['儿童', '成长', '快乐', '童年']
        }
    ],
    western: [
        {
            id: 'mothers_day',
            name: '母亲节',
            description: '感谢母亲的节日',
            date: '五月第二个星期日',
            icon: '👩👧👦',
            keywords: ['母亲', '母爱', '感恩', '亲情']
        },
        {
            id: 'fathers_day',
            name: '父亲节',
            description: '感谢父亲的节日',
            date: '六月第三个星期日',
            icon: '👨👧👦',
            keywords: ['父亲', '父爱', '感恩', '亲情']
        },
        {
            id: 'valentines_day',
            name: '情人节',
            description: '情侣表达爱意的节日',
            date: '2月14日',
            icon: '❤️',
            keywords: ['爱情', '情侣', '浪漫', '玫瑰']
        },
        {
            id: 'qixi',
            name: '七夕节',
            description: '中国传统情人节',
            date: '农历七月初七',
            icon: '鹊桥',
            keywords: ['七夕', '爱情', '鹊桥', '浪漫']
        },
        {
            id: 'christmas',
            name: '圣诞节',
            description: '西方传统节日',
            date: '12月25日',
            icon: '🎄',
            keywords: ['圣诞', '平安', '礼物', '祝福']
        }
    ],
    professional: [
        {
            id: 'nurses_day',
            name: '护士节',
            description: '致敬护士的节日',
            date: '5月12日',
            icon: '👩⚕️',
            keywords: ['护士', '白衣天使', '健康', '护理']
        },
        {
            id: 'police_day',
            name: '警察节',
            description: '致敬人民警察的节日',
            date: '1月10日',
            icon: '👮',
            keywords: ['警察', '平安', '守护', '正义']
        },
        {
            id: 'journalists_day',
            name: '记者节',
            description: '致敬记者的节日',
            date: '11月8日',
            icon: '📝',
            keywords: ['记者', '真相', '报道', '责任']
        },
        {
            id: 'doctors_day',
            name: '医师节',
            description: '致敬医生的节日',
            date: '8月19日',
            icon: '👨⚕️',
            keywords: ['医生', '健康', '救死扶伤', '医术']
        },
        {
            id: 'teachers_day',
            name: '教师节',
            description: '感谢教师的节日',
            date: '9月10日',
            icon: '📚',
            keywords: ['教师', '教育', '感恩', '师长']
        }
    ]
};

// 导出节日数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = holidays;
} else {
    window.holidays = holidays;
}