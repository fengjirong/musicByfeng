const AV = require("../../libs/av-weapp-min");
var app=getApp()
Page({


  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: "http://lc-9qxpppvr.cn-n1.lcfile.com/9c1af72ea0506789a9b9.jpg",
    searchValue:'',
    centent_Show: true,
    searchTop:false,
    bgimage: '',
    toName:'',
    songName:''
  },

  searchValueInput: function (e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value,
    });
  },

  sousuoButton:function(){
      var that=this;
      var nameQuery1 = new AV.Query('_File');
      nameQuery1.contains('name', that.data.searchValue);
      var nameQuery2 = new AV.Query('_File');
      nameQuery2.contains('name', '.mp3');
      var query = new AV.Query.and(nameQuery1, nameQuery2);
      query.find().then(function (results) {
        // results is an array of AV.Object.
        //将data转成json格式
        //转为数组
        var jsonObj = JSON.parse(JSON.stringify(results));
        app.globalData.musicList=jsonObj.concat();
        if (jsonObj.length == 0) {
          that.setData({
            centent_Show: false,
          });
          return;
        }
          that.setData({
            json: app.globalData.musicList,
            searchTop:true,
            bgimage: "http://lc-9qxpppvr.cn-n1.lcfile.com/9c1af72ea0506789a9b9.jpg",
            centent_Show:true
          });
          console.log(that.data.c)
      }, function (error) {
        console.log(error);
        // error is an instance of AVError.
      });
  },
  //点击底部音乐bar进入play界面
  littlebar: function () {
    var pages=getCurrentPages();
    var playingPage=pages[pages.length-2];
    playingPage.setData({
      angle:app.globalData.angle,
    })
    wx.navigateBack();
  },
  //点击清单跳转到播放界面
  playTheMusic:function(e){
    console.log(e.currentTarget.dataset.name);
    this.setData({
      toName: e.currentTarget.dataset.name
    });
    var songUrl = e.currentTarget.dataset.url;
    var songName = e.currentTarget.dataset.name;
    app.globalData.songName = songName;
    var theUrl = "../playing/playing?songUrl=" + songUrl + "&songName=" + songName
    wx.redirectTo({
      url: theUrl,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /** 
     * 监听音乐播放 
     */
    wx.onBackgroundAudioPlay(function () {
      // callback
      console.log('onBackgroundAudioPlay')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      searchTop: false,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      songName: app.globalData.songName ,
      json: app.globalData.musicList,
      searchTop: true,
    }); 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
})
