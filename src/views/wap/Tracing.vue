<template>
  <div class="wap-tracing-container">
    <div class="banner">
      <div class="title">
        田间到餐桌全程可追溯
      </div>
      <div class="desc">
        一物一码&nbsp;｜&nbsp;安全到家
      </div>
    </div>
    <div class="tracing-content">
      <div class="goods-img-name">
        <div class="img" :style="imgStyle"></div>
        <div class="right-info">
          <div class="top-info">
            <div class="label">您正在查询：</div>
            <div class="tracing-index-search-icon">
              <svg-icon icon-class="tracing_index_search_icon"></svg-icon>
            </div>
          </div>
          <h4 class="title ellipsis-line3">[{{goods.goodsName}}]</h4>
        </div>
      </div>
      <div class="input-code-field">
        <div class="label">
          <div class="label-title">输入溯源防伪码</div>
          <div class="label-desc">刮开标签下方图层，输入溯源防伪码</div>
        </div>
        <div class="vue-input-code-field">
          <vue-input-code
            ref="inputCode"
            span-size="0.4rem"
            type="number"
            :number="6"
            height="0.4rem"
            span-color="#333"
            input-size="0.4rem"
            :code="code"
            :get-input="getInput"
            :success="success">
          </vue-input-code>
        </div>
        <div @click="queryCodeHandler" :class="['query-btn', queryBtnDisabled && 'disabled']">查询</div>
        <div class="tips-container">
          <div class="tips-title">
            <svg-icon icon-class="wap_tips_icon"></svg-icon>
            使用小提示
          </div>
          <div class="tips-content">
            <p class="tips-item">1. 使用时请扫描商品外包装溯源二维码，并输入对应正确防伪码进行查询。</p>
            <p class="tips-item">2. 请轻刮防伪图层，避免使用尖锐物品。</p>
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
    <page-footer></page-footer>
    <prompt-dialog ref="promptDialog"></prompt-dialog>
    <loading ref="loading"></loading>
  </div>
</template>
<script>
import _ from 'lodash';
import RecommendList from './RecommendList';
import PageFooter from './PageFooter';
import PromptDialog from './PromptDialog';
import VueInputCode from './VueInputCode';
import Loading from '@/components/Loading';
export default {
  name: 'Tracing',
  components: {RecommendList, PageFooter, PromptDialog, VueInputCode, Loading},
  data() {
    return {
      //  验证码相关
      code: [],
      goods: {},
      recommendGoodsList: []
    };
  },
  async created() {
    try {
      let {goodsId} = this.$route.query;
      await this.$nextTick();
      this.$refs.loading.show();
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
          this.$refs.loading.hide();
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    queryBtnDisabled() {
      return this.code.length !== 6;
    },
    imgStyle() {
      return `background-image: url('${this.goods.thumbnail}');`;
    }
  },
  methods: {
    //  防伪码输入相关
    getInput() {},
    success() {
      this.queryCodeHandler();
    },
    async queryCodeHandler() {
      try {
        if (!this.queryBtnDisabled) {
          let {goodsId, batchNo} = this.$route.query;
          let securityNo = this.code.join('');
          this.$refs.loading.show();
          let res = await this.$service.checkTracingCode({
            goodsId, batchNo,
            securityNo
          });
          if (res && res.code === 0) {
            let {farmId} = res.data;
            this.$router.replace({ name: "TracingDetail", query: {farmId, goodsId, batchNo, securityNo} });
          } else {
            this.$refs.loading.hide();
            this.$refs.promptDialog.show();
          }
        }
      } catch (err) {
        console.log(err);
        this.$refs.loading.hide();
      }
    },
    gotoShop() {
      let {sellerId} = this.goods;
      let url = `${process.env.VUE_APP_SALE_ROOT}/shop/${sellerId}`;
      window.location.href = url;
    }
  }
};
</script>
<style lang="scss" scoped>
.wap-tracing-container {
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
  .tracing-content {
    position: relative;
    padding: 0.15rem;
    background-color: #fff;
    .goods-img-name {
      display: flex;
      // align-items: center;
      position: absolute;
      top: -0.3rem;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 0.3rem);
      padding: 0.15rem;
      border-radius: 0.1rem;
      background-color: #fff;
      box-shadow: 0 0.02rem 0.08rem 0 rgba(184,200,227,0.5);
      z-index: 10;
      .img {
        display: block;
        width: 1.3rem;
        height: 1.3rem;
        border-radius: 0.1rem;
        margin-right: 0.1rem;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
      }
      .right-info {
        flex: 1;
        .top-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.05rem;
          .label {
            font-size: 0.14rem;
            color: #777;
          }
          .tracing-index-search-icon {
            .svg-icon {
              width: 0.5rem;
              height: 0.44rem;
            }
          }
        }
        .title {
          font-size: 0.14rem;
          line-height: 0.2rem;
          color: #222;
          background-color: #fff;
          letter-spacing: 0;
          overflow: hidden;
        }
      }
    }
    .input-code-field {
      position: relative;
      background-color: #fff;
      width: 100%;
      padding-top: 1.3rem;
      padding-bottom: 0;
      .label {
        text-align: center;
        .label-title {
          font-size: 0.18rem;
          font-weight: 500;
          line-height: 0.25rem;
          color: #222;
        }
        .label-desc {
          font-size: 0.12rem;
          line-height: 0.17rem;
          font-weight: 400;
          color:#98A4AF;
        }
      }
      .vue-input-code-field {
        padding: 0.2rem 0.4rem;
      }
      .query-btn {
        width: 100%;
        height: 0.44rem;
        background: linear-gradient(180deg,rgba(61,184,255,1) 0%,rgba(39,135,245,1) 100%);
        border-radius: 0.05rem;
        font-size: 0.14rem;
        line-height: 0.44rem;
        color: #fff;
        text-align: center;
        margin-bottom: 0.15rem;
        &.disabled {
          opacity: 0.3;
        }
      }
      .tips-container {
        width: 100%;
        height: 1.12rem;
        padding: 0.15rem;
        background: #F7F8FA;
        border-radius: 0.1rem;
        .tips-title {
          display: flex;
          align-items: center;
          margin-bottom: 0.08rem;
          .svg-icon {
            width: 0.16rem;
            height: 0.16rem;
            margin-right: 0.04rem;
          }
          color: #222;
          font-size: 0.14rem;
          line-height: 0.2rem;
        }
        .tips-content {
          font-size: 0.12rem;
          color: #98A4AF;
          line-height: 0.18rem;
        }
      }
    }
    .recommend-container {
      width: 100%;
      margin-top: 0.1rem;
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

}
</style>
