<template>
  <div class="sale-container">
    <div class="tab-container">
      <ul class="tab-list">
        <li @click="toggleDate('year')" :class="['tab-item', date === 'year' && 'active']">当年</li>
        <li @click="toggleDate('month')" :class="['tab-item', date === 'month' && 'active']">当月</li>
      </ul>
    </div>
    <div class="section-one section-item">
      <title-one title="今日已售"></title-one>
      <!-- <flipper></flipper> -->
      <div class="sale-amount">
        <div class="left-unit amount-item">¥</div>
        <div class="amount-item"><span class="value my-font">0</span></div>
        <div class="amount-item"><span class="value my-font">6</span></div>
        <div class="amount-item"><span class="value my-font">9</span></div>
        <div class="split-dot">,</div>
        <div class="amount-item"><span class="value my-font">7</span></div>
        <div class="amount-item"><span class="value my-font">3</span></div>
        <div class="amount-item"><span class="value my-font">0</span></div>
        <div class="right-unit amount-item">元</div>
      </div>
    </div>
    <div class="section-two section-item">
      <title-one title="城市购买力TOP5"></title-one>
      <div class="top5-container">
        <table>
          <thead>
            <tr>
              <th>地区</th>
              <th>下单会员数</th>
              <th>下单量</th>
              <th>下单金额(元)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(top, index) in _topList" :key="index">
              <td>{{top.area}}</td>
              <td>{{top.vip}}</td>
              <td>{{top.down}}</td>
              <td>{{top.amount}}</td>
            </tr>
          </tbody>
        </table>
        <div class="table-bg bg-icon7"></div>
      </div>
    </div>
    <div class="section-three section-item">
      <title-one title="农作物"></title-one>
      <div class="section-content">
        <div class="farm-sale-top5">
          <div class="chart-title">
            <div class="point"></div>
            <div class="label">农场销售额TOP5(万元)</div>
          </div>
          <ul class="farm-sale-top5-list">
            <li v-for="(top, index) in farmSaleTopList" :key="index" class="farm-sale-top5-item">
              <div class="icon">
                <svg-icon v-if="index === 0" icon-class="new_sale_top5_icon1"></svg-icon>
                <svg-icon v-if="index === 1" icon-class="new_sale_top5_icon2"></svg-icon>
                <svg-icon v-if="index === 2" icon-class="new_sale_top5_icon3"></svg-icon>
                <span v-if="index !== 0 && index !== 1 && index !== 2" class="no-icon">{{index + 1}}</span>
              </div>
              <div class="farm">{{top.farm}}</div>
              <div class="sale-value">{{top.saleAmount}}</div>
            </li>
          </ul>
        </div>
        <div class="item-chart">
          <div class="chart-title">
            <div class="point"></div>
            <div class="label">商品销售额(万元)</div>
          </div>
          <div id="sale-amount-pie-chart"></div>
          <div id="sale-amount-line-chart"></div>
        </div>
        <div class="item-chart">
          <div class="chart-title">
            <div class="point"></div>
            <div class="label">热卖商品top5(万元)</div>
          </div>
          <div id="hot-sale-top5-chart"></div>
        </div>
      </div>
    </div>
    <div class="section-four section-item">
      <title-one title="订单统计"></title-one>
      <div class="section-content">
        <div class="item-chart">
          <div class="chart-title">
            <div class="point"></div>
            <div class="label">下单量(次)</div>
          </div>
          <div id="order-count-chart"></div>
        </div>
        <div class="item-chart">
          <div class="chart-title">
            <div class="point"></div>
            <div class="label">下单金额(元)</div>
          </div>
          <div id="order-amount-chart"></div>
        </div>
        <div class="item-chart">
          <div class="chart-title">
            <div class="point"></div>
            <div class="label">客单价(次)</div>
          </div>
          <div id="unit-amount-chart"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import echarts from 'echarts';
