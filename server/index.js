require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const COZE_API_URL = 'https://api.coze.cn/v1/workflow/run';

// 1. 天气 API 路由
app.post('/api/weather', async (req, res) => {
  // 核心修复：确保 city 被正确提取
  const city = req.body.city; 
  console.log(`[Weather Request] 目标城市: ${city}`);

  try {
    const response = await axios.post(COZE_API_URL, {
      workflow_id: "7644490063002959915",
      parameters: { 
        input: city,
        // 技巧：添加随机因子防止 Coze 返回缓存的旧数据
        _cache_buster: Date.now() 
      },
      app_id: "7644459286395387954"
    }, {
      headers: { 
        // 动态读取环境变量，防止初始化时 undefined
        'Authorization': `Bearer ${process.env.COZE_TOKEN}`, 
        'Content-Type': 'application/json' 
      }
    });

    console.log('[Coze Response] 数据获取成功');

    if (response.data.code !== 0) {
      console.error('Coze 业务报错:', response.data.msg);
      return res.status(500).json({ success: false, msg: response.data.msg });
    }

    const weatherData = JSON.parse(response.data.data);
    res.json({ success: true, data: weatherData.output });
  } catch (error) {
    console.error('Axios 详细错误:', error.response ? error.response.data : error.message);
    res.status(500).json({ success: false, msg: '获取天气数据失败' });
  }
});

// 2. OOTD 生成 API 路由
app.post('/api/ootd', async (req, res) => {
  const { city, gender, description, selectedStyle, weather } = req.body;
  console.log(`[OOTD Request] 正在为 ${city} 的${gender}性生成建议...`);

  try {
    const response = await axios.post(COZE_API_URL, {
      workflow_id: "7644495781806391296",
      parameters: { 
        city, 
        gender, 
        description, 
        selectedStyle, 
        weather,
        _cache_buster: Date.now()
      },
      app_id: "7644459286395387954"
    }, {
      headers: { 
        'Authorization': `Bearer ${process.env.COZE_TOKEN}`, 
        'Content-Type': 'application/json' 
      },
      timeout: 120000 // 保持长超时
    });

    res.json({ success: true, data: response.data.data });
  } catch (error) {
    console.error('OOTD API 详细错误:', error.response ? error.response.data : error.message);
    res.status(500).json({ success: false, msg: '生成建议失败' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend server is running at http://localhost:${PORT}`);
  console.log(`🔑 Token 状态: ${process.env.COZE_TOKEN ? '已加载' : '未加载'}`);
});