<template>
  <div class="article_editor">
    <div class="editor_box">
      <div class="buttons">
        <el-button type="primary" icon="el-icon-delete" @click="clearContext" size="mini">清空文本</el-button>
        <el-button type="primary" icon="el-icon-finished" @click="dialog.visible = true" :disabled="editorContent == ''" size="mini">保存</el-button>
      </div>
      <mavon-editor
        style="height: 100%"
        v-model="editorContent"
        :ishljs="true"
        ref="md_detail"
        @imgAdd="imgAdd"
        @imgDel="imgDel"></mavon-editor>
    </div>
    <!-- 提交保存的内容dialog框 -->
    <ArticleSaveBox :dialog="dialog" :flag="1" :editorContent="editorContent" />
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import ArticleSaveBox from '../components/public/ArticleSaveBox'
import 'mavon-editor/dist/css/index.css'
import ARTICLE_EDITOR from '../api/articleEditor'
import MY from '../api/my'
export default {
  components: {
    mavonEditor,
    ArticleSaveBox
  },
  data () {
    return {
      //  保存的内容
      editorContent: '',
      //  分类
      categories: [],
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
      },
      openFlags: [
        { key: 1, text: '公开' },
        { key: 2, text: '不公开' }
      ],
      //  表单验证规则
      rules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择文章所属分类', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
  },
  mounted () {
  },
  //  通过 watch 检测内容变化并写进 localStorage
  watch: {
    editorContent: function (val) {
      localStorage.setItem('bloggerContent', val)
    }
  },
  methods: {
    //  清空文本
    clearContext () {
      this.editorContent = ''
    },
    //  内容编辑保存
    save (val) {
      const params = {
        content: this.editorContent,
        summary: this.dialog.form.summary,
        categoryId: this.dialog.form.category,
        subjectId: this.dialog.form.subject,
        title: this.dialog.form.title,
        openFlag: this.dialog.form.openFlag,
        username: localStorage.getItem('username'),
        viewCount: 0,
        commentCount: 0
      }
      if (val) {
        params.categoryId = 0
      } else {
        params.subjectId = 0
      }
      ARTICLE_EDITOR.handleArticleSave(params).then(result => {
        if (result && result.code == 200) {
          this.dialog.visible = false
          this.editorContent = ''
          this.$message({ type: 'success', message: result.message })
          //  移除 localStorage 中的content
          localStorage.removeItem('bloggerContent')
        }
      })
    },
    //  dialog框关闭
    dialogClose () {
      this.$refs.ruleForm.resetFields()
      this.dialog.form = {
        title: '',
        summary: '',
        category: '',
        openFalg: 1
      }
    },
    //  dialog框开启
    dialogOpen () {
      //  默认展示文章内容的前20个字符为违章梗概
      if (this.editorContent) {
        this.dialog.form.summary = this.editorContent.substr(0, 20)
      }
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
    imgDel () {

    }
  }
}
</script>

<style lang="scss">
  @import '../assets/css/articleEditor.scss';
</style>
