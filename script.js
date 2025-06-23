// 初始化配置
let currentConfig = {
    apiUrl: 'https://api.deepseek.com/v1/chat/completions',
    apiKey: '',
    modelName: 'DeepSeek-R1'
};

// 加载本地配置
document.addEventListener('DOMContentLoaded', () => {
    const savedConfig = localStorage.getItem('apiConfig');
    if (savedConfig) {
        currentConfig = JSON.parse(savedConfig);
        document.getElementById('apiUrl').value = currentConfig.apiUrl;
        document.getElementById('apiKey').value = currentConfig.apiKey;
        document.getElementById('modelName').value = currentConfig.modelName;
    }
});

// 配置面板控制
document.getElementById('configBtn').addEventListener('click', () => {
    document.getElementById('configOverlay').style.display = 'flex';
});

document.getElementById('saveConfig').addEventListener('click', () => {
    currentConfig = {
        apiUrl: document.getElementById('apiUrl').value,
        apiKey: document.getElementById('apiKey').value,
        modelName: document.getElementById('modelName').value || 'gpt-3.5-turbo'
    };
    
    localStorage.setItem('apiConfig', JSON.stringify(currentConfig));
    document.getElementById('configOverlay').style.display = 'none';
});

document.getElementById('resetConfig').addEventListener('click', () => {
    localStorage.removeItem('apiConfig');
    location.reload();
});

// 生成按钮点击事件
document.getElementById('generateBtn').addEventListener('click', async () => {
    const nickname = document.getElementById('nickname').value.trim();
    const festival = document.getElementById('festival').value;
    const recipient = document.getElementById('recipient').value;
    
    if (!nickname || !festival || !recipient) {
        alert('请填写所有信息');
        return;
    }

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Config': JSON.stringify(currentConfig)
            },
            body: JSON.stringify({ nickname, festival, recipient })
        });

        if (!response.ok) throw new Error('请求失败');
        
        const data = await response.json();
        document.getElementById('message').textContent = data.result;
        document.getElementById('result').style.display = 'block';
        
    } catch (error) {
        console.error(error);
        alert('祝福语生成失败，请重试');
    }
});

// 可选：添加配置验证
function validateConfig() {
    const url = document.getElementById('apiUrl').value;
    const key = document.getElementById('apiKey').value;
    
    if (!url.startsWith('https://')) {
        alert('请使用HTTPS端点');
        return false;
    }
    
    if (key.length < 10) {
        alert('API密钥长度不足');
        return false;
    }
    
    return true;
}
