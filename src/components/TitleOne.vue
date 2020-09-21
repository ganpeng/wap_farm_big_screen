<template>
  <div class="title-one">
    <div class="left-decorate bg-icon1">
    </div>
    <div class="title">{{title}}</div>
    <div class="right-decorate bg-icon2">
    </div>
  </div>
</template>
<script>
export default {
  name: 'TitleOne',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.title-one {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  .left-decorate,
  .right-decorate {
    width: 0.4rem;
    height: 3px;
  }
  .title {
    font-size: 0.16rem;
    font-weight: 500;
    color: #29E3FD;
    line-height: 0.18rem;
    margin: 0 0.05rem;
  }
}
</style>

