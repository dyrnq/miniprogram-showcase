// pages/requesttest/requesttest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    response: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {


    wx.request({
      url: 'http://127.0.0.1:15580/greeting', //仅为示例，并非真实的接口地址
      data: {
        name: 'hehe测试',
        other: '测试'
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log(res.data)
        if (res.statusCode != 200){

          wx.showToast({
            title: res.statusCode+"",
            icon: "error",
            mask: true
          })

        }else{
          this.setData({
            response: JSON.stringify(res.data)
          })
        }
      },
      fail: (res) => {
        console.log("request fail")
        wx.showToast({
          title: res.errMsg,
          icon: "error",
          mask: true
        })
      },
      complete: (res) => {
         console.log("request complete")
      }
    });


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})