import qs from 'querystring';
import _ from 'lodash';
import service from './config';

// 农场基本信息
export const getFarmById = (id) => {
  return service.get(`/v1/farm/${id}`);
};

export const getFarmList = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
      return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/farm/list?${paramsStr}`);
};

export const getStatistic = (id) => {
  return service.get(`/v1/farm/statistic?farmId=${id}`);
};

export const getFarmCount = () => {
  return service.get(`/v1/farm/count`);
};
// 警告
export const getWarningList = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/warn/page?${paramsStr}`);
};
// 农场列表预警
export const getFarmWarnList = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/warn/farmWarnList?${paramsStr}`);
};

// 预警统计
export const getWarnStatisticsByFarmId = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/warn/warnStatistics?${paramsStr}`);
}

// 统计
export const getStatisticsAll = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/statistics/farm?${paramsStr}`);
};

export const getStatisticsPlant = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/statistics/planting/overView?${paramsStr}`);
};

// 首页耕地类型统计
export const getLandStatistics = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/statistics/land?${paramsStr}`);
};
// 首页物环设备统计
export const getDeviceStatistics = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/statistics/device?${paramsStr}`);
}
// 首页经营情况统计
export const getOperatingStatistics = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/statistics/operating?${paramsStr}`);
};
// 首页人员统计
export const getMemberStatistics = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/statistics/member?${paramsStr}`);
};
// 首页农机具统计
export const getMachineryStatistics = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/statistics/machinery?${paramsStr}`);
};

// 获取农场摄像头的列表
export const getCameraListByFarmId = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/camera/page?${paramsStr}`);
};

// 获取农场传感器的列表
export const getSensorListByFarmId = (id) => {
  return service.get(`/v1/sensor/farmPage?farmId=${id}`);
};

// 获取地块的传感器列表
export const getSensorListByLandCode = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/sensor/datamanage/page?${paramsStr}`);
};

// 获取传感器设备的数据
export const getSensor = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/sensor?${paramsStr}`);
};

// 获取传感器最后一条数据
export const getSensorLastData = (deviceName) => {
  return service.get(`/v1/sensor/lastData?deviceName=${deviceName}`);
};

// 获取摄像头的截图数据
export const getCameraImage = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/monitor/camera/page?${paramsStr}`);
};

// 获取摄像头的延时摄影数据
export const getCameraTimeLapse = (streamName) => {
  return service.get(`/v1/monitor/timelapse/page?streamName=${streamName}`);
};
