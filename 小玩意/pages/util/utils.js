var http = function http(url,callBack) {
  //网络请求
  wx.request({
    url: url, 
    data: {},
    header: {
      'content-type': 'application/xml' 
    },
    success (res) {
      callBack(res.data);
    }
  })
}

module.exports = {
  http : http
}