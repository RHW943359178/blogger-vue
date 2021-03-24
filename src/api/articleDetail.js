//  导入封装之后的 axios
import service from '../utils/request';

export default {
  //  根据文章id获取文章信息
  getArticleById: params => {
    return service.get('/blogger/home/getArticleById', params);
  },
  //  根据用户id获取用户信息
  getAuthorByUserId: params => {
    return service.post('/blogger/user/getUserInfo', params);
  },
  //  获取其他文章列表
  getOtherArticle: params => {
    return service.post('/blogger/home/getOtherArticle', params);
  },
  //  获取推荐文章列表
  getRecommendArticle: params => {
    return service.get('/blogger/home/article/recommend', params);
  },
  //  获取还用户所有的文章篇数和总字数
  getArticleFontCount: params => {
    return service.get('/blogger/user/articleInfo', params);
  },
  //  关注和取消关注
  updateUserFollow: params => {
    return service.post('/blogger/follow/update', params);
  },
  //  文章评论保存
  commentSave: params => {
    return service.post('/blogger/comment/save', params);
  },
  //  文章评论查询
  getCommentList: params => {
    return service.get('/blogger/comment/list', params);
  },
  //  文章点赞和取消点赞操作
  starAndCancelStar: params => {
    return service.post('/blogger/comment/star/exec', params);
  }
};
