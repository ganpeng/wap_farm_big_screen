<template>
  <div class="home-container">
    <div class="static-container">
      <div class="static-item">
        <div class="title">农场</div>
        <div class="count">
          <div class="value my-font">{{farmCount}}</div>
          <div class="unit">个</div>
        </div>
      </div>
      <div class="static-item">
        <div class="title">设备</div>
        <div class="count">
          <div class="value my-font">{{deviceData.totalNumber}}</div>
          <div class="unit">个</div>
        </div>
      </div>
      <div class="static-item">
        <div class="title">销售额</div>
        <div class="count">
          <div class="value my-font">356</div>
          <div class="unit">万元</div>
        </div>
      </div>
      <div class="static-item">
        <div class="title">预警</div>
        <div class="count">
          <div class="value my-font">{{WarnData.total}}</div>
          <div class="unit">条</div>
        </div>
      </div>
    </div>
    <div class="section-one section-item">
      <title-one title="耕地类型"></title-one>
      <div class="section-content">
        <div class="chart-title">
          <div class="point"></div>
          <div class="label">总耕地</div>
          <div class="value my-font">{{landData.farmLandArea}}</div>
          <div class="unit">公顷</div>
        </div>
        <div id="land-chart"></div>
      </div>
    </div>
    <div class="section-two section-item">
      <title-one title="生态电商"></title-one>
      <div class="section-content">
        <div class="item-chart">
          <div class="chart-title">
            <div class="point"></div>
            <div class="label">销售总额</div>
            <div class="value my-font">{{landData.farmLandArea}}</div>
            <div class="unit">万元</div>
          </div>
          <div id="sales-total-amount-chart"></div>
        </div>
        <div class="item-chart">
          <div class="chart-title">
            <div class="point"></div>
            <div class="label">商品销售额</div>
            <div class="value my-font">{{landData.farmLandArea}}</div>
            <div class="unit">万元</div>
          </div>
          <div id="sales-volume-chart"></div>
        </div>
      </div>
    </div>
    <div class="section-three section-item">
      <title-one title="2020种植面积与产量"></title-one>
      <div class="area-production-section">
        <div class="area-production-item area-item">
          <div class="top-icon">
            <svg-icon icon-class="new_home_area_icon"></svg-icon>
          </div>
          <div class="middle-value">
            <div class="value my-font">{{plantData.totalArea | toFixed2}}</div>
            <div class="unit">公顷</div>
          </div>
          <div class="bottom-value">2020年种植面积</div>
        </div>
        <div class="area-production-item production-item">
          <div class="top-icon">
            <svg-icon icon-class="new_home_production_icon"></svg-icon>
          </div>
          <div class="middle-value">
            <div class="value my-font">{{plantData.totalYield | toFixed2}}</div>
            <div class="unit">万吨</div>
          </div>
          <div class="bottom-value">2020年产量</div>
        </div>
      </div>
    </div>
    <div class="section-four section-item">
      <title-one title="运营资产"></title-one>
      <div class="section-content">
        <div class="top-field">
          <div class="chart-title">
            <div class="point"></div>
            <div class="label">物环设备</div>
          </div>
          <div class="label-chart-container">
            <div class="label-container">
              <ul class="label-list">
                <li v-for="(item, index) in deviceChartData" :key="index" class="label-item">
                  <div class="label-title">
                    <div class="icon"></div>
                    <div class="title">{{item.name}}</div>
                  </div>
                  <div class="label-value">
                    <div class="value my-font">{{item.value}}</div>
                    <div class="unit">个</div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="chart-container">
              <div id="device-chart"></div>
            </div>
          </div>
        </div>
        <div class="bottom-field">
          <div class="chart-title">
            <div class="point"></div>
            <div class="label">5G基站</div>
          </div>
          <div class="label-chart-container">
            <div class="label-container">
              <div class="left-label">
                <div class="label-item">
                  <div class="label-value">
                    <div class="label-icon"></div>
                    <div class="unit">高频</div>
                    <div class="value my-font">8</div>
                    <div class="unit">&nbsp;个</div>
                  </div>
                  <div class="label-percent">
                    <percent-pond :percent="67" :colors="['#FF4C16', '#FFDC3B']"></percent-pond>
                  </div>
                </div>
                <div class="label-item">
                  <div class="label-value">
                    <div class="label-icon"></div>
                    <div class="unit">低频</div>
                    <div class="value my-font">4</div>
                    <div class="unit">&nbsp;个</div>
                  </div>
                  <div class="label-percent">
                    <percent-pond :percent="33" :colors="['#3D53F5', '#00DBFF']"></percent-pond>
                  </div>
                </div>
              </div>
            </div>
            <div class="chart-container">
              <div id="base-station-chart"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import echarts from 'echarts';
