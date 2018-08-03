//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    catalogue:{},
    title:''
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    wx.setNavigationBarTitle({ title: this.data.title })
  },
  getCatalogue: function(bookId) {
    let id = bookId || '';
    if(bookId==''){
      return false;
    }
    let requestUrl = `https://anhr.top/read/${id}/chapter`;
    let self = this;
    wx.request({
      url: requestUrl, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' ,// 默认值
        'Cache-Control': 'no-cache'
      },
      success: function(res) {
        var data = res.data.mixToc;
        data.chapters.map((item,index)=>{
          item.link = item.link.replace('http://book.my716.com/getBooks.aspx?method=content&', '?')
        });
        self.setData({
          catalogue:data
        })
        wx.hideLoading()
      }
    })
  },
  onShow: function() {
  },
  onLoad: function(params) {
    this.data.title = '目录';
    this.getCatalogue(params.id);
    wx.showLoading({ title: '拼命加载中...' });
  }
})
