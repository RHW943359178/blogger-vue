<template>
  <div class="b_setting">
    <div class="b_setting_body">
      <div class="category">
        <p>文章分类(category)设置</p>
        <div>
          <el-button type="primary" plain size="mini" class="el-icon-plus" @click="categoryAdd">新增</el-button>
          <!-- <el-button type="primary" plain size="mini" class="el-icon-edit">修改</el-button>
          <el-button type="primary" plain size="mini" class="el-icon-delete">删除</el-button> -->
        </div>
        <div class="itemBox">
          <span v-for="item in categoryList" :key="item.categoryId" :style="`background: ${item.color}`">{{ item.categoryName }}</span>
        </div>
        <div class="introduce">
          <span>文章分类表格</span>
          <el-button type="text" @click="categoryFlag = !categoryFlag">{{ categoryFlag ? '收起' : '展开' }}</el-button>
          <!-- <el-button type="text" v-show="categoryFlag" size="mini" @click="categoryFlag = false">收起</el-button> -->
        </div>
        <div v-show="categoryFlag">
          <el-table :data="categoryList" size="mini" border stripe>
            <el-table-column type="index" label="序号" width="50px"></el-table-column>
            <el-table-column prop="categoryName" label="分类名称" min-width="120px"></el-table-column>
            <el-table-column prop="color" label="背景颜色" width="120px"></el-table-column>
            <el-table-column prop="categoryNo" label="分类编号" width="120px"></el-table-column>
            <el-table-column prop="" label="操作" width="120px">
              <template slot-scope="scope">
                <el-button type="text" class="el-icon-edit" size="mini" @click="categoryEdit(scope.row)">编辑</el-button>
                <el-button type="text" class="el-icon-delete" size="mini" @click="categoryDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <hr />
      </div>
      <div class="category">
        <p>文章主题(subject)设置</p>
        <div>
          <el-button type="primary" plain size="mini" class="el-icon-plus" @click="subjectAdd">新增</el-button>
        </div>
        <div class="itemBox">
          <span class="subject" v-for="item in subjectList" :key="item.subjectId">{{ item.subjectName }}</span>
        </div>
        <div class="introduce">
          <span>文章主题表格</span>
          <el-button type="text" @click="subjectFlag = !subjectFlag">{{ subjectFlag ? '收起' : '展开' }}</el-button>
          <!-- <el-button type="text" v-show="categoryFlag" size="mini" @click="categoryFlag = false">收起</el-button> -->
        </div>
        <div v-show="subjectFlag">
          <el-table :data="subjectList" size="mini" border stripe>
            <el-table-column type="index" label="序号" width="50px"></el-table-column>
            <el-table-column prop="subjectName" label="主题名称" min-width="120px"></el-table-column>
            <el-table-column prop="subjectNo" label="主题编号" width="120px"></el-table-column>
            <el-table-column prop="" label="操作" width="120px">
              <template slot-scope="scope">
                <el-button type="text" class="el-icon-edit" size="mini" @click="subjectEdit(scope.row)">编辑</el-button>
                <el-button type="text" class="el-icon-delete" size="mini" @click="subjectDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <hr />
        <el-carousel>
          <el-carousel-item>

          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- 文章分类新增保存dialog框 -->
    <el-dialog 
      :visible="categoryDialog.visible" 
      width="400px" 
      append-to-body 
      :show-close="false" 
      :title="categoryDialog.title" 
      @open="categoryOpen" 
      @close="categoryClose">
      <el-form label-width="80px" label-position="right" :model="categoryDialog.form" :rules="categoryRules" ref="categoryForm">
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="categoryDialog.form.categoryName" size="small" clearable placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="分类编号" prop="categoryNo">
          <el-input v-model="categoryDialog.form.categoryNo" size="small" clearable placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="背景颜色" prop="color">
          <el-color-picker size="small" v-model="categoryDialog.form.color"></el-color-picker>
        </el-form-item>
        <el-form-item label="预览效果">
          <span :style="categoryDialog.form.color ? `padding: 5px 10px; border-radius: 2px; color: #ffffff; background: ${categoryDialog.form.color}` : ''">{{ categoryDialog.form.categoryName }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="info" size="mini" @click="categoryDialog.visible = false">关闭</el-button>
        <el-button type="primary" size="mini" @click="categorySubmit('categoryForm')">保存</el-button>
      </div>
    </el-dialog>
    <!-- 文章分类新增保存dialog框 -->
    <el-dialog 
      :visible="subjectDialog.visible" 
      width="400px" 
      append-to-body 
      :show-close="false" 
      :title="subjectDialog.title" 
      @open="sujectOpen" 
      @close="sujectClose">
      <el-form label-width="80px" label-position="right" ref="subjectForm" :model="subjectDialog.form" :rules="subjectRules">
        <el-form-item label="主题名称" prop="subjectName">
          <el-input v-model="subjectDialog.form.subjectName" size="small" clearable placeholder="请输入主题名称"></el-input>
        </el-form-item>
        <el-form-item label="主题编号" prop="subjectNo">
          <el-input type="number" v-model="subjectDialog.form.subjectNo" size="small" clearable placeholder="请输入主题名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="info" size="mini" @click="subjectDialog.visible = false">关闭</el-button>
        <el-button type="primary" size="mini" @click="subjectSubmit('subjectForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import HOME from '../api/home'
import SETTING from '../api/setting'
export default {
  data() {
    return {
      //  分类列表
      categoryList: [],
      //  主题列表
      subjectList: [],
      //  分类dialog框
      categoryDialog: {
        visible: false,
        title: '',
        saveType: 1,
        form: {
          categoryName: '',
          categoryNo: '',
          color: ''
        }
      },
      //  当前分类
      currentCategory: {},
      //  当前主题
      currentSubject: {},
      //  分类 form 表单校验
      categoryRules: {
        categoryName: [
          {required: true, message: '请输入分类名称', trigger: 'blur'}
        ],
        categoryNo: [
          {required: true, message: '请输入分类编号', trigger: 'blur'}
        ],
        color: [
          {required: true, message: '请选择背景颜色', trigger: 'change'}
        ]
      },
      //  主题 subject 表单验证
      subjectRules: {
        subjectName: [
          {required: true, message: '请输入主题名称', trigger: 'blur'}
        ],
        subjectNo: [
          {required: true, message: '请输入主题编号', trigger: 'blur'}
        ]
      },
      //  主题dialog框
      subjectDialog: {
        visible: false,
        title: '',
        saveType: 1,
        form: {
          subjectName: '',
          subjectNo: ''
        }
      },
      categoryFlag: false,
      subjectFlag: false,
      categoryActive: ''
    }
  },
  mounted() {
    this.handleGetAllCategory()
    this.getAllSubjects()
  },
  methods: {
    // 获取全部分类列表
    handleGetAllCategory() {
      HOME.handleGetAllCategory().then(result => {
        if (result && result.code == 200) {
          this.categoryList = result.data
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
    //  分类dialog框打开
    categoryOpen() {

    },
    //  分类dialog框关闭
    categoryClose() {
      this.$refs['categoryForm'].resetFields()
      this.categoryDialog.form = {
        categoryName: '',
        categoryNo: '',
        color: ''
      }
    },
    //  文章分类新增
    categoryAdd() {
      this.categoryDialog.title = '新增文章分类'
      this.categoryDialog.saveType = 1
      this.categoryDialog.visible = true
      //  默认获取最大编号
      this.categoryDialog.form.categoryNo = this.getMaxNumber(this.categoryList, 'categoryNo')
    },
    //  文章分类编辑
    categoryEdit(row) {
      this.categoryDialog.title = row.categoryName + ' - 分类修改'
      this.categoryDialog.saveType = 2
      this.categoryDialog.visible = true
      this.currentCategory = row
      this.categoryDialog.form.categoryName = row.categoryName
      this.categoryDialog.form.categoryNo = row.categoryNo
      this.categoryDialog.form.color = row.color
    },
    //  文章分类删除按钮操作
    categoryDelete(row) {
      this.$confirm('确定删除该分类吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteCategory(row.categoryId)
      }).catch(() => {})
    },
    //  分类删除
    deleteCategory(id) {
      if (!id) {
        this.$message({type: 'warning', message: '请选择需要删除的分类!'})
        return
      }
      let params = {
        categoryId: id
      }
      SETTING.deleteCategory(params).then(result => {
        if (result && result.code == 200) {
          this.$message({type: 'success', message: result.message})
          this.handleGetAllCategory()
        }
      })
    },
    //  分类保存提交
    categorySubmit(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          this.categorySave()
        } else {
          return false
        }
      })
    },
    //  分类保存
    categorySave() {
      let params = {
        categoryName: this.categoryDialog.form.categoryName,
        categoryNo: this.categoryDialog.form.categoryNo,
        color: this.categoryDialog.form.color
      }
      if (this.categoryDialog.saveType === 2) {
        params.categoryId = this.currentCategory.categoryId
      }
      SETTING.categorySave(params).then(result => {
        if (result && result.code == 200) {
          this.$message({type: 'success', message: result.message})
          this.categoryDialog.visible = false
          this.handleGetAllCategory()
        }
      })
    },
    //  主题新增
    subjectAdd() {
      this.subjectDialog.title = '新增文章主题'
      this.subjectDialog.visible = true
      this.subjectDialog.saveType = 1
      this.subjectDialog.form.subjectNo = this.getMaxNumber(this.subjectList, 'subjectNo')
    },
    //  主题编辑
    subjectEdit(row) {
      this.subjectDialog.title = row.sujectName + ' - 主题修改'
      this.subjectDialog.saveType = 2
      this.currentSubject = row
      this.subjectDialog.visible = true
      this.subjectDialog.form.subjectName = row.subjectName
      this.subjectDialog.form.subjectNo = row.subjectNo
    },
    //  主题删除
    subjectDelete(row) {
      this.$confirm('确定删除该文章主题吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteSubject(row.subjectId)
      }).catch(() => {})
    },
    //  主题 dialog 开启
    sujectOpen() {

    },
    //  主题 dialog 框关闭
    sujectClose() {
      this.$refs['subjectForm'].resetFields()
      this.subjectDialog.form = {
        subjectName: '',
        subjectNo: ''
      }
    },
    //  主题保存提交
    subjectSubmit(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          this.subjectSave()
        } else {
          return false
        }
      })
    },
    //  主题保存
    subjectSave() {
      let params = {
        subjectName: this.subjectDialog.form.subjectName,
        subjectNo: Number(this.subjectDialog.form.subjectNo)
      }
      if (this.subjectDialog.saveType === 2) {
        params.subjectId = this.currentSubject.subjectId
      }
      SETTING.subjectSave(params).then(result => {
        if (result && result.code == 200) {
          this.$message({type: 'success', message: result.message})
          this.subjectDialog.visible = false
          this.getAllSubjects()
        }
      })
    },
    //  文章主题删除
    deleteSubject(id) {
      if (!id) {
        return
      }
      let params = {
        subjectId: id
      }
      SETTING.subjectDelete(params).then(result => {
        if (result && result.code == 200) {
          this.$message({type: 'success', message: result.message})
          this.getAllSubjects()
        }
      })
    },
    //  获取数据库数据最大编号
    getMaxNumber(arr, itemName) {
      if (!arr.length) {
        return
      }
      let tmp = []
      tmp = arr.map(item => {
        return item[itemName]
      })
      let max = Math.max.apply(null, tmp)
      return max + 5
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/setting.scss';
  // .el-table {
  //   height: 0;
  // }
</style>