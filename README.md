🌟 智能祝福生成器
 
🚀 项目亮点
 
- AI个性化生成：根据节日、对象和昵称自动生成专属祝福语
- 多API支持：兼容主流LLM服务商（OpenAI/DeepSeek/Anthropic等）
- 企业级安全：HMAC签名验证+环境变量加密存储
- 苹果风格UI：极简设计+流畅交互+响应式布局
 
📌 核心功能
 
1. 智能祝福语生成
- 支持春节/中秋/端午/圣诞四大节日
- 包含自定义昵称输入
- 通过LLM生成自然语言祝福
2. 多服务商兼容
- 内置DeepSeek API（默认）
- 支持自定义API端点配置
- 自动适配主流服务商响应格式
3. 企业级安全
- HMAC-SHA256请求签名验证
- HTTPS强制传输加密
- 环境变量密钥管理
 
🛠️ 部署指南
 
1. 环境准备
 
# 安装依赖
npm install express body-parser node-fetch
 
 
2. 配置密钥
 
创建 .env 文件：
 
# 必须配置
DEEPAI_API_KEY=your_deepseek_api_key
ENCRYPTION_SECRET=your_encryption_secret

# 可选配置
# OPENAI_API_KEY=your_openai_api_key
# PORT=3000
 
 
3. 服务启动
 
# 开发模式
node server.js

# 生产模式（推荐）
pm2 start server.js --name blessing-server
 
 
4. 前端部署
 
1. 将静态文件上传至GitHub仓库
2. 登录Cloudflare Pages
3. 选择仓库并配置构建命令：
npm install && npm run build
 
 
5. 反向代理配置（示例Nginx）
 
location /api {
    proxy_pass http://your-backend-server:3000;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
 
 
🔒 安全增强措施
 
1. 密钥管理
- 使用环境变量存储敏感信息
- 定期轮换API密钥和加密密钥
- 推荐使用KMS服务管理密钥
2. 传输安全
- 强制使用HTTPS
- Cloudflare Pages自动提供免费SSL证书
- 后端API部署在可信服务器
3. 访问控制
- 配置CORS白名单
- 启用请求频率限制
- 设置IP白名单（服务商控制台支持）
 
🚀 扩展建议
 
1. 功能扩展
- 添加祝福语编辑/保存功能
- 集成图片生成API制作图文祝福卡
- 增加多语言支持
2. 性能优化
- 实现缓存机制
- 添加请求队列系统
- 部署CDN加速静态资源
3. 服务商扩展
- 添加Claude/文心一言等国内服务商支持
- 实现不同服务商的响应格式适配
- 增加服务商特定参数配置
 
📝 核心代码示例
 
前端关键代码
 
// app.js - 生成逻辑
document.getElementById('generateBtn').addEventListener('click', async () => {
    const prompt = `请为${recipient}生成一条${festival}祝福语，包含昵称${nickname}，要求温馨、简洁`;
    const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'X-API-Config': JSON.stringify(currentConfig) },
        body: JSON.stringify({ prompt })
    });
    // ...响应处理...
});
 
 
后端关键代码
 
// server.js - 多服务商适配
app.post('/api/generate', async (req, res) => {
    const config = JSON.parse(req.headers['x-api-config']);
    const response = await fetch(config.apiUrl, {
        method: 'POST',
        headers: { 
            'Authorization': `Bearer ${config.apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            model: config.modelName,
            messages: [{ role: "user", content: req.body.prompt }]
        })
    });
    // ...响应解析...
});
 
 
环境变量示例
 
# .env - 安全配置
DEEPAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
ENCRYPTION_SECRET=secure_32_bytes_key_here
 
 
📧 技术支持
 
- 官方文档：https://docs.example.com
- 问题反馈：GitHub Issues
- 商务合作：contact@example.com
 
✨ 立即部署，体验智能祝福生成！
 
git clone https://github.com/username/festival-blessing-generator.git
cd festival-blessing-generator
npm install
 
 
📢 关注我们获取最新更新
 
- GitHub: @username
- Twitter: @example
- 微信公众号：智能祝福实验室
 
（注：实际部署时请替换所有示例链接和占位符）
 
文档结构说明
 
1. 项目亮点：突出核心价值
2. 核心功能：模块化功能说明
3. 部署指南：分步骤部署指导
4. 安全措施：企业级安全方案
5. 扩展建议：未来功能规划
6. 代码示例：关键实现片段
7. 技术支持：多渠道联系方式
 
符合苹果设计语言的简洁风格，采用：
 
- 清晰的层级结构
- 关键代码高亮显示
- 专业配色方案（#0071e3为主色调）
- 响应式文档排版（支持移动设备