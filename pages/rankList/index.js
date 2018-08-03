//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    rankingList: [], //数据
  },
  getRankList: function(callback) {
    let requestUrl = `https://anhr.top/getRanking`;
    let self = this;
    wx.request({
      url: requestUrl, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.hideLoading()
        console.log(res.data,'<<<<<<<<<<<<<<<<res.data')
        self.setData({
          rankingList: res.data
        })
      }
    })
  },
  onShow: function() {
    this.getRankList();
  },
  onLoad: function() {
    wx.showLoading({ title: '拼命加载中...' })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
