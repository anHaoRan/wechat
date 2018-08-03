//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    read:{},
    title:''
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    wx.setNavigationBarTitle({ title: this.data.title })
  },
  getReadView: function(bookId,chapterFile) {
    let requestUrl = `https://anhr.top/read/chapterUrl?bookId=${bookId}&chapterFile=${chapterFile}`;
    let self = this;
    wx.request({
      url: requestUrl, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' ,// 默认值
        'Cache-Control': 'no-cache'
      },
      success: function(res) {
        wx.hideLoading()
        let data = res.data.chapter;
        self.setData({
          read:data
        })
      }
    })
  },
  onShow: function() {
  },
  onLoad: function(params) {
    this.data.title = params.title;
    this.getReadView(params.bookId,params.chapterFile);
    wx.showLoading({ title: '拼命加载中...' });
    // wx.showLoading({ title: '拼命加载中...' })
  }
})
