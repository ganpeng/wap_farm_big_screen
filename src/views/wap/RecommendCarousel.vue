<template>
  <div v-if="dataList.length > 0" class="my-carousel-container">
    <div :id="id" class="siema">
      <div v-for="(datas, index) in dataList" :key="index" class="siema-item">
        <div class="recommend-list">
          <div v-for="(data, _index) in datas" :key="_index" class="recommend-item">
            <div class="img" :style="imgStyle(data)"></div>
            <div class="name">十月稻田精品红小豆1kg1kg</div>
            <div class="price">¥&nbsp;39.00</div>
            <div class="buy-btn">立即抢购</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <div v-for="(datas, index) in dataList" :key="index"
        :class="['pagination-item', index === currentSlide && 'active']">
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import Siema from '@/components/Siema';
export default {
  name: 'RecommendCarousel',
  props: {
    id: {
      type: String,
      default: 'siema'
    },
    dataList: {
      type: Array,
      default: () => _.chunk([{
        fileUrl: 'https://sorgalla.com/jcarousel/examples/_shared/img/img5.jpg'
      }, {
        fileUrl: 'https://sorgalla.com/jcarousel/examples/_shared/img/img6.jpg'
      }, {
        fileUrl: 'https://sorgalla.com/jcarousel/examples/_shared/img/img4.jpg'
      }, {
        fileUrl: 'https://sorgalla.com/jcarousel/examples/_shared/img/img3.jpg'
      }], 3)
    }
  },
  data() {
    return {
      siema: null
    };
  },
  created() {
    this.init();
  },
  computed: {
    currentSlide() {
      return this.siema && this.siema.currentSlide ? this.siema.currentSlide : 0;
    },
    imgStyle() {
      return (data) => {
        return `background-image: url('${data.fileUrl}');`;
      };
    }
  },
  methods: {
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
          this.siema.goTo(this.dataList.length - 1);
        } else {
          this.siema.prev();
        }
      }
    },
    nextHandler() {
      if (this.siema) {
        if (this.siema.currentSlide === (this.dataList.length - 1)) {
          this.siema.goTo(0);
        } else {
          this.siema.next();
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.my-carousel-container {
  display: block;
  position: relative;
  .siema {
    .siema-item {
      position: relative;
      width: 100%;
      padding: 0 0.02rem;
      .recommend-list {
        display: flex;
        justify-content: space-between;
        text-align: center;
        .recommend-item {
          width: 1.08rem;
          overflow: hidden;
          .img {
            width: 1.08rem;
            height: 1.08rem;
            border-radius: 0.1rem;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            margin-bottom: 0.06rem;
          }
          .name {
            width: 100%;
            height: 0.42rem;
            font-size: 0.14rem;
            line-height: 0.21rem;
            color: #222;
            text-align: left;
          }
          .price {
            color: #FF8600;
            font-size: 0.16rem;
            line-height: 0.18rem;
            margin: 0.08rem 0;
          }
          .buy-btn {
            width: 100%;
            height: 0.25rem;
            line-height: 0.25rem;
            color: #FF8600;
            font-size: 0.14rem;
            border-radius: 0.12rem;
            border: 1px solid #FF8600;
          }
        }
        .recommend-item + .recommend-item {
          margin-left: 0.1rem;
        }
      }
    }
  }
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0.2rem 0;
    overflow: hidden;
    .pagination-item {
      width: 0.06rem;
      height: 0.06rem;
      border-radius: 0.06rem;
      background-color: #D8D8D8;
      &.active {
        background-color: #777777;
      }
    }
    .pagination-item + .pagination-item {
      margin-left: 0.08rem;
    }
  }
}
</style>

