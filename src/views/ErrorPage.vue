<template>
  <div class="b_errorPage">
    <div class="logo">
      <a href="#/blogger">
        <img src="../assets/img/logo_blue.png" alt="">
        <span>博客</span>
        <span class="split"></span>
        <div class="text">
          <div class="first">记录你的创作</div>
          <div class="second">
            <span>积累</span>
            <span>坚持</span>
            <span>自律</span>
          </div>
        </div>
      </a>
    </div>
    <div class="body">
      <div class="picture">
        <img src="../assets/img/404.png" alt="">
      </div>
      <div class="content">
        <p>您要找的页面不存在</p>
        <p>可能是因为您的链接地址有误、该文章已经被作者删除或转为私密状态。</p>
        <p>
          <el-button type="success" round @click="backToHome">返回「博客」首页</el-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    backToHome() {
      this.$router.push('/blogger')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/errorPage.scss';
</style>
