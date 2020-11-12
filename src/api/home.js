//  导入封装之后的 axios
import service from '../utils/request'

export default {
  handleGetAllCategory: (params) => {
    return service.get('/home/category', params)
  }
}
