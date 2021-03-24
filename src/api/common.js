//  导入封装之后的 axios
import service from '../utils/request';

export default {
  //  获取用户关注用户列表
  getServerIp: params => {
    return service.get('/blogger/follow/getServerIp', params);
  }
};
