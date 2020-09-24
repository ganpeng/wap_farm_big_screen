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

//  银行家舍入法（四舍六入五取偶）
export function bankersRounding(value, length) {
  let carry = 0; // 存放进位标志
  let num, multiple; // num为原浮点数放大multiple倍后的数，multiple为10的length次方
  let str = value + ''; // 将调用该方法的数字转为字符串
  let dot = str.indexOf('.'); // 找到小数点的位置
  if (str.substr(dot + length + 1, 1) >= 5) {
      carry = 1; // 找到要进行舍入的数的位置，手动判断是否大于等于5，满足条件进位标志置为1
  }
  multiple = Math.pow(10, length); // 设置浮点数要扩大的倍数
  num = Math.floor(value * multiple) + carry; // 去掉舍入位后的所有数，然后加上我们的手动进位数
  let result = num / multiple + ''; // 将进位后的整数再缩小为原浮点数
  // 处理进位后无小数
  dot = result.indexOf('.');
  if (dot < 0) {
      result += '.';
      dot = result.indexOf('.');
  }
  // 处理多次进位
  let len = result.length - (dot + 1);
  if (len < length) {
      for (let i = 0; i < length - len; i++) {
          result += 0;
      }
  }
  return result;
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
  dateFormat,
  bankersRounding
};