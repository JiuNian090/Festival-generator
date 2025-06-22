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

    // 节日信息数据，包含背景图片URL
    const festivalInfo = {
        '春节': {
            description: '春节，即农历新年，是中国最重要的传统节日。源自殷商时期岁首祈岁祭祀，传承至今包含扫尘、守岁、拜年、贴春联等习俗，承载着团圆和睦的文化内涵。',
            tag: '团圆安康',
            keywords: ['福', '春联', '鞭炮', '红包', '年夜饭', '拜年'],
            background: 'https://example.com/chunjie.jpg'
        },
        '元宵节': {
            description: '元宵节，又称上元节、小正月、元夕或灯节，时间为每年农历正月十五。正月是农历的元月，古人称"夜"为"宵"，正月十五是一年中第一个月圆之夜，所以称正月十五为"元宵节"。',
            tag: '张灯结彩',
            keywords: ['汤圆', '花灯', '猜灯谜', '赏月'],
            background: 'https://example.com/yuanxiao.jpg'
        },
        '清明节': {
            description: '清明节源自上古春祭，兼具自然节气与人文节日内涵。扫墓祭祖与踏青郊游的节俗传统，体现中国人对生命循环的哲学思考。',
            tag: '慎终追远',
            keywords: ['祭扫', '踏青', '插柳', '寒食', '思念', '重生'],
            background: 'https://example.com/qingming.jpg'
        },
        '端午节': {
            description: '端午节，又称端阳节、龙舟节、重午节、重五节、天中节等，日期在每年农历五月初五，是集拜神祭祖、祈福辟邪、欢庆娱乐和饮食为一体的民俗大节。',
            tag: '龙舟竞渡',
            keywords: ['粽子', '龙舟', '艾草', '雄黄', '屈原'],
            background: 'https://example.com/duanwu.jpg'
        },
        '七夕': {
            description: '七夕节，又称七巧节、七姐节、女儿节、乞巧节、七娘会、七夕祭、牛公牛婆日、巧夕等，是中国民间的传统节日。七夕节由星宿崇拜衍化而来，为传统意义上的七姐诞，因拜祭"七姐"活动在七月七晩上举行，故名"七夕"。',
            tag: '浪漫爱情',
            keywords: ['牛郎', '织女', '银河', '乞巧', '爱情'],
            background: 'https://example.com/qixi.jpg'
        },
        '中秋节': {
            description: '中秋节源自天象崇拜，盛行于唐宋。祭月、赏月、吃月饼、玩花灯等习俗，承载着中国人对家庭团圆、生活美满的精神寄托。',
            tag: '花好月圆',
            keywords: ['月饼', '玉兔', '嫦娥', '赏月', '团圆', '思念'],
            background: 'https://example.com/zhongqiu.jpg'
        },
        '重阳节': {
            description: '重阳节，是中国民间传统节日，节期在每年农历九月初九。"九"数在《易经》中为阳数，"九九"两阳数相重，故曰"重阳"；因日与月皆逢九，故又称为"重九"。九九归真，一元肇始，古人认为九九重阳是吉祥的日子。古时民间在重阳节有登高祈福、拜神祭祖及饮宴祈寿等习俗。传承至今，又添加了敬老等内涵。',
            tag: '登高敬老',
            keywords: ['登高', '茱萸', '菊花', '敬老', '长寿'],
            background: 'https://example.com/chongyang.jpg'
        }
    };

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

        // 模拟API调用延迟
        setTimeout(() => {
            // 生成祝福语
            const greeting = generateGreeting();

            // 显示结果
            resultContent.textContent = greeting;
            resultContainer.style.display = 'block';

            // 隐藏加载状态
            showLoading(false);
        }, 1500);
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

    // 生成祝福语（实际应用中应调用API）
    function generateGreeting() {
        const festival = festivalSelect.value === '其他' ? otherFestivalInput.value.trim() : festivalSelect.value;
        const recipient = recipientSelect.value === '其他' ? otherRecipientInput.value : recipientSelect.value;
        const relationship = relationshipInput.value.trim();
        const tone = document.getElementById('tone').value;
        const length = document.getElementById('length').value;
        const keywords = document.getElementById('keywords').value.split(',').map(k => k.trim()).filter(k => k);

        // 祝福语模板库（实际应用中应更丰富）
        const templates = {
            short: {
                温馨: {
                    家人: `${festival}到了，愿您健康长寿，幸福安康！`,
                    父母: `${festival}到了，愿您健康长寿，幸福安康！`,
                    子女: `宝贝，${festival}快乐！愿你无忧无虑，茁壮成长！`,
                    朋友: `祝你${festival}开心，一切顺遂！`,
                    老师: `敬爱的老师，${festival}快乐！感谢您的辛勤付出！`,
                    领导: `尊敬的领导，${festival}快乐！感谢您的指导和关怀！`,
                    同事: `亲爱的同事，${festival}快乐！愿我们合作愉快，共创佳绩！`,
                    客户: `尊敬的客户，${festival}快乐！感谢您的支持与信任！`,
                    长辈: `尊敬的长辈，${festival}快乐！祝您福寿安康，万事胜意！`,
                    晚辈: `亲爱的${recipient}，${festival}快乐！愿你前程似锦，不负韶华！`
                },
                幽默: {
                    朋友: `嘿！${festival}到啦！别忘了出来嗨皮，不然小心我上门堵你！`,
                    家人: `家人们，${festival}快乐！今年的红包准备好了吗？哈哈！`
                },
                正式: {
                    领导: `值此${festival}之际，谨向您致以最诚挚的问候和衷心的祝福！`,
                    客户: `尊敬的客户，在${festival}来临之际，我们衷心感谢您一直以来的支持与信任！`
                },
                深情: {
                    父母: `亲爱的爸爸妈妈，${festival}到了。感谢你们的养育之恩，愿你们健康长寿，幸福永远！`,
                    朋友: `亲爱的朋友，${festival}快乐！感谢你一直以来的陪伴与支持，愿我们的友谊长存！`
                },
                激励: {
                    晚辈: `亲爱的${recipient}，${festival}到了。愿你在新的一年里，努力拼搏，实现自己的梦想！`,
                    同事: `各位同事，${festival}快乐！愿我们在新的一年里，携手共进，创造更加辉煌的业绩！`
                }
            },
            medium: {
                温馨: {
                    家人: `${festival}的钟声已经敲响，在这个充满喜庆和团圆的时刻，我想对您说一声："${relationship}，${festival}快乐！"愿您在新的一年里，身体健康，心情愉快，家庭和睦，事事如意。无论我身在何处，心中永远牵挂着您，愿您的生活充满阳光和温暖，每一天都过得幸福美满。`,
                    朋友: `亲爱的${relationship}，${festival}到了！时光匆匆，转眼间我们已经相识了这么久。在这个特别的日子里，我想对你说一声："谢谢！"感谢你在我困难的时候给予我帮助和支持，感谢你在我开心的时候与我分享快乐。愿你在新的一年里，事业有成，家庭幸福，身体健康，万事如意。无论未来的路有多么艰难，我都会一直在你身边，与你共同面对。`,
                    老师: `敬爱的${relationship}，${festival}快乐！在这个特别的日子里，我想对您说一声："您辛苦了！"感谢您在我成长的道路上给予我知识和智慧，感谢您在我迷茫的时候给予我指导和帮助。您的教诲如明灯照亮我前行的道路，您的关怀如春风温暖我幼小的心灵。愿您在新的一年里，身体健康，工作顺利，家庭幸福，桃李满天下。`,
                    领导: `尊敬的${relationship}，值此${festival}来临之际，我想对您说一声："感谢您！"感谢您在工作中给予我的指导和帮助，感谢您在生活中给予我的关心和照顾。您的领导能力和人格魅力让我敬佩不已，您的工作态度和敬业精神让我深受鼓舞。愿您在新的一年里，身体健康，工作顺利，家庭幸福，事业蒸蒸日上。`,
                    同事: `亲爱的${relationship}，${festival}快乐！在过去的一年里，我们一起奋斗，一起拼搏，共同完成了许多艰巨的任务。在这个过程中，我看到了你的努力和付出，也看到了你的才华和能力。感谢你在工作中给予我的帮助和支持，感谢你在生活中给予我的关心和照顾。愿我们在新的一年里，继续携手共进，共同创造更加美好的未来。`,
                    客户: `尊敬的${relationship}，在${festival}来临之际，我们怀着无比感激的心情，向您致以最诚挚的问候和最衷心的祝福！感谢您一直以来对我们的信任和支持，感谢您在我们成长的道路上给予我们的帮助和鼓励。我们将始终秉承"客户至上"的服务理念，不断提升服务质量，为您提供更加优质、高效的服务。愿您在新的一年里，身体健康，工作顺利，家庭幸福，万事如意！`
                }
            },
            long: {
                温馨: {
                    家人: `${relationship}，${festival}的脚步越来越近了，空气中弥漫着喜庆的气息。每当这个时候，我总会想起您的笑容，想起您对我的关爱和呵护。在我的记忆中，您总是那么勤劳，那么善良，那么坚强。为了这个家，您付出了太多太多，牺牲了自己的青春和梦想。您的爱是无私的，是伟大的，是我这辈子都无法报答的。在这个特别的日子里，我想对您说一声："${relationship}，${festival}快乐！"愿您在新的一年里，身体健康，心情愉快，家庭和睦，事事如意。无论我身在何处，心中永远牵挂着您，愿您的生活充满阳光和温暖，每一天都过得幸福美满。希望在新的一年里，我能有更多的时间陪伴您，让您感受到我的爱和关怀。也希望您能多注意身体，不要太累了，您的健康就是我们最大的幸福。最后，再次祝愿您${festival}快乐，福寿安康，万事如意！`,
                    朋友: `亲爱的${relationship}，时光荏苒，转眼间我们已经相识了这么多年。从最初的陌生到现在的无话不谈，我们一起经历了许多欢笑和泪水，也一起见证了彼此的成长和变化。在我的心中，你不仅仅是我的朋友，更是我的亲人，是我生命中不可或缺的一部分。每当我遇到困难和挫折时，你总是第一个出现在我身边，给我鼓励和支持；每当我取得成绩和进步时，你总是比我还要高兴，为我感到骄傲和自豪。你的真诚和善良让我深受感动，你的乐观和坚强也一直激励着我不断前进。${festival}到了，在这个充满喜庆和团圆的时刻，我想对你说一声："谢谢你！"感谢你一直以来对我的信任和支持，感谢你在我生命中扮演的重要角色。愿你在新的一年里，事业有成，家庭幸福，身体健康，万事如意。无论未来的路有多么漫长和艰难，我都会一直在你身边，与你共同面对，共同分享生活中的喜怒哀乐。最后，再次祝你${festival}快乐，心想事成，一切顺利！`,
                    老师: `敬爱的${relationship}，当我提起笔来给您写这封信时，心中充满了感激和敬意。在我的成长过程中，您是对我影响最大的人之一。您不仅传授给我知识和技能，更教会了我如何做人，如何面对生活中的挑战和困难。您的教诲如明灯照亮我前行的道路，您的关怀如春风温暖我幼小的心灵。记得有一次，我在学习上遇到了困难，情绪非常低落。是您，耐心地给我讲解题目，鼓励我不要放弃，要相信自己的能力。在您的帮助下，我终于克服了困难，取得了进步。那一刻，我深深地感受到了您对我的关爱和期望。${festival}到了，在这个特别的日子里，我想对您说一声："您辛苦了！"感谢您为我们付出的辛勤劳动，感谢您对我们的关心和爱护。您的工作虽然平凡，但却伟大；您的付出虽然默默无闻，但却影响深远。愿您在新的一年里，身体健康，工作顺利，家庭幸福，桃李满天下。您的学生将永远铭记您的教诲，努力学习，将来成为对社会有用的人，不辜负您的期望。最后，再次祝您${festival}快乐，万事胜意！`
                }
            }
        };

        // 确定祝福语模板
        let template = templates[length][tone][recipient] || 
                      templates[length][tone]['家人'] || 
                      `${festival}到了，给${recipient}送上最美好的祝福！`;

        // 替换模板中的变量
        let greeting = template;

        // 如果关系描述不为空，在祝福语前添加称呼
        if (relationship) {
            // 确定合适的称呼前缀
            let prefix = '';
            if (recipient === '家人') {
                prefix = '亲爱的';
            } else if (recipient === '朋友') {
                prefix = '亲爱的';
            } else if (recipient === '老师') {
                prefix = '敬爱的';
            } else if (recipient === '领导') {
                prefix = '尊敬的';
            } else if (recipient === '同事') {
                prefix = '亲爱的';
            } else if (recipient === '客户') {
                prefix = '尊敬的';
            } else if (recipient === '长辈') {
                prefix = '尊敬的';
            } else if (recipient === '晚辈') {
                prefix = '亲爱的';
            } else {
                prefix = '亲爱的';
            }

            // 格式化称呼
            let formattedRelationship = relationship;
            // 如果关系描述以"的"结尾，可能是修饰词，需要调整
            if (relationship.endsWith('的')) {
                formattedRelationship = relationship + recipient;
            }

            // 在祝福语前添加称呼
            greeting = `${prefix}${formattedRelationship}，${greeting}`;
        }

        // 如果有关键词，插入到祝福语中
        if (keywords.length > 0) {
            const keywordStr = keywords.join('、');
            // 根据祝福语长度选择合适的插入位置
            if (length === 'short') {
                greeting = greeting.replace('，', `，${keywordStr}，`);
            } else if (length === 'medium') {
                greeting = greeting.replace('。', `，${keywordStr}。`);
            } else {
                greeting = greeting.replace('，', `，${keywordStr}，`);
            }
        }

        return greeting;
    }

    // 初始检查
    if (festivalSelect.value && festivalSelect.value !== '其他') {
        updateFestivalInfo(festivalSelect.value);
        updateFestivalBackground(festivalSelect.value);
    }

    // AI分析功能
    document.getElementById('ai-input').addEventListener('input', function() {
        // 简单示例：根据输入内容改变按钮状态
        const inputText = this.value.trim();
        document.querySelector('.ai-container button').disabled = !inputText;
    });

    // AI分析按钮点击事件
    document.querySelector('.ai-container button').addEventListener('click', function() {
        const inputText = document.getElementById('ai-input').value.trim();
        if (!inputText) return;

        // 显示加载状态
        const aiResult = document.getElementById('ai-result');
        aiResult.textContent = '正在分析中...';

        // 模拟AI分析延迟
        setTimeout(() => {
            // 在实际应用中，这里应该调用真实的AI API
            // 这里仅作示例，返回一些简单的分析结果
            const sentiment = Math.random() > 0.5 ? '积极' : '消极';
            const length = inputText.length;
            const wordCount = inputText.split(/\s+/).filter(word => word).length;
            
            aiResult.innerHTML = `
                <p>情感分析: <span class="${sentiment === '积极' ? 'text-green-500' : 'text-red-500'}">${sentiment}</span></p>
                <p>文本长度: ${length} 字符</p>
                <p>词数: ${wordCount} 个词</p>
                <p>祝福语建议: 这是一段${sentiment}的文本，适合作为${recipientSelect.value || '朋友'}的祝福语。</p>
            `;
        }, 1500);
    });
});