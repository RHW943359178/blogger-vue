//  导入封装之后的 axios
import service from '../utils/request'

export default {
  //  获取全部分类
  handleGetAllCategory: params => {
    return service.get('/home/category', params)
  },
  handleGetAllArticle: params => {
    return service.get('/home/article', params)
  }
}
