// Register a Page.
Page({
  data:{
    
  },
  goNews:function(event){
    wx.navigateTo({
      url: '../news/news',
    })
  }
})