<template>
  <div class="commodity-info-container">
    <div v-if="traceConfirm.queryedNum === 1" :class="['first-content', loaded && 'loaded']">
      <div class="safe-icon">
        <svg-icon icon-class="wap_save_goods_icon"></svg-icon>
      </div>
      <div class="text">
        您所查询的商品为首次扫码验证，是正品！<br />
        一物一码，安全到家
      </div>
    </div>
    <div v-else class="safe-content">
      <div class="text-info">
        <div class="title">
          <svg-icon icon-class="wap_safe_title_icon"></svg-icon>
          &nbsp;以下信息本产品独有，品质可靠
        </div>
        <div class="info-item">
          <div class="label">此溯源码已被查询验证：</div>
          <div class="value">{{traceConfirm.queryedNum}}次</div>
        </div>
        <div class="info-item">
          <div class="label">首次查询时间为：</div>
          <div class="value">{{date}}</div>
        </div>
      </div>
      <div class="safe-icon">
        <svg-icon icon-class="wap_safe_icon"></svg-icon>
      </div>
    </div>
    <div class="basic-info">
      <div class="title-wrapper">
        <div class="line"></div>
        <div class="title">基本信息</div>
      </div>
      <div class="basic-info-content">
        <div class="img" :style="goodsImageStyle"></div>
        <div class="text-info">
          <div class="name">{{goods.goodsName}}</div>
          <div class="item-info">
            <div class="info-item">
              <div class="label">商品编号:</div>
              <div class="value">{{goods.goodsId}}</div>
            </div>
            <div class="info-item">
              <div class="label">商品分类:</div>
              <div class="value">{{goods.categoryName}}</div>
            </div>
            <div class="info-item">
              <div class="label">商品价格:</div>
              <div class="value">{{goods.price}}</div>
            </div>
            <div class="info-item">
              <div class="label">生产企业:</div>
              <div class="value">{{goods.sellerName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="recommend-container">
      <div class="section-header">
        <div class="left">
          <div class="line"></div>
          <div class="title">优品推荐</div>
        </div>
        <div @click="gotoShop" class="right">
          进入店铺
          <svg-icon icon-class="wap_right_arrow_icon"></svg-icon>
        </div>
      </div>
      <recommend-list :recommendList="recommendGoodsList"></recommend-list>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import RecommendList from './RecommendList';
export default {
  name: 'CommodityInfo',
  components: {RecommendList},
  data() {
    return {
      loaded: false,
      goods: {
        goodsName: ''
      },
      traceConfirm: {
        queryedNum: '',
        createdAt: ''
      },
      recommendGoodsList: []
    };
  },
  async created() {
    try {
      let {goodsId} = this.$route.query;
      this.getTraceConfirmData();
      let res = await this.$service.getGoodsById(goodsId);
      if (res && res.code === 0) {
        this.goods = res.data;
        let {goodsId, sellerId} = res.data;
        let res2 = await this.$service.getCommodityList({sellerId});
        if (res2 && res2.code === 0) {
          let recommendGoodsList = _.chain(res2.data.list)
                                    .uniqBy('goodsId')
                                    .filter((item) => item.goodsId !== goodsId)
                                    .take(3)
                                    .value();
          this.recommendGoodsList = recommendGoodsList;
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    goodsImageStyle() {
      return `background-image: url(${this.goods.thumbnail});`;
    },
    date() {
      let date = this.traceConfirm.createdAt;
      return date ? this.$util.dateFormat('YY-mm-dd', new Date(date)) : '';
    }
  },
  methods: {
    getTraceConfirmData() {
      let {goodsId, securityNo, batchNo} = this.$route.query;
      this.$service.getTraceConfirm({goodsId, securityNo, batchNo})
        .then((res) => {
          if (res && res.code === 0) {
            this.traceConfirm = res.data;
            this.loaded = true;
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    gotoShop() {
      let {sellerId} = this.goods;
      let url = `${process.env.VUE_APP_SALE_ROOT}/shop/${sellerId}`;
      window.location.href = url;
    }
  }
}
</script>
<style lang="scss" scoped>
.commodity-info-container {
  .safe-content {
    display: flex;
    align-items: center;
    width: 100%;
    height: 1.1rem;
    padding: 0.15rem;
    box-shadow: 0 0.02rem 0.08rem 0 rgba(184,200,227,0.5);
    border-radius: 0.1rem;
    .text-info {
      flex: 1;
      .title {
        color: #222;
        font-size: 0.14rem;
        line-height: 0.18rem;
        margin-bottom: 0.08rem;
      }
      .info-item {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        font-size: 0.12rem;
        margin-bottom: 0.04rem;
        .label {
          color: #777;
        }
        .value {
          color: #98A4AF;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .safe-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 0.8rem;
      .svg-icon {
        width: 0.4rem;
        height: 0.44rem;
      }
    }
  }
  .first-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0.15rem;
    box-shadow: 0 0.02rem 0.08rem 0 rgba(184,200,227,0.5);
    border-radius: 0.1rem;
    .text {
      flex: 1;
      font-size: 0.12rem;
      color: #777;
      line-height: 0.18rem;
      text-align: center;
      margin-top: 0.15rem;
    }
    .safe-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2.02rem;
      height: 1.38rem;
      // background-image: url('../../assets/image/wap_quality_goods_icon.png');
      // background-size: cover;
      // background-repeat: no-repeat;
      // background-position: center center;
      opacity: 0;
      transform-origin: 50% 50%;
      transform: scale(2);
      transition: all .3s cubic-bezier(0.6, 0.04, 0.98, 0.335);
      .svg-icon {
        width: 2.02rem;
        height: 1.38rem;
        // width: 0.4rem;
        // height: 0.44rem;
      }
    }
    &.loaded {
      .safe-icon {
        opacity: .75;
        transform: scale(1);
      }
    }
  }
  .basic-info {
    width: 100%;
    // height: 1.92rem;
    padding: 0.06rem 0.15rem 0.15rem 0.15rem;
    box-shadow: 0 0.02rem 0.08rem 0 rgba(184,200,227,0.5);
    border-radius: 0.1rem;
    margin: 0.2rem 0 0.1rem 0;
    overflow: hidden;
    .title-wrapper {
      display: flex;
      align-items: center;
      height: 0.38rem;
      .line {
        width: 0.03rem;
        height: 0.15rem;
        border-radius: 0.02rem;
        background: linear-gradient(180deg, #FF8600 0%, #FFB17C 100%);
        margin-right: 0.1rem;
      }
      .title {
        font-size: 0.16rem;
        color: #222;
        // font-weight: 600;
      }
    }
    .basic-info-content {
      display: flex;
      align-items: center;
      .img {
        width: 1.2rem;
        height: 1.2rem;
        margin-right: 0.1rem;
        border-radius: 0.1rem;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
      }
      .text-info {
        display: flex;
        flex-direction: column;
        width: calc(100% - 1.2rem);
        .name {
          color: #777;
          font-size: 0.14rem;
          font-weight: 500;
          line-height: 0.18rem;
          margin-bottom: 0.02rem;
        }
        .info-item {
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          font-size: 0.12rem;
          width: 100%;
          line-height: 0.18rem;
          color: #98A4AF;
          margin-bottom: 0.04rem;
          &:last-child {
            margin-bottom: 0;
          }
          .label {
            text-align: right;
            white-space: nowrap;
            margin-right: 0.04rem;
          }
          .value {
            width: calc(100% - 0.6rem);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
  .recommend-container {
    width: 100%;
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 0.38rem;
      .left {
        display: flex;
        align-items: center;
        .line {
          width: 0.03rem;
          height: 0.15rem;
          border-radius: 0.02rem;
          background: linear-gradient(180deg, #FF8600 0%, #FFB17C 100%);
          margin-right: 0.1rem;
        }
        .title {
          font-size: 0.16rem;
          // font-weight: 600;
          color: #222;
        }
      }
      .right {
        display: flex;
        align-items: center;
        font-size: 0.12rem;
        color: #FF8600;
        .svg-icon {
          width: 0.07rem;
          height: 0.07rem;
        }
      }
    }
  }
}
</style>