import TitleOne from '@/components/TitleOne';
import constants from '@/util/constants';
// import Flipper from './Flipper';
export default {
  name: 'Sale',
  components: {TitleOne},
  data() {
    return {
      date: 'year',
      topList: constants.topList,
      farmSaleTopList: [
        {
          farm: '吉视自营店',
          saleAmount: 40
        },
        {
          farm: '奢香米业旗舰店',
          saleAmount: 32
        },
        {
          farm: '壹田生态农业旗舰店',
          saleAmount: 30
        },
        {
          farm: '万昌米业旗舰店',
          saleAmount: 28
        },
        {
          farm: '聚成现代农业旗舰店',
          saleAmount: 25
        }
      ],
      // 图表相关
      saleAmountPieChart: null,
      saleAmountPieChartData: {
        month: {
          data: [
            { name: "水稻", value: 30 },
            { name: "大豆", value: 50 },
            { name: "玉米", value: 44 },
            { name: "其他粮食", value: 32 },
            { name: "其他", value: 37 }
          ]
        },
        year: {
          data: [
            { name: "水稻", value: 230 },
            { name: "大豆", value: 250 },
            { name: "玉米", value: 144 },
            { name: "其他粮食", value: 332 },
            { name: "其他", value: 537 }
          ]
        }
      },
      saleAmountLineChart: null,
      saleAmountLineChartData: {},
      hotSaleTop5Chart: null,
      hotSaleTop5ChartData: {}
    };
  },
  created() {
    this.initSaleAmountPieChart();
    this.initSaleAmountLineChart();
    this.initHotSaleTop5Chart();
    this.initOrderCountChart();
    this.initOrderAmountChart();
    this.initUnitAmountChart();
  },
  computed: {
    _topList() {
      return _.get(this.topList, this.date);
    }
  },
  methods: {
    async initSaleAmountPieChart() {
      try {
        await this.$nextTick();
        let saleAmountPieChartDom = document.querySelector(
          "#sale-amount-pie-chart"
        );
        let saleAmountPieChart = echarts.init(saleAmountPieChartDom);
        this.saleAmountPieChart = saleAmountPieChart;
        // 为echarts对象加载数据
        saleAmountPieChart.clear();
        saleAmountPieChart.setOption(
          this.saleAmountPieChartConfig(),
          true
        );
      } catch(err) {
        console.log(err);
      }
    },
    async initSaleAmountLineChart() {
      try {
        await this.$nextTick();
        let saleAmountLineChartDom = document.querySelector(
          "#sale-amount-line-chart"
        );
        let saleAmountLineChart = echarts.init(saleAmountLineChartDom);
        this.saleAmountLineChart = saleAmountLineChart;
        // 为echarts对象加载数据
        saleAmountLineChart.clear();
        saleAmountLineChart.setOption(
          this.saleAmountLineChartConfig(),
          true
        );
      } catch(err) {
        console.log(err);
      }
    },
    async initHotSaleTop5Chart() {
      try {
        await this.$nextTick();
        let hotSaleTop5ChartDom = document.querySelector(
          "#hot-sale-top5-chart"
        );
        let hotSaleTop5Chart = echarts.init(hotSaleTop5ChartDom);
        this.hotSaleTop5Chart = hotSaleTop5Chart;
        // 为echarts对象加载数据
        hotSaleTop5Chart.clear();
        hotSaleTop5Chart.setOption(
          this.hotSaleTop5ChartConfig(),
          true
        );
      } catch(err) {
        console.log(err);
      }
    },
    async initOrderCountChart() {
      try {
        await this.$nextTick();
        let orderCountChartDom = document.querySelector(
          "#order-count-chart"
        );
        let orderCountChart = echarts.init(orderCountChartDom);
        this.orderCountChart = orderCountChart;
        // 为echarts对象加载数据
        orderCountChart.clear();
        orderCountChart.setOption(
          this.orderCountChartConfig(),
          true
        );
      } catch(err) {
        console.log(err);
      }
    },
    async initOrderAmountChart() {
      try {
        await this.$nextTick();
        let orderAmountChartDom = document.querySelector(
          "#order-amount-chart"
        );
        let orderAmountChart = echarts.init(orderAmountChartDom);
        this.orderAmountChart = orderAmountChart;
        // 为echarts对象加载数据
        orderAmountChart.clear();
        orderAmountChart.setOption(
          this.orderAmountChartConfig(),
          true
        );
      } catch(err) {
        console.log(err);
      }
    },
    async initUnitAmountChart() {
      try {
        await this.$nextTick();
        let unitAmountChartDom = document.querySelector(
          "#unit-amount-chart"
        );
        let unitAmountChart = echarts.init(unitAmountChartDom);
        this.unitAmountChart = unitAmountChart;
        // 为echarts对象加载数据
        unitAmountChart.clear();
        unitAmountChart.setOption(
          this.unitAmountChartConfig(),
          true
        );
      } catch(err) {
        console.log(err);
      }
    },
    saleAmountPieChartConfig() {
      return {
        color: ["#6992DE", "#D6B564", "#DD6F46", "#ECC94C", "#884CDE"],
        tooltip: {
          trigger: "item",
          position: function(pos, params, dom, rect, size) {
            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            let obj = { top: 60 };
            obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 5;
            return obj;
          },
          formatter: "{b} : {c} ({d}%)"
        },
        series: [
          {
            type: "pie",
            radius: "60%",
            data: this.saleAmountPieChartData[this.date].data,
            label: {
              color: "#F0F0F0",
              fontSize: 12,
              lineHeight: 14,
              formatter: "{b} {d}%\n{c}万元"
            }
          }
        ]
      };
    },
    saleAmountLineChartConfig() {
      return {
        color: ["#6992DE", "#D6B564", "#DD6F46", "#ECC94C", "#884CDE"],
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            return `<span>${params.name}</span><br />
                    <span>${params.seriesName}: </span>
                    <span style="color: ${params.color};">${params.value}</span>`;
          }
        },
        grid: {
          top: '10%',
          left: '14%',
          right: 0,
          bottom: '15%'
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLabel: {
            fontSize: 12,
            color: '#52B5E4'
          },
          axisLine: {
            lineStyle: {
              color: '#98A4AF'
            }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            fontSize: 12,
            color: '#52B5E4'
          },
          axisLine: {
            lineStyle: {
              color: '#98A4AF'
            }
          },
          splitLine: {
            lineStyle: {
              width: 0.5,
              type: 'dashed',
              color: ['#98A4AF']
            }
          }
        },
        series: [
          {
            name: '水稻',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          },
          {
            name: '大豆',
            data: [820, 332, 101, 234, 290, 430, 620],
            type: "line"
          },
          {
            name: '玉米',
            data: [220, 132, 601, 334, 690, 330, 220],
            type: "line"
          },
          {
            name: '其他粮食',
            data: [120, 132, 201, 324, 190, 140, 160],
            type: "line"
          },
          {
            name: '其他',
            data: [420, 332, 501, 234, 390, 430, 320],
            type: "line"
          }
        ]
      };
    },
    hotSaleTop5ChartConfig() {
      return {
        tooltip: {
          trigger: "item",
          position: function(pos, params, dom, rect, size) {
            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            let obj = { top: 60 };
            obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 5;
            return obj;
          },
          formatter: "{b} : {c}"
        },
        grid: {
          left: "18%",
          right: "10%",
          top: "5%",
          bottom: 0
        },
        xAxis: {
          type: "value",
          min: 0,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        yAxis: {
          min: 0,
          z: 10,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: "#f0f0f0",
            // inside: true,
            fontSize: 12
          },
          splitLine: {
            show: false
          },
          data: _.reverse(["水稻", "大豆", "玉米", "其他粮食", "其他"])
        },
        series: [
          {
            data: _.reverse([23, 25, 20, 22, 28]),
            type: "bar",
            label: {
              show: true,
              color: "#F0F0F0",
              position: "right"
            },
            itemStyle: {
              emphasis: {
                barBorderRadius: 18,
              },
              //通常情况下：
              normal: {
                barBorderRadius: 18,
                color: function(params) { //柱状图不同颜色实现
                  let colorList = _.reverse([
                    "#6992DE",
                    "#D6B564",
                    "#DD6F46",
                    "#ECC94C",
                    "#884CDE"
                  ]);
                  return colorList[params.dataIndex];
                }
              }
            },
            barWidth: 18,
            showBackground: true,
            backgroundStyle: {
              color: "#1E396B",
              barBorderRadius: 18
            },
            animationCurve: "easeOutBack"
          }
        ]
      };
    },
    orderCountChartConfig() {
      return {
        color: ["#D6B564"],
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            return `<span>${params.name}</span><br />
                    <span>${params.seriesName}: </span>
                    <span style="color: ${params.color};">${params.value}</span>`;
          }
        },
        grid: {
          top: '5%',
          left: '12%',
          right: 0,
          bottom: '15%'
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLabel: {
            fontSize: 12,
            color: '#52B5E4'
          },
          axisLine: {
            lineStyle: {
              color: '#98A4AF'
            }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            fontSize: 12,
            color: '#52B5E4'
          },
          axisLine: {
            lineStyle: {
              color: '#98A4AF'
            }
          },
          splitLine: {
            lineStyle: {
              width: 0.5,
              type: 'dashed',
              color: ['#98A4AF']
            }
          }
        },
        series: [
          {
            name: '下单量',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
            areaStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(214,181,100, 0.4)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(214,181,100, 0)" // 100% 处的颜色
                    }
                  ],
                  globalCoord: true// 缺省为 false
                }
              }
            }
          }
        ]
      };
    },
    orderAmountChartConfig() {
      return {
        color: ["#1B8FD5"],
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            return `<span>${params.name}</span><br />
                    <span>${params.seriesName}: </span>
                    <span style="color: ${params.color};">${params.value}</span>`;
          }
        },
        grid: {
          top: '5%',
          left: '12%',
          right: 0,
          bottom: '15%'
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLabel: {
            fontSize: 12,
            color: '#52B5E4'
          },
          axisLine: {
            lineStyle: {
              color: '#98A4AF'
            }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            fontSize: 12,
            color: '#52B5E4'
          },
          axisLine: {
            lineStyle: {
              color: '#98A4AF'
            }
          },
          splitLine: {
            lineStyle: {
              width: 0.5,
              type: 'dashed',
              color: ['#98A4AF']
            }
          }
        },
        series: [
          {
            name: '下单金额',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
            areaStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(32,163,243, 0.6)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(27,143,213, 0)" // 100% 处的颜色
                    }
                  ],
                  globalCoord: true// 缺省为 false
                }
              }
            }
          }
        ]
      };
    },
    unitAmountChartConfig() {
      return {
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            return `<span>${params.name}</span><br />
                    <span>${params.seriesName}: </span>
                    <span style="color: ${params.color};">${params.value}</span>`;
          }
        },
        grid: {
          top: '5%',
          left: '12%',
          right: 0,
          bottom: '15%'
        },
        xAxis: {
          type: "category",
          data: ["100以下", "100-500", "501-1000", "1000以上"],
          axisLabel: {
            fontSize: 12,
            color: '#52B5E4',
            interval: 0
          },
          axisLine: {
            lineStyle: {
              color: '#98A4AF'
            }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            fontSize: 12,
            color: '#52B5E4'
          },
          axisLine: {
            lineStyle: {
              color: '#98A4AF'
            }
          },
          splitLine: {
            lineStyle: {
              width: 0.5,
              type: 'dashed',
              color: ['#98A4AF']
            }
          }
        },
        series: [
          {
            name: '客单价',
            data: [24, 15, 29, 14],
            type: "bar",
            label: {
              show: true,
              color: "#F0F0F0",
              position: "top"
            },
            itemStyle: {
              //通常情况下：
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "#1D6CDC"
                  },
                  {
                    offset: 1,
                    color: "#8F95FF"
                  }
                ])
              }
            },
            barWidth: 22,
          }
        ]
      };
    },
    toggleDate(date) {
      this.date = date;
    }
  }
}
</script>
<style lang="scss" scoped>
.sale-container {
  width: 100%;
  height: 100%;
  .tab-container {
    .tab-list {
      display: flex;
      justify-content: space-between;
      .tab-item {
        flex: 1;
        height: 0.4rem;
        line-height: 0.4rem;
        background-color: #192A4A;
        border-radius: 0.04rem;
        text-align: center;
        font-size: 0.16rem;
        font-weight: 600;
        color: #98A4AF;
        &.active {
          color: #fff;
          background-color: #2F6DDE;
        }
      }
      .tab-item + .tab-item {
        margin-left: 0.1rem;
      }
    }
  }
  .section-item {
    margin-top: 0.3rem;
    .section-content {
      background: #172E58;
      box-shadow: 0px 0.02rem 0.08rem 0 rgba(14, 15, 37, 0.7);
      border-radius: 0.1rem;
      margin-top: 0.1rem;
      padding: 0.16rem;
      #sale-amount-pie-chart {
        width: 100%;
        height: 1.8rem;
      }
      #sale-amount-line-chart {
        width: 100%;
        height: 1.6rem;
      }
      #hot-sale-top5-chart {
        width: 100%;
        height: 1.6rem;
      }
      #order-count-chart,
      #order-amount-chart,
      #unit-amount-chart {
        width: 100%;
        height: 2rem;
      }
      .chart-title {
        display: flex;
        align-items: center;
        height: 0.32rem;
        .point {
          display: inline-block;
          width: 5px;
          height: 5px;
          line-height: 0.16rem;
          border-radius: 50%;
          background-color: #70caee;
          margin-right: 0.1rem;
        }
        .label,
        .unit {
          font-size: 0.12rem;
          font-weight: 400;
          color: #29E3FD;
          line-height: 0.17rem;
        }
        .value {
          color: #29E3FD;
          font-size: 0.26rem;
          line-height: 0.32rem;
          margin: 0 0.05rem;
        }
      }
    }
    .sale-amount {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.1rem;
      .amount-item {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        width: 0.36rem;
        height: 0.56rem;
        background-color: #E8961A;
        border-radius: 0.02rem;
        .value {
          font-size: 0.42rem;
          color: #fff;
        }
        &.left-unit {
          font-size: 0.32rem;
          align-items: center;
        }
        &.right-unit {
          font-size: 0.24rem;
          align-items: center;
        }
      }
      .split-dot {
        display: flex;
        align-items: flex-end;
        height: 100%;
        font-size: 0.34rem;
      }
    }
    .top5-container {
      position: relative;
      margin-top: 0.1rem;
      table {
        width: 100%;
        thead {
          width: 100%;
          background-color: #1B3971;
          tr {
            height: 0.35rem;
            th {
              width: 25%;
              text-align: center;
              font-size: 0.12rem;
              font-weight: 400;
              color: #29E3FD;
            }
          }
        }
        tbody {
          tr {
            height: 0.35rem;
            td {
              text-align: center;
              font-size: 0.12rem;
              font-weight: 400;
              color: #F0F0F0;
            }
            &:nth-child(odd) {
              background-color: rgba(20, 46, 94, 0.8);
            }
            &:nth-child(even) {
              background-color: rgba(33, 63, 118, 0.8);
            }
            &:nth-of-type(1) {
              td {
                &:first-child {
                  color: #EDFF3A;
                }
              }
            }
            &:nth-of-type(2) {
              td {
                &:first-child {
                  color: #FF9200;
                }
              }
            }
            &:nth-of-type(3) {
              td {
                &:first-child {
                  color: #61E81A;
                }
              }
            }
          }
        }
      }
      .table-bg {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: calc(100% - 0.35rem);
      }
    }
    .farm-sale-top5 {
      .farm-sale-top5-list {
        padding: 0.08rem;
        background-color: #213F76;
        border-radius: 0.04rem;
        .farm-sale-top5-item {
          display: flex;
          align-items: center;
          height: 0.24rem;
          margin-bottom: 0.08rem;
          .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 0.18rem;
            margin-right: 0.05rem;
            .svg-icon {
              width: 0.18rem;
              height: 0.2rem;
            }
          }
          .no-icon {
            font-size: 0.12rem;
            background-color: #2E5395;
            width: 0.18rem;
            height: 0.18rem;
            line-height: 0.18rem;
            border-radius: 50%;
            text-align: center;
          }
          .farm {
            flex: 1;
            font-size: 0.12rem;
            font-weight: 400;
            color: #F0F0F0;
          }
          .sale-value {
            margin-left: 0.1rem;
            font-size: 0.12rem;
            font-weight: 400;
            color: #F0F0F0;
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    &.section-three {
      .item-chart {
        margin-top: 0.2rem;
      }
    }

    .area-production-section {
      display: flex;
      justify-content: space-between;
      margin-top: 0.1rem;
      .area-production-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 1.67rem;
        height: 1.75rem;
        padding: 0.2rem 0;
        background: #172E58;
        box-shadow: 0 0.02rem 0.08rem 0 rgba(14, 15, 37, 0.7);
        border-radius: 0.1rem;
        .top-icon {
          .svg-icon {
            width: 0.66rem;
            height: 0.66rem;
          }
        }
        .middle-value {
          display: flex;
          align-items: center;
          margin: 0.15rem 0 0.08rem 0;
          .value {
            font-size: 0.26rem;
            height: 0.26rem;
            line-height: 0.26rem;
            margin-right: 0.05rem;
          }
          .unit {
            font-size: 0.14rem;
            line-height: 0.14rem;
            font-weight: 400;
          }
        }
        .bottom-value {
          font-size: 0.12rem;
          font-weight: 400;
          color: #98A4AF;
        }
        &.area-item {
          .middle-value {
            color: #29E3FD;
          }
        }
        &.production-item {
          .middle-value {
            color: #ECC94C;
          }
        }
      }
    }
    &.section-four {
      .label-chart-container {
        display: flex;
        align-items: center;
        .label-container {
          flex: 1;
          margin: 0.15rem 0 0.15rem 0.2rem;
          .label-list {
            .label-item {
              margin-bottom: 0.1rem;
              .label-title {
                display: flex;
                align-items: center;
                margin-bottom: 0.08rem;
                .icon {
                  width: 0.12rem;
                  height: 0.1rem;
                  margin-right: 0.1rem;
                }
                .title {
                  font-size: 0.12rem;
                  font-weight: 400;
                  color: #F0F0F0;
                }
              }
              .label-value {
                display: flex;
                align-items: center;
                color: #29E3FD;
                line-height: 0.26rem;
                margin-left: 0.22rem;
                .value {
                  font-size: 0.26rem;
                  margin-right: 0.04rem;
                }
                .unit {
                  font-size: 0.14rem;
                  font-weight: 400;
                }
              }
              &:nth-of-type(1) {
                .icon {
                  background-color: #ECC94C;
                }
              }
              &:nth-of-type(2) {
                .icon {
                  background-color: #68E0E3;
                }
              }
              &:nth-of-type(3) {
                .icon {
                  background-color: #38A1DA;
                }
              }
            }
          }
          .left-label {
            display: flex;
            flex-direction: column;
            .label-item {
              margin-bottom: 0.1rem;
              &:nth-of-type(1) {
                .label-icon {
                  background-color: #ECC94C;
                }
              }
              &:nth-of-type(2) {
                .label-icon {
                  background-color: #68E0E3;
                }
              }
              .label-value {
                display: flex;
                align-items: center;
                .label-icon {
                  width: 0.12rem;
                  height: 0.1rem;
                  margin-right: 0.1rem;
                }
                .value {
                  color: #29E3FD;
                  font-size: 0.3rem;
                  margin: 0 0.04rem;
                }
                .unit {
                  color: #29E3FD;
                  font-size: 0.14rem;
                  line-height: 0.3rem;
                }
              }
              .label-percent {
                width: 1.04rem;
              }
            }
          }
        }
        .chart-container {
          width: 1.6rem;
          height: 1.6rem;
          #device-chart,
          #base-station-chart {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
