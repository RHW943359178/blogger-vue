//  导入封装之后的 axios
import service from '../utils/request'

export default {
  //  用户名是否注册校验
  handleUsernameValidate: params => {
    return service.get('/blogger/user/username/select', params)
  },
  //  用户名注册成功保存
  handleUserSave: params => {
    return service.post('/blogger/user/save', params)
  },
  //  用户登录校验
  handleUerLoginValidate: params => {
    return service.post('/blogger/user/login/validate', params)
  }
}