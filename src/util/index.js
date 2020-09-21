/* eslint-disable */
function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")));
    }
  }
  return fmt;
}

export function strNumSize(tempNum) {
  let stringNum = tempNum.toString();
  let index = stringNum.indexOf(".");
  let newNum = stringNum;
  if (index != -1) {
    newNum = stringNum.substring(0, index);
  }
  return newNum.length;
}

export default {
  ringChartDefaultConfig: {
    color: ['#ECC94C', '#68E0E3', '#38A1DA'],
    digitalFlopStyle: {
      fontSize: 14
    },
    radius: '70%',
    activeRadius: '80%',
    lineWidth: 16,
    data: []
  },
  get12MonthNearBy() {
    let dataArr = [];
    let data = new Date();
    data.setMonth(data.getMonth()+1, 1) //获取到当前月份,设置月份
    for (let i = 0; i < 12; i++) {
      data.setMonth(data.getMonth() - 1); //每次循环一次 月份值减1
      let m = data.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      dataArr.push(data.getFullYear() + "-" + (m));
    }
    return dataArr;
  },
  dateFormat
};