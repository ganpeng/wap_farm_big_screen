<template>
  <div class="warning-carousel-container">
    <carousel
      :autoplay="true"
      :autoplayTimeout="5000"
      :mouseDrag="false"
      :per-page="1"
      :loop="true"
      :autoplayHoverPause="false"
      :paginationEnabled="false"
    >
      <slide v-for="(data, index) in dataList" :key="index">
        <div class="warning-item">
          <div class="date">
            <svg-icon icon-class="new_warning_icon1"></svg-icon>
            <span class="value">{{data.date}}</span>
          </div>
          <div class="farm">
            <svg-icon icon-class="new_warning_icon2"></svg-icon>
            <span class="value">{{data.farmName}}</span>
          </div>
          <div class="desc">
            <svg-icon icon-class="new_warning_icon3"></svg-icon>
            <span v-html="data.description" class="value"></span>
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
  min-height: 1.6rem;
  .VueCarousel {
    min-height: 1.6rem;
    .VueCarousel-wrapper {
      min-height: 1.6rem;
      .VueCarousel-inner {
        min-height: 1.6rem;
        .VueCarousel-slide {
          min-height: 1.6rem;
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
                flex: 1;
                color: #F0F0F0;
                font-size: 0.12rem;
              }
            }
            .desc {
              align-items: flex-start;
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
