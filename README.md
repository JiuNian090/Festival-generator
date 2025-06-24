# 节日祝福语生成器

一个精美的节日祝福语生成网页，支持多种节日和职业的智能祝福匹配，纯前端实现，无需后端服务。

## ✨ 功能特点

- **多节日支持**：包含中国传统节日、法定节假日、西方引进节日和行业性节日
- **职业匹配**：根据不同职业智能生成合适的祝福语
- **自定义祝福**：支持添加敬语和自定义描述
- **一键分享**：复制祝福语或生成分享链接
- **响应式设计**：适配桌面和移动设备
- **喜庆高端UI**：红色金色为主的节日风格设计

## 🚀 快速开始

### 本地运行

1. 克隆本仓库到本地
```bash
git clone https://github.com/yourusername/festival-generator.git
cd festival-generator
```

2. 启动本地服务器（需要Node.js环境）
```bash
npx serve -l 3000
```

3. 在浏览器中访问 http://localhost:3000

### 项目结构

```
festival-generator/
├── index.html         # 主页面
├── css/
│   └── style.css      # 样式文件
├── js/
│   ├── app.js         # 主应用逻辑
│   ├── holidays.js    # 节日数据
│   ├── professions.js # 职业数据
│   └── templates.js   # 祝福语模板
├── assets/            # 图片等静态资源
└── README.md          # 项目说明文档
```

## 📝 自定义祝福语

### 添加新节日

1. 打开 `js/holidays.js` 文件
2. 在对应节日分类数组中添加新节日对象，包含id、name、description等属性

### 添加新职业

1. 打开 `js/professions.js` 文件
2. 在professions数组中添加新职业对象，包含id、name、honorifics、adjectives等属性

### 添加祝福语模板

1. 打开 `js/templates.js` 文件
2. 在templates对象中添加对应节日ID的模板数组，使用{{honorific}}、{{recipient}}、{{description}}作为占位符

## 🌐 部署指南

### 通过Cloudflare Pages部署

1. 将代码推送到GitHub仓库

2. 登录Cloudflare账户，进入Pages页面

3. 点击"Create a project"，选择连接到GitHub仓库

4. 选择仓库后，配置构建设置：
   - 构建命令：无需填写
   - 构建输出目录：/ (根目录)

5. 点击"Save and Deploy"，等待部署完成

6. 部署成功后，Cloudflare会提供一个域名，通过该域名即可访问网站

## 📄 许可证

本项目采用MIT许可证 - 详情参见LICENSE文件

## 💻 技术栈

- HTML5
- CSS3
- JavaScript
- 响应式设计
- 本地存储和URL参数