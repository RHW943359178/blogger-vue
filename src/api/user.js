//  导入封装之后的 axios
import service from '../utils/request'

export default {
  //  用户名是否注册校验
  handleUsernameVaildate: params => {
    return service.get('/user/username/select', params)
  },
  //  用户名注册成功保存
  handleUserSave: params => {
    return service.post('/user/save', params)
  }
}