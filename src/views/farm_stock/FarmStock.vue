<template>
  <div class="farm-stock-container">
    <farm-detail></farm-detail>
  </div>
</template>
<script>
import FarmDetail from './FarmDetail';
export default {
  name: 'FarmStock',
  components: {FarmDetail}
}
</script>
<style lang="scss" scoped>
.farm-stock-container {
  width: 100%;
  padding: 0.2rem 0.15rem;
}
</style>
