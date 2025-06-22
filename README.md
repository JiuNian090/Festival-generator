# 智能节日祝福语生成器

智能节日祝福语生成器是一个使用 AI 技术为各种节日生成个性化祝福语的单页应用。该应用支持多种 AI 提供商（包括 DeepSeek、OpenAI 和 Anthropic），并允许用户在网页上配置和切换不同的 API 密钥。

## 功能特点

- **多种节日支持**：内置春节、元宵节、清明节、端午节、七夕、中秋节、重阳节等传统节日
- **个性化定制**：可根据祝福对象、关系、语气和长度定制祝福语
- **多 AI 提供商支持**：支持 DeepSeek、OpenAI 和 Anthropic 等多种 AI 服务
- **灵活的 API 配置**：
  - 可通过 Cloudflare Pages 环境变量配置 API 密钥
  - 支持在网页上直接配置和切换不同的 API 密钥
  - 网页配置优先于环境变量配置
  - API 配置自动保存到本地存储，刷新页面后自动恢复
- **响应式设计**：完美适配桌面和移动设备
- **优雅的用户界面**：精美的 UI 设计，带有节日主题背景和动画效果
- **便捷的分享功能**：支持复制祝福语和分享链接

## 部署指南

### 使用 Cloudflare Pages 部署

1. **准备工作**：
   - 注册并登录 Cloudflare 账户
   - 准备好您的 AI 提供商 API 密钥（DeepSeek、OpenAI 或 Anthropic）

2. **部署步骤**：
   - 登录 Cloudflare 控制台，导航到 Pages
   - 点击"创建项目"，连接您的 GitHub 或 GitLab 仓库
   - 选择您的项目仓库，设置构建配置：
     - 框架预设："静态站点生成器"
     - 构建命令：留空
     - 输出目录："/"
   - 在"环境变量"部分添加您的 API 密钥：
     - `DEEPSEEK_API_KEY`: 您的 DeepSeek API 密钥
     - `OPENAI_API_KEY`: 您的 OpenAI API 密钥（可选）
     - `ANTHROPIC_API_KEY`: 您的 Anthropic API 密钥（可选）
   - 点击"保存并部署"

3. **配置自定义域名（可选）**：
   - 部署完成后，在 Cloudflare Pages 项目设置中添加您的自定义域名
   - 按照 Cloudflare 指引完成 DNS 设置和 SSL 证书配置

### 本地开发与部署

1. **克隆仓库**：
   ```bash
   git clone https://github.com/yourusername/festival-greeting-generator.git
   cd festival-greeting-generator