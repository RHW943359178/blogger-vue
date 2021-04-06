<template>
  <div class="b_my">
    <div class="b_my_body">
      <div class="b_left" v-show="!editFlag">
        <div class="header">
          <!-- <div class="username">RHW</div> -->
          <div class="user_avatar">
            <!-- <img src="../assets/img/user_avatar.jpg" alt=""> -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              name="icon"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="authorInfo">
            <div class="info_box">
              <div>8</div>
              <div>关注</div>
            </div>
            <div class="info_box">
              <div>7</div>
              <div>粉丝</div>
            </div>
            <div class="info_box">
              <div>{{ userArticle.fontCount }}</div>
              <div>文章</div>
            </div>
            <div class="info_box">
              <div>{{ userArticle.articleCount }}</div>
              <div>字数</div>
            </div>
            <div class="info_box">
              <div>8</div>
              <div>收获喜欢</div>
            </div>
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
                <el-collapse >
                  <el-collapse-item
                    v-for="(item, index) in articleList_common"
                    :key="index"
                    :title="item.showName + ' ' + '[' +  item.articleList.length + ']'"
                    :name="item.index">
                    <div class="detail">
                      <p :class="{'active': it.articleId === currentArticle}" v-for="(it, idx) in item.articleList" :key="idx" @click="articleChange(it)">{{ it.title }}</p>
                    </div>
                  </el-collapse-item>
                </el-collapse>
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
            <div class="time">
              <div>
                <i class="el-icon-time"></i>
                创建时间 {{ dateReturn(articleInfo.createTime) }}
              </div>
              <div>
                <i class="el-icon-time"></i>
                上次更新 {{ dateReturn(articleInfo.updateTime) }}
              </div>
            </div>
            <div>
              <i class="el-icon-tickets"></i>
              字数 {{ articleInfo.contentLength }}
            </div>
            <div>
              <i class="el-icon-view"></i>
              阅读 {{ articleInfo.viewCount }}
            </div>
            <div>
              <i class="el-icon-chat-dot-round"></i>
              评论 {{ articleInfo.commentCount }}
            </div>
          </div>
        </div>
        <mavonEditor
          :class="['mavonEditor', {'mavonEditor_edit': editFlag}]"
          v-model="articleInfo.content"
          @imgAdd="imgAdd"
          @imgDel="imgDel"
          ref="md_detail"
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
            <el-button type="primary" icon="el-icon-finished" plain circle @click="articleSave()"></el-button>
          </el-tooltip>
        </div>
        <div>
          <el-tooltip effect="dark" content="文章删除" placement="right">
            <el-button type="primary" icon="el-icon-delete" plain circle @click="articleDelete()"></el-button>
          </el-tooltip>
        </div>
      </div>
    </div>
    <!-- 提交保存的内容dialog框 -->
    <ArticleSaveBox :dialog="dialog" :flag="2" />
  </div>
</template>

