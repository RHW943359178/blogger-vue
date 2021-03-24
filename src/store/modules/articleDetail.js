const articleDetail = {
  state: {
    //  文章标题
    articleTitle: '',
    //  作者用户信息
    authorInfo: {},
    //  文章详情页面向下滚动时的滚动标志
    scrollFlag: false
  },
  mutations: {
    updateArticleInfo(state, param) {
      state.articleTitle = param;
    },
    updateAuthorInfo(state, param) {
      state.authorInfo = param;
    },
    updateScrollFlag(state, param) {
      state.scrollFlag = param;
    }
  }
};

export default articleDetail;
