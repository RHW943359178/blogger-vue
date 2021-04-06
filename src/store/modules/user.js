const user = {
  state: {
    //  当前登录的用户
    user: {},
    //  设置属性
    isLogin: false,
    //  用户的文章信息
    userArticle: {
      articleCount: 0, //  文章篇数
      fontCount: 0 //  总字数
    }
  },
  mutations: {
    updateUserInfo(state, param) {
      state.user = param;
    },
    //  设置属性状态
    userStatus(state, flag) {
      state.isLogin = flag;
    },
    //  设置用户的文章信息
    updateUserArticle(state, param) {
      state.userArticle = param;
    }
  },
  //  应用mutations
  actions: {
    userInfo({ commit }, user) {
      commit('updateUserInfo', user);
    },
    //  获取登录状态
    userLogin({ commit }, flag) {
      commit('userStatus', flag);
    }
  }
};

export default user;