<script>
import MY from '../api/my'
import ARTICLE_DETAIL from '../api/articleDetail'
import ArticleSaveBox from '../components/public/ArticleSaveBox'
import common from '../utils/common'
import { mavonEditor } from 'mavon-editor'
import HOME from '../api/home'
export default {
  components: {
    mavonEditor,
    ArticleSaveBox
  },
  data () {
    return {
      //  当前选中的类目
      currentCategory: 1,
      //  当前选中的文章
      currentArticle: '',
      categoryList: [
        { id: 1, label: '分类', icon: 'category.png' },
        { id: 2, label: '时间', icon: 'dateTime.png' },
        { id: 3, label: '专题', icon: 'zhuanti.png' }
      ],
      //  所有文章列表
      articleList: [],
      //  当前显示的文章列表
      articleList_common: [],
      //  文章信息按照分类
      articleList_category: [],
      //  文章信息按照时间
      articleList_dateTime: [],
      //  文章信息按照专题来分类
      articleList_subject: [],
      //  当前类目下所有的文章列表分类
      currentItem: [],
      //  分类列表
      categories: [],
      //  主题列表
      subjects: [],
      //  文章信息
      openFlags: [
        { key: 1, text: '公开' },
        { key: 2, text: '不公开' }
      ],
      //  头像地址
      imageUrl: '',
      articleInfo: {
        // content: '',  // 文章正文
        // contentLength: 0, //  文章长度
      },
      editFlag: false, //  是否为编辑模式
      mavonEditorOption: common.mavonEditorOption(),
      //  dialog框显示内容
      dialog: {
        visible: false,
        form: {
          title: '',
          summary: '',
          category: '',
          openFlag: 1,
          radio: 0,
          subject: ''
        }
      }
      //  表单验证规则
      // rules: {
      //   title: [
      //     { required: true, message: '请输入活动名称', trigger: 'blur'},
      //     { max: 50, message: '长度不能超过50个字符', trigger: 'blur'},
      //   ],
      //   category: [
      //     { required: true, message: '请选择文章所属分类', trigger: 'change'},
      //   ],
      // }
    }
  },
  mounted () {
    if (localStorage.getItem('userIcon')) {
      this.imageUrl = '/static/' + localStorage.getItem('userIcon')
    }
    this.handleGetAllCategory()
    this.getAllSubjects()
  },
  watch: {
    editFlag: function (val) {
      if (val) {
        this.mavonEditorOption = {
          subfield: true, // 单双栏模式
          defaultOpen: 'preview', // edit： 默认展示编辑区域 ， preview： 默认展示预览区域
          editable: true,
          toolbarsFlag: true,
          scrollStyle: true
        }
      } else {
        this.mavonEditorOption = {
          subfield: false, // 单双栏模式
          defaultOpen: 'preview', // edit： 默认展示编辑区域 ， preview： 默认展示预览区域
          editable: false,
          toolbarsFlag: false,
          scrollStyle: true
        }
      }
    },
    //  通过 watch 检测内容变化并写进 localStorage
    editorContent: function (val) {
      localStorage.setItem('bloggerContent', val)
    }
  },
  computed: {
    //  用户的文章信息（文章篇数和总字数）
    userArticle () {
      return this.$store.state.user.userArticle
    },
    uploadUrl () {
      return 'http://localhost:8080/blogger/user/icon/upload'
    },
    editorContent () {
      return this.articleInfo.content
    }
  },
  methods: {
    //  切换分类、时间和专题
    articleTypeChange () {
    },
    // 获取全部分类列表
    handleGetAllCategory () {
      HOME.handleGetAllCategory().then(result => {
        if (result && result.code == 200) {
          this.categories = result.data
        }
      }).then(() => {
        this.getAllArticleByUserId()
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
    //  切换类目
    categoryChange (item) {
      this.currentCategory = item.id
      this.articleList_common = this.handleArticleData(this.articleList, item.id)
    },
    //  获取该用户所有文章信息
    getAllArticleByUserId () {
      MY.getArticleList().then(result => {
        if (result && result.code == 200) {
          this.articleList = result.data
          //  按照分类id显示
          this.articleList_common = this.handleArticleData(result.data, 1)
        }
      })
    },
    //  根据文章id获取具体文章信息
    getArticleInfoById (id) {
      const params = {
        articleId: id
      }
      if (!id) {
        this.$message({ type: 'error', message: '文章id不正确' })
        return
      }
      ARTICLE_DETAIL.getArticleById({ params }).then(result => {
        if (result && result.code == 200) {
          this.articleInfo = result.data
          this.articleInfo.contentLength = this.articleInfo.content.length
        }
      })
    },
    //  文章数据处理
    handleArticleData (data, type) {
      let tmpList = []
      if (type === 1) { //  按照分类排序
        this.currentItem = []
        const categoryList = []
        data.forEach(item => {
          if (tmpList.indexOf(item.categoryId) === -1 && item.categoryId !== 0) {
            tmpList.push(item.categoryId)
          }
        })
        //  遍历不重复的列表
        tmpList.forEach(item => {
          categoryList.push({ categoryId: item, showName: this.returnCategory(this.categories, item), index: item, articleList: [] })
        })
        categoryList.forEach(item => {
          data.forEach(it => {
            if (item.categoryId === it.categoryId) {
              item.articleList.push({ title: it.title, articleId: it.id })
            }
          })
        })
        if (categoryList.length) {
          this.currentItem = categoryList[0]
        }
        console.log(categoryList, 123)
        return categoryList
      } else if (type === 2) { //  按照时间排序
        const dateList = []
        data.forEach(item => {
          if (item.createTime) {
            //  处理时间格式，只保存日期
            const time = this.dateReturn(item.createTime).split(' ')[0]
            tmpList.push(time.substr(0, time.length - 3))
            // tmpList.push(this.dateReturn(item.createTime).split(' ')[0].subStr(0, ))
          }
        })
        //  通过集合方法给数组去重
        tmpList = Array.from(new Set(tmpList))
        //  遍历生成日期数据
        tmpList.forEach(item => {
          dateList.push({ showName: item, index: item, articleList: [] })
        })
        dateList.forEach(item => {
          data.forEach(it => {
            const time = this.dateReturn(it.createTime).split(' ')[0]
            if (item.showName == time.substr(0, time.length - 3)) {
              item.articleList.push({ title: it.title, articleId: it.id })
            }
          })
        })
        return dateList
      } else {
        const subjectList = []
        data.forEach(item => {
          if (item.subjectId > 0) {
            if (tmpList.indexOf(item.subjectId) === -1) {
              tmpList.push(item.subjectId)
            }
          }
        })
        tmpList.forEach(item => {
          subjectList.push({ showName: common.returnSubject(this.subjects, item), subjectId: item, index: item, articleList: [] })
        })
        subjectList.forEach(item => {
          data.forEach(it => {
            if (item.subjectId == it.subjectId) {
              item.articleList.push({ title: it.title, articleId: it.id })
            }
          })
        })
        return subjectList
      }
    },
    //  返回category中文
    returnCategory (data, id) {
      return common.returnCategory(data, id)
    },
    //  点击文章切换
    articleChange (val) {
      this.currentArticle = val.articleId
      this.getArticleInfoById(val.articleId)
    },
    //  切换编辑状态
    editStatusChange (val) {
      if (val === 0) {
        this.editFlag = true
      } else {
        this.editFlag = false
      }
    },
    //  文章保存
    articleSave () {
      console.log(this.articleInfo, 'articleinfo')
      this.dialog.form = {
        title: this.articleInfo.title,
        summary: this.articleInfo.summary,
        category: this.articleInfo.categoryId,
        openFlag: this.articleInfo.openFlag,
        subject: this.articleInfo.subjectId
      }
      this.dialog.visible = true
      //       if (this.dialog.form.category === 0 && this.dialog.form.subject !== 0) {
      //   this.$set(this.dialog.form, 'radio', 1)
      //   this.dialog.form.category = ''
      // } else {
      //   this.$set(this.dialog.form, 'radio', 0)
      //   this.dialog.form.subject = ''
      // }
    },
    //  dialog框关闭
    dialogClose () {
      this.$refs.ruleForm.resetFields()
      this.dialog.form = {
        title: '',
        summary: '',
        category: '',
        openFlag: 1
      }
    },
    //  表格校验
    submitContent (formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          this.save()
        } else {
          return false
        }
      })
    },
    //  向数据库保存文章信息
    save () {
      const params = {
        id: this.currentArticle,
        content: this.articleInfo.content,
        summary: this.dialog.form.summary,
        categoryId: this.dialog.form.category,
        title: this.dialog.form.title,
        openFlag: this.dialog.form.openFlag,
        subjectId: this.dialog.form.subject
      }
      if (!this.articleInfo.content) {
        this.$message({ type: 'warning', message: '文章内容不可为空' })
        return
      }
      if (this.dialog.form.radio) {
        params.categoryId = 0
      } else {
        params.subjectId = 0
      }
      MY.updateArticleInfo(params).then(result => {
        if (result && result.code == 200) {
          this.$message({ type: 'success', message: result.message })
          this.getArticleInfoById(this.currentArticle)
          //  跟新状态分类信息
          // this.getAllArticleByUserId()
          //  修改编辑状态为 false
          this.editFlag = false
          this.dialog.visible = false
          //  移除 localStorage 中的content
          localStorage.removeItem('bloggerContent')
        }
      })
    },
    //  文章删除
    articleDelete () {
      if (!this.currentArticle) {
        this.$message({ type: 'warning', message: '请指定需要删除的文章' })
        return
      }
      this.$confirm('确定删除该文章吗？', '确定', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          id: this.currentArticle
        }
        MY.deleteArticle(params).then(result => {
          if (result && result.code == 200) {
            this.$message({ type: 'success', message: result.message })
            this.getAllArticleByUserId()
          }
        })
      }).catch(() => {})
    },
    //  文件上传成功
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      //  将数据更新到 localStorage
      localStorage.setItem('userIcon', file.response.data)
    },
    //  文件上传之前钩子
    beforeAvatarUpload (file) {
      const isJPG_PNG = (file.type === 'image/jpeg' || file.type === 'image/png')

      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG_PNG) {
        this.$message.warning('上传头像图片只能是 JPG 和 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.warning('上传头像图片大小不能超过 2MB!')
      }
      return isJPG_PNG && isLt2M
    },
    //  时间处理
    dateReturn (time) {
      if (time) {
        return common.timeToDate(time)
      }
    },
    //  获取用户总文章篇数和总字数
    getArticleFontCount (userId) {
      if (!userId) {
        return
      }
      const params = {
        userId: userId
      }
      ARTICLE_DETAIL.getArticleFontCount({ params }).then(result => {
        if (result && result.code == 200) {
          //  提交数据到 vuex
          // this.$store.commit('updateUserArticle', result.data)
          this.author.articleCount = result.data.articleCount
          this.author.fontCount = result.data.fontCount
        }
      })
    },
    //  文本编辑器的图片新增
    imgAdd (pos, file) {
      const valid = this.beforeAvatarUpload(file)
      if (valid) {
        // 构建上传参数，将图片上传到服务器.
        const formdata = new FormData()
        formdata.append('icon', file)
        MY.uploadPicture(formdata).then(result => {
          const url = '/static/' + result.data
          if (result && result.code == 200) {
            //  设置富文本编辑器回显
            this.$refs.md_detail.$imglst2Url([[pos, url]])
          }
        })
      }
    },
    //  文本编辑器的图片删除
    imgDel () {
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/css/my.scss';
</style>
