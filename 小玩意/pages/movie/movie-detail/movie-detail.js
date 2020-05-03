var utils = require("../../util/utils.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    country: [],
    year : ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = app.baseUrl.doubanUrl+'/v2/movie/subject/'+options.movieid;
    utils.http(url,this.callBack);
    wx.showNavigationBarLoading();
  },
  callBack : function (data) {
    console.log(data)
    var movie = {
      title : data.title,
      summary : data.summary,
      year:data.year,
      image:data.images.large,
      rating : data.rating,
      genres : data.genres,
      country:data.countries,
      wishCount:data.wish_count,
      reviewsCount:data.reviews_count,
      directors : data.directors,
      casts : data.casts,
      trailers: data.trailers,
      videos : data.videos
    };
    this.setData(movie);
    //设置页标题
    wx.setNavigationBarTitle({
      title: movie.title
    })
    wx.hideNavigationBarLoading();
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  goUrl : function (event) {
    var url = event.currentTarget.dataset.url;
    var title = event.currentTarget.dataset.title;
    wx.navigateTo({
      url: "../play/play?url="+url+"&title="+title
    })
  }
})