<template>
  <div class="b_home">
    <div class="b_home_body">
      <div class="b_content_box" id="b_content_box">
        <div class="article_box" v-for="item in articleList" :key="item.id" @click="getArticleDetail(item)">
          <div class="article_title">{{ item.title }}</div>
          <div class="article_summary">{{ item.summary }}</div>
          <div class="article_footer">
            <div class="category">
              <div v-show="item.categoryId">
                <i class="el-icon-paperclip"></i>
                <span>{{ returnCategory(item.categoryId, 1) }}</span>
              </div>
              <div v-show="item.subjectId">
                <i class="el-icon-collection-tag"></i>
                <span>{{ returnCategory(item.subjectId, 2) }}</span>
              </div>
            </div>
            <div class="time">
              <i class="el-icon-time"></i>
              <!-- <span>{{ item.createTime }}</span> -->
              <span>{{ dateReturn(item.createTime) }}</span>
            </div>
            <div class=view_count>
              <i class="el-icon-view"></i>
              <span>浏览({{ item.viewCount }})</span>
            </div>
            <div class="comment_view">
              <i class="el-icon-chat-dot-round"></i>
              <span>评论({{ item.commentCount }})</span>
            </div>
          </div>
        </div>
        <div class="pagination">
          <el-pagination
            small
            background
            layout="prev, pager, next, total"
            :total="total"
            @current-change="currentChange"
            @size-change="sizeChange">
          </el-pagination>
        </div>
      </div>
      <div>

      </div>
      <div class="b_home_wall">
        <div class="b_home_bg">
          <img src="../assets/img/banner.png" alt="">
          <img src="../assets/img/avatar.jpg" width="100" alt="">
        </div>
        <div class="introduce">
          <div class="title">RHW</div>
          <div class="title_sub">Web前端、Golang工程师</div>
          <div class="content">
            <!-- 一个80后草根站长！一直潜心研究Web前端技术，一边工作一边积累经验，分享一些个人博客模板 -->
          </div>
        </div>
        <div class="split_line"></div>
        <div class="category">
          <div class="title">专题列表</div>
          <div class="category_tag">
            <div class="category_tag_body">
              <el-button type="primary" plain size="mini" circle class="el-icon-close" @click="subjectChange(0)"></el-button>
              <span :class="['subjectTag', {'activeSubject': currentSubject == item.subjectId}]" :id="'subjectId' + item.subjectId" v-for="item in subjects" :key="item.subjectId" @click="subjectChange(item, 'subjectId' + item.subjectId)">{{ item.subjectName }}</span>
            </div>
          </div>
          <div class="category_tag_body"></div>
        </div>
        <div class="category">
          <div class="title">分类列表</div>
          <div class="category_tag">
            <div class="category_tag_title">
              <div class="split_line"></div>
              <div class="content">当前分类</div>
            </div>
            <div class="category_tag_body">
              <el-tag v-if="!categoryTags.length" size="mini" effect="plain">全部</el-tag>
              <el-tag v-else v-for="(tag, index) in categoryTags" :key="tag.categoryId" size="samll" effect="plain" @close="tagClose(tag, index)" closable> {{tag.categoryName}}</el-tag>
            </div>
          </div>
          <div class="category_box">
            <div class="category_each" @click="handleCategoryChange(0)" style="background: #ccc">全部</div>
            <div class="category_each" @click="handleCategoryChange(item)" v-for="item in categoryAll" :key="item.categoryId" :style="returnColor(item.color)">{{ item.categoryName }}</div>
          </div>
        </div>
        <div class="recommend">
          <Recommend :title="'推荐阅读'" :buttonFlag="false" :recommandArticle="recommandArticle" />
        </div>
      </div>
    </div>
    <BackToTop :domId="'.b_home'" :offset="40" />
  </div>
</template>

