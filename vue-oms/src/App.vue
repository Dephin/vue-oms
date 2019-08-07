<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="less">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  @import './assets/css/themeStyle.less';
  @import './assets/css/common.less';
  @import './assets/css/reset.less';
  @import './assets/css/icon.less'; //icon
  @import './assets/css/tabsStyle.less';
  @import './assets/css/buttonStyle.less';
  @import './assets/css/tableStyle.less';
  @import './assets/css/style.css';
  @import './assets/css/detailStyle.less';
  @import './assets/css/settingStyle.less'; //个人设置
  @import './assets/css/dialogStyle.less'; //弹窗样式
  @import './assets/css/userStyle.less'; //登录 注册 找回密码
  @import './assets/css/elementReset';
  @import './assets/css/news.less'; //消息通知
</style>
