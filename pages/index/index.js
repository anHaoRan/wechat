//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    rankings: [], //数据
    rank: {},
    femaleIds:[]//女频排行id
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getBookList: function(rankId,callback) {
    let id = rankId || '54d43709fd6ec9ae04184aa5';
    let requestUrl = `https://anhr.top/getRanking?RankId=${id}`;
    let self = this;
    wx.request({
      url: requestUrl, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        callback()
        let data = res.data.ranking;
        let rank = [];
        let { rankings } = self.data;
        data.books = data.books.splice(0, 3);
        data.books.map((item, index) => {
          item.cover = decodeURIComponent(item.cover.replace('/agent/', ''));
        });
        rank.push(data)
        rankings = rankings.concat(rank);
        self.setData({
          rankings: rankings
        })
      }
    })
  },
  rankingList: function(data) {
    let {
      female,
      male
    } = this.data.rank;
    let femaleIds = [];
    let self = this;
    female.map((item, index) => {
      femaleIds.push(item._id);
    });
    this.setData({
      femaleIds:femaleIds
    });
    this.util();
  },
  util:function(){
    let id = this.data.femaleIds.shift();
    let self = this;
    this.getBookList(id,()=>{
      if(self.data.femaleIds.length>0){
        self.util()
      }
    })
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
        self.setData({
          rank: res.data
        })
        self.rankingList()
      }
    })
  },
  onShow: function() {
    this.getRankList();
  },
  onLoad: function() {
    // this.getBookList();
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
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
