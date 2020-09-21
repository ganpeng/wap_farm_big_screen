<template>
  <div class="layout-container">
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>
<script>
import NavBar from './NavBar';
export default {
  name: "Layout",
  components: {NavBar}
};
</script>
<style lang="scss" scoped>
.layout-container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 0.5rem;
  background-color: #16193C;
}
</style>