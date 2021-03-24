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
      <el-form-item label="所属分类" prop="category">
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
       <!-- :prop="subjectRequired" -->
      <el-form-item label="专题列表" prop="subject">
        <el-select v-model="dialog.form.subject" style="width: 200px" :disabled="subjectDisabled">
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
  props: ['dialog', 'flag', 'editorContent'],
  data() {
    return {
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
      currentRadia: 0,
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
          { required: false, message: '请选择文章所属专题', trigger: 'change'},
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
      this.$refs[formname].validate(valid => {
        if (valid) {
          // this.contentSave()
          this.$parent.save(this.currentRadia)
        } else {
          return false
        }
      })
    },
    //  dialog框关闭
    dialogClose() {
      this.$refs['ruleForm'].resetFields()
      this.categoryDisabled = false
      this.subjectDisabled = true
      this.dialog.form = {
        title: '',
        summary: '',
        category: '',
        subject: '',
        openFlag: 1,
        radio: 0
      }
    },
    //  dialog 框打开时回调
    dialogOpen() {
      //           if (this.dialog.form.radio) {
      //   this.categoryDisabled = true
      //   this.subjectDisabled = false
      //   this.dialog.form.category = ''
      //   this.rules.category[0].required = false
      //   this.rules.subject[0].required = true
      //   //  移除分类校验结果
      //   // this.$refs['ruleForm'].clearValidate('category')
      // } else {
      //   this.categoryDisabled = false
      //   this.subjectDisabled = true
      //   this.dialog.form.subject = ''
      //   this.rules.category[0].required = true
      //   this.rules.subject[0].required = false
      //   //  移除主题校验结果
      //   // this.$refs['ruleForm'].clearValidate('subject')
      // }
      // this.radioChange(this.dialog.form.radio)
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
      this.currentRadia = val
      //  切换 raido 既移除标题校验结果
      this.$refs['ruleForm'].clearValidate('title')
      if (val) {
        this.categoryDisabled = true
        this.subjectDisabled = false
        this.dialog.form.category = ''
        this.rules.category[0].required = false
        this.rules.subject[0].required = true
        //  移除分类校验结果
        this.$refs['ruleForm'].clearValidate('category')
      } else {
        this.categoryDisabled = false
        this.subjectDisabled = true
        this.dialog.form.subject = ''
        this.rules.category[0].required = true
        this.rules.subject[0].required = false
        //  移除主题校验结果
        this.$refs['ruleForm'].clearValidate('subject')
      }
    }
  },
  computed: {
    form() {
      return this.dialog.form
    }
  },
  watch: {
    form: function(newVal, oldVal) {
      console.log(newVal, 'newVal')
      if (newVal.category == 0 && newVal.subject != 0) {
        this.$set(this.dialog.form, 'radio', 1)
        this.dialog.form.category = ''
        this.categoryDisabled = true
        this.subjectDisabled = false
        this.rules.category[0].required = false
        this.rules.subject[0].required = true
      } else {
        this.$set(this.dialog.form, 'radio', 0)
        this.dialog.form.subject = ''
        this.categoryDisabled = false
        this.subjectDisabled = true
        this.rules.category[0].required = true
        this.rules.subject[0].required = false
      }
      
    }
  }
}
</script>

<style lang="scss" scope>
  .el-dialog__header {
    font-weight: bold;
  }
  .el-dialog__body {
    padding: 20px 20px 10px !important;
  }
</style>