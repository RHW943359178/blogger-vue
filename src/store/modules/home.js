const home = {
  state: {
    //  文章搜索
    home_search: '',
    //  文章分类id
    categoryId: '',
    //  文章分类id集合
    categoryIdList: [],
    //  全部的文章分类
    categoryAll: [],
    //  文章列表
    articleList: [],
    //  当前页码数
    pageNum: 1,
    //  当前页码范围
    pageSize: 10,
    //  当前文章总条数
    total: 0,
    //  当前选中的文章id
    articleId: 0,
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
    //  更新全部文章分类
    updateCategoryAll(state, param) {
      state.categoryAll = param
    },
    //  更新文章列表
    updateArticleList(state, param) {
      state.articleList = param
    },
    //  更新页码数
    updatePageNum(state, param) {
      state.pageNum = param
    },
    //  更新页码范围
    updatePageSize(state, param) {
      state.pageSize = param
    },
    //  更新页码范围
    updateTotal(state, param) {
      state.total = param
    },
    //  跟新文章id
    updateArticleId(state, param) {
      state.articleId = param
    }
  },
}

export default home
