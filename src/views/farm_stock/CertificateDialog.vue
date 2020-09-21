<template>
  <div v-if="visible" class="certificate-dialog-container">
    <div class="certificate-content">
      <div :id="id" class="siema">
        <div
          :style="imgStyle(data)"
          v-for="(data, index) in dataList"
          :key="index" class="siema-item"></div>
      </div>
    </div>
    <div @click="hide" class="close-btn">
      <svg-icon icon-class="wap_close_icon"></svg-icon>
    </div>
    <div v-if="dataList.length > 1" @click="prevHandler" class="prev-btn">
      <svg-icon v-if="prevBtnActive" icon-class="wap_prev_icon_active"></svg-icon>
      <svg-icon v-else icon-class="wap_prev_icon"></svg-icon>
    </div>
    <div v-if="dataList.length > 1" @click="nextHandler" class="next-btn">
      <svg-icon v-if="nextBtnActive" icon-class="wap_next_icon_active"></svg-icon>
      <svg-icon v-else icon-class="wap_next_icon"></svg-icon>
    </div>
  </div>
</template>
<script>
import Siema from '@/components/Siema';
export default {
  name: 'CertificateDialog',
  props: {
    id: {
      type: String,
      default: 'siema'
    },
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visible: false,
      siema: null
    };
  },
  computed: {
    imgStyle() {
      return (data) => {
        return `background-image: url('${data.fileUrl}');`;
      };
    },
    prevBtnActive() {
      return this.siema && this.siema.currentSlide !== 0
    },
    nextBtnActive() {
      return this.siema && this.siema.currentSlide !== (this.dataList.length - 1)
    }
  },
  methods: {
    async show() {
      try {
        await this.$nextTick();
        let body = document.querySelector('body');
        body.style.overflow = 'hidden';
        this.visible = true;
        this.init();
      } catch (err) {
        console.log(err);
      }
    },
    hide() {
      let body = document.querySelector('body');
      body.style.overflow = 'inherit';
      this.visible = false;
    },
    async init() {
      try {
        await this.$nextTick();
        let siema = document.querySelector(`#${this.id}`);
        this.siema = new Siema({
          selector: siema,
          perPage: 1,
          draggable: true
        });
      } catch (err) {
        console.log(err);
      }
    },
    prevHandler() {
      if (this.siema) {
        if (this.siema.currentSlide === 0) {
          return false;
          // this.siema.goTo(this.dataList.length - 1);
        } else {
          this.siema.prev();
        }
      }
    },
    nextHandler() {
      if (this.siema) {
        if (this.siema.currentSlide === (this.dataList.length - 1)) {
          return false;
          // this.siema.goTo(0);
        } else {
          this.siema.next();
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.certificate-dialog-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  .certificate-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3.05rem;
    height: 4.32rem;
    .siema {
      height: 4.32rem;
      .siema-item {
        width: 3.05rem;
        height: 4.32rem;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
      }
    }
  }
  .close-btn {
    position: absolute;
    top: 0.3rem;
    right: 0.15rem;
    .svg-icon {
      width: 0.15rem;
      height: 0.15rem;
    }
  }
  .prev-btn {
    position: absolute;
    top: 50%;
    left: 0.04rem;
    transform: translateY(-50%);
    .svg-icon {
      width: 0.24rem;
      height: 0.24rem;
    }
  }
  .next-btn {
    position: absolute;
    top: 50%;
    right: 0.04rem;
    transform: translateY(-50%);
    .svg-icon {
      width: 0.24rem;
      height: 0.24rem;
    }
  }
}
</style>

