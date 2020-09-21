<template>
  <div v-if="recommendList.length > 0" class="my-carousel-container">
    <div class="recommend-list">
      <div @click="gotoShopping(recommend.goodsId)" v-for="(recommend, index) in recommendList" :key="index" class="recommend-item">
        <div class="img" :style="imgStyle(recommend)"></div>
        <div class="name">{{recommend.goodsName}}</div>
        <div class="price"><span>¥</span>&nbsp;{{recommend.price}}</div>
        <div class="buy-btn">立即抢购</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RecommendList',
  props: {
    recommendList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    imgStyle() {
      return (data) => {
        return `background-image: url('${data.thumbnail}');`;
      };
    }
  },
  methods: {
    gotoShopping(id) {
      let url = `${process.env.VUE_APP_SALE_ROOT}/goods/${id}`;
      window.location.href = url;
    }
  }
}
</script>
<style lang="scss" scoped>
.my-carousel-container {
  display: block;
  position: relative;
  .recommend-list {
    display: flex;
    justify-content: space-between;
    text-align: center;
    .recommend-item {
      width: 1.08rem;
      overflow: hidden;
      background-color: #fff;
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
        letter-spacing: 0;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;  /*要显示的行数*/
        -webkit-box-orient: vertical;
      }
      .price {
        color: #FF8600;
        font-size: 0.16rem;
        font-weight: 600;
        line-height: 0.18rem;
        margin: 0.08rem 0;
        span {
          font-weight: 400;
        }
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
</style>

