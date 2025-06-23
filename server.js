const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json());

// 通用API调用处理
async function callExternalAPI(config, payload) {
    try {
        const response = await fetch(config.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
        
    } catch (error) {
        console.error('External API call failed:', error);
        throw error;
    }
}

app.post('/api/generate', async (req, res) => {
    try {
        // 获取前端配置
        const config = JSON.parse(req.headers['x-api-config']);
        const { nickname, festival, recipient } = req.body;

        // 构建请求参数
        const payload = {
            model: config.modelName,
            messages: [{
                role: "user",
                content: `请为${recipient}生成一条${festival}祝福语，包含昵称${nickname}，要求温馨、简洁`
            }],
            temperature: 0.7,
            max_tokens: 200
        };

        // 调用外部API
        const response = await callExternalAPI(config, payload);
        
        // 处理不同服务商的响应格式
        let result;
        if (config.apiUrl.includes('openai.com')) {
            result = response.choices[0].message.content;
        } else if (config.apiUrl.includes('deepseek.com')) {
            result = response.choices[0].message.content;
        } else if (config.apiUrl.includes('anthropic.com')) {
            result = response.completion;
        } else {
            result = response.result || '生成成功';
        }

        res.json({ result });
        
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: '服务器错误，请重试' });
    }
});

// 启动服务
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
