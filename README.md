# train-time

2023年10月13日 22点15分

**列车时刻查询系统的实现**

## 要求

要求实现的功能

1. ~~站站查询：通过发车站和到达站查询列车时刻。~~
2. ~~车次查询：通过列车车次查询时刻。~~
3. ~~车站查询：通过经过该车站的车次查询时刻。~~
4. ~~设置功能：可以进行用户注册、登录，模糊查询，列车分类搜索等。~~
5. ~~数据更新功能：可以根据最新的铁路列车时刻表更新数据库-~~
6. 停靠时间,列车信息添加

~~?一个查询列车的东西,为什么要有注册登录?~~

---

## 数据库设计

用户表:

1. `id`-int-自增
2. `account`-varchar(11)-账号(手机号)
3. `password`-varchar(20)-密码
4. `create_time`-datetime-创建日期

列车表:

1. `id`-int-自增
2. `train_number`-varchar(6)-车次
3. `type`-varchar(10)-列车类型(动车/高速)
4. `departure_station`-varchar(5)-始发站
5. `terminal`-varchar(5)-终点站
6. `departure_time`-time-发车时间
7. `arrival_time`-time-到达时间
8. `cost_time`-varchar(20)-耗时
9. `route_site`-varchar(255)-途径站点
10. `route_time_a`-varchar(255)-各站点到达时间
11. `route_time_e`-varchar(255)-各站点发车时间

最后这两个字段比较特殊

1. 第一个站的到达时间是空的
2. 最后一个站的发车时间是空的

## 车次查询

这个简单些,根据用户输入的车次查询该列车的运行信息

实例数据:

```json
{
  "code": 1,
  "msg": null,
  "data": {
    "id": 1,
    "trainNumber": "G686",
    "type": "高速",
    "departureStation": "汉中",
    "terminal": "北京西",
    "departureTime": [
      9,
      15
    ],
    "arrivalTime": [
      15,
      48
    ],
    "costTime": "6小时33分钟",
      "routeSite": "汉中,西安北,华山北,郑州东,邯郸,石家庄,保定东,高碑店东,北京西",
      "routeTimeA": "---,10:27,11:01,12:29,13:27,14:08,14:49,15:16,15:48",
      "routeTimeE": "09:15,10:33,11:03,12:32,13:29,14:14,15:00,15:18,---"
  }
}
```

## 站站查询

除了车站以外还有类型的选项,高速和动车


西安北,华山北,洛阳龙门,郑州,漯河西,驻马店西,信阳东,孝感北,武汉
---,16:22,17:16,17:55,18:48,19:08,19:36,19:56,20:39
15:54,16:24,17:18,18:02,18:50,19:10,19:38,20:08,---