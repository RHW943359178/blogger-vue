<template>
  <div class="b_header_box">
    <div class="b_header">
      <el-carousel height="100%" ref="carousel_header" direction="vertical" :indicator-position="'none'" :autoplay="false">
        <el-carousel-item name="normal_header">
          <div class="b_header_normal" v-if="!scrollFlag">
            <div class="b_header_left" @click="bancToHome">
              <img src="../../assets/img/logo_blue.png" alt="">
              <span>博客</span>
            </div>
            <div class="b_header_middle">
              <el-input v-show="$route.path === '/blogger'" v-model="home_search" size="small" :placeholder="placeholder" @focus="searchFocus" clearable>
                <el-button slot="append" size="mini" icon="el-icon-search" @click="searchArticles"></el-button>
              </el-input>
            </div>
            <div class="b_header_right">
              <div class="isLogin" v-if="isLogin()">
                <el-avatar :size="50" :src="iconImg" @error="errorHandler">
                  <img :src="iconImg"/>
                </el-avatar>
                <span>{{ loginUser() }}</span>
                <el-button type="text" @click="quitLogin">退出</el-button>
              </div>
              <div class="sign" v-else>
                <el-button type="text" @click="jumpToSignIn">注册</el-button>
                <el-button type="text" @click="jumpToSignUp">登录</el-button>
              </div>
              <ul>
                <!-- 用<router-link> 来代替 <li>标签实现页面顶部 tab 也路由切换 -->
                <router-link v-for="(item, index) in navigators" :key="index" tag="li" exact active-class="active" :to="item.url">{{ item.label }}</router-link>
              </ul>
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item name="article_header">
          <ArticleHeader v-if="scrollFlag" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import HOME from '../../api/home'
import ArticleHeader from './ArticleHeader'
export default {
  components: {
    ArticleHeader
  },
  data () {
    return {
      home_search: '',
      placeholder: 'css', //  用于首页搜索框展示
      activeRouter: 1,
      navigators: [
        { id: 1, label: '首页', url: '/blogger' },
        { id: 2, label: '投稿', url: '/blogger/articleEditor' },
        { id: 3, label: '评论', url: '/blogger/comment' },
        { id: 3, label: '我的', url: '/blogger/my' },
        { id: 4, label: '设置', url: '/blogger/setting' }
      ],
      // localAttr: '',
      iconImg: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  mounted () {
  },
  computed: {
    categoryIdList () { //  当前选中分类
      return this.$store.state.home.categoryIdList
    },
    articleList () { //  文章列表
      return this.$store.state.home.articleList
    },
    pageNum () { //  页码数
      return this.$store.state.home.pageNum
    },
    pageSize () { //  页码范围
      return this.$store.state.home.pageSize
    },
    subjectId () {
      return this.$store.state.home.subjectId
    },
    scrollFlag () { //  滚动参数
      return this.$store.state.articleDetail.scrollFlag
    }
  },
  watch: {
    home_search: function () {
      this.$store.commit('updateSearchCondition', this.home_search)
    },
    scrollFlag: function () {
      if (this.scrollFlag) {
        this.$refs.carousel_header.setActiveItem('article_header')
      } else {
        this.$refs.carousel_header.setActiveItem('normal_header')
      }
    }
  },
  methods: {
    //  点击回到主页
    bancToHome () {
      this.$router.push('/blogger')
    },
    //  当前选中路由切换
    activeChange (item) {
      this.activeRouter = item.id
    },
    //  站内搜索出发焦点
    searchFocus () {
      this.home_search = this.placeholder
    },
    //  站内搜索所有文章
    searchArticles () {
      const arr = this.categoryIdList.join()
      const params = {
        condition: this.home_search,
        categoryId: arr,
        subjectId: this.subjectId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      HOME.handleGetAllArticle({ params }).then(result => {
        if (result && result.code == 200) {
          this.$store.commit('updateArticleList', result.data.list)
          this.$store.commit('updateTotal', result.data.count)
        }
      })
    },
    //  跳转到注册页面
    jumpToSignIn () {
      this.$router.push('/blogger/signIn')
    },
    //  跳转到登录页面
    jumpToSignUp () {
      this.$router.push('/blogger/signUp')
    },
    //  判断当前用户登录状态的条件
    isLogin () {
      return localStorage.getItem('flag') === 'isLogin' && localStorage.getItem('username')
    },
    //  当前登录人信息
    loginUser () {
      return localStorage.getItem('username')
    },
    errorHandler () {
      return true
    },
    //  退出登录
    quitLogin () {
      this.$confirm('确定退出当前登录吗？', '确定', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('flag')
        localStorage.removeItem('username')
        localStorage.removeItem('userId')
        //  刷新当前页面
        location.reload()
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/public/header.scss';
</style>
