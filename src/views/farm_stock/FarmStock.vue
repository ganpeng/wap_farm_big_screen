<template>
  <div class="farm-stock-container">
    <div class="static-container">
      <div class="static-item">
        <div class="title">农场</div>
        <div class="count">
          <div class="value my-font">{{farmCount}}</div>
          <div class="unit">个</div>
        </div>
      </div>
      <div class="static-item">
        <div class="title">从业人员</div>
        <div class="count">
          <div class="value my-font">{{MemberData.totalNumber}}</div>
          <div class="unit">个</div>
        </div>
      </div>
    </div>
    <div class="section-one section-item">
      <title-one title="农作物"></title-one>
      <div class="section-content">
        <div class="item-chart">
          <div class="chart-title">
            <div class="point"></div>
            <div class="label">本年度总播种</div>
            <div class="value my-font">{{plantData.totalArea}}</div>
            <div class="unit">公顷</div>
          </div>
          <div id="area-chart"></div>
        </div>
        <div class="item-chart">
          <div class="chart-title">
            <div class="point"></div>
            <div class="label">本年度总产量</div>
            <div class="value my-font">{{plantData.totalYield}}</div>
            <div class="unit">吨</div>
          </div>
          <div id="production-chart"></div>
        </div>
      </div>
    </div>
    <div class="section-two section-item">
      <title-one title="实时预警"></title-one>
      <div class="warning-container bg-icon3">
        <warning-carousel ref="warningCarousel"></warning-carousel>
      </div>
    </div>
    <div class="section-three section-item">
      <title-one title="精选农场"></title-one>
      <div class="farm-list-container">
        <ul class="farm-list">
          <li @click="gotoFarmDetail(farm.id)" v-for="(farm, index) in farmList" :key="index" class="farm-item">
            <div :style="`background-image: url('${farm.farmIndexUrl}');`" class="farm-img"></div>
            <div class="farm-name">{{farm.name}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="section-four section-item">
      <title-one title="物环统计"></title-one>
      <div class="section-content">
        <div class="chart-title">
          <div class="point"></div>
          <div class="label">物环设备</div>
          <div class="value my-font">{{landData.farmLandArea}}</div>
          <div class="unit">个</div>
        </div>
        <div id="device-chart"></div>
      </div>
    </div>
    <div class="section-five section-item">
      <title-one title="经营情况统计"></title-one>
      <div class="statics-one statics-item bg-icon5">
        <div class="chart-title">
          <div class="point"></div>
          <div class="label">农业现代化</div>
        </div>
        <div class="statics-info-container">
          <div class="statics-info-item">
            <div class="item-wrapper">
              <div class="label">农机具数量</div>
              <div class="value my-font">{{MachineryData.totalNumber}}<i>辆/台</i></div>
            </div>
          </div>
          <div class="statics-info-item">
            <div class="item-wrapper">
              <div class="label">农民累积培训</div>
              <div class="value my-font">{{MemberData.trainingDays}}<i>天</i></div>
            </div>
          </div>
          <div class="statics-info-item">
            <div class="item-wrapper">
              <div class="label">证书总量</div>
              <div class="value my-font">{{MemberData.certificatedMemberNumber}}<i>个</i></div>
            </div>
          </div>
          <div class="statics-info-item">
            <div class="item-wrapper">
              <div class="label">累计服务营收</div>
              <div class="value my-font">{{operatingData.revenueAmount | toFixed2}}<i>万元</i></div>
            </div>
          </div>
        </div>
      </div>
      <div class="statics-two statics-item bg-icon5">
        <div class="chart-title">
          <div class="point"></div>
          <div class="label">政府扶持</div>
        </div>
        <div class="statics-info-container">
          <div class="statics-info-item">
            <div class="item-wrapper">
              <div class="label">政府项目累计</div>
              <div class="value my-font">{{operatingData.governmentProjectNumber}}<i>个</i></div>
            </div>
          </div>
          <div class="statics-info-item">
            <div class="item-wrapper">
              <div class="label">累计金额</div>
              <div class="value my-font">{{operatingData.appropriationAmount | toFixed2}}<i>万元</i></div>
            </div>
          </div>
          <div class="statics-info-item">
            <div class="item-wrapper">
              <div class="label">农业补贴累计</div>
              <div class="value my-font">{{operatingData.subsidyProjectNumber}}<i>次</i></div>
            </div>
          </div>
          <div class="statics-info-item">
            <div class="item-wrapper">
              <div class="label">累计金额</div>
              <div class="value my-font">{{operatingData.subsidyAmount | toFixed2}}<i>万元</i></div>
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
import WarningCarousel from './WarningCarousel';
import constants from '@/util/constants';
export default {
  name: 'FarmStock',
  components: { TitleOne, WarningCarousel },
  data() {
    return {
      // 图表
      areaChart: null,
      productChart: null,
      farmCount: "", // 农场总数
      farmList: [],
      mapCenterHtml: '',
      deviceData: {},
      deviceConfig: {},
      deviceChartData: [],
      landData: {},
      landConfig: {},
      operatingData: {},
      MemberData: {},
      MachineryData: {},
      warningList: [],
      plantData: {},
      plantConfig: {},
      plantConfig2: {}
    };
  },
  created() {
    let year = new Date().getFullYear();
    this.getFarmList();
    this.getLandStatistics(year);
    this.getDeviceStatistics(year);
    this.getOperatingStatistics(year)
    this.getStatisticsPlant(year)
    this.getFarmCount()
    this.getMemberStatistics(year)
    this.getMachineryStatistics(year)
    this.getWarningList()
  },
  methods: {
    getFarmList() {
      this.$service.getFarmList({pageSize: 100})
        .then((res) => {
          this.farmList = res.data.list || [];
        }).catch((err) => {
          console.log(err);
        });
    },
    getWarningList() {
      this.$service.getWarningList({ pageSize: 20 })
        .then((res) => {
          let warningList = res.data.list || [];
          this.warningList = this.serializeAlertData(warningList);
          this.$refs.warningCarousel.initKeenSlider(this.warningList);
        }).catch((err) => {
          console.log(err);
        });
    },
    getLandStatistics(year) {
      this.$service.getLandStatistics({ farmId: 0, year })
        .then((res) => {
          this.landData = _.get(res.data, "0") || {};
          this.landConfig = this.getLandConfig(res.data);
        }).catch((err) => {
          console.log(err);
        });
    },
    getDeviceStatistics(year) {
      this.$service.getDeviceStatistics({ farmId: 0, year })
        .then((res) => {
          this.deviceData = _.get(res.data, `deviceStatisticsList.0`) || {};
          this.deviceChartData = [
            { name: "传感器", value: _.get(this.deviceData, `sensorNumber`) },
            { name: "球机", value: _.get(this.deviceData, `domeCameraNumber`) },
            { name: "枪机", value: _.get(this.deviceData, `boxCameraNumber`) }
          ];
          this.initDeviceChart();
        }).catch((err) => {
          console.log(err);
        });
    },
    getOperatingStatistics(year) {
      this.$service.getOperatingStatistics({ farmId: 0, year })
        .then((res) => {
          this.operatingData = _.get(res.data, "0") || {};
        }).catch((err) => {
          console.log(err);
        })
    },
    getStatisticsPlant(year) {
      this.$service.getStatisticsPlant({ farmId: 0, year })
        .then((res) => {
          this.plantData = _.get(res.data, "0") || {};
          this.initAreaChart(this.plantData);
          this.initProductChart(this.plantData);
          this.plantConfig = this.getPlantConfig(this.plantData);
          this.plantConfig2 = this.getPlantConfig2(this.plantData);
        }).catch((err) => {
          console.log(err);
        });
    },
    getFarmCount() {
      this.$service.getFarmCount()
        .then((res) => {
          this.farmCount = _.get(res.data, "0.totalFarmNum");
        }).catch((err) => {
          console.log(err);
        });
    },
    getMemberStatistics(year) {
      this.$service.getMemberStatistics({ farmId: 0, year })
        .then((res) => {
          this.MemberData = _.get(res.data, "0") || {};
        }).catch((err) => {
          console.log(err);
        });
    },
    getMachineryStatistics(year) {
      this.$service.getMachineryStatistics({ farmId: 0, year })
        .then((res) => {
          this.MachineryData = _.get(res.data, "0") || {};
        }).catch((err) => {
          console.log(err);
        });
    },
    async initAreaChart(inputData) {
      try {
        await this.$nextTick();
        let areaChartDom = document.querySelector('#area-chart');
        let areaChart = echarts.init(areaChartDom);
        this.areaChart = areaChart;
        // 为echarts对象加载数据
        areaChart.clear();
        areaChart.setOption(this.getPlantConfig(inputData), true);

        window.addEventListener('resize', () => {
         this.areaChart.resize();
        }, false);
      } catch (err) {
        console.log(err);
      }
    },
    async initProductChart(inputData) {
      try {
        await this.$nextTick();
        let productChartDom = document.querySelector('#production-chart');
        let productChart = echarts.init(productChartDom);
        this.productChart = productChart;
        // 为echarts对象加载数据
        productChart.clear();
        productChart.setOption(this.getPlantConfig2(inputData), true);

        window.addEventListener('resize', () => {
         this.productChart.resize();
        }, false);
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
    getLandConfig(inputData) {
      let data = [
        { name: "旱田", value: _.get(inputData, `0.dryLandArea`) },
        { name: "水浇地", value: _.get(inputData, `0.irrigationLandArea`) },
        { name: "水田", value: _.get(inputData, `0.paddyFieldArea`) }
      ];
      return Object.assign({}, this.$util.ringChartDefaultConfig, { data });
    },
    getDeviceConfig(inputData) {
      let data = [
        { name: "传感器", value: _.get(inputData, `sensorNumber`) },
        { name: "球机", value: _.get(inputData, `domeCameraNumber`) },
        { name: "枪机", value: _.get(inputData, `boxCameraNumber`) }
      ];
      return Object.assign({}, this.$util.ringChartDefaultConfig, { data });
    },
    getPlantConfig(data) {
      return {
        color: ["#6992DE", "#D6B564", "#DD6F46", "#884CDE", "#ECC94C" ],
        tooltip: {
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
          radius: "60%",
          data: [
            { name: "水稻", value: data.riceArea },
            { name: "大豆", value: data.soyaArea },
            { name: "玉米", value: data.cornArea },
            { name: "其他粮食", value: data.otherGrainArea },
            { name: "其他", value: data.otherCropArea }
          ],
          label: {
            color: '#9FA8B8',
            fontSize: 12,
            lineHeight: 14,
            formatter: '{b} {d}%\n{c}公顷'
          },
          labelLine: {
            lineStyle: {
              // color: '#3E495E'
            }
          }
        }]
      };
    },
    getPlantConfig2(data) {
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
          right: 42,
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
            color: "#f0f0f0",
            fontSize: 12
          },
          splitLine: {
            show: false
          },
          data: _.reverse(["水稻", "大豆", "玉米", "其他粮食", "其他"])
        },
        series: [
          {
            data: _.reverse([
              data.riceYield,
              data.soyaYield,
              data.cornYield,
              data.otherGrainYield,
              data.otherCropYield
            ]),
            type: "bar",
            label: {
              show: true,
              color: '#F0F0F0',
              position: "right",
              offset: [1, 0],
            },
            emphasis: {
              barBorderRadius: 18,
            },
            itemStyle: {
              normal: {
              barBorderRadius: 18,
                color: function(params) { //柱状图不同颜色实现
                  let colorList = _.reverse([
                    "#6992DE",
                    "#D6B564",
                    "#DD6F46",
                    "#884CDE",
                    "#ECC94C"
                  ]);
                  return colorList[params.dataIndex];
                }
              }
            },
            barWidth: 18,
            showBackground: true,
            backgroundStyle: {
              color: '#203D72',
              barBorderRadius: 18
            },
            animationCurve: "easeOutBack"
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
        graphic: [
          {
            //环形图中间添加文字
            type: "text", //通过不同top值可以设置上下显示
            left: "center",
            top: "40%",
            style: {
              text: this.deviceData.totalNumber || '',
              textAlign: "center",
              fill: "#29E3FD", //文字的颜色
              fontSize: 28,
              fontFamily: 'my-font'
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
              fontSize: 14
            }
          }
        ],
        series: [
          {
            type: "pie",
            radius: ['40%', '60%'], // 内外半径
            label: {
              color: '#98A4AF',
              fontSize: 12,
              lineHeight: 14,
              formatter: '{b} {d}%\n{c}个'
            },
            data: this.deviceChartData || []
          }
        ]
      };
    },
    gotoFarmDetail(id) {
      this.$router.replace({name: 'FarmDetail', params: {id}});
    },
    serializeAlertData(warningList) {
      return warningList.map((item) => {
        let description = '';
        // &uarr;上升 &darr;下降
        if (_.isArray(item.description)) {
          description = item.description.reduce((prev, curr) => {
            let {metric, up, value, low, min, max} = curr;
            let obj = constants.metricList.find((item) => item.value === metric.toUpperCase());
            let name = _.get(obj, 'name') || '';
            let unit = _.get(obj, 'unit') || '';
            prev += `${name}: ${value}${unit},`;
            if (up && max && value) {
              if (parseFloat(value) > parseFloat(max)) {
                prev += `<span class="up-danger">&uarr;${up}${unit}</span>,`;
              } else {
                prev += `<span>&uarr;${up}</span>,`;
              }
            }
            prev += ' ';
            if (max) {
              prev += `最高阈值: ${max}${unit}`;
            }
            prev += ' ';
            if (low && min && value) {
              if (parseFloat(value) < parseFloat(min)) {
                prev += `<span class="low-danger">&darr;${low}</span>,`;
              } else {
                prev += `<span>&darr;${low}</span>, `;
              }
            }

            if (min) {
              prev += `最低阈值: ${min}`;
            }
            return prev;
          }, '');
        } else {
          description = item.description.description;
        }
        let obj = {};
        obj.farmName = item.farmName;
        obj.description = description;
        obj.date = this.$util.dateFormat('mm-dd HH:MM:SS', new Date(item.warnTime));
        return obj;
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.farm-stock-container {
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
          margin-left: 0.04rem;
        }
      }
      &:nth-of-type(1) {
        background: linear-gradient(to right, #1E2991, #8C7DDD);
      }
      &:nth-of-type(2) {
        background: linear-gradient(to right, #165B64, #6DC9E2);
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
      #area-chart {
        width: 100%;
        height: 2rem;
      }
      #production-chart {
        width: 100%;
        height: 1.58rem;
      }
      #sales-volume-chart {
        width: 100%;
        height: 1.8rem;
      }
      #device-chart {
        width: 100%;
        height: 2rem;
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
    .warning-container {
      width: 100%;
      min-height: 1.44rem;
      margin-top: 0.1rem;
    }
    .farm-list-container {
      position: relative;
      width: 100%;
      height: 1.6rem;
      margin-top: 0.1rem;
      overflow-x: scroll;
      .farm-list {
        display: flex;
        flex-wrap: nowrap;
        position: absolute;
        top: 0;
        left: 0;
        height: 1.6rem;
        .farm-item {
          width: 2rem;
          height: 1.6rem;
          margin-right: 0.1rem;
          background: #172E58;
          box-shadow: 0 0.02rem 0.08rem 0 rgba(14, 15, 37, 0.7);
          border-radius: 0.04rem;
          .farm-img {
            width: 100%;
            height: 1rem;
            border-radius: 0.04rem 0.04rem 0 0;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
          }
          .farm-name {
            font-size: 0.14rem;
            font-weight: 400;
            color: #F0F0F0;
            line-height: 0.2rem;
            margin-top: 0.1rem;
            padding: 0 0.1rem;
          }
          &:last-child {
            margin-right: 0;
          }
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
  .section-five {
    .statics-item {
      padding: 0.1rem 0.15rem;
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
      .statics-info-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 0 0.3rem;
        .statics-info-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          flex: 1;
          .item-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .label {
            margin-top: 0.15rem;
            margin-bottom: 0.08rem;
            font-size: 0.12rem;
            font-weight: 400;
            color: #F0F0F0;
            line-height: 0.18rem;
          }
          .value {
            font-size: 0.26rem;
            line-height: 0.26rem;
            color: #29E3FD;
            i {
              font-size: 0.14rem;
              margin-left: 0.04rem;
            }
          }
        }
      }
    }
    .statics-one,
    .statics-two {
      width: 100%;
      height: 1.75rem;
      margin-top: 0.15rem;
      .statics-info-container {
        .statics-info-item {
          flex: auto;
          width: 50%;
          &:nth-of-type(2),
          &:nth-of-type(4) {
            align-items: flex-end;
          }
        }
      }
    }
  }
}
</style>
