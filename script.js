// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
    // 获取元素
    const festivalSelect = document.getElementById('festival');
    const otherFestivalContainer = document.getElementById('other-festival-container');
    const otherFestivalInput = document.getElementById('other-festival');
    const recipientSelect = document.getElementById('recipient');
    const otherRecipientContainer = document.getElementById('other-recipient-container');
    const otherRecipientInput = document.getElementById('other-recipient');
    const relationshipInput = document.getElementById('relationship');
    const generateBtn = document.getElementById('generate-btn');
    const loading = document.getElementById('loading');
    const resultContainer = document.getElementById('result-container');
    const resultContent = document.getElementById('result-content');
    const copyBtn = document.getElementById('copy-btn');
    const regenerateBtn = document.getElementById('regenerate-btn');
    const festivalTitle = document.getElementById('festival-title');
    const festivalDescription = document.getElementById('festival-description');
    const festivalTag = document.getElementById('festival-tag');
    const festivalKeywords = document.getElementById('festival-keywords');
    const keywordsList = festivalKeywords.querySelector('.keywords-list');
    const backgroundContainer = document.getElementById('background-container');
    const shareBtn = document.getElementById('share-btn');
    const shareModal = document.getElementById('share-modal');
    const closeBtn = document.querySelector('.close');
    const wechatShareBtn = document.getElementById('weixin-share');
    const wechatQrcodeContainer = document.getElementById('wechat-qrcode');
    const qrcodeContainer = document.getElementById('qrcode-container');
    const shareToast = document.getElementById('share-toast');
    
    // API设置相关元素
    const apiSettingsBtn = document.getElementById('api-settings-btn');
    const apiSettingsModal = document.getElementById('api-settings-modal');
    const apiSettingsCloseBtn = document.querySelector('#api-settings-modal .close');
    const apiProviderSelect = document.getElementById('api-provider');
    const apiKeyInput = document.getElementById('api-key');
    const saveApiSettingsBtn = document.getElementById('save-api-settings');
    const apiSettingsStatus = document.getElementById('api-settings-status');
    const resetApiSettingsBtn = document.getElementById('reset-api-settings');
    
    // 节日信息数据，包含背景图片URL
    const festivalInfo = {
        '春节': {
            description: '春节，即农历新年，是中国最重要的传统节日。源自殷商时期岁首祈岁祭祀，传承至今包含扫尘、守岁、拜年、贴春联等习俗，承载着团圆和睦的文化内涵。',
            tag: '团圆安康',
            keywords: ['福', '春联', '鞭炮', '红包', '年夜饭', '拜年'],
            background: 'https://example.cn/chunjie.jpg'
        },
        '元宵节': {
            description: '元宵节，又称上元节、小正月、元夕或灯节，时间为每年农历正月十五。正月是农历的元月，古人称"夜"为"宵"，正月十五是一年中第一个月圆之夜，所以称正月十五为"元宵节"。',
            tag: '张灯结彩',
            keywords: ['汤圆', '花灯', '猜灯谜', '赏月'],
            background: 'https://example.cn/yuanxiao.jpg'
        },
        '清明节': {
            description: '清明节源自上古春祭，兼具自然节气与人文节日内涵。扫墓祭祖与踏青郊游的节俗传统，体现中国人对生命循环的哲学思考。',
            tag: '慎终追远',
            keywords: ['祭扫', '踏青', '插柳', '寒食', '思念', '重生'],
            background: 'https://example.cn/qingming.jpg'
        },
        '端午节': {
            description: '端午节，又称端阳节、龙舟节、重午节、重五节、天中节等，日期在每年农历五月初五，是集拜神祭祖、祈福辟邪、欢庆娱乐和饮食一体化的民俗大节。',
            tag: '龙舟竞渡',
            keywords: ['粽子', '龙舟', '艾草', '雄黄', '屈原'],
            background: 'https://example.cn/duanwu.jpg'
        },
        '七夕': {
            description: '七夕节，又称七巧节、七姐节、女儿节、乞巧节、七娘会、七夕祭、牛公牛婆日、巧夕等，是中国民间的传统节日。七夕节由星宿崇拜衍化而来，为传统意义上的七姐诞，因拜祭"七姐"活动在七月七晩上举行，故名"七夕"。',
            tag: '浪漫爱情',
            keywords: ['牛郎', '织女', '银河', '乞巧', '爱情'],
            background: 'https://example.cn/qixi.jpg'
        },
        '中秋节': {
            description: '中秋节源自天象崇拜，盛行于唐宋。祭月、赏月、吃月饼、玩花灯等习俗，承载着中国人对家庭团圆、生活美满的精神寄托。',
            tag: '花好月圆',
            keywords: ['月饼', '玉兔', '嫦娥', '赏月', '团圆', '思念'],
            background: 'https://example.cn/zhongqiu.jpg'
        },
        '重阳节': {
            description: '重阳节，是中国民间传统节日，节期在每年农历九月初九。"九"数在《易经》中为阳数，"九九"两阳数相重，故曰"重阳"；因日与月皆逢九，故又称为"重九"。九九归真，一元肇始，古人认为九九重阳是吉祥的日子。古时民间在重阳节有登高祈福、拜神祭祖及饮宴祈寿等习俗。传承至今，又添加了敬老等内涵。',
            tag: '登高敬老',
            keywords: ['登高', '茱萸', '菊花', '敬老', '长寿'],
            background: 'https://example.cn/chongyang.jpg'
        }
    };

    // AI配置 - 默认配置，将被环境变量和用户设置覆盖
    const DEFAULT_AI_CONFIG = {
        openai: {
            enabled: false,
            endpoint: 'https://api.openai.com/v1/chat/completions',
            model: 'gpt-3.5-turbo',
            apiKey: 'YOUR_OPENAI_API_KEY'
        },
        anthropic: {
            enabled: false,
            endpoint: 'https://api.anthropic.com/v1/complete',
            model: 'claude-2',
            apiKey: 'YOUR_ANTHROPIC_API_KEY'
        },
        deepseek: {
            enabled: true,
            endpoint: 'https://api.deepseek.com/v1/chat/completions',
            model: 'deepseek-chat',
            apiKey: 'YOUR_DEEPSEEK_API_KEY'
        },
        defaultProvider: 'deepseek'
    };
    
    // 初始化AI配置
    let AI_CONFIG = JSON.parse(JSON.stringify(DEFAULT_AI_CONFIG));
    
    // 从环境变量加载API配置
    loadApiConfigFromEnv();
    
    // 从本地存储加载用户自定义API配置
    loadCustomApiConfig();
    
    // 更新API设置UI
    updateApiSettingsUI();

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
    festivalSelect.addEventListener('change', function () {
        if (this.value === '其他') {
            otherFestivalContainer.style.display = 'block';
            // 恢复默认背景
            backgroundContainer.style.backgroundImage = '';
            backgroundContainer.classList.remove('festival-background');
        } else {
            otherFestivalContainer.style.display = 'none';
            // 显示节日信息
            updateFestivalInfo(this.value);
            // 更新背景图片
            updateFestivalBackground(this.value);
        }
    });

    // 处理其他祝福对象输入框显示逻辑
    recipientSelect.addEventListener('change', function () {
        if (this.value === '其他') {
            otherRecipientContainer.style.display = 'block';
        } else {
            otherRecipientContainer.style.display = 'none';
        }
    });

    // 更新节日信息
    function updateFestivalInfo(festival) {
        if (festivalInfo[festival]) {
            festivalTitle.textContent = festival;
            festivalDescription.textContent = festivalInfo[festival].description;
            festivalTag.textContent = festivalInfo[festival].tag;

            // 清空关键词列表
            keywordsList.innerHTML = '';

            // 添加关键词
            festivalInfo[festival].keywords.forEach(keyword => {
                const span = document.createElement('span');
                span.className = 'keyword';
                span.textContent = keyword;
                keywordsList.appendChild(span);
            });

            // 显示节日信息
            document.getElementById('festival-info').style.display = 'block';
        } else {
            // 隐藏节日信息
            document.getElementById('festival-info').style.display = 'none';
        }
    }

    // 更新节日背景
    function updateFestivalBackground(festival) {
        if (festivalInfo[festival] && festivalInfo[festival].background) {
            // 添加背景图片
            backgroundContainer.style.backgroundImage = `url(${festivalInfo[festival].background})`;
            // 添加动画类
            backgroundContainer.classList.add('festival-background');
        } else {
            // 恢复默认背景
            backgroundContainer.style.backgroundImage = '';
            backgroundContainer.classList.remove('festival-background');
        }
    }

    // 生成祝福语按钮点击事件
    generateBtn.addEventListener('click', function () {
        // 验证表单
        if (!validateForm()) {
            return;
        }

        // 显示加载状态
        showLoading(true);

        // 调用AI生成祝福语
        generateGreetingWithAI().then(greeting => {
            // 显示结果
            resultContent.textContent = greeting;
            resultContainer.style.display = 'block';

            // 隐藏加载状态
            showLoading(false);
        }).catch(error => {
            console.error('AI生成祝福语失败:', error);
            // 显示错误信息
            resultContent.textContent = '抱歉，祝福语生成失败。请检查您的网络连接或API密钥是否正确。';
            resultContainer.style.display = 'block';
            showLoading(false);
        });
    });

    // 复制按钮点击事件
    copyBtn.addEventListener('click', function () {
        const textToCopy = resultContent.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            // 显示复制成功提示
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> 已复制';
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 2000);
        });
    });

    // 重新生成按钮点击事件
    regenerateBtn.addEventListener('click', function () {
        generateBtn.click();
    });

    // 分享按钮点击事件
    shareBtn.addEventListener('click', function () {
        shareModal.style.display = 'flex';
    });

    // 关闭模态框
    closeBtn.addEventListener('click', function () {
        shareModal.style.display = 'none';
        wechatQrcodeContainer.style.display = 'none';
    });

    // 点击模态框外部关闭
    shareModal.addEventListener('click', function (e) {
        if (e.target === shareModal) {
            shareModal.style.display = 'none';
            wechatQrcodeContainer.style.display = 'none';
        }
    });

    // 微信分享按钮点击事件
    wechatShareBtn.addEventListener('click', function () {
        // 显示微信二维码区域
        wechatQrcodeContainer.style.display = 'block';
        
        // 这里应该生成实际的二维码，此处仅作示例
        // 在实际项目中，可以使用qrcode.js等库生成二维码
        qrcodeContainer.innerHTML = '<div class="placeholder-qrcode">二维码将在这里生成</div>';
    });

    // 分享链接按钮点击事件
    document.getElementById('link-share').addEventListener('click', function () {
        // 生成分享链接
        const shareUrl = window.location.href;
        
        // 复制链接到剪贴板
        navigator.clipboard.writeText(shareUrl).then(() => {
            // 显示分享成功提示
            showToast('分享链接已复制到剪贴板');
        });
    });

    // 显示提示消息
    function showToast(message) {
        shareToast.textContent = message;
        shareToast.classList.add('show');
        
        setTimeout(() => {
            shareToast.classList.remove('show');
        }, 3000);
    }

    // 显示/隐藏加载状态
    function showLoading(show) {
        loading.style.display = show ? 'flex' : 'none';
        generateBtn.disabled = show;
    }

    // 验证表单
    function validateForm() {
        let isValid = true;

        // 验证节日
        if (!festivalSelect.value || (festivalSelect.value === '其他' && !otherFestivalInput.value.trim())) {
            isValid = false;
            showError(festivalSelect, '请选择或输入节日');
        } else {
            clearError(festivalSelect);
        }

        // 验证祝福对象
        if (!recipientSelect.value || (recipientSelect.value === '其他' && !otherRecipientInput.value.trim())) {
            isValid = false;
            showError(recipientSelect, '请选择或输入祝福对象');
        } else {
            clearError(recipientSelect);
        }

        // 验证祝福语气
        if (!document.getElementById('tone').value) {
            isValid = false;
            showError(document.getElementById('tone'), '请选择祝福语气');
        } else {
            clearError(document.getElementById('tone'));
        }

        // 验证祝福语长度
        if (!document.getElementById('length').value) {
            isValid = false;
            showError(document.getElementById('length'), '请选择祝福语长度');
        } else {
            clearError(document.getElementById('length'));
        }

        // 验证AI配置
        let aiProviderEnabled = false;
        for (const provider in AI_CONFIG) {
            if (AI_CONFIG.hasOwnProperty(provider) && provider !== 'defaultProvider') {
                if (AI_CONFIG[provider].enabled && AI_CONFIG[provider].apiKey && AI_CONFIG[provider].apiKey !== 'YOUR_API_KEY') {
                    aiProviderEnabled = true;
                    break;
                }
            }
        }

        if (!aiProviderEnabled) {
            isValid = false;
            alert('请在API设置中配置至少一个AI提供商的API密钥，或在Cloudflare Pages环境变量中配置。');
        }

        return isValid;
    }

    // 显示错误提示
    function showError(element, message) {
        // 添加错误样式
        element.classList.add('error');

        // 检查是否已存在错误提示元素
        let errorElement = element.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            element.parentNode.insertBefore(errorElement, element.nextSibling);
        }

        errorElement.textContent = message;
    }

    // 清除错误提示
    function clearError(element) {
        element.classList.remove('error');

        // 移除错误提示元素
        const errorElement = element.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
    }

    // 从环境变量加载API配置
    function loadApiConfigFromEnv() {
        if (typeof CLOUDFLARE_VARS !== 'undefined') {
            if (CLOUDFLARE_VARS.OPENAI_API_KEY) {
                AI_CONFIG.openai.apiKey = CLOUDFLARE_VARS.OPENAI_API_KEY;
                AI_CONFIG.openai.enabled = true;
            }
            if (CLOUDFLARE_VARS.ANTHROPIC_API_KEY) {
                AI_CONFIG.anthropic.apiKey = CLOUDFLARE_VARS.ANTHROPIC_API_KEY;
                AI_CONFIG.anthropic.enabled = true;
            }
            if (CLOUDFLARE_VARS.DEEPSEEK_API_KEY) {
                AI_CONFIG.deepseek.apiKey = CLOUDFLARE_VARS.DEEPSEEK_API_KEY;
                AI_CONFIG.deepseek.enabled = true;
            }
        }
    }
    
    // 从本地存储加载用户自定义API配置
    function loadCustomApiConfig() {
        try {
            const customConfig = localStorage.getItem('ai_custom_config');
            if (customConfig) {
                const parsedConfig = JSON.parse(customConfig);
                
                // 只应用用户在UI中配置的提供商
                for (const provider in parsedConfig) {
                    if (parsedConfig.hasOwnProperty(provider) && provider !== 'defaultProvider') {
                        if (parsedConfig[provider].enabled && parsedConfig[provider].apiKey) {
                            AI_CONFIG[provider].apiKey = parsedConfig[provider].apiKey;
                            AI_CONFIG[provider].enabled = true;
                        }
                    }
                }
                
                // 如果用户在UI中设置了默认提供商，则更新
                if (parsedConfig.defaultProvider && AI_CONFIG[parsedConfig.defaultProvider]) {
                    AI_CONFIG.defaultProvider = parsedConfig.defaultProvider;
                }
            }
        } catch (error) {
            console.error('Failed to load custom API config:', error);
        }
    }
    
    // 保存用户自定义API配置到本地存储
    function saveCustomApiConfig() {
        try {
            localStorage.setItem('ai_custom_config', JSON.stringify(AI_CONFIG));
            return true;
        } catch (error) {
            console.error('Failed to save custom API config:', error);
            return false;
        }
    }
    
    // 更新API设置UI
    function updateApiSettingsUI() {
        // 设置当前选中的提供商
        apiProviderSelect.value = AI_CONFIG.defaultProvider;
        
        // 设置API密钥输入框
        const currentProvider = AI_CONFIG.defaultProvider;
        if (AI_CONFIG[currentProvider].apiKey && AI_CONFIG[currentProvider].apiKey !== 'YOUR_API_KEY') {
            // 显示部分API密钥（前4位和后4位）
            const apiKey = AI_CONFIG[currentProvider].apiKey;
            apiKeyInput.value = apiKey.substring(0, 4) + '••••••••' + apiKey.substring(apiKey.length - 4);
        } else {
            apiKeyInput.value = '';
        }
        
        // 更新状态显示
        updateApiStatus();
    }
    
    // 更新API状态显示
    function updateApiStatus() {
        const currentProvider = AI_CONFIG.defaultProvider;
        
        if (AI_CONFIG[currentProvider].apiKey && AI_CONFIG[currentProvider].apiKey !== 'YOUR_API_KEY') {
            apiSettingsStatus.innerHTML = `<span class="status success">已配置</span>`;
        } else {
            apiSettingsStatus.innerHTML = `<span class="status error">未配置</span>`;
        }
    }
    
    // 重置API设置
    function resetApiSettings() {
        // 重置为默认配置
        AI_CONFIG = JSON.parse(JSON.stringify(DEFAULT_AI_CONFIG));
        
        // 从环境变量重新加载配置
        loadApiConfigFromEnv();
        
        // 清除本地存储中的自定义配置
        localStorage.removeItem('ai_custom_config');
        
        // 更新UI
        updateApiSettingsUI();
        
        // 显示重置成功消息
        showApiSettingsMessage('API设置已重置为默认值', 'success');
    }
    
    // 显示API设置消息
    function showApiSettingsMessage(message, type = 'info') {
        const messageElement = document.createElement('div');
        messageElement.className = `api-settings-message ${type}`;
        messageElement.textContent = message;
        
        const container = document.querySelector('#api-settings-modal .modal-content');
        container.appendChild(messageElement);
        
        setTimeout(() => {
            messageElement.classList.add('fade-out');
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }, 3000);
    }

    // 使用AI生成祝福语
    async function generateGreetingWithAI() {
        const festival = festivalSelect.value === '其他' ? otherFestivalInput.value.trim() : festivalSelect.value;
        const recipient = recipientSelect.value === '其他' ? otherRecipientInput.value : recipientSelect.value;
        const relationship = relationshipInput.value.trim();
        const tone = document.getElementById('tone').value;
        const length = document.getElementById('length').value;
        const keywords = document.getElementById('keywords').value.split(',').map(k => k.trim()).filter(k => k);
        
        // 确定祝福语长度要求
        let lengthRequirement = '';
        if (length === 'short') {
            lengthRequirement = '10-20字左右的简短祝福语';
        } else if (length === 'medium') {
            lengthRequirement = '30-50字左右的中等长度祝福语';
        } else if (length === 'long') {
            lengthRequirement = '80-120字左右的较长祝福语';
        }
        
        // 构建提示词
        let prompt = `请为${relationship || recipient}生成一段适合${festival}的${tone}风格的${lengthRequirement}`;
        
        if (keywords.length > 0) {
            prompt += `，并包含以下关键词：${keywords.join('、')}`;
        }
        
        prompt += `。祝福语需要以${relationship || recipient}的称呼开头，如"亲爱的${relationship || recipient}，"或"敬爱的${relationship || recipient}，"等。`;
        
        // 选择AI提供商
        let selectedProvider = AI_CONFIG.defaultProvider;
        if (!AI_CONFIG[selectedProvider].enabled || !AI_CONFIG[selectedProvider].apiKey || AI_CONFIG[selectedProvider].apiKey === 'YOUR_API_KEY') {
            // 尝试找到第一个可用的提供商
            for (const provider in AI_CONFIG) {
                if (AI_CONFIG.hasOwnProperty(provider) && provider !== 'defaultProvider') {
                    if (AI_CONFIG[provider].enabled && AI_CONFIG[provider].apiKey && AI_CONFIG[provider].apiKey !== 'YOUR_API_KEY') {
                        selectedProvider = provider;
                        break;
                    }
                }
            }
        }
        
        // 如果没有可用的提供商，抛出错误
        if (!AI_CONFIG[selectedProvider].enabled || !AI_CONFIG[selectedProvider].apiKey || AI_CONFIG[selectedProvider].apiKey === 'YOUR_API_KEY') {
            throw new Error('没有可用的AI提供商，请在API设置中配置API密钥，或在Cloudflare Pages环境变量中配置。');
        }
        
        // 根据选择的提供商调用相应的API
        if (selectedProvider === 'openai') {
            return callOpenAIAPI(prompt);
        } else if (selectedProvider === 'anthropic') {
            return callAnthropicAPI(prompt);
        } else if (selectedProvider === 'deepseek') {
            return callDeepSeekAPI(prompt);
        } else {
            throw new Error(`不支持的AI提供商: ${selectedProvider}`);
        }
    }

    // 调用OpenAI API
    async function callOpenAIAPI(prompt) {
        const response = await fetch(AI_CONFIG.openai.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI_CONFIG.openai.apiKey}`
            },
            body: JSON.stringify({
                model: AI_CONFIG.openai.model,
                messages: [
                    {
                        role: 'system',
                        content: '你是一个专业的祝福语生成助手，擅长根据不同的节日、祝福对象和风格生成恰当、温馨的祝福语。'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7, // 控制随机性，0-1之间，值越高越随机
                max_tokens: 200,
                n: 1
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`OpenAI API错误: ${errorData.error?.message || '未知错误'}`);
        }
        
        const data = await response.json();
        return data.choices[0].message.content.trim();
    }

    // 调用Anthropic API
    async function callAnthropicAPI(prompt) {
        const response = await fetch(AI_CONFIG.anthropic.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': AI_CONFIG.anthropic.apiKey
            },
            body: JSON.stringify({
                prompt: `Human: ${prompt}\n\nAssistant:`,
                model: AI_CONFIG.anthropic.model,
                max_tokens_to_sample: 200,
                temperature: 0.7,
                stop_sequences: ['Human:']
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Anthropic API错误: ${errorData.detail || '未知错误'}`);
        }
        
        const data = await response.json();
        return data.completion.trim();
    }

    // 调用DeepSeek API
    async function callDeepSeekAPI(prompt) {
        const response = await fetch(AI_CONFIG.deepseek.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI_CONFIG.deepseek.apiKey}`
            },
            body: JSON.stringify({
                model: AI_CONFIG.deepseek.model,
                messages: [
                    {
                        role: 'system',
                        content: '你是一个专业的祝福语生成助手，擅长根据不同的节日、祝福对象和风格生成恰当、温馨的祝福语。你的回答应该符合中文表达习惯，情感真挚，富有创意。'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.8, // 略微提高随机性
                max_tokens: 200,
                n: 1
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`DeepSeek API错误: ${errorData.error?.message || '未知错误'}`);
        }
        
        const data = await response.json();
        return data.choices[0].message.content.trim();
    }

    // 初始检查
    if (festivalSelect.value && festivalSelect.value !== '其他') {
        updateFestivalInfo(festivalSelect.value);
        updateFestivalBackground(festivalSelect.value);
    }
    
    // API设置模态框事件处理
    apiSettingsBtn.addEventListener('click', function() {
        apiSettingsModal.style.display = 'flex';
        updateApiSettingsUI();
    });
    
    apiSettingsCloseBtn.addEventListener('click', function() {
        apiSettingsModal.style.display = 'none';
    });
    
    apiSettingsModal.addEventListener('click', function(e) {
        if (e.target === apiSettingsModal) {
            apiSettingsModal.style.display = 'none';
        }
    });
    
    // API提供商选择变化事件
    apiProviderSelect.addEventListener('change', function() {
        updateApiSettingsUI();
    });
    
    // 保存API设置
    saveApiSettingsBtn.addEventListener('click', function() {
        const provider = apiProviderSelect.value;
        let apiKey = apiKeyInput.value.trim();
        
        // 验证API密钥格式
        if (!apiKey) {
            showApiSettingsMessage('请输入API密钥', 'error');
            return;
        }
        
        // 如果输入的是部分显示的API密钥（如"sk-••••••••"），保持原有密钥不变
        if (apiKey.includes('••••')) {
            if (AI_CONFIG[provider].apiKey && AI_CONFIG[provider].apiKey !== 'YOUR_API_KEY') {
                // 使用已保存的完整API密钥
                apiKey = AI_CONFIG[provider].apiKey;
            } else {
                showApiSettingsMessage('请输入完整的API密钥', 'error');
                return;
            }
        }
        
        // 更新配置
        AI_CONFIG[provider].apiKey = apiKey;
        AI_CONFIG[provider].enabled = true;
        AI_CONFIG.defaultProvider = provider;
        
        // 保存到本地存储
        if (saveCustomApiConfig()) {
            // 更新UI
            updateApiSettingsUI();
            showApiSettingsMessage('API设置已保存', 'success');
        } else {
            showApiSettingsMessage('保存API设置失败', 'error');
        }
    });
    
    // 重置API设置
    resetApiSettingsBtn.addEventListener('click', function() {
        if (confirm('确定要重置API设置吗？这将删除所有自定义配置并恢复默认值。')) {
            resetApiSettings();
        }
    });
});