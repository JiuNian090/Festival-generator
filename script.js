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


const blessingTemplates = {
  // 保持原有结构
};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
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

    // 微信分享
    document.getElementById('weixin-share').addEventListener('click', function() {
        const wechatQrcode = document.getElementById('wechat-qrcode');
        const qrcodeContainer = document.getElementById('qrcode-container');
        const shareOptions = document.querySelector('.share-options');

        // 显示二维码容器，隐藏分享选项
        wechatQrcode.style.display = 'block';
        shareOptions.style.display = 'none';

        // 生成当前页面URL的二维码
        const currentUrl = window.location.href;
        const qrcodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(currentUrl)}&size=160x160`;
        qrcodeContainer.innerHTML = `<img src="${qrcodeUrl}" alt="微信分享二维码">`;
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
  // 加载本地AI模型
  const model = await tf.loadLayersModel('models/festival-model.json');
  
  // 构建特征向量
  const features = {
    festival: festivalInfo[festival]?.keywords || [],
    relationship: relationship,
    style: style
  };
  
  // 使用模型生成祝福语
  const prediction = model.predict(tf.tensor([encodeFeatures(features)]));
  return formatPrediction(prediction.dataSync());
}

function encodeFeatures(features) {
  // 特征编码逻辑
  return [
    ...features.festival.map(k => k.length),
    features.relationship.length,
    features.style === '传统' ? 1 : 0
  ];
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

// 节日选择变化时更新背景图片
document.getElementById('festival').addEventListener('change', function() {
    const selectedFestival = festivals.find(f => f.name === this.value);
    if (selectedFestival && selectedFestival.imageUrl) {
        document.body.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('${selectedFestival.imageUrl}')`;
    } else {
        document.body.style.backgroundImage = '';
    }
});
const festivals = [
    { name: '春节', description: '春节，即中国农历新年，是中华民族最隆重的传统佳节。春节历史悠久，由上古时代岁首祈岁祭祀演变而来。春节期间，全国各地均有举行各种庆贺新春活动，带有浓郁的各地域特色。', imageUrl: 'https://picsum.photos/id/1035/1920/1080' },
    { name: '元宵节', description: '元宵节，又称上元节、小正月、元夕或灯节，是中国的传统节日之一，时间为每年农历正月十五。元宵节主要有赏花灯、吃汤圆、猜灯谜、放烟花等一系列传统民俗活动。', imageUrl: 'https://picsum.photos/id/1040/1920/1080' },
    { name: '清明节', description: '清明节，又称踏青节、行清节、三月节、祭祖节等，节期在仲春与暮春之交。清明节源自上古时代的祖先信仰与春祭礼俗，兼具自然与人文两大内涵，既是自然节气点，也是传统节日。', imageUrl: 'https://picsum.photos/id/1043/1920/1080' },
    { name: '端午节', description: '端午节，又称端阳节、龙舟节、重午节、龙节、正阳节、天中节等，源自天象崇拜，由上古时代祭龙演变而来。扒龙舟与食粽是端午节的两大礼俗，这两大礼俗在中国自古传承，至今不辍。', imageUrl: 'https://picsum.photos/id/1053/1920/1080' },
    { name: '七夕节', description: '七夕节，又称七巧节、七姐节、女儿节、乞巧节、七娘会、七夕祭、牛公牛婆日、巧夕等，是中国民间的传统节日。七夕节由星宿崇拜衍化而来，为传统意义上的七姐诞，因拜祭“七姐”活动在七月七晩上举行，故名“七夕”。', imageUrl: 'https://picsum.photos/id/1060/1920/1080' },
    { name: '中秋节', description: '中秋节，又称祭月节、月光诞、月夕、秋节、仲秋节、拜月节、月娘节、月亮节、团圆节等，是中国民间的传统节日。中秋节自古便有祭月、赏月、吃月饼、玩花灯、赏桂花、饮桂花酒等民俗，流传至今，经久不息。', imageUrl: 'https://picsum.photos/id/1069/1920/1080' },
    { name: '重阳节', description: '重阳节，是中国传统节日，节期为每年农历九月初九。“九”数在《易经》中为阳数，“九九”两阳数相重，故曰“重阳”；因日与月皆逢九，故又称为“重九”。九九归真，一元肇始，古人认为九九重阳是吉祥的日子。', imageUrl: 'https://picsum.photos/id/1080/1920/1080' },
    { name: '冬至', description: '冬至，又称日短至、冬节、亚岁等，兼具自然与人文两大内涵，既是二十四节气中一个重要的节气，也是中国民间的传统节日。冬至是四时八节之一，被视为冬季的大节日，在古代民间有“冬至大如年”的讲法。', imageUrl: 'https://picsum.photos/id/1084/1920/1080' },
    { name: '腊八节', description: '腊八节，即每年农历十二月初八，又称为“法宝节”“佛成道节”“成道会”等。本为佛教纪念释迦牟尼佛成道之节日，后逐渐也成为民间节日。腊八节主要流行于中国北方地区，节日习俗是喝腊八粥。', imageUrl: 'https://picsum.photos/id/1089/1920/1080' }
];

// 使用TensorFlow.js预训练模型
async function loadModel() {
  const model = await tf.loadLayersModel('https://tfhub.dev/google/tfjs-model/universal-sentence-encoder/1');
  return model;
}

// 文本分析函数
async function analyzeText() {
  const inputText = document.getElementById('ai-input').value;
  const model = await loadModel();
  const embedding = await model.embed(inputText);
  const result = `AI分析完成，特征维度：${embedding.shape}`;
  document.getElementById('ai-result').innerText = result;
}