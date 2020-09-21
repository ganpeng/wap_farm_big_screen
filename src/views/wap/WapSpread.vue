<template>
  <div class="tracing-detail-container">
    <div class="banner">
      <div class="title">
        原产农场 质量保证
      </div>
      <div class="desc">
        溯源追溯&nbsp;｜&nbsp;实时监控&nbsp;|&nbsp;品质检测
      </div>
    </div>
    <div class="tracing-detail-content">
      <div class="tab-content-container">
        <company-info :hideLoading="hideLoading"></company-info>
      </div>
    </div>
    <page-footer></page-footer>
    <loading ref="loading"></loading>
  </div>
</template>
<script>
import PageFooter from './PageFooter';
import CompanyInfo from './CompanyInfo';
import Loading from '@/components/Loading';
export default {
  name: 'WapSpread',
  components: {PageFooter, CompanyInfo, Loading},
  data() {
    return {};
  },
  methods: {
    hideLoading() {
      this.$refs.loading.hide();
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
    margin-top: -0.6rem;
    .tab-content-container {
      padding: 0.15rem;
    }
  }
}
</style>
