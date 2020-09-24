<template>
  <div ref="slider" class="keen-slider">
    <div v-for="(data, index) in dataList" :key="index" class="keen-slider__slide my-slide-item">
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
    </div>
  </div>
</template>
<script>
import "keen-slider/keen-slider.min.css";
import KeenSlider from "keen-slider";
export default {
  name: 'WarningCarousel',
  data() {
    return {
      dataList: [],
      slider: null,
      pause: false,
      interval: null
    };
  },
  beforeDestroy() {
    if (this.slider) {
      this.slider.destroy();
    }
  },
  methods: {
    async initKeenSlider(dataList) {
      try {
        this.dataList = dataList;
        await this.$nextTick();
        this.slider = new KeenSlider(this.$refs.slider, {
          loop: true,
          duration: 1000,
          dragStart: () => {
            this.setPause(true);
          },
          dragEnd: () => {
            this.setPause(false);
          }
        });
        this.setInterval();
      } catch (err) {
        console.log(err);
      }
    },
    setPause(active) {
      this.pause = active;
      this.setInterval();
    },
    resetInterval() {
      clearInterval(this.interval);
    },
    setInterval() {
      this.resetInterval();
      this.interval = setInterval(() => {
        if (!this.pause) {
          this.slider.next();
        }
      }, 4000);
    }
  }
}
</script>
<style lang="scss">
.my-slide-item {
  max-height: 1.8rem;
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
</style>
