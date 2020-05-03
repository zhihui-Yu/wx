// Register a Page.
Page({
  data:{
    
  },
  goNews:function(event){
    wx.switchTab({
      url: '../movie/movie'
    })
  }
})