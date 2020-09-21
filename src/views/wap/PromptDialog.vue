<template>
  <div v-if="visible" class="prompt-dialog-container">
    <div class="prompt-content">
      <svg-icon icon-class="prompt_icon"></svg-icon>
      <div class="title">提示</div>
      <div class="desc">您好，您输入的溯源码错误，<br /> 请核对后重新输入。</div>
      <div @click="hide" class="enter-btn">确认</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PromptDialog',
  data() {
    return {
      visible: false
    }
  },
  methods: {
    show() {
      let body = document.querySelector('body');
      body.style.overflow = 'hidden';
      this.visible = true;
    },
    hide() {
      let body = document.querySelector('body');
      body.style.overflow = 'inherit';
      this.visible = false;
    }
  }
}
</script>
<style lang="scss" scoped>
.prompt-dialog-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  .prompt-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 3rem;
    height: 2.17rem;
    border-radius: 0.1rem;
    background-color: #fff;
    padding: 0.2rem;
    z-index: 10000;
    .svg-icon {
      width: 0.44rem;
      height: 0.38rem;
    }
    .title {
      color: #2787F5;
      font-size: 0.16rem;
      line-height: 0.22rem;
    }
    .desc {
      font-size: 0.14rem;
      font-weight: 400;
      color: #777;
      line-height: 0.22rem;
      margin: 0.15rem 0;
      text-align: center;
    }
    .enter-btn {
      width: 2.6rem;
      height: 0.4rem;
      line-height: 0.4rem;
      background-color: #2787F5;
      border-radius: 0.2rem;
      color: #fff;
      font-size: 0.14rem;
      text-align: center;
    }
  }
}
</style>

