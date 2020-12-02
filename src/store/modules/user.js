const user = {
  state: {
    //  当前登录的用户
    user: {}
  },
  mutations: {
    updateUserInfo(state, param) {
      state.user = param
    }
  }
}

export default user