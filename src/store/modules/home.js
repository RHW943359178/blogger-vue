const home = {
  state: {
    //  文章搜索
    home_search: '',
    //  文章分类id
    categoryId: '',
    //  文章分类id集合
    categoryIdList: [],
    //  文章列表
    articleList: [],
  },
  mutations: {
    updateSearchCondition(state, param) {
      state.home_search = param
    },
    updateCategoryId(state, param) {
      state.categoryId = param
    },
    //  更新选中的分类id
    updateCategoryIdList(state, param) {
      state.categoryIdList = param
    },
    //  更新文章列表
    updateArticleList(state, param) {
      state.articleList = param
    },
  },
}

export default home
