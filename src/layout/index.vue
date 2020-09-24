<template>
  <div class="layout-container">
    <nav-bar></nav-bar>
    <div ref="scrollWrapper" class="scroll-wrapper">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "./NavBar";
export default {
  name: "Layout",
  components: { NavBar },
  beforeRouteEnter(to, from, next) {
    if (to.name !== from.name) {
      next((vm) => {
        vm.$refs.scrollWrapper.scrollTop = 0;
      });
    }
    next();
  }
};
</script>
<style lang="scss" scoped>
.layout-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #16193c;
  .scroll-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0.7rem;
    width: 100%;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .content {
      width: 100%;
      padding: 0.2rem 0.15rem;
      min-height: calc(100% + 1px);
    }
  }
}
</style>