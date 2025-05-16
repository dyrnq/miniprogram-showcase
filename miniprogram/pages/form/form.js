// pages/form.js
const FormData = require('../../lib/wx-formdata/formData.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedImage: "",
    selectedImageName: "",
    textVal: "",
    response: "",
  },

handleTextInput: function(event) {
    this.setData({
        textVal:event.detail.value
    })
},

  handleFormSubmit: function(event) {
    console.log(event)
    console.log(this.data.textVal)
    console.log(this.data.selectedImage)

    if (this.data.selectedImage ==''){
      wx.showToast({
        title: "please select image!",
        icon: "none",
        mask: true
      })
      return;
    }

    let formData = new FormData();


    formData.append("name", this.data.textVal);
    formData.appendFile("file", this.data.selectedImage, this.data.selectedImageName);

    let data = formData.getData();
    wx.request({
      url: 'http://127.0.0.1:5588/upload-multipart',
      method: 'POST',
      header: {
        'Content-Type': data.contentType
      },
      data: data.buffer,
      success: (res) => {
        console.log(res.data)
        this.setData(
          {
            response: JSON.stringify(res.data)
          }
        )
      },
      fail: (res) => {
        console.log("request fail")
        wx.showToast({
          title: res.errMsg,
          icon: "none",
          mask: true
        })
      },
      complete: (res) => {
         console.log("request complete")
      }

    })


  },

  handleRemoveImg: function(event) {    
    this.setData({
      selectedImage: "",
      selectedImageName: ""
    })
  },

handleChooseImg: function (event) {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success:(result)=>{
        console.log(result);

        var tempFiles = result.tempFiles;

        tempFiles.forEach(function(file) {
          console.log(JSON.stringify(file));
        });


        var filePath = tempFiles[0].tempFilePath;
        var fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
        console.log(fileName)
        this.setData({
          selectedImage: filePath,
          selectedImageName: fileName
        })
      }
    })
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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