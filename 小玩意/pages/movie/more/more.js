var app = getApp();
var utils = require("../../util/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: 0 ,
    count: 21,
    url: "",
    movies : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var name = options.name;
    //设置bar name
    wx.setNavigationBarTitle({
      title: name
    })
    //获取数据
    var baseUrl = app.baseUrl.doubanUrl;
    if(name == "正在热映"){
      this.data.url = baseUrl+"/v2/movie/in_theaters"
    } else if(  name == "即将播出" ){
      this.data.url = baseUrl+"/v2/movie/coming_soon";
    }  else if(  name == "top250" ){
      this.data.url = baseUrl+"/v2/movie/top250"
    }
    var url = this.data.url+"?count="+this.data.count+"&start="+this.data.start;
    utils.http(url,this.callBack);
    wx.showNavigationBarLoading();
  },
  callBack : function (data) {
    var movies = [];
    for ( var i in data.subjects ) {
      var subject = data.subjects[i];
      movies.push(subject)
    }
    //数组不为空则合并
    if(this.data.movies.length != 0) {
      movies = this.data.movies.concat(movies);
    }
    this.setData({movies : movies});
    wx.hideNavigationBarLoading();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onUnload: function () {
    this.data.start = 0;
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.start += 21;
    var url = this.data.url+"?count="+this.data.count+"&start="+this.data.start;
    utils.http(url,this.callBack)
  },
  goDetail : function (event) {
    wx.navigateTo({
      url: '../movie-detail/movie-detail?movieid='+event.currentTarget.dataset.movieid
    })
  }
})