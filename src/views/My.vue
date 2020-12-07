<template>
  <div class="b_my">
    <div class="b_my_body">
      <div class="b_left" v-show="!editFlag">
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
        <div class="articleInfo" v-show="!editFlag">
          <div class="write_info">
            <span>
              <i class="el-icon-time"></i>
              {{ articleInfo.createTime }}
            </span>
            <span>
              <i class="el-icon-tickets"></i>
              字数 {{ articleInfo.contentLength }}
              </span>
            <span>
              <i class="el-icon-view"></i>
              阅读 {{ articleInfo.viewCount }}
            </span>
            <span>
              <i class="el-icon-chat-dot-round"></i>
              评论 {{ articleInfo.commentCount }}
            </span>
            <span v-show="articleInfo.updateTime">
              <i class="el-icon-time"></i>
              上次更新 {{ articleInfo.updateTime }}
            </span>
          </div>
        </div>
        <mavonEditor
          style="height: 100%"
          v-model="articleInfo.content"
          :subfield="mavonEditorOption.subfield"
          :defaultOpen="mavonEditorOption.defaultOpen"
          :toolbarsFlag="mavonEditorOption.toolbarsFlag"
          :editable="mavonEditorOption.editable"
          :scrollStyle="mavonEditorOption.scrollStyle">
        </mavonEditor>
      </div>
      <div class="edit_Container">
        <div v-show="!editFlag">
          <el-tooltip effect="dark" content="编辑文章" placement="right">
            <el-button type="primary" icon="el-icon-edit" plain circle @click="editStatusChange(0)"></el-button>
          </el-tooltip>
        </div>
        <div v-show="editFlag">
          <el-tooltip effect="dark" content="退出编辑" placement="right">
            <el-button type="primary" icon="el-icon-edit-outline" plain circle @click="editStatusChange(1)"></el-button>
          </el-tooltip>
        </div>
        <div v-show="editFlag">
          <el-tooltip effect="dark" content="文章保存" placement="right">
            <el-button type="primary" icon="el-icon-finished" plain circle @click="articleSave(1)"></el-button>
          </el-tooltip>
        </div>
      </div>
    </div>
    <!-- 提交保存的内容dialog框 -->
     <!-- @open="dialogOpen" @close="dialogClose" -->
    <el-dialog :visible="dialog.visible" width="400px" title="投稿内容保存" append-to-body @close="dialogClose">
      <el-form label-width="80px" label-position="80px" size="small" :model="dialog.form" :rules="rules" ref="ruleForm">
        <el-form-item label="文章标题" required prop="title">
          <el-input v-model="dialog.form.title" placeholder="请输入文章标题" clearable style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="文章梗概">
          <el-input v-model="dialog.form.summary" placeholder="请输入文章梗概" clearable style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="是否公开" required>
          <el-select v-model="dialog.form.openFlag" style="width: 200px">
            <el-option v-for="item in openFlags" :key="item.key" :value="item.key" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属分类" required prop="category">
          <el-select v-model="dialog.form.category" style="width: 200px">
            <el-option v-show="item.catagoryId != 1" v-for="item in categoryAll" :key="item.categoryId" :value="item.categoryId" :label="item.categoryName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" size="mini" @click="submitContent('ruleForm')">保存</el-button>
        <el-button type="info" size="mini" @click="dialog.visible = false">关闭</el-button>
      </div>
    </el-dialog>
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
      openFlags: [
        {key: 1, text: '公开'},
        {key: 2, text: '不公开'},
      ],
      articleInfo: {
        // content: '',  // 文章正文
        // contentLength: 0, //  文章长度
      },
      editFlag: false,  //  是否为编辑模式
      mavonEditorOption: common.mavonEditorOption(),
      //  dialog框显示内容
      dialog: {
        visible: false,
        form: {
          title: '',
          summary: '',
          category: '',
          openFlag: 1
        }
      },
      //  表单验证规则
      rules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur'},
          { max: 50, message: '长度不能超过50个字符', trigger: 'blur'},
        ],
        category: [
          { required: true, message: '请选择文章所属分类', trigger: 'change'},
        ],
      }
    }
  },
  mounted() {
    this.getAllArticleByUserId()
  },
  watch: {
    editFlag: function(val) {
      if (val) {
        this.mavonEditorOption = {
          subfield: true,// 单双栏模式
          defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域 
          editable: true,
          toolbarsFlag: true,
          scrollStyle: true
        }
      } else {
        this.mavonEditorOption = {
          subfield: false,// 单双栏模式
          defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域 
          editable: false,
          toolbarsFlag: false,
          scrollStyle: true
        }
      }
    }
  },
  computed: {
    categoryAll() {
      return this.$store.state.home.categoryAll
    },
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
          //  默认打开第一个类目的，第一篇文章
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
          this.articleInfo = result.data
          this.articleInfo.contentLength = this.articleInfo.content.length
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
      console.log(val, 'val')
      this.currentArticle = val.articleId
      this.getArticleInfoById(val.articleId)
    },
    //  切换编辑状态
    editStatusChange(val) {
      if (val === 0) {
        this.editFlag = true
      } else {
        this.editFlag = false
      }
    },
    //  文章保存
    articleSave() {
      console.log(this.articleInfo, 123)
      this.dialog.visible = true
      this.dialog.form = {
        title: this.articleInfo.title,
        summary: this.articleInfo.summary,
        category: this.articleInfo.categoryId,
        openFlag: this.articleInfo.openFlag
      }
    },
    //  dialog框关闭
    dialogClose() {
      this.$refs['ruleForm'].resetFields()
      this.dialog.form = {
        title: '',
        summary: '',
        category: '',
        openFlag: 1
      }
    },
    //  表格校验
    submitContent(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          this.save()
        } else {
          return false
        }
      })
    },
    //  像数据库保存文章信息
    save() {
      let params = {
        id: this.currentArticle,
        content: this.articleInfo.content,
        summary: this.dialog.form.summary,
        categoryId: this.dialog.form.category,
        title: this.dialog.form.title,
        openFlag: this.dialog.form.openFlag,
      }
      console.log(this.articleInfo.content, 'this.articleInfo.content')
      if (!this.articleInfo.content) {
        this.$message({type: 'warning', message: '文章内容不可为空'})
        return
      }
      MY.updateArticleInfo(params).then(result => {
        if (result && result.code == 200) {
          this.$message({type: 'success', message: result.message})
          this.getArticleInfoById(this.currentArticle)
          //  修改编辑状态为 false
          this.editFlag = false
          this.dialog.visible = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/my.scss';
</style>