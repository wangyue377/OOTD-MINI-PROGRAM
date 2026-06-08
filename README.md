# 👗 OOTD - 每日穿搭推荐小程序

> 结合实时天气与 AI 智能推荐，为你生成每日最佳穿搭方案。

再也不用担心出门穿什么、突然下雨没带伞！

---

## ✨ 功能特性

- **🌤 实时天气** — 获取 7 天天气预报，温度、湿度、风力一目了然
- **🤖 AI 穿搭推荐** — 基于天气、性别、个人风格偏好，AI 生成个性化穿搭建议
- **🎨 多种风格** — 男生/女生各 10 种穿搭风格可选（运动休闲、日系、商务精英、甜酷风、Y2K 等）
- **📷 穿搭参考图** — AI 自动生成 3 张穿搭参考图片，直观展示搭配效果
- **👤 个人档案** — 设置城市、性别、个人描述，打造专属穿搭体验

## 🛠 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | 微信小程序原生开发（WXML / WXSS / JS） |
| 后端 | Node.js + Express.js |
| AI 服务 | [Coze](https://www.coze.cn/) 工作流（天气查询 + OOTD 生成） |
| HTTP 客户端 | Axios（服务端）/ wx.request（小程序端） |

## 📁 项目结构

```
OOTD-MINI-PROGRAM/
├── miniprogram/          # 微信小程序前端
│   ├── pages/
│   │   ├── index/        # 引导页（首次使用注册）
│   │   ├── ootd/         # 主页（天气 + 风格选择 + 生成 OOTD）
│   │   └── profile/      # 个人资料编辑
│   ├── components/
│   │   ├── ootd-popup/   # OOTD 结果弹窗（推荐文字 + 穿搭图片轮播）
│   │   └── skeleton/     # 骨架屏加载组件
│   └── utils/
│       └── util.js       # 工具函数
├── server/               # Node.js 后端服务
│   ├── index.js          # Express 服务器（天气 & OOTD 两个 API 代理）
│   └── package.json
├── prototype/            # HTML/CSS 交互原型
│   ├── DESIGN.md         # 完整设计文档 & 用户故事
│   └── pages/            # 各页面原型
└── docs.md               # Coze API 接口文档
```

## 🚀 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) >= 16
- [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- Coze 平台账号及 Personal Access Token

### 1. 启动后端服务

```bash
cd server
npm install
```

创建 `.env` 文件：

```env
COZE_TOKEN=pat_你的Coze令牌
```

启动服务：

```bash
npm start
# 服务运行在 http://localhost:3000
```

### 2. 运行小程序

1. 打开**微信开发者工具**
2. 导入 `miniprogram/` 目录
3. 确保后端服务已启动（小程序默认请求 `http://localhost:3000`）
4. 编译运行

### 3. 查看原型（可选）

直接在浏览器中打开 `prototype/index.html` 即可查看交互原型。

## 📱 使用流程

1. **首次使用** — 填写城市、性别、个人描述完成注册
2. **查看天气** — 进入主页自动获取 7 天天气预报
3. **选择风格** — 根据性别展示不同穿搭风格，选择今日偏好
4. **生成 OOTD** — 点击按钮，AI 结合天气与风格生成穿搭建议 + 参考图
5. **修改资料** — 在个人页随时更新城市、性别等信息

## 📄 License

MIT
