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
                  <div class="title" @click="categoryEachChange(item)" >
                    <i v-if="!item.flag" class="el-icon-arrow-right"></i>
                    <i v-if="item.flag" class="el-icon-arrow-down"></i>
                    <span>{{ returnCategory(categoryAll, item.categoryId) }}</span>
                    <span>[{{ item.articleList.length }}]</span>
                  </div>
                  <div v-show="item.flag" class="detail">
                    <p :class="{'active': it.articleId === currentArticle}" v-for="(it, idx) in item.articleList" :key="idx" @click="articleChange(it)">{{ it.title }}</p>
                  </div>
                </div>
              </div>
              <div class="body_right">

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
        <mavonEditor
          class="md"
          :value="articleInfo.content"
          :subfield="mavonEditorOption.subfield"
          :defaultOpen="mavonEditorOption.defaultOpen"
          :toolbarsFlag="mavonEditorOption.toolbarsFlag"
          :editable="mavonEditorOption.editable"
          :scrollStyle="mavonEditorOption.scrollStyle">
        </mavonEditor>
      </div>
    </div>
  </div>
</template>

<script>
import MY from '../api/my'
import ARTICLE_DETAIL from '../api/articleDetail'
import common from '../utils/common'
import { mavonEditor } from 'mavon-editor'
export default {
  components: {
    mavonEditor
  },
  data() {
    return {
      //  当前选中的类目
      currentCategory: 1,
      //  当前选中的文章
      currentArticle: '',
      categoryList: [
        {id: 1, label: '分类', icon: 'category.png'},
        {id: 2, label: '时间', icon: 'dateTime.png'},
      ],
      //  所有文章列表
      articleList: [],
      //  文章信息按照分类
      articleList_category: [],
      //  文章信息按照时间
      articleList_dateTime: [],
      //  当前类目下所有的文章列表分类
      currentItem: [],
      //  文章信息
      articleInfo: {
        content: '',  // 文章正文
        contentLength: 0, //  文章长度
      },
      mavonEditorOption: common.mavonEditorOption()
      // mavonEditorOption: {
      //   subfield: false,// 单双栏模式
      //   defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域 
      //   editable: false,
      //   toolbarsFlag: false,
      //   scrollStyle: true
      // }
    }
  },
  mounted() {
    this.getAllArticleByUserId()
  },
  computed: {
    categoryAll() {
      return this.$store.state.home.categoryAll
    },
    // mavonEditorOption() {
    //   return common.mavonEditorOption
    // }
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
    //  根据文章id获取具体文章信息
    getArticleInfoById(id) {
      let params = {
        articleId: id
      }
      ARTICLE_DETAIL.getArticleById({params}).then(result => {
        if (result && result.code == 200) {
          this.articleInfo.content = result.data.content
          // this.articleInfo.content.contentLength = this.articleInfo.content.length
        }
      })
    },
    //  文章数据处理
    handleArticleData(data, type) {
      this.currentItem = []
      if (type === 1) { //  按照分类排序
        let categoryList = []
        data.forEach(item => {
          if (categoryList.indexOf(item.categoryId == -1)) {
            categoryList.push({categoryId: item.categoryId, flag: false, articleList: []})
          }
        })
        categoryList.forEach(item => {
          data.forEach(it => {
            if (item.categoryId === it.categoryId) {
              item.articleList.push({title: it.title, articleId: it.id})
            }
          })
        })
        if (categoryList.length) {
          this.currentItem = categoryList[0]
        }
        return categoryList
      } else {  //  按照时间排序
      }
    },
    //  返回category中文
    returnCategory(data, id) {
      return common.returnCategory(data, id)
    },
    //  切换分类获取分类下文章信息
    categoryEachChange(item) {
      item.flag = !item.flag
      this.$set(item, 'flag', item.flag)
      this.currentItem = item
    },
    //  点击文章切换
    articleChange(val) {
      this.currentArticle = val.articleId
      this.getArticleInfoById(val.articleId)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/my.scss';
</style>