//  导入封装之后的 axios
import service from '../utils/request'

export default {
  //  文章内容保存
  handleArticleSave: params => {
    return service.post('/home/article/save', params)
  }
}