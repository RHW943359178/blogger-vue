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
        ref=md
        @imgAdd="imgAdd"
        @imgDel="imgDel"></mavon-editor>
    </div>
    <!-- 提交保存的内容dialog框 -->
    <el-dialog :visible="dialog.visible" width="400px" title="投稿内容保存" @open="dialogOpen" @close="dialogClose" append-to-body>
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
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css';
import ARTICLE_EDITOR from '../api/articleEditor'
export default {
  components: {
    mavonEditor
  },
  data () {
    return {
      //  保存的内容
      editorContent: '',
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
      openFlags: [
        {key: 1, text: '公开'},
        {key: 2, text: '不公开'},
      ],
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
  computed: {
    categoryAll() {
      return this.$store.state.home.categoryAll
    }
  },
  mounted() {
  },
  methods: {
    //  清空文本
    clearContext() {
      this.editorContent = ''
    },
    //  文章保存时校验
    submitContent(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.contentSave()
        } else {
          return false
        }
      })
    },
    //  内容编辑保存
    contentSave() {
      let params = {
        content: this.editorContent,
        summary: this.dialog.form.summary,
        categoryId: this.dialog.form.category,
        title: this.dialog.form.title,
        openFlag: this.dialog.form.openFlag,
        username: "RHW",
        viewCount: 1,
        commentCount: 1
      }
      ARTICLE_EDITOR.handleArticleSave(params).then(result => {
        if (result && result.code == 200) {
          this.dialog.visible = false
          this.editorContent = ''
          this.$message({type: 'success', message: result.message})
        }
      })
    },
    //  dialog框关闭
    dialogClose() {
      this.$refs['ruleForm'].resetFields()
      this.dialog.form = {
        title: '',
        summary: '',
        category: '',
        openFalg: 1
      }
    },
    //  dialog框开启
    dialogOpen() {
      //  默认展示文章内容的前20个字符为违章梗概
      if (this.editorContent) {
        this.dialog.form.summary = this.editorContent.substr(0, 20)
      }
    },
    imgAdd() {

    },
    imgDel() {

    },
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/articleEditor.scss';
</style>