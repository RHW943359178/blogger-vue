<template>
  <div class="b_header_box">
    <div class="b_header">
      <div class="b_header_left">
        <span>我的博客</span>
      </div>
      <div class="b_header_middle">
        <el-input v-model="home_search" size="small" :placeholder="placeholder" @focus="searchFocus" clearable>
          <el-button slot="append" size="mini" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="b_header_right">
        <ul>
          <!-- 用<router-link> 来代替 <li>标签实现页面顶部 tab 也路由切换 -->
          <router-link v-for="item in navigators" :key="item.id" tag="li" exact active-class="active" :to="item.url">{{ item.label }}</router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      home_search: '',
      placeholder: 'css/html',  //  用于首页搜索框展示
      navigators: [
        { id: 1, label: '首页', url: '/' },
        { id: 2, label: '文章', url: '/artical' },
        { id: 3, label: '评论', url: '/comment' },
        { id: 3, label: '我的', url: '/my' },
        { id: 4, label: '设置', url: '/set' },
      ]
    }
  },
  methods: {
    //  站内搜索出发焦点
    searchFocus() {
      this.home_search = this.placeholder
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/public/header.scss';
</style>