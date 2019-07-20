var app = getApp();
var api = require('../../utils/baiduai.js');

Page({
  data: {
    motto: '垃圾分类识别',
    result: [],
    images: {},
    img: '',
    base64img: '',
    access_token:'24.b499d57e7fa6e84ac55899d04702f349.2592000.1564676821.282335-16689552',
    table_color:''
    
  },
  onShareAppMessage: function () {
    return {
      title: '垃圾分类识别小程序',
      path: '/pages/classification/classification',
      success: function (res) {
        if (res.errMsg == 'shareAppMessage:ok') {
          wx.showToast({
            title: '分享成功',
            icon: 'success',
            duration: 500
          });
        }
      },
      fail: function (res) {
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          wx.showToast({
            title: '分享取消',
            icon: 'loading',
            duration: 500
          })
        }
      }
    }
  },
  clear: function (event) {
    console.info(event);
    wx.clearStorage();
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  uploads_sh: function () {
    
    
    var that = this;
    var access_token = this.data.access_token;
    that.setData({
      table_color: 'rgb(26, 160, 225)'
    });
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        //console.log( res )
        if (res.tempFiles[0].size > 4096 * 1024) {
          wx.showToast({
            title: '图片文件过大哦',
            icon: 'none',
            mask: true,
            duration: 1500
          })
        } else {
          that.setData({
            img: res.tempFilePaths[0]
          })
        }


        //acess_token获取,qs:需要多次尝试
        wx.request({
          url: 'https://aip.baidubce.com/oauth/2.0/token', //是真实的接口地址
          data: {
            grant_type: 'client_credentials',
            client_id: 'U1pwa4ID7RwRSWjA2GhAiCB7',//用你创建的应用的API Key
            client_secret: 'MI0BdqYtgnmqopYOsVVTSfwzQiUeOZGZ'//用你创建的应用的Secret Key
          },
          header: {
            'Content-Type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data.access_token)
            that.setData({
              access_token: res.data.access_token//获取到token
            })
          }
        })

        console.log(access_token+'ok')



        wx.showLoading({
          title: "垃圾识别中...",
          mask: true
        })
        //根据上传的图片读取图片的base64
        var fs = wx.getFileSystemManager();
        fs.readFile({
          filePath: res.tempFilePaths[0].toString(),
          encoding: 'base64',
          success(res) {
            //获取到图片的base64 进行请求接口
            api.classificationGeneralRequestByImage(that.data.access_token,res.data,{
              success(res) {
                console.info(typeof (res.error_code) == "undefined");
                console.log(access_token);
                if (typeof (res.error_code) != "undefined") {
                  wx.hideLoading();
                  wx.showModal({
                    showCancel: false,
                    title: '错误码:' + res.error_code,
                    content: '错误信息:' + res.error_msg
                  })
                } else {
                  if (res.result.length > 0) {
                    wx.hideLoading();
                    let dataList = res.result;
                    //如果需要处理可以在这里操作哦
                    console.log(dataList);
                    dataList[3]=[];
                    dataList[4] = [];
                    dataList[2] = [];
                    dataList[1] = [];
                     for(var i=0;i<=0;i++){
                       var name=dataList[i].keyword;
                       if (app.globalData.recyclable_trash.indexOf(name)!=-1){
                         dataList[i].root='可回收垃圾';
                       }
                       else if (app.globalData.non_recyclable_trash.indexOf(name) != -1) {
                         dataList[i].root = '不可回收垃圾';
                       }
                       else if (app.globalData.dry_trash.indexOf(name) != -1) {
                         dataList[i].root = '干垃圾';
                       }
                       else if (app.globalData.wet_trash.indexOf(name) != -1) {
                         dataList[i].root = '湿垃圾';
                       }
                       else{
                          dataList[i].root = '可回收垃圾';
                       };
                     }
                    console.log(dataList);
                    that.setData({
                      result: dataList
                    })
                  } else {
                    wx.hideLoading();
                    wx.showModal({
                      showCancel: false,
                      title: '温馨提示',
                      content: '貌似没有识别出结果'
                    })
                  }
                }
              }
            })
          }
        })
      },
    })
  },

  uploads_bj: function () {
    var that = this
    that.setData({
      table_color: 'rgb(233, 145, 160)'
    });
    var access_token = this.data.access_token
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        //console.log( res )
        if (res.tempFiles[0].size > 4096 * 1024) {
          wx.showToast({
            title: '图片文件过大哦',
            icon: 'none',
            mask: true,
            duration: 1500
          })
        } else {
          that.setData({
            img: res.tempFilePaths[0]
          })
        }


        //acess_token获取,qs:需要多次尝试
        wx.request({
          url: 'https://aip.baidubce.com/oauth/2.0/token', //是真实的接口地址
          data: {
            grant_type: 'client_credentials',
            client_id: 'U1pwa4ID7RwRSWjA2GhAiCB7',//用你创建的应用的API Key
            client_secret: 'MI0BdqYtgnmqopYOsVVTSfwzQiUeOZGZ'//用你创建的应用的Secret Key
          },
          header: {
            'Content-Type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data.access_token)
            that.setData({
              access_token: res.data.access_token//获取到token
            })
          }
        })

        console.log(access_token + 'ok')



        wx.showLoading({
          title: "垃圾识别中...",
          mask: true
        })
        //根据上传的图片读取图片的base64
        var fs = wx.getFileSystemManager();
        fs.readFile({
          filePath: res.tempFilePaths[0].toString(),
          encoding: 'base64',
          success(res) {
            //获取到图片的base64 进行请求接口
            api.classificationGeneralRequestByImage(that.data.access_token, res.data, {
              success(res) {
                console.info(typeof (res.error_code) == "undefined");
                console.log(access_token);
                if (typeof (res.error_code) != "undefined") {
                  wx.hideLoading();
                  wx.showModal({
                    showCancel: false,
                    title: '错误码:' + res.error_code,
                    content: '错误信息:' + res.error_msg
                  })
                } else {
                  if (res.result.length > 0) {
                    wx.hideLoading();
                    let dataList = res.result;
                    //如果需要处理可以在这里操作哦
                    console.log(dataList);
                    dataList[3] = [];
                    dataList[4] = [];
                    dataList[2] = [];
                    for (var i = 0; i <= 0; i++) {
                      var name = dataList[i].keyword;
                      if (app.globalData.recyclable_trash.indexOf(name) != -1) {
                        dataList[i].root = '可回收垃圾';
                      }
                      else if (app.globalData.non_recyclable_trash.indexOf(name) != -1) {
                        dataList[i].root = '不可回收垃圾';
                      }
                      else if (app.globalData.dry_trash.indexOf(name) != -1) {
                        dataList[i].root = '干垃圾';
                      }
                      else if (app.globalData.wet_trash.indexOf(name) != -1) {
                        dataList[i].root = '湿垃圾';
                      }
                      else {
                        dataList[i].root = '可回收垃圾';
                      };
                    }
                    console.log(dataList);
                    that.setData({
                      result: dataList
                    })
                  } else {
                    wx.hideLoading();
                    wx.showModal({
                      showCancel: false,
                      title: '温馨提示',
                      content: '貌似没有识别出结果'
                    })
                  }
                }
              }
            })
          }
        })
      },
    })
  },


  onLoad: function () {
  }
});