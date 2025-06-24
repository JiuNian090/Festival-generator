document.addEventListener('DOMContentLoaded', function() {
    // 全局状态
    const state = {
        selectedHoliday: null,
        selectedProfession: null,
        honorific: '',
        customDescription: ''
    };

    // DOM元素
    const holidaySelection = document.getElementById('holiday-selection').querySelector('.selection-content');
    const recipientSelection = document.getElementById('recipient-selection').querySelector('.selection-content');
    const customizationSection = document.getElementById('customization');
    const generateBtn = document.getElementById('generate-btn');
    const blessingResult = document.getElementById('blessing-result');
    const copyBtn = document.getElementById('copy-btn');
    const shareBtn = document.getElementById('share-btn');

    // 初始化函数
    function init() {
        renderHolidaySelection();
        setupEventListeners();
        checkUrlParameters();
    }

    // 渲染节日选择界面
function renderHolidaySelection() {
    // 默认显示第一个分类
    const firstCategory = document.querySelector('.category-tab[data-category]')?.dataset.category || 'traditional';
    renderFilteredHolidays(firstCategory);
}

// 根据分类渲染节日
function renderFilteredHolidays(category) {
    holidaySelection.innerHTML = '';
    const holidaysInCategory = holidays[category] || [];

    holidaysInCategory.forEach(holiday => {
        const holidayCard = createOptionCard(
            holiday.id,
            holiday.name,
            holiday.description,
            holiday.icon,
            'holiday',
            holiday.subcategories
        );
        holidaySelection.appendChild(holidayCard);
    });
}

// 渲染职业选择界面
function renderProfessionSelection() {
    // 默认显示第一个分类
    const firstCategory = document.querySelector('#recipient-selection .category-tab')?.dataset.category || 'family';
    renderFilteredProfessions(firstCategory);
}

// 根据分类渲染职业
function renderFilteredProfessions(category) {
    recipientSelection.innerHTML = '';
    const professionsInCategory = professions.filter(p => p.category === category);

    professionsInCategory.forEach(profession => {
        const professionCard = createOptionCard(
            profession.id,
            profession.name,
            profession.description,
            profession.icon,
            'profession',
            profession.subcategories
        );
        recipientSelection.appendChild(professionCard);
    });
}

    // 渲染职业选择界面
    function renderProfessionSelection() {
        recipientSelection.innerHTML = '';

        const professionHeader = document.createElement('h3');
        professionHeader.textContent = '选择职业';
        recipientSelection.appendChild(professionHeader);

        professions.forEach(profession => {
            const professionCard = createOptionCard(
                profession.id,
                profession.name,
                profession.description,
                null,
                'profession'
            );
            recipientSelection.appendChild(professionCard);
        });
    }

    // 渲染自定义区域
    function renderCustomizationSection() {
        if (!state.selectedProfession) return;

        const profession = professions.find(p => p.id === state.selectedProfession);
        if (!profession) return;

        customizationSection.querySelector('.selection-content').innerHTML = `
            <div class="select-wrapper">
                <label for="honorific-select">选择敬语</label>
                <select id="honorific-select">
                    <option value="">--请选择敬语--</option>
                    ${profession.honorifics.map(h => `<option value="${h}">${h}</option>`).join('')}
                </select>
            </div>
            <div class="select-wrapper">
                <label for="description-input">自定义描述（可选）</label>
                <input type="text" id="description-input" placeholder="例如：工作多年的导师、救死扶伤的白衣天使">
            </div>
        `;

        // 设置事件监听
        document.getElementById('honorific-select').addEventListener('change', function(e) {
            state.honorific = e.target.value;
        });

        document.getElementById('description-input').addEventListener('input', function(e) {
            state.customDescription = e.target.value;
        });
    }

    // 创建选择卡片
    function createOptionCard(id, name, description, icon = null, type, subcategories = null) {
        const card = document.createElement('div');
        card.className = 'option-card';
        card.dataset.id = id;
        card.dataset.type = type;

        const iconHtml = icon ? `<div class="option-icon">${icon}</div>` : '';

        let cardContent = `
            ${iconHtml}
            <h3>${name}</h3>
            <p>${description}</p>
        `;

        // 如果有子分类，添加子菜单
        if (subcategories && subcategories.length) {
            card.classList.add('has-submenu');
            let submenuHtml = '<div class="submenu">';
            subcategories.forEach(sub => {
                submenuHtml += `<div class="submenu-item" data-id="${sub.id}">${sub.name}</div>`;
            });
            submenuHtml += '</div>';
            cardContent += submenuHtml;
        }

        card.innerHTML = cardContent;

        card.addEventListener('click', function(e) {
            // 移除同类型卡片的选中状态
            document.querySelectorAll(`.option-card[data-type="${type}"]`).forEach(c => {
                c.classList.remove('selected');
            });

            // 设置当前卡片为选中状态
            this.classList.add('selected');

            // 更新状态
            if (type === 'holiday') {
                state.selectedHoliday = id;
                renderProfessionSelection();
            } else if (type === 'profession') {
                state.selectedProfession = id;
                renderCustomizationSection();
            }
        });

        return card;
    }

    // 生成祝福语
    function generateBlessing() {
        // 验证选择
        if (!state.selectedHoliday || !state.selectedProfession) {
            alert('请选择节日和祝福对象');
            return;
        }

        // 获取匹配的模板
        const matchingTemplates = getMatchingTemplates(state.selectedHoliday, state.selectedProfession);
        if (!matchingTemplates.length) {
            alert('没有找到匹配的祝福语模板');
            return;
        }

        // 随机选择一个模板
        const randomTemplate = matchingTemplates[Math.floor(Math.random() * matchingTemplates.length)];

        // 获取职业信息
        const profession = professions.find(p => p.id === state.selectedProfession);
        if (!profession) return;

        // 构建描述文本
        const descriptionText = state.customDescription ? state.customDescription : profession.adjectives[Math.floor(Math.random() * profession.adjectives.length)];

        // 替换模板变量
        const blessing = randomTemplate
            .replace('{{honorific}}', state.honorific || '')
            .replace('{{recipient}}', profession.name)
            .replace('{{description}}', descriptionText);

        // 显示结果
        displayBlessing(blessing);

        // 更新URL参数以便分享
        updateUrlParameters();
    }

    // 显示祝福语
    function displayBlessing(text) {
        blessingResult.textContent = '';
        blessingResult.classList.add('generated');

        // 添加打字效果
        let index = 0;
        function typeWriter() {
            if (index < text.length) {
                blessingResult.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 30);
            }
        }

        typeWriter();
    }

    // 复制到剪贴板
    function copyToClipboard() {
        const text = blessingResult.textContent;
        if (!text) return;

        navigator.clipboard.writeText(text).then(() => {
            // 显示复制成功提示
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '复制成功！';
            copyBtn.style.backgroundColor = '#4CAF50';

            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = '';
            }, 2000);
        }).catch(err => {
            console.error('复制失败: ', err);
            alert('复制失败，请手动复制');
        });
    }

    // 生成分享链接
    function generateShareLink() {
        if (!state.selectedHoliday || !state.selectedProfession) {
            alert('请先生成祝福语');
            return;
        }

        // 当前URL已经包含参数，直接使用
        const shareUrl = window.location.href;

        // 创建临时输入框复制链接
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = shareUrl;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        // 显示分享成功提示
        const originalText = shareBtn.textContent;
        shareBtn.textContent = '分享链接已复制！';
        shareBtn.style.backgroundColor = '#4CAF50';

        setTimeout(() => {
            shareBtn.textContent = originalText;
            shareBtn.style.backgroundColor = '';
        }, 2000);
    }

    // 更新URL参数
    function updateUrlParameters() {
        const params = new URLSearchParams();
        if (state.selectedHoliday) params.set('holiday', state.selectedHoliday);
        if (state.selectedProfession) params.set('profession', state.selectedProfession);
        if (state.honorific) params.set('honorific', state.honorific);
        if (state.customDescription) params.set('description', state.customDescription);

        window.history.pushState({}, '', params.toString() ? `?${params.toString()}` : window.location.pathname);
    }

    // 检查URL参数，用于分享链接
    function checkUrlParameters() {
        const params = new URLSearchParams(window.location.search);
        const holiday = params.get('holiday');
        const profession = params.get('profession');
        const honorific = params.get('honorific');
        const description = params.get('description');

        if (holiday && profession) {
            state.selectedHoliday = holiday;
            state.selectedProfession = profession;
            state.honorific = honorific || '';
            state.customDescription = description || '';

            // 选中对应的节日和职业卡片
            setTimeout(() => {
                const holidayCard = document.querySelector(`.option-card[data-type="holiday"][data-id="${holiday}"]`);
                if (holidayCard) holidayCard.click();

                setTimeout(() => {
                    const professionCard = document.querySelector(`.option-card[data-type="profession"][data-id="${profession}"]`);
                    if (professionCard) professionCard.click();

                    // 设置敬语和描述
                    setTimeout(() => {
                        const honorificSelect = document.getElementById('honorific-select');
                        if (honorificSelect && honorific) {
                            honorificSelect.value = honorific;
                        }

                        const descriptionInput = document.getElementById('description-input');
                        if (descriptionInput && description) {
                            descriptionInput.value = description;
                        }

                        // 自动生成祝福语
                        generateBlessing();
                    }, 500);
                }, 500);
            }, 500);
        }
    }

    // 设置事件监听器
function setupEventListeners() {
    generateBtn.addEventListener('click', generateBlessing);
    copyBtn.addEventListener('click', copyToClipboard);
    shareBtn.addEventListener('click', generateShareLink);

    // 折叠面板交互
    document.querySelectorAll('.collapsible-header').forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            content.classList.toggle('active');
        });
    });

    // 默认展开第一个面板
    const firstCollapsible = document.querySelector('.collapsible-header');
    if (firstCollapsible) {
        firstCollapsible.click();
    }

    // 分类标签切换
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            const tabContainer = this.parentElement;
            const selectionCard = this.closest('.selection-card');

            // 更新标签状态
            tabContainer.querySelectorAll('.category-tab').forEach(t => {
                t.classList.remove('active');
            });
            this.classList.add('active');

            // 根据类型筛选内容
            if (selectionCard.id === 'holiday-selection') {
                renderFilteredHolidays(category);
            } else if (selectionCard.id === 'recipient-selection') {
                renderFilteredProfessions(category);
            }
        });
    });
}

    // 初始化应用
    init();
});