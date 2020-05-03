// pages/news/news-detail/news-detail.js
var newsData = require("../../data/newsData.js")
const innerAudioContext = wx.createInnerAudioContext()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isPlayer:false,
    innerAudioContext : {}
  },
  onLoad:function(options){
    //加载音频
    innerAudioContext.autoplay = false
    var that = this;
    wx.request({
      url: newsData.newsData[options.newsid].music.url,
      header: {
        'content-type': 'application/xml' 
      },
      success (res) {
        innerAudioContext.src = res.data.data.url;
        that.setData({
          innerAudioContext : innerAudioContext
        })
      }
    })

    this.setData(newsData.newsData[options.newsid])
    //为了其他方法也能用到newsid
    this.setData({
      newsid:options.newsid
    })
    
    /**
     * 存入以下类型数据
     * var newsCollect = {
     *  0:true,
     *  1:false,
     *  2:true
     * }     
     */

    var newsCollect = wx.getStorageSync('newsCollect');
    //判断是否已经存储了newsCollect
    //已经有了则代表以前收藏过或者取消收藏过
    if(newsCollect) {
      this.setData({
        collected : newsCollect[options.newsid]
      })
    } else {
      //第一次进入 则需要创建数据
      var newsCollect = {};
      //第一次默认是不收藏
      newsCollect[options.newsid] = false;
      wx.setStorageSync('newsCollect', newsCollect)
    }
  },
  onUnload: function () {
    this.data.innerAudioContext.pause();
  },
  collectTap:function(event) {
    //获取本地存储值
    var newsCollect = wx.getStorageSync('newsCollect');
    //取反
    newsCollect[this.data.newsid] = !newsCollect[this.data.newsid];
    //将更新后的值存到本地
    wx.setStorageSync('newsCollect', newsCollect);
    //更新视图
    this.setData({
      collected:newsCollect[this.data.newsid]
    })
    wx.showToast({
      title: newsCollect[this.data.newsid] ? "收藏成功" : "取消收藏",
      icon:'success',
      duration:500,//300-800之间最佳
      mask:true
    })
  },
  playerMusicTap:function(event) { 
    //停止
    if(this.data.isPlayer){
      this.data.innerAudioContext.pause();
    } else {
      //播放
      this.data.innerAudioContext.play();
    }
    // this.data.innerAudioContext.onPlay(() => {
    //   console.log('开始播放')
    // })
    // this.data.innerAudioContext.onPause(()=> {
    //   console.log('停止播放')
    // })
    // this.data.innerAudioContext.onError((res) => {
    //   console.log(res.errMsg)
    //   console.log(res.errCode)
    // })
    //更新视图
    this.setData({
      isPlayer : !this.data.isPlayer
    })
    //提示框
    wx.showToast({
      title: this.data.isPlayer ? "开始播放" : "取消播放",
      icon:'success',
      duration:500,//300-800之间最佳
      mask:true
    })
  } 
})