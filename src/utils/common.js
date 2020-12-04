export default {
  /**
   * 将中国标准时间转成date格式（yyyy-mm-dd hh:mm:ss）
   */
  timeToDate(params) {
    var d = new Date(params)  
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' '
           + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  },
  /**
   * 校验用户名
   */
  validateUsername() {
    return (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入昵称'))
      }
      if (pwdReg.test(value)) {
        callback()
      } else {
        callback(new Error('密码以字母开头 长度在8~18之间 只能包含字母、数字和下划线'))
      }
    }
  },
   /**
   * 校验邮箱格式
   */
  validateMailFormat() {
    return (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      if (mailReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱格式'))
      }
    }
  },
  /**
   * 校验密码
   */
  validatePwd() {
    return (rule, value, callback) => {
      const pwdReg = /^[a-zA-Z]\w{8,18}$/
      if (!value) {
        return callback(new Error('请输入密码'))
      }
      if (pwdReg.test(value)) {
        callback()
      } else {
        callback(new Error('密码以字母开头 长度在8~18之间 只能包含字母、数字和下划线'))
      }
    }
  },
  /**
   * 返回分类中文
   */
  returnCategory(data, id) {
    if (id && data.length) {
      let arr = data.filter(item => {
        return item.categoryId == id
      })
      if (arr.length) {
        return arr[0].categoryName
      } else {
        return ''
      }
    } else {
      return ''
    }
  },
}