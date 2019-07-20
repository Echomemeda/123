/**
 * 调用百度EasyDL、classification示例代码
 * 只提供了一个EasyDL、classification接口的封装。可以根据自己的需求封装即可
 */
let access_token = ''//自己的accessToken 根据实际情况可以进行封装 自动获取token
let easydlUrl = 'https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general';//替换自己训练且已经发布的接口地址
let classificationGenerallUrl = 'https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general';//classification通用识别接口
//EasyDL接口 图片数据 返回结果条数 根据物体 分类 文本 请修改第二个参数哦
let easyDLRequest = (base64Img,topNum,callback)=>{
  //拼接接口body参数
  let params = {
     top_num:topNum,
     image:base64Img
  }
  //发送接口请求
  wx.request({
    url: easydlUrl + '?access_token=' + access_token,
    data:params,
    header: {
      'content-type': 'application/json'
    },
    method: 'POST',
    success:function(res){
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}
//classification通用识别接口 图片base64 只是简单示例 别的参数如何封装建议自己学习一下JavaScript
let classificationGeneralRequestByImage = (access_token,base64Img,callback) => {
  //拼接接口body参数
  let params = {
    access_token:access_token,
    detect_direction:true,
    image: base64Img
  }
  //发送接口请求
  wx.request({
    url: classificationGenerallUrl + '?access_token=' + access_token,
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}
//暴露出去的接口
module.exports = {
  easyDLRequest: easyDLRequest,
  classificationGeneralRequestByImage: classificationGeneralRequestByImage
}