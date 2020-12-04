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
            <div class="category_body">
              <div class="body_left">
                <div class="category_each" v-for="item in articleList_category" :key="item.categoryId">
                  <span>{{ returnCategory(categoryAll, item.categoryId) }}</span>
                  <span>[{{ item.articleList.length }}]</span>
                </div>
              </div>
              <div class="body_right"></div>
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
import MY from '../api/my'
import common from '../utils/common'
export default {
  data() {
    return {
      //  当前选中的类目
      currentCategory: 1,
      categoryList: [
        {id: 1, label: '分类', icon: 'category.png'},
        {id: 2, label: '时间', icon: 'dateTime.png'},
      ],
      //  所有文章列表
      articleList: [],
      //  文章信息按照分类
      articleList_category: [],
      //  文章信息按照时间
      articleList_dateTime: []
    }
  },
  mounted() {
    this.getAllArticleByUserId()
  },
  computed: {
    categoryAll() {
      return this.$store.state.home.categoryAll
    }
  },
  methods: {
    //  切换类目
    categoryChange(item) {
      this.currentCategory = item.id
    },
    //  获取该用户所有文章信息
    getAllArticleByUserId() {
      MY.getCategory().then(result => {
        if (result && result.code == 200) {
          this.articleList = result.data
          this.articleList_category = this.handleArticleData(result.data, 1)
          console.log(this.articleList_category, 123)
        }
      })
    },
    //  文章数据处理
    handleArticleData(data, type) {
      if (type === 1) { //  按照分类排序
        let categoryList = []
        data.forEach(item => {
          if (categoryList.indexOf(item.categoryId == -1)) {
            categoryList.push({categoryId: item.categoryId, articleList: []})
          }
        })
        categoryList.forEach(item => {
          data.forEach(it => {
            if (item.categoryId === it.categoryId) {
              item.articleList.push(it.title)
            }
          })
        })
        return categoryList
      } else {  //  按照时间排序
      }
    },
    //  返回category中文
    returnCategory(data, id) {
      return common.returnCategory(data, id)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/my.scss';
</style>