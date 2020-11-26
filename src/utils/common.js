export default {
  /**
   * 将中国标准时间转成date格式（yyyy-mm-dd hh:mm:ss）
   */
  timeToDate(params) {
    var d = new Date(params)  
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' '
           + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  }
}