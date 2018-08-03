//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    title:'',
    rankings: {}, //数据
    rank: {},
    femaleIds:[]//女频排行id
  },
  //事件处理函数
  bindViewTap: function() {
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    wx.setNavigationBarTitle({ title: this.data.title })
  },
  getBookList: function(rankId) {
    let id = rankId || '54d43709fd6ec9ae04184aa5';
    let requestUrl = `https://anhr.top/getRanking?RankId=${id}`;
    let self = this;
    wx.request({
      url: requestUrl, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.hideLoading()
        let data = res.data.ranking
        data.books.map((item, index) => {
          item.cover = decodeURIComponent(item.cover.replace('/agent/', ''));
        });
        self.setData({
          rankings:data
        })
      }
    })
  },
  onShow: function() {
    // this.getRankList();
  },
  onLoad: function(params) {
    wx.showLoading({ title: '拼命加载中...' })
    this.getBookList(params.id)
    this.data.title = params.title;
  },
  getUserInfo: function(e) {}
})
