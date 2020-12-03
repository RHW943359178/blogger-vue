const user = {
  state: {
    //  当前登录的用户
    user: {},
    //  设置属性
    isLogin: false,
  },
  mutations: {
    updateUserInfo(state, param) {
      state.user = param
    },
    //  设置属性状态
    userStatus(state, flag) {
      state.isLogin = flag
    }
  },
  //  应用mutations
  actions: {
    userInfo({commit}, user) {
      commit("updateUserInfo", user)
    },
    //  获取登录状态
    userLogin({commit}, flag) {
      commit("userStatus", flag)
    }
  }
}

export default user