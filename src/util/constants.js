const spreadSensorList = [
  {
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
  year: [
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
    },
    {
      area: '北京',
      vip: '55',
      down: '66',
      amount: 200
    }
  ],
  month: [
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
    },
    {
      area: '北京',
      vip: '25',
      down: '26',
      amount: 100
    }
  ]
};

export default {
  spreadSensorList,
  topList
};