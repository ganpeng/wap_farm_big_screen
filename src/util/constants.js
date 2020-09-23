const spreadSensorList = [{
    title: '空气温度',
    metric: 'dqwd',
    value: '/',
    unit: '℃',
    icon: 'sensor_icon1',
    wapIcon: 'wap_sensor_icon1'
  },
  {
    title: '空气湿度',
    metric: 'dqsd',
    value: '/',
    unit: '%',
    icon: 'sensor_icon2',
    wapIcon: 'wap_sensor_icon2'
  },
  {
    title: '降雨量',
    metric: 'jyl',
    value: '/',
    unit: 'mm',
    icon: 'sensor_icon5',
    wapIcon: 'wap_sensor_icon4'
  },
  {
    title: '土壤温度',
    metric: 'trwd',
    value: '/',
    unit: '℃',
    icon: 'sensor_icon8',
    wapIcon: 'wap_sensor_icon8'
  },
  {
    title: '土壤湿度',
    metric: 'trxdsd',
    value: '/',
    unit: '%',
    icon: 'sensor_icon9',
    wapIcon: 'wap_sensor_icon9'
  },
  {
    title: '水质PH值',
    metric: 'sph',
    value: '/',
    unit: '',
    // isWarning: true,
    icon: 'sensor_icon10',
    wapIcon: 'wap_sensor_icon11'
  }
];

const topList = {
  year: [{
      area: '北京',
      vip: '55',
      down: '66',
      amount: 200
    },
    {
      area: '北京',
      vip: '55',
      down: '66',
      amount: 200
    },
    {
      area: '北京',
      vip: '55',
      down: '66',
      amount: 200
    },
    {
      area: '北京',
      vip: '55',
      down: '66',
      amount: 200
    },
    {
      area: '北京',
      vip: '55',
      down: '66',
      amount: 200
    }
  ],
  month: [{
      area: '北京',
      vip: '25',
      down: '26',
      amount: 100
    },
    {
      area: '北京',
      vip: '25',
      down: '26',
      amount: 100
    },
    {
      area: '北京',
      vip: '25',
      down: '26',
      amount: 100
    },
    {
      area: '北京',
      vip: '25',
      down: '26',
      amount: 100
    },
    {
      area: '北京',
      vip: '25',
      down: '26',
      amount: 100
    }
  ]
};

const metricList = [{
  "id": 352,
  "keyType": "metric",
  "name": "大气湿度",
  "value": "DQSD",
  "parentId": null,
  "description": "气象",
  "orderBy": 1,
  "unit": "%"
}, {
  "id": 353,
  "keyType": "metric",
  "name": "大气温度",
  "value": "DQWD",
  "parentId": null,
  "description": "气象",
  "orderBy": 2,
  "unit": "℃"
}, {
  "id": 354,
  "keyType": "metric",
  "name": "风速",
  "value": "FS",
  "parentId": null,
  "description": "气象",
  "orderBy": 3,
  "unit": "m/s"
}, {
  "id": 355,
  "keyType": "metric",
  "name": "风向",
  "value": "FX",
  "parentId": null,
  "description": "气象",
  "orderBy": 4,
  "unit": "°"
}, {
  "id": 356,
  "keyType": "metric",
  "name": "光照度",
  "value": "GZD",
  "parentId": null,
  "description": "气象",
  "orderBy": 5,
  "unit": "lux"
}, {
  "id": 357,
  "keyType": "metric",
  "name": "光照总辐射",
  "value": "GZZFS",
  "parentId": null,
  "description": "气象",
  "orderBy": 6,
  "unit": "µmol/(m2▪s)"
}, {
  "id": 358,
  "keyType": "metric",
  "name": "降雨量",
  "value": "JYL",
  "parentId": null,
  "description": "气象",
  "orderBy": 7,
  "unit": "mm/min"
}, {
  "id": 359,
  "keyType": "metric",
  "name": "气压",
  "value": "QY",
  "parentId": null,
  "description": "气象",
  "orderBy": 8,
  "unit": "kPa"
}, {
  "id": 360,
  "keyType": "metric",
  "name": "捕虫量",
  "value": "SCCS",
  "parentId": null,
  "description": "虫情",
  "orderBy": 9,
  "unit": "个"
}, {
  "id": 361,
  "keyType": "metric",
  "name": "水PH值",
  "value": "SPH",
  "parentId": null,
  "description": "水质",
  "orderBy": 10,
  "unit": ""
}, {
  "id": 362,
  "keyType": "metric",
  "name": "水质温度",
  "value": "SZWD",
  "parentId": null,
  "description": "水质",
  "orderBy": 11,
  "unit": " ℃"
}, {
  "id": 363,
  "keyType": "metric",
  "name": "土壤相对温度",
  "value": "TRWD",
  "parentId": null,
  "description": "土壤",
  "orderBy": 12,
  "unit": " ℃"
}, {
  "id": 364,
  "keyType": "metric",
  "name": "土壤相对湿度",
  "value": "TRXDSD",
  "parentId": null,
  "description": "土壤",
  "orderBy": 13,
  "unit": "%"
}];


export default {
  spreadSensorList,
  topList,
  metricList
};