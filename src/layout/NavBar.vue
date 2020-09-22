<template>
  <div class="nav-bar-container">
    <ul class="nav-list">
      <li v-for="(nav, index) in navList" :key="index"
        @click="goPage(nav)"
        :class="['nav-item', activeMenu === nav.path && 'active']">
        <div class="icon">
          <svg-icon v-if="activeMenu === nav.path" :icon-class="nav.activeIcon"></svg-icon>
          <svg-icon v-else :icon-class="nav.icon"></svg-icon>
        </div>
        <div class="title">
          {{nav.title}}
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'NavBar',
  data() {
    return {
      navList: [
        {
          title: '首页',
          name: 'Home',
          path: '/home/index',
          icon: 'new_nav_bar_home_icon',
          activeIcon: 'new_nav_bar_home_active_icon'
        },
        {
          title: '农业资产',
          name: 'FarmStock',
          path: '/farmstock/index',
          icon: 'new_nav_bar_farmstock_icon',
          activeIcon: 'new_nav_bar_farmstock_active_icon'
        },
        {
          title: '销售数据',
          name: 'Sale',
          path: '/sale/index',
          icon: 'new_nav_bar_sale_icon',
          activeIcon: 'new_nav_bar_sale_active_icon'
        }
      ]
    };
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const {meta, path} = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path
    }
  },
  methods: {
    goPage(nav) {
      if (this.$route.path !== nav.path) {
        this.$router.replace({name: nav.name});
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.nav-bar-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.7rem;
  padding: 0 0.4rem;
  background: #14284B;
  box-shadow: 0 -0.01rem 0.02rem 0 rgba(14, 15, 37, 0.1);
  z-index: 1000;
  .nav-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    // padding-top: 0.1rem;
    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      .icon {
        width: 0.2rem;
        height: 0.2rem;
        margin-bottom: 0.04rem;
        .svg-icon {
          width: 0.2rem;
          height: 0.2rem;
        }
      }
      .title {
        font-size: 0.12rem;
        font-weight: 400;
        color: #39C7DB;
        line-height: 0.14rem;
      }
      &.active {
        .title {
          color: #fff;
        }
      }
    }
  }
}
</style>
