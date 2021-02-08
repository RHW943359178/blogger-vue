<template>
  <!-- 提交保存的内容dialog框 -->
  <el-dialog :visible="dialog.visible" width="400px" append-to-body :show-close="false" title="投稿内容保存" @open="dialogOpen" @close="dialogClose">
    <el-form label-width="100px" label-position="80px" size="small" :model="dialog.form" :rules="rules" ref="ruleForm">
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
        <el-select v-model="dialog.form.category" style="width: 200px" :disabled="categoryDisabled">
          <el-option v-for="item in categories" :key="item.categoryId" :value="item.categoryId" :label="item.categoryName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收录为专题">
        <el-radio-group v-model="dialog.form.radio" @change="radioChange">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="专题列表" required prop="subject">
        <el-select v-model="dialog.form.subjectId" style="width: 200px" :disabled="subjectDisabled">
          <el-option v-for="item in subjectList" :key="item.subjectId" :value="item.subjectId" :label="item.subjectName"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary" size="mini" @click="submitContent('ruleForm')">保存</el-button>
      <el-button type="info" size="mini" @click="dialog.visible = false">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import HOME from '../../api/home'
export default {
  props: ['dialog', 'flag'],
  data() {
    return {
      //  dialog框显示内容
      // dialog: {
      //   visible: false,
      //   form: {
      //     title: '',
      //     summary: '',
      //     category: '',
      //     openFlag: 1
      //   }
      // },
      //  分类列表
      categories: [],
      categoryDisabled: false,
      subjectDisabled: true,
      //  主题列表
      subjectList: [],
      //  文章信息
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
        subject: [
          { required: true, message: '请选择文章所属专题', trigger: 'change'},
        ],
      },
    }
  },
  mounted() {
    this.handleGetAllCategory()
    this.getAllSubjects()
  },
  methods: {
    //  表格校验
    submitContent(formname) {
      this.$parent.submitContent(formname)
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
    //  dialog 框打开时回调
    dialogOpen() {
      //  默认展示文章内容的前20个字符为违章梗概
      if (this.editorContent && this.flag === 1) {
        this.dialog.form.summary = this.editorContent.substr(0, 20)
      }
    },
    //  获取所有分类
    handleGetAllCategory() {
      HOME.handleGetAllCategory().then(result => {
        if (result && result.code == 200) {
          this.categories = result.data
        }
      })
    },
    //  获取所有专题列表
    getAllSubjects() {
      HOME.getAllSubjects({}).then(result => {
        if (result && result.code == 200) {
          this.subjectList = result.data
        }
      })
    },
    radioChange(val) {
      if (val) {
        this.categoryDisabled = true
        this.subjectDisabled = false
        this.dialog.form.category = ''
      } else {
        this.categoryDisabled = false
        this.subjectDisabled = true
        this.dialog.form.subject = ''
      }
    }
  }
}
</script>

<style lang="scss">
  .el-dialog__body {
    padding: 10px 20px 0 20px;
  }
</style>