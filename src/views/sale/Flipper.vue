<template>
  <div class="chart-num">
    <div class="box-item">
      <li class="number-item">¥</li>
      <li
        :class="{'number-item': !isNaN(item), 'mark-item': isNaN(item) }"
        v-for="(item,index) in orderNum"
        :key="index"
      >
        <span v-if="!isNaN(item)">
          <i ref="numberItem">0123456789</i>
        </span>
        <span class="comma my-font" v-else>{{item}}</span>
      </li>
      <li class="number-item">元</li>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Flipper',
  data() {
    return {
      orderNum: ["0", "0", "0", ",", "0", "0", "0"] // 默认订单总数
    };
  },
  mounted() {
    setTimeout(() => {
      this.toOrderNum(12654); // 这里输入数字即可调用
    }, 500);
  },
  methods: {
    // 设置文字滚动
    setNumberTransform() {
      const numberItems = this.$refs.numberItem; // 拿到数字的ref，计算元素数量
      const numberArr = this.orderNum.filter(item => !isNaN(item));
      // 结合CSS 对数字字符进行滚动,显示订单数量
      for (let index = 0; index < numberItems.length; index++) {
        const elem = numberItems[index];
        elem.style.transform = `translate(-50%, -${numberArr[index] * 10}%)`;
      }
    },
    numFormat(num) {
      var c = (num.toString().indexOf ('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      return c;
    },
    // 处理总订单数字
    toOrderNum(num) {
      num = num.toString();
      // 把订单数变成字符串
      if (num.length < 6) {
        num = "0" + num; // 如未满八位数，添加"0"补位
        this.toOrderNum(num); // 递归添加"0"补位
      } else if (num.length === 6) {
        // 订单数中加入逗号
        // num = num.slice(0, 2) + ',' + num.slice(2, 5) + ',' + num.slice(5, 8);
        let orderNum = this.numFormat(num);
        console.log(orderNum);
        this.orderNum = orderNum.split(""); // 将其便变成数据，渲染至滚动数组
      } else {
        // 订单总量数字超过八位显示异常
        this.$message.warning("总量数字过大");
      }
      this.setNumberTransform();
    }
  }
};
</script>
<style scoped lang='scss'>
/*订单总量滚动数字设置*/
.box-item {
  width: 100%;
  font-size: 34px;
  text-align: center;
  color: #fff;
  margin-top: 0.1rem;
  writing-mode: vertical-lr;
  text-orientation: upright;
  /*文字禁止编辑*/
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
  /* overflow: hidden; */
}
/* 默认逗号设置 */
.mark-item {
  width: 0.1rem;
  // height: 100px;
  margin-right: 0.06rem;
  line-height: 0.1rem;
  position: relative;
  text-align: center;
  & > span {
    position: absolute;
    width: 100%;
    bottom: 0;
    writing-mode: vertical-rl;
    text-orientation: upright;
    z-index: 10;
  }
}
/*滚动数字设置*/
.number-item {
  width: 0.36rem;
  height: 0.56rem;
  /* 背景图片 */
  background: #E8961A;
  margin-right: 0.06rem;
  border-radius: 0.02rem;
  & > span {
    position: relative;
    display: inline-block;
    margin-right: 0.1rem;
    width: 100%;
    height: 100%;
    writing-mode: vertical-rl;
    text-orientation: upright;
    overflow: hidden;
    & > i {
      font-style: normal;
      position: absolute;
      top: 0.11rem;
      left: 50%;
      transform: translate(-50%, 0);
      transition: transform 1s ease-in-out;
      letter-spacing: 10px;
      z-index: 1;
    }
  }
  &:first-child {
    font-size: 0.26rem;
  }
  &:last-child {
    font-size: 0.26rem;
  }
}
.number-item:last-child {
  margin-right: 0;
}
</style>