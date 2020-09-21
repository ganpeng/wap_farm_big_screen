<template>
  <div class="tracing-detail-container">
    <div class="banner">
      <div class="title">
        田间到餐桌全程可追溯
      </div>
      <div class="desc">
        一物一码&nbsp;｜&nbsp;安全到家
      </div>
    </div>
    <div class="tracing-detail-content">
      <div class="tab-list-container">
        <ul class="tab-list">
          <li
            v-for="(item, index) in tabList"
            :key="index"
            @click="changeTab(index)"
            :class="['tab-item', activeIndex === index && 'active']">
            {{item.title}}
            <span :class="['bottom-line', activeIndex === index && 'active']"></span>
          </li>
        </ul>
      </div>
      <div class="tab-content-container">
        <div v-if="activeIndex === 0" class="tab-content-item">
          <commodity-info></commodity-info>
        </div>
        <div v-if="activeIndex === 1" class="tab-content-item">
          <tracing-info></tracing-info>
        </div>
        <div v-if="activeIndex === 2" class="tab-content-item">
          <company-info></company-info>
        </div>
      </div>
    </div>
    <page-footer></page-footer>
  </div>
</template>
<script>
import PageFooter from './PageFooter';
import CommodityInfo from './CommodityInfo';
import CompanyInfo from './CompanyInfo';
import TracingInfo from './TracingInfo';
export default {
  name: 'TracingDetail',
  components: {PageFooter, CommodityInfo, CompanyInfo, TracingInfo},
  data() {
    return {
      activeIndex: 0,
      tabList: [
        {
          title: '商品名片'
        },
        {
          title: '全程溯源'
        },
        {
          title: '产地实况'
        }
      ]
    };
  },
  methods: {
    changeTab(index) {
      this.activeIndex = index;
    }
  }
}
</script>
<style lang="scss" scoped>
.tracing-detail-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .banner {
    width: 100%;
    height: 1.5rem;
    background-image: url('../../assets/image/wap_banner_bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
    .title {
      font-size: 0.27rem;
      line-height: 0.37rem;
      font-weight: 500;
      color: #fff;
      text-align: center;
      padding-top: 0.27rem;
    }
    .desc {
      text-align: center;
      font-size: 0.13rem;
      line-height: 0.18rem;
      color: #FFFFFF;
    }
  }
  .tracing-detail-content {
    position: relative;
    background-color: #fff;
    .tab-list-container {
      position: absolute;
      top: -0.3rem;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 0.3rem);
      height: 0.5rem;
      border-radius: 0.1rem;
      background-color: #fff;
      box-shadow: 0 0.02rem 0.08rem 0 rgba(184,200,227,0.5);
      .tab-list {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        .tab-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #777777;
          font-size: 0.16rem;
          line-height: 0.2rem;
          &.active {
            color: #222;
            font-weight: 600;
          }
          .bottom-line {
            width: 0.25rem;
            height: 0.02rem;
            margin-top: 0.02rem;
            border-radius: 0.02rem;
            background-color: #2787F5;
            visibility: hidden;
            &.active {
              visibility: initial;
            }
          }
        }
        .tab-item + .tab-item {
          margin-left: 0.38rem;
        }
      }
    }
    .tab-content-container {
      padding: 0.15rem;
      padding-top: 0.4rem;
    }
  }
}
</style>
