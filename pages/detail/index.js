//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    book:{},
    title:''
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    wx.setNavigationBarTitle({ title: this.data.title })
  },
  getBookDetail: function(bookId) {
    let id = bookId || '';
    if(bookId==''){
      return false;
    }
    let requestUrl = `https://anhr.top/detail/${id}`;
    let self = this;
    wx.request({
      url: requestUrl, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.hideLoading()
        let data = JSON.parse(res.data);
        data.cover = decodeURIComponent(data.cover.replace('/agent/', ''));
        data.updated = util.dateTimeStamp(new Date(data.updated));
        data.wordCount = util.numToStr(data.wordCount);
        self.setData({
          book:data
        })
      }
    })
  },
  onShow: function() {

    // this.getRankList();
  },
  onLoad: function(params) {
    this.data.title = params.title;
    this.getBookDetail(params.id);
    wx.showLoading({ title: '拼命加载中...' });
    // wx.showLoading({ title: '拼命加载中...' })
  }
})
