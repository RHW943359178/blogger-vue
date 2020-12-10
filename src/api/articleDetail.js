//  导入封装之后的 axios
import service from '../utils/request'

export default {
  //  根据文章id获取文章信息
  getArticleById: params => {
    return service.get('/home/getArticleById', params)
  },
  //  根据用户id获取用户信息
  getAuthorByUserId: params => {
    return service.post('/user/getUserInfo', params)
  },
  //  获取其他文章列表
  getOtherArticle: params => {
    return service.post('/home/getOtherArticle', params)
  },
  //  获取推荐文章列表
  getRecommendArticle: params => {
    return service.get('/home/article/recommend', params)
  },
  //  获取还用户所有的文章篇数和总字数
  getArticleFontCount: params => {
    return service.get('/user/articleInfo', params)
  }
}