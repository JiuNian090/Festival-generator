// 节日信息数据
const festivalInfo = {
    '春节': {
        description: '春节，即农历新年，是中国最重要的传统节日。源自殷商时期岁首祈岁祭祀，传承至今包含扫尘、守岁、拜年、贴春联等习俗，承载着团圆和睦的文化内涵。',
        tag: '团圆安康',
        keywords: ['福', '春联', '鞭炮', '红包', '年夜饭', '拜年']
    },
    '中秋': {
        description: '中秋节源自天象崇拜，盛行于唐宋。祭月、赏月、吃月饼、玩花灯等习俗，承载着中国人对家庭团圆、生活美满的精神寄托。',
        tag: '花好月圆',
        keywords: ['月饼', '玉兔', '嫦娥', '赏月', '团圆', '思念']
    },
    // 其他节日类似补充
    '清明': {
        description: '清明节源自上古春祭，兼具自然节气与人文节日内涵。扫墓祭祖与踏青郊游的节俗传统，体现中国人对生命循环的哲学思考。',
        tag: '慎终追远',
        keywords: ['祭扫', '踏青', '插柳', '寒食', '思念', '重生']
    }
};

// 祝福语模板
const greetingTemplates = {
    '春节': {
        '家人': [
            '在这春意盎然的新年里，愿{{relationship}}健康长寿，万事如意，阖家幸福安康！新年快乐！',
            '辞旧迎新之际，祝愿{{relationship}}新年快乐，身体健康，平安喜乐，福寿绵长！',
            '值此新春佳节，祝{{relationship}}福如东海长流水，寿比南山不老松。新的一年里，幸福安康！'
        ],
        '朋友': [
            '春节快乐！愿{{relationship}}在新的一年里事业有成，好运连连，心想事成！',
            '值此新春之际，祝{{relationship}}新年快乐，万事大吉，心想事成，阖家幸福！',
            '新年egin，万象更新，祝{{relationship}}在新的一年里，事业蒸蒸日上，生活美满幸福！'
        ],
        '老师': [
            '尊敬的{{relationship}}，值此新春佳节之际，祝您及家人新年快乐，身体健康，万事如意！',
            '春节到，向{{relationship}}致以诚挚的新春祝福，感谢您的谆谆教诲，祝您新年快乐，阖家幸福！',
            '在这辞旧迎新之际，祝敬爱的{{relationship}}新春愉快，身体健康，桃李满天下！'
        ],
        '领导': [
            '尊敬的{{relationship}}，值此新春佳节之际，衷心祝福您及家人新年快乐，身体健康，万事如意！',
            '新春年初，万象更新，祝{{relationship}}在新的一年里，事业蒸蒸日上，家庭幸福美满！',
            '值此新春佳节，恭祝{{relationship}}及家人新年快乐，身体健康，工作顺利，阖家幸福！'
        ],
        '同事': [
            '春节快乐！祝{{relationship}}在新的一年里工作顺利，好运连连，心想事成！',
            '值此新春之际，祝{{relationship}}新年快乐，万事大吉，心想事成，阖家幸福！',
            '新年egin，万象更新，祝{{relationship}}在新的一年里，工作顺利，生活美满幸福！'
        ],
        '客户': [
            '值此新春佳节之际，祝{{relationship}}新年快乐，生意兴隆，财源广进！',
            '新春年初，万象更新，祝{{relationship}}在新的一年里，事业蒸蒸日上，合作愉快！',
            '恭贺新春！祝{{relationship}}在新的一年里，生意兴隆，财源滚滚，合作共赢！'
        ]
    },
    // 其他节日的模板可以类似添加
};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取元素
    const festivalSelect = document.getElementById('festival');
    const otherFestivalContainer = document.getElementById('other-festival-container');
    const otherFestivalInput = document.getElementById('other-festival');
    const recipientSelect = document.getElementById('recipient');
    const otherRecipientContainer = document.getElementById('other-recipient-container');
    const otherRecipientInput = document.getElementById('other-recipient');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const regenerateBtn = document.getElementById('regenerate-btn');
    const shareBtn = document.getElementById('share-btn');
    const aboutLink = document.getElementById('about-link');
    const resultContainer = document.getElementById('result-container');
    const greetingText = document.getElementById('greeting-text');
    const shareModal = document.getElementById('share-modal');
    const aboutModal = document.getElementById('about-modal');
    const closeBtns = document.querySelectorAll('.close');
    const loading = document.getElementById('loading');
    const festivalInfoContainer = document.getElementById('festival-info');
    const copyToast = document.getElementById('copy-toast');
    
    // 添加淡入效果
    document.querySelectorAll('.fade-in').forEach(element => {
        if (element.style.display !== 'none') {
            element.style.opacity = '0';
            setTimeout(() => {
                element.style.opacity = '1';
            }, 100);
        }
    });
    
    // 处理其他节日输入框显示逻辑
    festivalSelect.addEventListener('change', function() {
        if (this.value === '其他') {
            otherFestivalContainer.style.display = 'block';
        } else {
            otherFestivalContainer.style.display = 'none';
            // 显示节日信息
            updateFestivalInfo(this.value);
        }
    });
    
    // 处理其他祝福对象输入框显示逻辑
    recipientSelect.addEventListener('change', function() {
        if (this.value === '其他') {
            otherRecipientContainer.style.display = 'block';
        } else {
            otherRecipientContainer.style.display = 'none';
        }
    });
    
    // 生成祝福语按钮点击事件
    generateBtn.addEventListener('click', function() {
        // 获取表单数据
        const festival = festivalSelect.value === '其他' ? otherFestivalInput.value : festivalSelect.value;
        const recipient = recipientSelect.value === '其他' ? otherRecipientInput.value : recipientSelect.value;
        const relationship = document.getElementById('relationship').value || recipient;
        const style = document.getElementById('style').value;
        const customInfo = document.getElementById('custom-info').value;
        
        // 表单验证
        if (!festival || !recipient || !style) {
            alert('请填写所有必填字段');
            return;
        }
        
        // 显示加载动画
        loading.style.display = 'block';
        generateBtn.disabled = true;
        
        // 更新节日信息和背景
        updateFestivalInfo(festival);
        
        // 模拟API调用延迟
        setTimeout(async function() {
            // 生成祝福语
            const greeting = await generateGreeting(festival, recipient, relationship, style, customInfo);
            
            // 显示结果
            greetingText.textContent = greeting;
            showWithFadeIn(resultContainer);
            loading.style.display = 'none';
            generateBtn.disabled = false;
            
            // 如果节日信息可用，显示节日信息
            if (festivalInfo[festival]) {
                showWithFadeIn(festivalInfoContainer);
            }
            
            // 滚动到结果区域
            resultContainer.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    });
    
    // 复制按钮点击事件
    copyBtn.addEventListener('click', function() {
        const textToCopy = greetingText.textContent;
        navigator.clipboard.writeText(textToCopy).then(function() {
            showCopyToast();
        });
    });
    
    // 重新生成按钮点击事件
    regenerateBtn.addEventListener('click', function() {
        const festival = festivalSelect.value === '其他' ? otherFestivalInput.value : festivalSelect.value;
        const recipient = recipientSelect.value === '其他' ? otherRecipientInput.value : recipientSelect.value;
        const relationship = document.getElementById('relationship').value || recipient;
        const style = document.getElementById('style').value;
        const customInfo = document.getElementById('custom-info').value;
        
        // 显示加载动画
        loading.style.display = 'block';
        regenerateBtn.disabled = true;
        
        // 模拟API调用延迟
        setTimeout(async function() {
            // 重新生成祝福语
            const greeting = await generateGreeting(festival, recipient, relationship, style, customInfo);
            
            // 显示结果
            greetingText.textContent = greeting;
            greetingText.classList.add('fade-in');
            loading.style.display = 'none';
            regenerateBtn.disabled = false;
        }, 1000);
    });
    
    // 分享按钮点击事件
    shareBtn.addEventListener('click', function() {
        showWithFadeIn(shareModal);
    });
    
    // 关于链接点击事件
    aboutLink.addEventListener('click', function(e) {
        e.preventDefault();
        showWithFadeIn(aboutModal);
    });
    
    // 关闭模态框
    closeBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.style.display = 'none';
                    modal.style.opacity = '1';
                }, 300);
            }
        });
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.opacity = '0';
            setTimeout(() => {
                event.target.style.display = 'none';
                event.target.style.opacity = '1';
            }, 300);
        }
    });
});

