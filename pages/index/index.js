//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    current:1,//当前
    rankings: [], //数据
    rank: {},
    femaleIds: [], //女频排行id
    maleIds: [], //男频排行id
    channel: true,
    ids: [],
    items: [{
      name: 'female',
      value: '女频',
      checked: 'true'
    }, {
      name: 'male',
      value: '男频'
    }]
  },
  tebChannel: function(e) {
    let {
      channel
    } = this.data;
    let list = [];
    if (e.detail.value) {
      console.log('true', e.detail.value, '女频');
      this.setData({
        channel: true,
        rankings: list
      })
      this.util();
    } else {
      console.log('false', e.detail.value, '男频');
      this.setData({
        channel: false,
        rankings: list
      })
      this.util();
    }
  },
  radioChange: function(e) {
    let {
      channel
    } = this.data;
    let list = [];
    if (e.detail.value == 'female') {
      console.log('true', e.detail.value, '女频');
      this.setData({
        channel: true,
        rankings: list
      })
      this.util();
    } else {
      console.log('false', e.detail.value, '男频');
      this.setData({
        channel: false,
        rankings: list
      })
      this.util();
    }
  },
  getBookList: function(rankId, callback) {
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
        let {
          rankings,
          current
        } = self.data;
        let o = current;
        self.setData({
          current:o+1
        })
        data.books = data.books.splice(0, 3);
        data.books.map((item, index) => {
          item.cover = decodeURIComponent(item.cover.replace('/agent/', ''));
        });
        rank.push(data);
        rankings = rankings.concat(rank);
        self.setData({
          rankings: rankings
        })
      }
    })
  },
  rankingList: function() {
    let {
      female,
      channel,
      male
    } = this.data.rank;
    let femaleIds = [];
    let maleIds = [];
    let self = this;
    female.map((item, index) => {
      femaleIds.push(item._id);
    });
    male.map((item, index) => {
      maleIds.push(item._id);
    });
    this.setData({
      femaleIds: femaleIds,
      maleIds: maleIds
    });
    this.util();
  },
  util: function() {
    wx.showLoading({
      title: '拼命加载中...'
    })
    let data = [];
    let self = this;
    if (this.data.channel) {
      data = data.concat(this.data.femaleIds);
    } else {
      data = data.concat(this.data.maleIds)
    }
    var nu = data.length;
    this.setData({
      allSize:nu,
      current:0
    })
    function forEach() {
      let id = data.shift();
      self.getBookList(id, () => {
        if (data.length > 0) {
          forEach()
        } else {
          wx.hideLoading()
        }
      })
    }
    forEach();
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
  onShow: function() {},
  onLoad: function() {
    wx.showLoading({
      title: '拼命加载中...'
    })
    this.getRankList();
    console.log(this,'<<<<<<<<<<<<<<<<<<<<<<<globalData')
  }
})
