//  导入封装之后的 axios
import service from '../utils/request'

export default {
  //  获取全部分类
  handleGetAllCategory: params => {
    return service.get('/blogger/home/category', params)
  },
  //  获取文章列表
  handleGetAllArticle: params => {
    return service.get('/blogger/home/article', params)
  },
  //  获取推荐文章列表
  getRecommendArticle: params => {
    return service.get('/blogger/home/recommend', params)
  },
  //  获取所有专题列表
  getAllSubjects: params => {
    return service.get('/blogger/subject/getAllSubjects', params)
  }
}