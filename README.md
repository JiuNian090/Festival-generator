# 节日祝福语生成器

![节日祝福语生成器](https://picsum.photos/800/400?random=1)

## 项目介绍

节日祝福语生成器是一个精美的单页应用，帮助用户快速生成个性化节日祝福。它基于React 18和Tailwind CSS构建，融合了中国传统节日元素与现代UI设计，提供直观的操作界面和精美的视觉体验。

## 功能特点

- **多维度祝福语生成**：基于节日类型、祝福对象和自定义描述生成个性化祝福语
- **丰富的节日分类**：包含中国传统节日、法定节日与纪念日等多种类型
- **精美的视觉设计**：国风元素与现代UI结合，响应式设计适配各种设备
- **高级生成模式**：支持基础/高级两种生成模式，多种风格和长度选择
- **本地存储**：自动保存历史生成记录，支持主题切换

## 技术栈

- React 18
- Tailwind CSS v3
- Framer Motion (动画效果)
- React Router (路由管理)
- LocalForage (本地存储)

## 快速开始

### 环境要求
- Node.js 16.x 或更高版本
- npm 或 yarn

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/yourusername/festival-wishes-generator.git
cd festival-wishes-generator

# 安装依赖
npm install

# 本地开发
npm start

# 构建生产版本
npm run build
```

## 部署指南

### GitHub Pages部署

1. 修改package.json，添加homepage字段：
```json
"homepage": "https://github.com/JiuNian090/Festival-generator"
```

2. 安装部署依赖：
```bash
npm install --save-dev gh-pages
```

3. 添加部署脚本到package.json：
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

4. 执行部署命令：
```bash
npm run deploy
```

### Cloudflare Pages部署

1. 将代码推送到GitHub仓库
2. 在Cloudflare Pages中导入GitHub仓库
3. 构建命令：`npm run build`
4. 输出目录：`build`
5. 点击部署并配置自定义域名

## 功能使用

1. **基本使用**：
   - 选择节日类型
   - 输入祝福对象
   - 添加自定义描述
   - 点击"生成祝福语"按钮

2. **高级功能**：
   - 切换高级模式添加古诗词引用和高级表达
   - 选择不同风格（温馨/幽默/正式/俏皮）
   - 调整祝福语长度（短/中/长）
   - 使用收藏功能保存喜欢的祝福语

## 自定义扩展

### 添加自定义节日

1. 打开`src/data/festivals.js`文件
2. 按照现有格式添加新节日数据
3. 重新启动应用使更改生效

### 集成AI功能

1. 在`src/services/api.js`中配置API密钥
2. 启用高级生成模式时会自动调用AI API
3. 确保API密钥配置正确且网络环境可访问

## 无障碍支持

- 键盘导航支持：所有交互元素可通过Tab键访问
- 高对比度模式：支持浅色/深色主题切换
- 语义化HTML结构：使用适当的ARIA属性

## 许可证

本项目采用MIT许可证 - 详情参见LICENSE文件