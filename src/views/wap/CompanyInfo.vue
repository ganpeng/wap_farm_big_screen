<template>
  <div class="company-info-container">
    <div class="company-basic-info">
      <div class="header">
        <div class="title">{{farm.name}}</div>
        <div v-if="farm.farmCertificates.length > 0" @click="viewCertificateHandler" class="view-certificate">查看证书</div>
      </div>
      <div class="created-area">
        <span class="created">{{createdDate}}年成立</span>
        <span class="area">{{farm.area}}公顷</span>
      </div>
      <div class="mark-list-container">
        <ul class="mark-list">
          <li v-for="(mark, index) in farmMarks" :key="index" class="mark-item">{{mark.name}}</li>
        </ul>
      </div>
      <div class="desc">{{farm.description}}</div>
    </div>
    <div class="map">
      <div id="my-map"></div>
    </div>
    <div class="charts-info">
      <div class="title">种植信息</div>
      <div class="desc">因地制宜, 智能管控</div>
      <div class="charts-container">
        <div class="charts-item">
          <div class="chart-title">
            <i class="split-line"></i>
            耕地<span class="value">{{landData.farmLandArea}}</span><span class="unit">公顷</span>
          </div>
          <div id="land-chart"></div>
        </div>
        <div class="charts-item">
          <div class="chart-title">
            <i class="split-line"></i>
            种植<span class="value">{{plantData.totalArea}}</span><span class="unit">公顷</span>
          </div>
          <div id="plant-chart"></div>
        </div>
      </div>
    </div>
    <div class="env-data-container">
      <div class="title">环境数据</div>
      <div class="desc">数据透明化，从源头健康</div>
      <ul class="sensor-list">
        <li
          v-for="(sensor, index) in sensorList"
          :key="index"
          @click="sensorChangeHandler(index)"
          :class="['sensor-item', sensorActiveIndex === index && 'active']"
        >
          <div class="left">
            <div class="label">{{sensor.title}}</div>
            <div class="value">
              {{sensor.value}}
              <i class="unit">{{sensor.unit}}</i>
            </div>
          </div>
          <div class="right-icon">
            <svg-icon :icon-class="sensor.wapIcon"></svg-icon>
          </div>
        </li>
      </ul>
      <div v-show="sensorChartData.days.length > 0" class="sensor-chart-container">
        <div id="sensor-chart"></div>
      </div>
    </div>
    <div v-if="cameraList.length > 0" class="env-live-container">
      <div class="title">实时监看</div>
      <div class="desc">过程更放心，质量有保障</div>
      <div class="camera-list">
        <scrollBar direction="x" :activeIndex="activeIndex">
          <div
            v-for="(camera, index) in cameraList"
            :key="index"
            @click="changeCamera(camera, index)"
            :class="['camera-item', 'scrollBarItem', activeIndex === index && 'active']"
          >{{camera.deviceName}}</div>
        </scrollBar>
      </div>
      <div class="live-video-container">
        <div class="live-video-wrapper">
          <div v-if="playUrl !== noLapseUrl" class="video-player-wrapper">
            <video-player ref="videoPlayer" :playUrl="playUrl" :videoType="videoType"></video-player>
          </div>
          <div v-else v-html="`本月暂未生成延时摄影`" class="no-data-text"></div>
        </div>
        <div class="header">
          <div class="left">
            <div @click="liveMonitorHandler" :class="['live-btn', month && 'disabled']">
              实时监控
              <svg-icon icon-class="wap_real_live_icon"></svg-icon>
            </div>
          </div>
          <div class="right">
            <div @click="monthSelectHandler" :class="['month-select', month && 'active']">
              <svg-icon icon-class="pc_select_month_icon"></svg-icon>
              {{month ? month : '选择月份'}}
              <ul v-if="monthListVisible" class="month-list">
                <li
                  v-for="(month, index) in monthList"
                  :key="index"
                  @click.stop="selectHandler(month)"
                  class="month-item"
                >{{month}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <month-select :select="monthSelected" ref="monthSelect"></month-select>
    <certificate-dialog ref="cetificateDialog" :dataList="farm.farmCertificates"></certificate-dialog>
  </div>
</template>
<script>
import _ from "lodash";
import echarts from "echarts";
import ScrollBar from "@/components/ScrollBar";
import constants from "@/util/constants";
import MonthSelect from "./MonthSelect";
import VideoPlayer from "./VideoPlayer";
import CertificateDialog from "./CertificateDialog";
export default {
  name: "CompanyInfo",
  components: { ScrollBar, MonthSelect, VideoPlayer, CertificateDialog },
  props: {
    hideLoading: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      map: null,
      sensorActiveIndex: 0,
      activeIndex: 0,
      month: "", // 延时摄影
      monthList: this.$util.get12MonthNearBy(),
      monthListVisible: false,
      sensorList: constants.spreadSensorList,
      cameraList: [],
      trendDataList: [],
      cameraTimeLapseList: [], // 延时摄影数据
      farm: {
        latitude: "",
        longitude: "",
        farmCertificates: [],
        farmMarks: []
      },
      playUrl: "",
      noLapseUrl: 'http://null',
      sensorChart: null,
      // 统计数据
      landData: {},
      landChart: null,
      landChartData: [],
      plantData: {},
      plantChart: null,
      plantChartData: []
    };
  },
  async created() {
    try {
      await this.$nextTick();
      let { farmId } = this.$route.query;
      // 获取农场信息
      this.getFarm(farmId);
      // 获取传感器数据
      this.getSensorList(farmId);
      // 获取摄像头数据
      this.getCameraList(farmId);
      // 初始化耕地图表
      this.getLandStatistics(farmId);
      // 初始化种植图表
      this.getPlantStatistics(farmId);
      // 绑定事件
      this.bindEvents();
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    sensorChartData() {
      let metric = _.get(this.sensorList, `${this.sensorActiveIndex}.metric`);
      let trendData = this.trendDataList.find(item => item.metric === metric);
      let orderDps = _.get(trendData, 'orderDps') || [];
      return {
        value: orderDps.map(item => item.value) || [],
        days: orderDps.map(item => {
            return this.$util.dateFormat("mm-dd", new Date(item.timestamp));
          }) || []
      };
    },
    createdDate() {
      return this.farm.createdAt ? new Date(this.farm.createdAt).getFullYear() : '';
    },
    farmMarks() {
      return _.take(this.farm.farmMarks, 3);
    },
    videoType() {
      return this.month ? "video/mp4" : "application/x-mpegURL";
    }
  },
  methods: {
    getFarm(farmId) {
      this.$service
        .getFarmById(farmId)
        .then(res => {
          this.hideLoading();
          if (res && res.code === 0) {
            this.farm = res.data;
            this.mapInit();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getSensorList(farmId) {
      this.$service
        .getSensorListByFarmId(farmId)
        .then(res => {
          if (res && res.code === 0) {
            let deviceName =
              _.get(res.data, "0.deviceName");
            if (deviceName) {
              // 获取传感器的最后一条数据
              this.$service
                .getSensorLastData(deviceName)
                .then(res2 => {
                  if (res2 && res2.code === 0) {
                    this.sensorList = this.sensorList.map(item => {
                      let obj = res2.data.find(
                        _item => _item.metric === item.metric
                      );
                      let value = _.get(obj, "value");
                      if (value) {
                        item.value = parseFloat(value).toFixed(2);
                      }
                      return item;
                    });
                  }
                })
                .catch(err => {
                  console.log(err);
                });
              //  获取传感器的图表数据
              this.$service
                .getSensor({ deviceName, days: 7 })
                .then(res2 => {
                  if (res2 && res2.code === 0) {
                    this.trendDataList = res2.data;
                    this.initSensorChart();
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCameraList(farmId) {
      this.$service
        .getCameraListByFarmId({ farmId, pageSize: 100 })
        .then(res => {
          if (res && res.code === 0) {
            let cameraList = _.get(res.data, "list") || [];
            this.cameraList = cameraList.filter((item) => item.deviceStatus === 'ONLINE' || item.deviceStatus === 'OFFLINE');
            this.playUrl = _.get(this.cameraList, "0.playUrl");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getLandStatistics(farmId) {
      let year = new Date().getFullYear();
      this.$service.getLandStatistics({ farmId, year })
        .then((res) => {
          this.landData = _.get(res.data, "0") || {};
          this.landChartData = [
            { name: "旱田", value: _.get(this.landData, `dryLandArea`) },
            { name: "水浇地", value: _.get(this.landData, `irrigationLandArea`) },
            { name: "水田", value: _.get(this.landData, `paddyFieldArea`) }
          ];
          this.initLandChart();
        }).catch((err) => {
          console.log(err);
        });
    },
    getPlantStatistics(farmId) {
      let year = new Date().getFullYear();
      this.$service.getStatisticsPlant({ farmId, year })
        .then((res) => {
          this.plantData = _.get(res.data, "0") || {};
          this.plantChartData =  [
            { name: "水稻", value: this.plantData.riceArea },
            { name: "大豆", value: this.plantData.soyaArea },
            { name: "玉米", value: this.plantData.cornArea },
            { name: "其他粮食", value: this.plantData.otherGrainArea },
            { name: "其他", value: this.plantData.otherCropArea }
          ];
          this.initPlantChart();
        }).catch((err) => {
          console.log(err);
        });
    },
    async mapInit() {
      try {
        this.map = new window.AMap.Map("my-map", {
          // 设置地图的显示样式
          // mapStyle: "amap://styles/93f622ecbb8e8a4ed4f6b40967ef3857",
          zoom: 14,
          zooms: [7, 21]
        });
        let marker = new window.AMap.Marker({
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          position: new window.AMap.LngLat(116.39, 39.9)
        });
        this.map.add(marker);
        if (this.farm.longitude && this.farm.latitude) {
          let lnglat = [this.farm.longitude, this.farm.latitude];
          this.map.setCenter(lnglat);
          marker.setPosition(lnglat);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async initSensorChart() {
      try {
        await this.$nextTick();
        let sensorChartDom = document.querySelector("#sensor-chart");
        let sensorChart = echarts.init(sensorChartDom);
        this.sensorChart = sensorChart;
        // 为echarts对象加载数据
        sensorChart.clear();
        sensorChart.setOption(this.getSensorChartConfig(), true);
      } catch (err) {
        console.log(err);
      }
    },
    async initPlantChart() {
      try {
        await this.$nextTick();
        let plantChartDom = document.querySelector("#plant-chart");
        let plantChart = echarts.init(plantChartDom);
        this.plantChart = plantChart;
        // 为echarts对象加载数据
        plantChart.clear();
        plantChart.setOption(this.getPlantChartConfig(), true);
      } catch (err) {
        console.log(err);
      }
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
    changeCamera(camera, index) {
      this.activeIndex = index;
      if (this.month) {
        let nationalStandardId = _.get(camera, "nationalStandardId");
        this.getCameraTimeLapseByStreamName(nationalStandardId);
      } else {
        this.playUrl = camera.playUrl;
      }
    },
    bindEvents() {
      let body = document.querySelector('body');
      body.addEventListener('click', (e) => {
        let className = e.target.className;
        if (className.indexOf('month-select') === -1) {
          this.monthListVisible = false;
        }
      }, false);
    },
    monthSelectHandler() {
      this.monthListVisible = true;
    },
    monthSelected(month) {
      this.month = month;
      let camera = _.get(this.cameraList, this.activeIndex);
      let nationalStandardId = _.get(camera, "nationalStandardId");
      this.getCameraTimeLapseByStreamName(nationalStandardId);
    },
    selectHandler(month) {
      this.month = month;
      this.monthListVisible = false;
      let camera = _.get(this.cameraList, this.activeIndex);
      let nationalStandardId = _.get(camera, "nationalStandardId");
      this.getCameraTimeLapseByStreamName(nationalStandardId);
    },
    viewCertificateHandler() {
      this.$refs.cetificateDialog.show();
    },
    async getCameraTimeLapseByStreamName(streamName) {
      try {
        let res = await this.$service.getCameraTimeLapse(streamName);
        if (res && res.code === 0) {
          this.cameraTimeLapseList = res.data || [];
          let timeLapse = this.cameraTimeLapseList.find(
            item => item.dateStr === this.month.replace("-", "")
          );
          let url = _.get(timeLapse, "url") || this.noLapseUrl;
          this.playUrl = url;
        }
      } catch (err) {
        console.log(err);
      }
    },
    liveMonitorHandler() {
      let camera = this.cameraList.find(
        (camera, index) => index === this.activeIndex
      );
      this.month = "";
      this.playUrl = _.get(camera, "playUrl");
    },
    // 传感器切换
    sensorChangeHandler(index) {
      this.sensorActiveIndex = index;
      this.sensorChart.clear();
      this.sensorChart.setOption(this.getSensorChartConfig(), true);
    },
    getLandChartConfig() {
      return {
        color: ['#7B8BF6', '#43D1D5', '#ECC94C'],
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
            top: "40%",
            style: {
              text: this.landData.farmLandArea || '',
              textAlign: "center",
              fill: "#2787F5", //文字的颜色
              fontSize: 18,
              fontWeight: 600
            }
          },
          {
            type: "text",
            left: "center",
            top: "50%",
            style: {
              text: "总面积",
              textAlign: "center",
              fill: "#98A4AF",
              fontSize: 12
            }
          }
        ],
        series: [
          {
            type: "pie",
            // radius: [40, 60],
            // center: ["50%", "50%"],
            // roseType: "area",
            radius: ['50%', '70%'], // 内外半径
            label: {
              color: '#9FA8B8',
              fontSize: 12,
              lineHeight: 14,
              formatter: '{b} {d}%'
            },
            data: this.landChartData || []
          }
        ]
      };
    },
    getPlantChartConfig() {
      return {
        tooltip: {
          show: false,
          trigger: 'item',
          formatter: (params) => {
            return `<span>${params.name}: </span>
                    <span style="color: ${params.color};">${params.value}</span>`;
          }
        },
        grid: {
          top: '10%',
          left: '10%',
          right: '10%',
          bottom: '10%'
        },
        xAxis: {
          type: "category",
          data: this.plantChartData.map((item) => item.name),
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 12,
            color: '#98A4AF',
            interval: 0
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#98A4AF'
            }
          }
        },
        yAxis: {
          show: false,
          type: "value",
          axisLabel: {
            show: false,
            fontSize: 12,
            color: '#98A4AF'
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#98A4AF'
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              type: 'dashed',
              color: ['#98A4AF']
            }
          }
        },
        series: [
          {
            data: this.plantChartData.map((item) => item.value),
            type: "bar",
            label: {
              show: true,
              color: "#777",
              position: "top"
            },
            itemStyle: {
              //通常情况下：
              normal: {
                barBorderRadius: [30, 30, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "#8A97F5"
                  },
                  {
                    offset: 1,
                    color: "#DDB1FE"
                  }
                ])
              }
            },
            barWidth: 30,
            showBackground: true,
            backgroundStyle: {
              color: '#F7F8FA',
              barBorderRadius: [30, 30, 0, 0]
            }
          }
        ]
      };
    },
    // 传感器图表配置文件
    getSensorChartConfig() {
      return {
        color: ["#45A1F8"],
        tooltip: {
          trigger: "item",
          formatter: params => {
            return `<span style="color: ${params.color};">${ params.value }</span>`;
          }
        },
        grid: {
          top: "10%",
          left: "12%",
          right: "5%",
          bottom: "15%"
        },
        xAxis: {
          type: "category",
          data: this.sensorChartData.days || [],
          axisLabel: {
            fontSize: 12,
            color: "#98A4AF"
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              // color: '#3E495E'
              color: "#98A4AF"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            fontSize: 12,
            color: "#98A4AF"
          },
          axisLine: {
            lineStyle: {
              color: "#98A4AF"
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              width: 0.5,
              type: "dashed",
              color: ["#98A4AF"]
            }
          }
        },
        series: [
          {
            data: this.sensorChartData.value || [],
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
                      color: "rgba(69,161,248, 0.4)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(69,161,248, 0)" // 100% 处的颜色
                    }
                  ],
                  globalCoord: true// 缺省为 false
                }
              }
            }
          }
        ]
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.company-info-container {
  .company-basic-info {
    width: 100%;
    background-color: #fff;
    box-shadow: 0 0.02rem 0.08rem 0 rgba(184, 200, 227, 0.5);
    border-radius: 0.1rem;
    padding: 0.15rem;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        flex: 1;
        color: #222;
        font-size: 0.16rem;
        line-height: 0.20rem;
        font-weight: 500;
      }
      .view-certificate {
        flex-wrap: nowrap;
        font-size: 0.12rem;
        color: #2787f5;
        cursor: pointer;
      }
    }
    .created-area {
      color: #777;
      font-size: 0.12rem;
      margin-top: 0.06rem;
      .created {
        margin-right: 0.1rem;
      }
    }
    .mark-list-container {
      margin: 0.06rem 0 0.12rem 0;
      .mark-list {
        display: flex;
        .mark-item {
          font-size: 0.12rem;
          color: #777;
          height: 0.25rem;
          line-height: 0.25rem;
          padding: 0 0.06rem;
          border-radius: 0.03rem;
          background-color: #edf6ff;
        }
        .mark-item + .mark-item {
          margin-left: 0.06rem;
        }
      }
    }
    .desc {
      font-size: 0.12rem;
      line-height: 0.18rem;
      color: #98a4af;
      word-break: break-word;
    }
  }
  .map {
    position: relative;
    width: 100%;
    height: 1.97rem;
    margin-top: 0.2rem;
    #my-map {
      width: 100%;
      height: 100%;
    }
  }
  .charts-info {
    margin-top: 0.3rem;
    .charts-container {
      .chart-title {
        display: flex;
        align-items: center;
        font-size: 0.14rem;
        line-height: 0.18rem;
        color: #98A4AF;
        text-align: center;
        .split-line {
          display: inline-block;
          width: 0.03rem;
          height: 0.15rem;
          background: linear-gradient(231deg,rgba(255,134,0,1) 0%,rgba(255,177,124,1) 100%);
          border-radius: 0.02rem;
          margin-right: 0.1rem;
        }
        .value {
          color: #2787F5;
          font-size: 0.2rem;
          font-weight: 600;
          margin: 0 0.06rem;
        }
        .unit {
          color: #2787F5;
          font-size: 0.12rem;
        }
      }
      .charts-item {
        width: 100%;
        height: 2.55rem;
        background: #fff;
        box-shadow: 0 0.02rem 0.08rem 0 rgba(184,200,227,0.5);
        border-radius: 0.1rem;
        padding: 0.15rem;
        margin-top: 0.2rem;
        #land-chart,
        #plant-chart {
          width: 100%;
          height: calc(100% - 0.2rem);
        }
      }
    }
  }
  .env-data-container {
    margin-top: 0.3rem;
    .sensor-list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 0.15rem;
      .sensor-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 1.11rem;
        min-width: 1.11rem;
        height: 0.6rem;
        padding: 0.1rem;
        background-color: #f7f8fa;
        border-radius: 0.05rem;
        margin-bottom: 0.06rem;
        &.active {
          background-color: #edf7ff;
        }
        .left {
          .label {
            color: #777;
            font-size: 0.12rem;
            line-height: 0.18rem;
          }
          .value {
            color: #222;
            font-size: 0.12rem;
            line-height: 0.2rem;
          }
        }
        .right-icon {
          position: absolute;
          top: 0.06rem;
          right: 0.1rem;
        }
      }
    }
    .sensor-chart-container {
      width: 100%;
      height: 1.4rem;
      #sensor-chart {
        width: 100%;
        height: 100%;
      }
    }
  }
  .env-live-container {
    margin-top: 0.3rem;
    .camera-list {
      margin: 0.15rem 0;
      text-align: center;
      .camera-item {
        display: inline-block;
        min-width: 0.95rem;
        height: 0.35rem;
        padding: 0 0.1rem;
        line-height: 0.35rem;
        text-align: center;
        color: #417fc8;
        background-color: #f0f7ff;
        border-radius: 0.05rem;
        font-size: 0.14rem;
        color: #98a4af;
        overflow: hidden;
        cursor: pointer;
        &.active {
          color: #fff;
          background-color: #2787f5;
        }
      }
      .camera-item + .camera-item {
        margin-left: 0.12rem;
      }
    }
    .live-video-container {
      width: 100%;
      box-shadow: 0 0.02rem 0.08rem 0 rgba(184, 200, 227, 0.5);
      border-radius: 0.1rem;
      padding: 0.15rem 0.15rem 0.15rem 0.15rem;
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.25rem;
        margin-top: 0.15rem;
        .left {
          .live-btn {
            color: #2787f5;
            font-size: 0.12rem;
            &.disabled {
              color: #98a4af;
            }
          }
        }
        .right {
          width: 1rem;
          height: 0.25rem;
          line-height: 0.25rem;
          font-size: 0.12rem;
          text-align: center;
          border-radius: 0.15rem;
          border: 1px solid #eeeeee;
          .month-select {
            position: relative;
            color: #98a4af;
            &.active {
              color: #222;
            }
            .month-list {
              position: absolute;
              top: 0.28rem;
              width: 1rem;
              height: 1.3rem;
              padding: 0.1rem 0;
              overflow-y: scroll;
              background-color: #fff;
              box-shadow: 0 0.02rem 0.12rem 0 rgba(184, 200, 227, 0.4);
              border-radius: 0.04rem;
              z-index: 200;
              .month-item {
                color: #98a4af;
                font-size: 0.14rem;
                height: 0.2rem;
                line-height: 0.2rem;
                &:hover {
                  color: #fff;
                  background-color: #2787f5;
                }
              }
              .month-item + .month-item {
                margin-top: 0.06rem;
              }
            }
          }
        }
      }
      .live-video-wrapper {
        // position: relative;
        width: 100%;
        height: 1.78rem;
        overflow: hidden;
        .video-player-wrapper,
        .no-data-text {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
        .no-data-text {
          color: #9FA8B8;
        }
      }
    }
  }
  .env-live-container,
  .env-data-container,
  .charts-info {
    .title {
      color: #222;
      font-size: 0.16rem;
      font-weight: 500;
      line-height: 0.18rem;
      text-align: center;
      margin-bottom: 0.06rem;
    }
    .desc {
      color: #777;
      font-size: 0.12rem;
      line-height: 0.18rem;
      font-weight: 400;
      text-align: center;
    }
  }
}
</style>
<style lang="scss">
.video-js .vjs-big-play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

