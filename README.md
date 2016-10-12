# mui_payment

mui平台原生支付插件 1.0

/*
* 使用说明
* 此插件基于mui.js
* 使用此插件必须在manifest.json中配置payment模块
* 未安装微信 使用微信支付时会触发error错误回调事件
* 未安装支付宝 使用支付宝支付时使用wap支付
* 如发现BUG，请反馈
*
*配置参数
* address : String			[必选]请求支付签名接口的地址
* paymentMethod			[可选]如果传入了btn绑定元素的画使用元素身上的data-type方式，默认支付宝
* type : String 			[可选]请求支付签名接口类似 不填默认post
* data : Json				[可选 根据业务需求]请求支付签名传递的参数 自行配置
* dataType : String		[可选]返回数据格式 默认为空 可自行配置json等
* btn : String				[可选]选择器 触发按钮如果配置了此参数可以直接new Payment().Show();直接调用
* error : Function			[可选]请求支付前面接口失败时触发
*/
