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
  }
}