# 1.请求天气API

- 请求方式
```bash
curl -X POST 'https://api.coze.cn/v1/workflow/run' \
-H "Authorization: Bearer pat_oPlhDkmkVbPfNhiz68DhAZkVpztR5byliRgYqZDrV7WQmWe9TD2BpwFh8FnP2Jca" \
-H "Content-Type: application/json" \
-d '{
  "workflow_id": "7644490063002959915",
  "parameters": {
    "city": "北京"
  },
  "app_id": "7644459286395387954"
}'
```

- 返回值
```json
{"detail":{"logid":"20260527202438E23FA7059226AD873DA3"},"code":0,"msg":"","data":"{\"output\":[{\"condition\":\"阴\",\"humidity\":72,\"predict_date\":\"2026-05-27\",\"temp_high\":24,\"temp_low\":18,\"weather_day\":\"阴\",\"wind_dir_day\":\"西北风\",\"wind_dir_night\":\"西北风\",\"wind_level_day\":\"2\",\"wind_level_night\":\"2\"},{\"condition\":\"多云\",\"humidity\":59,\"predict_date\":\"2026-05-28\",\"temp_high\":29,\"temp_low\":16,\"weather_day\":\"多云\",\"wind_dir_day\":\"西北风\",\"wind_dir_night\":\"西北风\",\"wind_level_day\":\"3\",\"wind_level_night\":\"3\"},{\"condition\":\"阴\",\"humidity\":50,\"predict_date\":\"2026-05-29\",\"temp_high\":27,\"temp_low\":17,\"weather_day\":\"阴\",\"wind_dir_day\":\"东北风\",\"wind_dir_night\":\"西南风\",\"wind_level_day\":\"2\",\"wind_level_night\":\"2\"},{\"condition\":\"晴\",\"humidity\":49,\"predict_date\":\"2026-05-30\",\"temp_high\":28,\"temp_low\":16,\"weather_day\":\"晴\",\"wind_dir_day\":\"西南风\",\"wind_dir_night\":\"西南风\",\"wind_level_day\":\"2\",\"wind_level_night\":\"2\"},{\"condition\":\"阴\",\"humidity\":46,\"predict_date\":\"2026-05-31\",\"temp_high\":28,\"temp_low\":18,\"weather_day\":\"阴\",\"wind_dir_day\":\"南风\",\"wind_dir_night\":\"东南风\",\"wind_level_day\":\"2\",\"wind_level_night\":\"2\"},{\"condition\":\"阴\",\"humidity\":47,\"predict_date\":\"2026-06-01\",\"temp_high\":27,\"temp_low\":18,\"weather_day\":\"阴\",\"wind_dir_day\":\"东南风\",\"wind_dir_night\":\"东南风\",\"wind_level_day\":\"2\",\"wind_level_night\":\"2\"},{\"condition\":\"晴\",\"humidity\":59,\"predict_date\":\"2026-06-02\",\"temp_high\":30,\"temp_low\":19,\"weather_day\":\"晴\",\"wind_dir_day\":\"东南风\",\"wind_dir_night\":\"东南风\",\"wind_level_day\":\"2\",\"wind_level_night\":\"2\"}]}","debug_url":"https://www.coze.cn/work_flow?execute_id=7644546401091944484&space_id=7644489076733100038&workflow_id=7644490063002959915&execute_mode=2","usage":{"token_count":0,"output_count":0,"input_count":0},"execute_id":"7644546401091944484"}
```


# 2. 生成OOTD

- 请求方式
```bash
curl -X POST 'https://api.coze.cn/v1/workflow/run' \
-H "Authorization: Bearer pat_oPlhDkmkVbPfNhiz68DhAZkVpztR5byliRgYqZDrV7WQmWe9TD2BpwFh8FnP2Jca" \
-H "Content-Type: application/json" \
-d '{
  "workflow_id": "7644495781806391296",
  "parameters": {
    "city": "北京",
    "gender": "男",
    "description": "男生，戴眼镜",
    "selectedStyle": "日系",
    "weather": {
      "condition": "晴",
      "humidity": 59,
      "predict_date": "2026-06-02",
      "temp_high": 30,
      "temp_low": 19,
      "weather_day": "晴",
      "wind_dir_day": "东南风",
      "wind_dir_night": "东南风",
      "wind_level_day": "2",
      "wind_level_night": "2"
    }
  },
  "app_id": "7644459286395387954"
}'
```


- 返回值
```json
{"msg":"","data":"{\"data_list\":[\"https://s.coze.cn/t/L06MtvjVJCE/\",\"https://s.coze.cn/t/ua-S8qUGRSs/\",\"https://s.coze.cn/t/Vzywq9TScp8/\"],\"output\":\"北京今日晴朗（湿度59%），气温19-30℃，东南风2级，天气舒适。建议日系清新简约风格搭配。上身选浅米色宽松短袖衬衫（或内搭白色纯棉T恤+浅蓝薄款针织开衫），下身搭配卡其色九分工装裤或浅蓝直筒牛仔裤，鞋子推荐白色帆布鞋或浅杏色休闲鞋。整体色调以米色、白色、浅蓝为主，清新柔和，透气舒适的材质适配初夏天气，宽松剪裁贴合身形又显随性，戴眼镜的男生穿此搭配更添斯文活力。\"}","debug_url":"https://www.coze.cn/work_flow?execute_id=7644549050658144297&space_id=7644489076733100038&workflow_id=7644495781806391296&execute_mode=2","usage":{"token_count":5127,"output_count":3210,"input_count":1917},"execute_id":"7644549050658144297","detail":{"logid":"20260527203446F196AD49140E7893EBBA"},"code":0}
```