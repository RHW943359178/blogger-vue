<template>
  <div class="b_my">
    <div class="b_my_body">
      <div class="b_left">
        <div class="header">
          <div class="username">RHW</div>
          <div class="user_avatar">
            <img src="../assets/img/user_avatar.jpg" alt="">
          </div>
        </div>
        <div class="body">
          <!-- 用于作为背景 -->
          <div class="bg_bar row top"></div>
          <div class="bg_bar column right"></div>
          <div class="bg_bar row bottom"></div>
          <div class="bg_bar column left"></div>
          <div class="condition_box">
            <div class="category_list">
              <div :class="['category', {'category_active': currentCategory == item.id}]" v-for="item in categoryList" :key="item.id" @click="categoryChange(item)">
                <img :src="require('../assets/img/' + item.icon)" alt="">
                <span>{{ item.label }}</span>
              </div>
            </div>
          </div>
          <div class="motto">
            <div>积累</div>
            <div class="split"></div>
            <div>坚持</div>
            <div class="split"></div>
            <div>自律</div>
          </div>
        </div>
        <div class="footer">
          <a href="https://github.com/RHW943359178/" target="blank">
              <el-tooltip class="item" effect="dark" content="跳转至github" placement="right">
                <img src="../assets/img/gihub.jpg" alt="">
              </el-tooltip>
          </a>
        </div>
      </div>
      <div class="b_right">

      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      //  当前选中的类目
      currentCategory: 1,
      categoryList: [
        {id: 1, label: '技术', icon: 'code.png'},
        {id: 2, label: '生活', icon: 'life.png'},
        {id: 3, label: '其他', icon: 'other.png'},
      ]
    }
  },
  methods: {
    //  切换类目
    categoryChange(item) {
      this.currentCategory = item.id
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/my.scss';
</style>