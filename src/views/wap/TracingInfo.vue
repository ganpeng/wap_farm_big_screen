<template>
  <div class="tracing-info-container">
    <ul class="tracing-list">
      <li v-for="(trace, index) in traceInfo" :key="index" class="tracing-item">
        <div class="header">
          <div class="left">
            <span class="index">{{getIndex(index)}}</span>
            <div class="title">{{trace.name}}</div>
          </div>
          <div class="right">{{trace.createdAt}}</div>
        </div>
        <div class="desc">{{trace.moreInfo}}</div>
        <div class="card-container">
          <div class="img-detail">
            <div :style="bgImageStyle(trace.imageUrl)" class="img"></div>
            <ul v-if="trace.detailList.length > 0" class="detail-data-list">
              <li v-for="(detail, _index) in trace.detailList" :key="_index" class="detail-data-item">
                <div class="detail-data-title">{{detail.title}}</div>
                <div class="detail-data-content">{{detail.content}}</div>
              </li>
            </ul>
            <div v-if="trace.videoUrl" class="video-container">
              <mp4-video-player :playUrl="trace.videoUrl"></mp4-video-player>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import _ from 'lodash';
import Mp4VideoPlayer from '@/components/Mp4VideoPlayer';
export default {
  name: 'TracingInfo',
  components: {Mp4VideoPlayer},
  data() {
    return {
      traceInfo: []
    };
  },
  async created() {
    try {
      let {goodsId, batchNo} = this.$route.query;
      let res = await this.$service.getBatchList({goodsId, batchNo});
      if (res && res.code === 0) {
        this.traceInfo = _.get(res.data, 'list.0.traceInfo') || [];
      }
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    getIndex() {
      return (index) => {
        let _index = index + 1;
        return _index < 10 ? `0${_index}` : _index;
      };
    },
    bgImageStyle() {
      return (url) => {
        return `background-image: url('${url}');`;
      };
    }
  }
}
</script>
<style lang="scss" scoped>
.tracing-info-container {
  min-height: 3rem;
  background-color: #fff;
  .tracing-list {
    .tracing-item {
      margin-bottom: 0.15rem;
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 0.36rem;
        .left {
          display: flex;
          align-items: center;
          .index {
            color: #FF8600;
            font-size: 0.18rem;
            font-weight: 600;
            line-height: 0.22rem;
          }
          .title {
            color: #222;
            font-size: 0.16rem;
            font-weight: 500;
            line-height: 0.22rem;
            margin-left: 0.1rem;
          }
        }
        .right {
          color: #98A4AF;
          font-size: 0.12rem;
        }
      }
      .desc {
        color: #777;
        font-size: 0.14rem;
        line-height: 0.22rem;
        margin-bottom: 0.08rem;
      }
      .card-container {
        padding: 0.15rem;
        background-color: #fff;
        border-radius: 0.1rem;
        box-shadow: 0 0.02rem 0.08rem 0 rgba(184,200,227,0.5);
        .img-detail {
          .img {
            width: 100%;
            height: 1.94rem;
            border-radius: 0.1rem;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: center center;
          }
          .detail-data-list {
            .detail-data-item {
              margin-top: 0.1rem;
              .detail-data-title {
                color: #777;
                font-size: 0.14rem;
                line-height: 0.18rem;
              }
              .detail-data-content {
                color: #98A4AF;
                font-size: 0.12rem;
                line-height: 0.18rem;
              }
              &:last-child {
                margin-bottom: 0;
              }
            }
            .detail-data-item + .detail-data-item {
              margin-top: 0.1rem;
            }
          }
        }
        .video-container {
          width: 100%;
          // height: 1.84rem;
          overflow: hidden;
          margin-top: 0.1rem;
        }
      }
    }
    .tracing-item:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
