<template>
  <div v-if="visible" class="video-player-dialog-container border-icon16">
    <video id="dialog-video-player" ref="videoPlayer" class="video-js"></video>
    <span @click="hide" class="video-player-close-btn">
      <svg-icon icon-class="video_dialog_close_btn"></svg-icon>
    </span>
    <span class="title">
      {{title}}
      <i v-if="status === 'ONLINE'" class="on">(<span>在线</span>)</i>
      <i v-if="status === 'OFFLINE'" class="off">(<span>离线</span>)</i>
    </span>
  </div>
</template>
<script>
import videojs from "video.js";
import "video.js/dist/alt/video-js-cdn.min.css";
export default {
  name: "VideoPlayerDialog",
  data() {
    return {
      visible: false,
      player: null,
      playUrl: '',
      title: '',
      status: ''
    };
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  methods: {
    async init() {
      try {
        await this.$nextTick();
        let options = {
          autoplay: true,
          controls: true,
          liveui: true,
          fluid: true,
          sources: [
            {
              src: this.playUrl,
              type: "application/x-mpegURL"
            }
          ]
        };
        this.player = videojs(this.$refs.videoPlayer, options, () => {
          console.log("onPlayerReady", this);
        });
      } catch (err) {
        console.log(err);
      }
    },
    show(playUrl, title, status) {
      this.visible = true;
      this.title = title;
      this.status = status;
      this.playUrl = playUrl;
      this.init();
    },
    hide() {
      this.visible = false;
      this.player = null;
      this.title = '';
      this.status = '';
      this.playUrl = '';
    }
  }
};
</script>
<style lang="scss" scoped>
.video-player-dialog-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40.1098%;
  height: 52.6089%;
  padding: 2.8% 2% 0.8% 2%;
  z-index: 9;
  .video-player-close-btn {
    position: absolute;
    top: 0;
    right: 0.22rem;
    cursor: pointer;
    .svg-icon {
      width: 0.3rem;
      height: 0.3rem;
    }
  }
  .title {
    position: absolute;
    top: 2%;
    left: 15%;
    width: 70%;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    color: #70CAEE;
    font-size: 0.24rem;
    i {
      color: #fff;
      font-size: 0.14rem;
      &.on {
        span {
          color: #7ED321;
        }
      }
      &.off {
        span {
          color: #F35151;
        }
      }
    }
  }
}
</style>
