//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    rankingList: [], //数据
    hotWorkList:{},//大家都在搜
    queryResult:{},//查询结果
    searchWork:'',
  },
  //大家都在搜
  getHotWork: function(callback) {
    let requestUrl = `https://anhr.top/search/hot-word`;
    let self = this;
    wx.request({
      url: requestUrl, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.hideLoading()
        let data = res.data;
        self.setData({
          hotWorkList:data
        })
      }
    })
  },
  saveText:function(e){
    this.setData({
      searchWork: e.detail.value
    })
  },
  //搜索借口
  searchWork: function() {
    let work = this.data.searchWork || '';
    if(work==''){
      return false;
    }
    console.log(work)
    let requestUrl = `https://anhr.top/search/query?word=${work}`;
    let self = this;
    wx.request({
      url: requestUrl, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.hideLoading()
        let data = res.data;

        data.books.map((item,index)=>{
          console.log(item,'<<<<<<<<<<item')
          item.cover = item.cover.replace('/agent/','');
        })
        self.setData({
          queryResult:data
        })
      }
    })
  },
  onShow: function() {
  },
  onLoad: function() {
    wx.showLoading({ title: '拼命加载中...' });
    this.getHotWork();
    this.searchWork('你')
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
