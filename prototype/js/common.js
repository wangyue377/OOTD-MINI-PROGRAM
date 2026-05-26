const OOTD_DATA = {
  city: '上海',
  temp: 25,
  weatherDesc: '大部晴朗',
  greeting: () => {
    const h = new Date().getHours();
    return h < 12 ? '早上好' : h < 18 ? '下午好' : '晚上好';
  },
  date: () => new Date().toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric', weekday: 'short' }),
  metrics: [
    { icon: 'fa-sun', label: 'UV', value: '7', color: 'text-[#FFB347]' },
    { icon: 'fa-droplet', label: '湿度', value: '62%', color: 'text-sky-500' },
    { icon: 'fa-wind', label: '风', value: '12', color: 'text-slate-500' },
    { icon: 'fa-temperature-half', label: '体感', value: '27°', color: 'text-orange-400' },
  ],
  forecast: [
    { day: '周二', icon: 'fa-sun', color: 'text-[#FFB347]', temp: 26, desc: '晴朗' },
    { day: '周三', icon: 'fa-cloud-sun', color: 'text-amber-400', temp: 24, desc: '多云' },
    { day: '周四', icon: 'fa-cloud', color: 'text-slate-400', temp: 22, desc: '阴' },
    { day: '周五', icon: 'fa-cloud-rain', color: 'text-sky-500', temp: 19, desc: '小雨' },
    { day: '周六', icon: 'fa-cloud-sun', color: 'text-amber-400', temp: 23, desc: '多云' },
    { day: '周日', icon: 'fa-sun', color: 'text-[#FFB347]', temp: 27, desc: '晴朗' },
    { day: '周一', icon: 'fa-sun', color: 'text-[#FFB347]', temp: 28, desc: '晴朗' },
  ],
  styles: {
    male: ['运动休闲风', '商务精英风', '日系潮流风', '韩系简约风', '学院风', '街头嘻哈风', '户外机能风', '复古文艺风', '极简主义风', '工装风'],
    female: ['甜酷风', '温柔风', '学院风', '韩系简约风', '设计师品牌风', '复古文艺风', '小香风', '森女系', '运动休闲风', 'Y2K风'],
  },
  selectedStyle: '运动休闲风',
  gender: 'male',
  /** 运动休闲风 · 穿搭参考图（本地素材） */
  outfitImages: [
    '../images/outfit-1.jpg',
    '../images/outfit-2.jpg',
    '../images/outfit-3.jpg',
  ],
  aiText: '今日上海气温舒适、日照充足，推荐「运动休闲风」：透气棉质上衣搭配轻薄外套，下装休闲长裤，鞋履小白鞋。配饰宜简约，注意防晒。',
};

function renderMetrics(el) {
  el.innerHTML = OOTD_DATA.metrics.map(m => `
    <div class="bg-slate-50 rounded-lg py-1 text-center border border-slate-100">
      <i class="fa-solid ${m.icon} ${m.color} text-[10px]"></i>
      <p class="text-[8px] text-slate-400 leading-none">${m.label}</p>
      <p class="text-[10px] font-semibold text-slate-800">${m.value}</p>
    </div>
  `).join('');
}

function renderForecast(el) {
  el.innerHTML = OOTD_DATA.forecast.map(f => `
    <div class="shrink-0 w-[3.25rem] bg-slate-50 rounded-lg py-1.5 px-1 text-center border border-slate-100">
      <p class="text-[8px] text-slate-400">${f.day}</p>
      <i class="fa-solid ${f.icon} ${f.color} text-sm my-0.5"></i>
      <p class="text-xs font-bold text-slate-900">${f.temp}°</p>
      <p class="text-[8px] text-slate-500 truncate">${f.desc}</p>
    </div>
  `).join('');
}

function renderStylePills(el, selected) {
  const list = OOTD_DATA.styles[OOTD_DATA.gender] || [];
  el.innerHTML = list.map(s => `
    <span class="style-pill shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap ${s === selected ? 'is-selected' : ''}">${s}</span>
  `).join('');
}
