# 天气 + OOTD 交互原型

## 入口

| 文件 | 说明 |
|------|------|
| **`index.html`** | 四屏并排总览（推荐从此打开） |
| `pages/onboarding.html` | ① 首次使用引导 |
| `pages/ootd.html` | ② 首页 · OOTD |
| `pages/ootd-popup.html` | ③ OOTD 结果弹窗 |
| `pages/profile.html` | ④ 我的 |
| `DESIGN.md` | 需求与架构文档 |

## 目录结构

```
prototype/
├── index.html          # 总览：四页 iframe 并排
├── pages/
│   ├── onboarding.html
│   ├── ootd.html
│   ├── ootd-popup.html
│   └── profile.html
├── css/common.css
└── js/common.js
```

## 预览

浏览器打开 `prototype/index.html`，横向滚动查看四个 390×844 手机框。

各子页面可单独打开，页面间通过链接跳转（如 OOTD → 弹窗 → 返回）。
