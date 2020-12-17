//  导入封装之后的 axios
import service from '../utils/request'

export default {
  //  获取文章列表
  getArticleList: params => {
    return service.get('/blogger/home/getArticleByUserId', params)
  },
  //  用户文章信息修改
  updateArticleInfo: params => {
    return service.post('/blogger/home/updateArticleInfo', params)
  },
  //  用户文章删除
  deleteArticle: params => {
    return service.post('/blogger/home/article/delete', params)
  }
}