function updateFestivalInfo(festival) {
    if (festivalInfo[festival]) {
        const description = festivalInfo[festival].description;
        const tag = festivalInfo[festival].tag;
        const keywords = festivalInfo[festival].keywords.join(', ');

        const infoHTML = `
            <p><strong>节日描述:</strong> ${description}</p>
            <p><strong>文化标签:</strong> ${tag}</p>
            <p><strong>关键词:</strong> ${keywords}</p>
        `;

        document.getElementById('festival-description').innerHTML = infoHTML;
    } else {
        document.getElementById('festival-description').innerHTML = '';
    }
}

async function generateGreeting(festival, recipient, relationship, style, customInfo) {
    // 简单的模拟生成逻辑，实际可替换为真实的AI调用
    const templates = greetingTemplates[festival] && greetingTemplates[festival][recipient];
    if (templates) {
        const randomIndex = Math.floor(Math.random() * templates.length);
        let greeting = templates[randomIndex].replace('{{relationship}}', relationship);

        if (customInfo) {
            greeting += ` ${customInfo}`;
        }

        return greeting;
    }

    return '暂时无法生成合适的祝福语，请选择其他选项。';
}

function showWithFadeIn(element) {
    element.style.display = 'block';
    element.style.opacity = '0';
    setTimeout(() => {
        element.style.opacity = '1';
    }, 100);
}

function showCopyToast() {
    const toast = document.getElementById('copy-toast');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}