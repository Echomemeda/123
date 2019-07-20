# easydlsmartappdemo

#### 项目介绍
微信小程序 调用百度AI 文字识别、EasyDL接口
无需后台处理图片示例代码

目前demo为调用 **EasyDL、文字识别(通用)**  接口示例

#### 代码使用说明

修改/utils/baiduai.js 中以下部分代码:

```
let accessToken = ''//自己的accessToken 根据实际情况可以进行封装 自动获取token
let easydlUrl = 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/classification/XXX';//替换自己训练且已经发布的接口地址

```
运行即可。记得开发者工具不校验HTTP域名哦。

如需要测试其他接口。参考baiduai.js中的代码修改即可。
在调用的页面JS中记得修改即可。

 **页面Demo为index、ocr目录。**

#### EasyDL示例图

![EasyDL示例图](https://ai.bdstatic.com/file/8AAF926D05C349798947B4A7B18C33A4 "EasyDL示例图")


#### OCR示例图

![OCR示例图](https://images.gitee.com/uploads/images/2019/0115/094036_0d0825ad_131538.jpeg "OCR示例图")


#### 作者的个人小程序:小帅一点资讯

![微信扫一下 体验AI好玩的图像处理](https://images.gitee.com/uploads/images/2018/1123/153613_bca3be13_131538.jpeg "微信扫一下 体验AI好玩的图像处")