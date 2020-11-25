<template>
  <div class="b_article_detail">
    <div class="detail_box">
      <div class="article">
        <div class="title">{{ articleInfo.title }}</div>
        <div class="introduce">
          <div class="icon">
            <img src="../assets/img/user_avatar.jpg"  alt="">
          </div>
          <div class="info">
            <div class="name">RHW</div>
            <div class="write_info">
              <span>2020.11.25 15:16:36</span>
              <span>字数 {{ contentLength }}</span>
              <span>阅读 {{ articleInfo.viewCout }}</span>
              <span>评论 {{ articleInfo.commentCout }}</span>
              <span v-show="articleInfo.updateTime">上次更新 {{ articleInfo.updateTime }}</span>
            </div>
          </div>
        </div>
        <!-- <div class="content" id="articleInfo_content" v-highlight v-html="articleInfo.content"></div> -->
      <mavonEditor
      class="md"
     :value="articleInfo.content"
     :subfield="mavonEditorOption.subfield"
     :defaultOpen="mavonEditorOption.defaultOpen"
     :toolbarsFlag="mavonEditorOption.toolbarsFlag"
     :editable="mavonEditorOption.editable"
     :scrollStyle="mavonEditorOption.scrollStyle"
  ></mavonEditor>
      </div>
      <div class="recommend"></div>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import ARTICLE_DETAIL from '../api/articleDetail'
import marked from 'marked'
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/monokai-sublime.css";
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code1) {
    return hljs.highlightAuto(code1).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
})

export default {
    components: {
    mavonEditor
  },
  name: "Markdown",
  props: {
    data: {
      type: String,
      default: "",
    },
    lang: {
      type: String,
      default: "js",
    },
    isMd: {
      //是否已经是md格式
      type: Boolean,
      default: false,
    },
  },
  computed: {
    prop () {
      return {
        subfield: false,// 单双栏模式
        defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域 
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
      }
      // return data
    }
  },
  data() {
    return {
      articleInfo: '',
      contentLength: 0,
      mavonEditorOption: {
        subfield: false,// 单双栏模式
        defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域 
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
      }
    }
  },
  mounted() {
    this.getArticleInfo()
  },
  computed: {
    articleId() {
      return this.$store.state.home.articleId
    }
  },
  methods: {
    //  获取文章具体信息
    getArticleInfo() {
      let params = {
        articleId: this.articleId
      }
      ARTICLE_DETAIL.getArticleById({params}).then(result => {
        if (result && result.code == 200) {
          this.articleInfo = result.data
          //  使用marked插件将markdown语法渲染成html语法
          // this.articleInfo.content = marked(this.articleInfo.content)
          this.articleInfo.content = this.articleInfo.content
          this.contentLength = this.articleInfo.content.length
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/articleDetail.scss';
</style>