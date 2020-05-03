//引入模块
var newsData = require("../data/newsData.js")

Page({
  data: {
    indicatorDots:true,
    autoplay:true,
    interval:2000,
    circular:true,
    news_Data:[]
  },
  onLoad: function (event) {
    this.setData({
      news_Data:newsData.newsData
    })
  },
  //跳转详情页
  goNewsDetail: function(event) {
    //console.log(event)
    var newsId = event.currentTarget.dataset.newsid;
    wx.navigateTo({
      url: 'news-detail/news-detail?newsid='+ newsId
    })
  }
})