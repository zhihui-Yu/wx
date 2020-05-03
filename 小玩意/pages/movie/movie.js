var app = getApp();
Page({
  data: {
      inTheaters:{
        title:"正在热映",
        data:{},
        searchPanelShow : false,
        searchData : []
      },
      comingSoon:{
        title:"即将播出",
        data:{}
      },
      top250:{
        title:"top250",
        data:{}
      },
      count : 3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var base_url = app.baseUrl.doubanUrl;
    //获取电影数据地址
    var in_theaters_url=base_url+"/v2/movie/in_theaters?count="+this.data.count;
    var coming_soon_url=base_url+"/v2/movie/coming_soon?count="+this.data.count;
    var top250_url=base_url+"/v2/movie/top250?count="+this.data.count; 
    //获取数据
    this.http(in_theaters_url,this.callBack,this.data.inTheaters,"inTheaters");
    this.http(coming_soon_url,this.callBack,this.data.comingSoon,"comingSoon");
    this.http(top250_url,this.callBack,this.data.top250,"top250");
    wx.showNavigationBarLoading();
  },
  http : function(url,callBack,catagory,catagoryName) {
    //网络请求
    wx.request({
      url: url, 
      data: {},
      header: {
        'content-type': 'application/xml' 
      },
      success (res) {
        callBack(res.data,catagory,catagoryName);
      }
    })
  },
  callBack : function(data,category,catagoryName) {
    var allData = {};
    category.data = data.subjects;
    allData[catagoryName] = category;
    this.setData(allData)
    wx.hideNavigationBarLoading({complete: (res) => {}})
  },
  movieMoreTap : function (event) {
    var name = event.currentTarget.dataset.catagoryname;
    wx.navigateTo({
      url: 'more/more?name='+name,
    })
  },
  goDetail : function (event) {
    wx.navigateTo({
      url: 'movie-detail/movie-detail?movieid='+event.currentTarget.dataset.movieid
    })
  },
  onPullDownRefresh : function () {
    this.onLoad();
  },
  //输入框 选中事件
  onBindFocus : function () {
    this.setData({
      searchPanelShow:true
    })
  },
  //输入框 不选中事件
  onBindBlur : function (event) {
    var data = {data:{}}
    var text = event.detail.value;
    var url = app.baseUrl.doubanUrl+"/v2/movie/search?q="+text;
    this.http(url,this.callBack,data,"searchData")
  },
  //取消
  onCancelImgTap : function() {
    this.setData({
      searchPanelShow:false,
    })
  }
})