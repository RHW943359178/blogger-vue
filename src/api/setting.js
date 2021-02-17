//  导入封装之后的 axios
import service from '../utils/request'

export default {
  //  删除文章分类
  deleteCategory: params => {
    return service.post('/blogger/home/category/delete', params)
  },
  //  文章分类新增修改
  categorySave: params => {
    return service.post('/blogger/home/category/addUpdate', params)
  },
  //  文章主题新增修改
  subjectSave: params => {
    return service.post('/blogger/subject/addUpdate', params)
  },
  //  文章主题删除
  subjectDelete: params => {
    return service.post('/blogger/subject/delete', params)
  }
}