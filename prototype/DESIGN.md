# 天气 + OOTD 小程序 — 原型设计文档

## 1. 用户需求解析

### 1.1 产品定位

面向日常出行与穿搭决策的微信小程序：结合实时/预报天气与用户画像，生成当日 OOTD（Outfit of the Day）穿搭建议，降低「穿什么」的决策成本。

### 1.2 核心用户故事

| 编号 | 角色 | 目标 | 验收标准 |
|------|------|------|----------|
| US-01 | 新用户 | 首次进入完成基础资料 | 引导卡片收集城市、性别、个人描述后可进入主功能 |
| US-02 | 回访用户 | 查看今日与近 7 日天气 | OOTD Tab 展示气温、状况、指标与 7 日列表 |
| US-03 | 用户 | 按性别选择穿搭风格 | 男生/女生展示不同风格 pill 列表 |
| US-04 | 用户 | 生成今日 OOTD | 选风格后点击按钮，底部弹出 AI 文案 + 3 图轮播 |
| US-05 | 用户 | 维护个人资料 | 「我的」Tab 可查看/编辑城市、性别、描述 |

### 1.3 关键交互路径

```
首次启动
  └─► 欢迎引导（可选跳过）─► 资料引导卡片（城市 / 性别 / 描述）
        └─► 保存 ─► 进入 OOTD Tab（默认）

OOTD Tab（主路径）
  ├─► 浏览「今日天气」卡片（动效 icon + 气温）
  ├─► 浏览「近 7 日天气」卡片
  ├─► 在「今日穿搭风格」选择 pill（依赖「我的」性别）
  ├─► 点击【生成今日 OOTD】
  │     └─► 未选风格 → Toast 提示
  │     └─► 已选 → 底部 Half-Sheet Popup
  │           ├─► AI 穿搭建议文案
  │           └─► 3 张风格图轮播（左右滑动 / 指示点）
  └─► 底部 Tab 切换至「我的」

我的 Tab
  ├─► 展示城市、性别、个人描述
  ├─► 编辑保存（同步影响 OOTD 风格列表）
  └─► 资料未完整时顶部引导卡片
```

### 1.4 业务规则

- **穿搭风格数据源**：由「我的」页性别决定；未设置性别时 OOTD 风格区显示引导去完善资料。
- **男生风格**：运动休闲风、商务精英风、日系潮流风、韩系简约风、学院风、街头嘻哈风、户外机能风、复古文艺风、极简主义风、工装风。
- **女生风格**：甜酷风、温柔风、学院风、韩系简约风、设计师品牌风、复古文艺风、小香风、森女系、运动休闲风、 Y2K风。
- **Popup**：半屏自下而上；遮罩点击或关闭按钮收起；生成过程可展示 loading 态（原型用短延迟模拟）。

---

## 2. 页面架构设计

### 2.1 信息架构（IA）

```
App Root
├── Onboarding Layer（首次 / 资料不全）
│   ├── Welcome（品牌 + Get Started）
│   └── Profile Guide Card（城市 / 性别 / 描述）
├── Tab: OOTD（默认）
│   ├── Card: 今日天气
│   ├── Card: 近 7 日天气
│   ├── Card: 今日穿搭风格 + CTA
│   └── Modal: OOTD 结果 Popup
└── Tab: 我的
    ├── Guide Card（条件显示）
    └── Profile Form（城市 / 性别 / 描述）
```

### 2.2 屏幕清单（开发映射）

| 屏幕 ID | 名称 | 小程序页面建议 | 原型文件 |
|---------|------|----------------|----------|
| S0 | 欢迎引导 | `pages/onboarding` 或首屏组件 | `index.html` 内 Layer |
| S1 | OOTD 主页 | `pages/ootd/index` | `index.html` #tab-ootd |
| S2 | OOTD 结果弹层 | 组件 `ootd-popup` | `index.html` #ootd-popup |
| S3 | 我的 | `pages/profile/index` | `index.html` #tab-profile |

### 2.3 组件拆分（供开发复用）

| 组件 | 职责 |
|------|------|
| `WeatherTodayCard` | 城市、大号气温、状况、UV/湿度等指标条 |
| `WeatherWeekCard` | 7 日行列表 + 天气 icon |
| `StylePickerCard` | 性别相关 pill 网格 + 生成按钮 |
| `OotdResultSheet` | AI 文案 + Swiper 轮播 |
| `ProfileGuideCard` | 首次引导表单 |
| `TabBar` | OOTD / 我的 双 Tab |
| `ProfileForm` | 城市、性别单选、描述多行 |

### 2.4 状态与数据流

```
localStorage / 小程序 storage
  profile: { city, gender: 'male'|'female', description, onboarded }
  ootdSession: { selectedStyle, lastGeneratedAt }

gender → styleOptions[]
selectedStyle + profile + weather(mock) → AI prompt → popup content
```

---

## 3. 视觉设计规范（参考稿）

### 3.1 设计语言

- **风格**：Soft UI / 轻玻璃拟态；大圆角、柔和阴影、浅色渐变背景。
- **主色**：天空蓝 `#A5C9FF`、阳光橙 `#FFB347`、深蓝 CTA `#1E3A8A`。
- **背景**：OOTD 页右上暖色光晕；引导页左上同心圆纹理 + 底部云朵。
- **字体**：Inter / 系统无衬线；气温 Display 级字重 700+。
- **圆角**：卡片 `rounded-3xl`（24px+）；按钮全圆角 pill。
- **图标**：Font Awesome 6；天气用 fa-sun / fa-cloud / fa-cloud-rain 等，辅以 CSS 动效。

### 3.2 间距与触控

- 安全区：底部 Tab 预留 `pb-safe`（原型 `pb-24`）。
- 最小点击区域 44×44pt；pill 间距 `gap-2`。

### 3.3 动效

- Tab 切换：内容 fade + 轻微位移。
- 天气 icon：晴日光晕 pulse；云 float；雨 droplet bounce。
- Popup：`translate-y` 弹簧感滑入；遮罩 fade。
- 生成按钮：loading 时 spinner + 禁用态。

---

## 4. 原型使用说明

1. 用浏览器打开 `prototype/index.html`。
2. 首次进入显示欢迎与资料引导；填写后进入 OOTD。
3. 在「我的」修改性别后，返回 OOTD 可见风格列表变化。
4. 选择风格 →【生成今日 OOTD】→ 查看 Popup 与轮播。

数据存于 `localStorage`，刷新后保留（清除缓存可重置首次体验）。

---

## 5. 开发交接清单

- [ ] 对接真实天气 API（城市来自 profile）
- [ ] 对接 AI 文案与文生图/素材库（Popup 三张图）
- [ ] 小程序 `tabBar` 配置与页面路由
- [ ] 性别与风格列表配置化（后端或本地 JSON）
- [ ] 未完善资料时的拦截与引导复用 `ProfileGuideCard`
