<template>
  <div class="warning-carousel-container">
    <carousel
      :autoplay="true"
      :per-page="1"
      :loop="true"
      :autoplayHoverPause="false"
      :paginationEnabled="false"
    >
      <slide v-for="(data, index) in dataList" :key="index">
        <div class="warning-item">
          <div class="date">
            <svg-icon icon-class="new_warning_icon1"></svg-icon>
            <span class="value">05-25 12:00:22</span>
          </div>
          <div class="farm">
            <svg-icon icon-class="new_warning_icon2"></svg-icon>
            <span class="value">吉林省榆树市延和天丰制米有限公司</span>
          </div>
          <div class="desc">
            <svg-icon icon-class="new_warning_icon3"></svg-icon>
            <span class="value">,最低阈值：10°C</span>
          </div>
          <div class="right-top-icon">
            <svg-icon icon-class="new_warning_icon4"></svg-icon>
          </div>
        </div>
      </slide>
    </carousel>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel';
export default {
  name: 'WarningCarousel',
  components: {Carousel, Slide},
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="scss" scoped>
.warning-carousel-container {
  width: 100%;
  min-height: 1.4rem;
  .VueCarousel {
    min-height: 1.4rem;
    .VueCarousel-wrapper {
      min-height: 1.4rem;
      .VueCarousel-inner {
        min-height: 1.4rem;
        .VueCarousel-slide {
          min-height: 1.4rem;
          .warning-item {
            position: relative;
            width: 100%;
            height: 100%;
            padding: 0.15rem;
            .date,
            .farm,
            .desc {
              display: flex;
              align-items: center;
              margin-bottom: 0.05rem;
              .svg-icon {
                width: 0.12rem;
                height: 0.12rem;
                margin-right: 0.06rem;
              }
              .value {
                color: #F0F0F0;
              }
            }
            .date {
              .value {
                font-size: 0.12rem;
              }
            }
            .farm {
              .value {
                font-size: 0.14rem;
              }
            }
            .right-top-icon {
              position: absolute;
              right: 0.15rem;
              top: 0.15rem;
              .svg-icon {
                width: 0.4rem;
                height: 0.38rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