<script>
import HOME from '../api/home'
import common from '../utils/common'
import Recommend from '../components/public/Recommend'
import BackToTop from '../components/public/BackToTop'
export default {
  components: {
    Recommend,
    BackToTop
  },
  data () {
    return {
      //  分类云列表
      categoryList: [],
      //  选中分类云的集合
      categoryTags: [],
      pagination: { //  首页文章翻页
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      //
      detailType: 1,
      //  推荐文章列表
      recommandArticle: [],
      //  所有专题列表
      subjects: [],
      //  当前选中的专题
      currentSubject: 0,
      //  响应 loading，文章列表及 button
      loading: false,
      options: {
        target: ''
      }
    }
  },
  mounted () {
    this.handleGetAllCategory()
    this.handleGetArticleList()
    this.getRecommendArticle()
    this.getAllSubjects()
  },
  computed: {
    condition () { //  当前过滤条件
      return this.$store.state.home.home_search
    },
    categoryIdList () { //  当前选中分类
      return this.$store.state.home.categoryIdList
    },
    articleList () {
      return this.$store.state.home.articleList
    },
    categoryAll () {
      return this.$store.state.home.categoryAll
    },
    total () {
      return this.$store.state.home.total
    }
    // //  返回loading实例
    // loading() {
    //   // let target = document.querySelector(id)
    //   return this.$loading({
    //     // target: target,
    //     lock: true,
    //     text: 'Loading',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.7)'
    //   })
    // }
  },
  watch: {
    categoryTags: function () { //  监听分类 id 的属性变化
      const tmp = []
      this.categoryTags.forEach(item => {
        tmp.push(item.categoryId)
      })
      this.$store.commit('updateCategoryIdList', tmp)
      this.handleGetArticleList()
    }
  },
  methods: {
    //  返回分类云背景颜色
    returnColor (cl) {
      //  如果没有color值，就默认指定
      if (!cl) {
        return 'background: #FF6347;'
      }
      return `background: ${cl};`
    },
    //  获取所有分类
    handleGetAllCategory () {
      HOME.handleGetAllCategory().then(result => {
        if (result && result.code == 200) {
          // this.categoryList = result.data
          this.$store.commit('updateCategoryAll', result.data)
        }
      })
    },
    //  点击分类云获取文章列表
    handleCategoryChange (item) {
      //  选择多个分类加到 tag 列表里，实现复合查询
      if (item === 0) { //  当标签为全部时清空数据
        this.categoryTags = []
        return
      }
      if (this.categoryTags.indexOf(item) === -1 && item.categoryId !== 0) {
        //  分类与专题互斥
        this.currentSubject = 0
        this.categoryTags.push(item)
      }
    },
    //  关闭分类 tag 标签
    tagClose (tag, index) {
      this.categoryTags.splice(index, 1)
    },
    //  获取文章列表
    handleGetArticleList () {
      const arr = this.categoryIdList.join()
      const params = {
        condition: this.condition,
        categoryId: arr,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize,
        subjectId: this.currentSubject
      }
      const loading = common.loading(this.$loading, '#b_content_box')
      HOME.handleGetAllArticle({ params }).then(result => {
        if (result && result.code == 200) {
          this.pagination.total = result.data.count
          this.$store.commit('updateArticleList', result.data.list)
          this.$store.commit('updateTotal', result.data.count)
        }
        loading.close()
      })
    },
    //  pageNum改变
    currentChange (num) {
      this.pagination.pageNum = num
      this.$store.commit('updatePageNum', num)
      this.handleGetArticleList()
    },
    //  pageSize改变
    sizeChange (size) {
      this.pagination.pageSize = size
      this.$store.commit('updatePageSize', size)
      this.handleGetArticleList()
    },
    //  返回分类中文
    returnCategory (id, val) {
      let array, idName, name
      if (val === 1) {
        array = this.categoryAll
        idName = 'categoryId'
        name = 'categoryName'
      } else {
        array = this.subjects
        idName = 'subjectId'
        name = 'subjectName'
      }
      if (id) {
        const arr = array.filter(item => {
          return item[idName] == id
        })
        if (arr.length) {
          return arr[0][name]
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    //  时间处理
    dateReturn (time) {
      if (time) {
        return common.timeToDate(time)
      }
    },
    //  跳转进入具体文章信息
    getArticleDetail (item) {
      const detail = this.$router.resolve({
        path: '/blogger/article',
        query: { id: item.id }
      })
      window.open(detail.href, '_blank')
      this.$store.commit('updateArticleId', item.id)
    },
    //  获取推荐内容列表
    getRecommendArticle () {
      const params = {
        pageNum: 1,
        pageSize: 5
      }
      HOME.getRecommendArticle({ params }).then(result => {
        if (result && result.code == 200) {
          this.recommandArticle = result.data
        }
      })
    },
    //  获取所有专题列表
    getAllSubjects () {
      HOME.getAllSubjects({}).then(result => {
        if (result && result.code == 200) {
          this.subjects = result.data
        }
      })
    },
    //  点击专题列表切换
    subjectChange (item) {
      if (item === 0) {
        this.currentSubject = item
        //  清空 categoryTags 列表时在 watch 那里已经调用了 handleGetArticleList()
        this.handleGetArticleList()
      } else {
        this.currentSubject = item.subjectId
        //  专题与分类互斥
        this.categoryTags = []
      }
      this.$store.commit('updateSubjectId', this.currentSubject)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/home.scss';
</style>
