<template>
  <div v-if="visible" class="month-select-container">
    <div class="month-select-content">
      <div class="month-select-header">
        <div @click="hide" class="cancel-btn">取消</div>
        <div class="title">选择年月</div>
        <div @click="enterHander" :class="['enter-btn', !selected && 'disabled']">确定</div>
      </div>
      <ul class="data-list">
        <li
          @click="selectHandler(data)"
          v-for="(data, index) in dataList"
          :key="index" :class="['data-item', activeIndex === index && 'active']">
          {{data}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MonthSelect',
  props: {
    select: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      visible: false,
      selected: '',
      dataList: []
    };
  },
  computed: {
    activeIndex() {
      let index = this.dataList.findIndex((item) => item === this.selected);
      return index;
    }
  },
  methods: {
    show() {
      let body = document.querySelector('body');
      body.style.overflow = 'hidden';
      this.dataList = this.$util.get12MonthNearBy();
      this.visible = true;
    },
    hide() {
      let body = document.querySelector('body');
      body.style.overflow = 'inherit';
      this.visible = false;
      this.selected = '';
    },
    selectHandler(data) {
      this.selected = data;
    },
    enterHander() {
      if (this.selected) {
        this.select(this.selected);
        this.hide();
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.month-select-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100000;
  .month-select-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3rem;
    background-color: #fff;
    padding: 0.2rem;
    overflow: hidden;
    z-index: 100000;
    .month-select-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 0.3rem;
      .cancel-btn {
        color: #98A4AF;
        font-size: 0.14rem;
      }
      .title {
        font-size: 0.16rem;
        color: #222;
      }
      .enter-btn {
        color: #497EBC;
        font-size: 0.14rem;
        &.disabled {
          color: #98A4AF;
        }
      }
    }
    .data-list {
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      margin-top: 0.8rem;
      height: calc(100% - 1.1rem);
      .data-item {
        color: #777;
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.16rem;
        text-align: center;
        &.active {
          color: #222;
          border-bottom: 1px solid #EEEEEE;
          border-top: 1px solid #EEEEEE;
        }
      }
    }
  }
}
</style>
