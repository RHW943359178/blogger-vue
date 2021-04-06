//  导入封装之后的 axios
import service from '../utils/request';

export default {
  //  获取用户关注用户列表
  getUserFollowList: params => {
    return service.post('/blogger/follow/user/followList', params);
  },
  //  ws连接
  linkToWs: params => {
    return service.get('/blogger/ws', params);
  }
};