import TitleOne from '@/components/TitleOne';
import PercentPond from '@/components/PercentPond';
export default {
  name: 'Home',
  components: { TitleOne, PercentPond },
  data() {
    return {
      farmCount: "", // 农场总数
      WarnData: {},
      plantData: {}, // 种植
      landData: {},
      landChartData: [],
      deviceData: {},
      deviceChartData: [],
      deviceConfig: {},
      baseStationChartData: [ { name: "高频", value: 8 }, { name: "低频", value: 4 } ],
      baseStationConfig: {},
      // 销售额图表
      salesVolumeChart: null,
      landChart: null,
      deviceChart: null,
      baseStationChart: null
    };
  },
  async created() {
    try {
      let year = new Date().getFullYear();
      this.getLandStatistics(year);
      this.getDeviceStatistics(year);
      this.getStatisticsPlant(year);
      this.getFarmCount();
      this.getWarnStatisticsByFarmId();

      this.initBaseStationChart();
      this.initSalesVolumeChart();
      this.initSalesTotalAmountChart();
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    getLandStatistics(year) {
      this.$service.getLandStatistics({ farmId: 0, year })
        .then((res) => {
          if (res && res.code === 0) {
            this.landData = _.get(res.data, "0") || {};
            this.landChartData = [
              { name: "旱田", value: _.get(this.landData, `dryLandArea`) },
              { name: "水浇地", value: _.get(this.landData, `irrigationLandArea`) },
              { name: "水田", value: _.get(this.landData, `paddyFieldArea`) }
            ];
            this.initLandChart();
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    getDeviceStatistics(year) {
      this.$service.getDeviceStatistics({ farmId: 0, year })
        .then((res) => {
          if (res && res.code === 0) {
            this.deviceData = _.get(res.data, `deviceStatisticsList.0`) || {};
            this.deviceChartData = [
              { name: "传感器", value: _.get(this.deviceData, `sensorNumber`) },
              { name: "球机摄像头", value: _.get(this.deviceData, `domeCameraNumber`) },
              { name: "枪机摄像头", value: _.get(this.deviceData, `boxCameraNumber`) }
            ];
            this.initDeviceChart();
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    getStatisticsPlant(year) {
      this.$service.getStatisticsPlant({ farmId: 0, year })
        .then((res) => {
          if (res && res.code === 0) {
            this.plantData = _.get(res.data, "0") || {};
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    getFarmCount() {
      this.$service.getFarmCount()
        .then((res) => {
          if (res && res.code === 0) {
            this.farmCount = _.get(res.data, "0.totalFarmNum");
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    getWarnStatisticsByFarmId() {
      this.$service.getWarnStatisticsByFarmId()
        .then((res) => {
          if (res && res.code === 0) {
            this.WarnData = res.data;
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    async initLandChart() {
      try {
        await this.$nextTick();
        let landChartDom = document.querySelector("#land-chart");
        let landChart = echarts.init(landChartDom);
        this.landChart = landChart;
        // 为echarts对象加载数据
        landChart.clear();
        landChart.setOption(this.getLandChartConfig(), true);
      } catch (err) {
        console.log(err);
      }
    },
    async initDeviceChart() {
      try {
        await this.$nextTick();
        let deviceChartDom = document.querySelector("#device-chart");
        let deviceChart = echarts.init(deviceChartDom);
        this.deviceChart = deviceChart;
        // 为echarts对象加载数据
        deviceChart.clear();
        deviceChart.setOption(this.getDeviceChartConfig(), true);
      } catch (err) {
        console.log(err);
      }
    },
    async initBaseStationChart() {
      try {
        await this.$nextTick();
        let baseStationChartDom = document.querySelector("#base-station-chart");
        let baseStationChart = echarts.init(baseStationChartDom);
        this.baseStationChart = baseStationChart;
        // 为echarts对象加载数据
        baseStationChart.clear();
        baseStationChart.setOption(this.getBaseStationChartConfig(), true);
      } catch (err) {
        console.log(err);
      }
    },
    // 销售额图表初始化
    async initSalesVolumeChart() {
      try {
        await this.$nextTick();
        let salesVolumeDom = document.querySelector('#sales-volume-chart');
        let salesVolumeChart = echarts.init(salesVolumeDom);
        this.salesVolumeChart = salesVolumeChart;
        // 为echarts对象加载数据
        salesVolumeChart.clear();
        salesVolumeChart.setOption(this.getSalesVolumeConfig(), true);
      } catch (err) {
        console.log(err);
      }
    },
    async initSalesTotalAmountChart() {
      try {
        await this.$nextTick();
        let SalesTotalAmountDom = document.querySelector('#sales-total-amount-chart');
        let SalesTotalAmountChart = echarts.init(SalesTotalAmountDom);
        this.SalesTotalAmountChart = SalesTotalAmountChart;
        // 为echarts对象加载数据
        SalesTotalAmountChart.clear();
        SalesTotalAmountChart.setOption(this.getSalesTotalAmountConfig(), true);
      } catch (err) {
        console.log(err);
      }
    },
    getLandChartConfig() {
      return {
        color: ['#7B8BF6', '#43D1D5', '#ECC94C'],
        tooltip: {
          show: false,
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        graphic: [
          {
            //环形图中间添加文字
            type: "text", //通过不同top值可以设置上下显示
            left: "center",
            top: "40%",
            style: {
              text: this.landData.farmLandArea || '',
              textAlign: "center",
              fill: "#F0F0F0", //文字的颜色
              fontSize: 24,
              fontFamily: 'my-font'
            }
          },
          {
            type: "text",
            left: "center",
            top: "54%",
            style: {
              text: "总面积",
              textAlign: "center",
              fill: "#F0F0F0",
              fontSize: 12
            }
          }
        ],
        series: [
          {
            type: "pie",
            radius: ['40%', '60%'], // 内外半径
            label: {
              color: '#F0F0F0',
              fontSize: 12,
              lineHeight: 12,
              formatter: '{b} {d}% \n{c}公顷'
            },
            data: this.landChartData || []
          }
        ]
      };
    },
    getDeviceChartConfig() {
      return {
        color: ['#ECC94C', '#68E0E3', '#38A1DA'],
        tooltip: {
          show: false,
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        },
        graphic: [
          {
            //环形图中间添加文字
            type: "text", //通过不同top值可以设置上下显示
            left: "center",
            top: "34%",
            style: {
              text: this.deviceData.totalNumber || '',
              textAlign: "center",
              fill: "#f0f0f0", //文字的颜色
              fontSize: 24
              // fontWeight: 600
            }
          },
          {
            type: "text",
            left: "center",
            top: "54%",
            style: {
              text: "总数",
              textAlign: "center",
              fill: "#F0F0F0",
              fontSize: 12
            }
          }
        ],
        series: [
          {
            type: "pie",
            radius: ['60%', '80%'], // 内外半径
            label: {
              show: false,
              color: '#F0F0F0',
              fontSize: 12,
              lineHeight: 14,
              formatter: '{b} {d}%'
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.deviceChartData || []
          }
        ]
      };
    },
    getBaseStationChartConfig() {
      return {
        color: ['#ECC94C', '#68E0E3'],
        tooltip: {
          show: false,
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        },
        graphic: [
          {
            //环形图中间添加文字
            type: "text", //通过不同top值可以设置上下显示
            left: "center",
            top: "34%",
            style: {
              text: 12,
              textAlign: "center",
              fill: "#F0F0F0", //文字的颜色
              fontSize: 24
              // fontWeight: 600
            }
          },
          {
            type: "text",
            left: "center",
            top: "54%",
            style: {
              text: "总数",
              textAlign: "center",
              fill: "#F0F0F0",
              fontSize: 12
            }
          }
        ],
        series: [
          {
            type: "pie",
            radius: ['60%', '80%'], // 内外半径
            label: {
              show: false,
              color: '#F0F0F0',
              fontSize: 12,
              lineHeight: 14,
              formatter: '{b} {d}%'
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.baseStationChartData || []
          }
        ]
      };
    },
    getDeviceConfig(inputData) {
      let data = [
        { name: "传感器", value: _.get(inputData, `sensorNumber`) },
        { name: "球机", value: _.get(inputData, `domeCameraNumber`) },
        { name: "枪机", value: _.get(inputData, `boxCameraNumber`) }
      ];
      return Object.assign({}, this.$util.ringChartDefaultConfig, { data });
    },
    getBaseStationConfig() {
      let data = [
        { name: "高频", value: 8 },
        { name: "低频", value: 4 },
      ];
      return Object.assign({}, this.$util.ringChartDefaultConfig, { data });
    },
    getSalesVolumeConfig() {
      return {
        tooltip: {
          trigger: 'item',
          position: function (pos, params, dom, rect, size) {
            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            let obj = {top: 60};
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
            return obj;
          },
          formatter: '{b} : {c}'
        },
        grid: {
          left: 60,
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
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: "#F0F0F0",
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
              color: '#fff',
              position: "right",
              offset: [1, 0],
            },
            itemStyle: {
              //通常情况下：
              emphasis: {
                barBorderRadius: 18,
              },
              normal: {
                barBorderRadius: 18,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#1D9DE3'
                }, {
                    offset: 1,
                    color: '#68E0E3'
                }])
              }
            },
            barWidth: 18,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(0, 0, 0, 0)',
              borderWidth: 1,
              borderColor: '#417FC8',
              barBorderRadius: 18
            },
            animationCurve: "easeOutBack"
          }
        ]
      };
    },
    getSalesTotalAmountConfig() {
      return {
        // color: ["#6992DE", "#D6B564"],
        color: ["#E3C64D", "#DD5D3D"],
        grid: {
          bottom: 0
        },
        tooltip: {
          show: false,
          trigger: 'item',
          position: function (pos, params, dom, rect, size) {
              // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
              let obj = {top: 60};
              obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
              return obj;
          },
          formatter: '{b} : {c} ({d}%)'
        },
        series: [{
          type: "pie",
          radius: "80%",
          // center: ['50%', '50%'],
          data: [
            { name: "实收", value: 1280 },
            { name: "退款", value: 1032 }
          ],
          // roseType: 'radius',
          label: {
            color: '#F0F0F0',
            fontSize: 12,
            lineHeight: 14,
            formatter: '{b} \n {d}%'
          },
          labelLine: {
            length: 8,
            length2: 6,
            lineStyle: {
              // color: '#3E495E'
            }
          }
        }]
      };
    }
  }
}
</script>
<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
  .static-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .static-item {
      position: relative;
      width: 1.69rem;
      height: 0.6rem;
      border-radius: 0.05rem;
      .title {
        position: absolute;
        top: 0.1rem;
        left: 0.1rem;
        font-size: 0.14rem;
        font-weight: 400;
        color: #fff;
      }
      .count {
        position: absolute;
        right: 0.1rem;
        bottom: 0.1rem;
        color: #F9F7FF;
        .value {
          display: inline-block;
          font-size: 0.35rem;
          line-height: 0.35rem;
        }
        .unit {
          display: inline-block;
          font-size: 0.14rem;
          color: #fff;
        }
      }
      &:nth-of-type(1) {
        background: linear-gradient(to right, #1E266E, #A597EF);
        margin-bottom: 0.07rem;
      }
      &:nth-of-type(2) {
        background: linear-gradient(to right, #5D3710, #EBC773);
        margin-bottom: 0.07rem;
      }
      &:nth-of-type(3) {
        background: linear-gradient(to right, #143D74, #9DBCF6);
      }
      &:nth-of-type(4) {
        background: linear-gradient(to right, #6A1313, #DD7385);
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
      #land-chart {
        width: 100%;
        height: 2.2rem;
      }
      #sales-total-amount-chart {
        width: 100%;
        height: 1.4rem;
      }
      #sales-volume-chart {
        width: 100%;
        height: 1.8rem;
      }
      .chart-title {
        display: flex;
        align-items: center;
        // height: 0.32rem;
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
          color: #F0F0F0;
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

