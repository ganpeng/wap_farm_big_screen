<template>
  <div class="footer">
    <div class="footer-content">
      <div class="left">
        <div class="logo"></div>
        <div class="go-shop-btn">扫一扫，进入平台选购 >></div>
      </div>
      <div class="q-code">
        <img src="../../assets/image/wap_shop_qrcode_icon.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PageFooter'
}
</script>
<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 1.42rem;
  background-color: #33A3FA;
  .footer-content {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 0.9rem;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 0.9rem;
      .logo {
        width: 2.19rem;
        height: 0.57rem;
        background-image: url('../../assets/image/wap_logo.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
      }
      .go-shop-btn {
        font-size: 0.12rem;
        font-weight: 400;
        line-height: 0.17rem;
        color: #fff;
        text-align: right;
      }
    }
    .q-code {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 0.7rem;
      height: 0.7rem;
      margin-left: 0.15rem;
      background-color: #fff;
      img {
        width: 0.6rem;
        height: 0.6rem;
      }
    }
  }
}
</style>

