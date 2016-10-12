/*
 *作者：大男人主义
 *邮箱：826541524@qq.com
 *时间：2016-10-12
 *描述：mui支付插件
 * */
function Payment(op){
	this.op = op;
	if(this.op.btn)this.oBtn = mui(this.op.btn);
};
//点击事件
Payment.prototype.Show = function(){
	if(!this.oBtn)return;
	var _this = this;
	mui.each(this.oBtn,function(i,item){
		item.addEventListener('tap',function(){
			_this.PaymentShow.call(_this,this.dataset.type);
		});
	});
};
//支付主函数
Payment.prototype.PaymentShow = function(type){
	//请求签名
	var _this = this;
	mui.ajax({
		"url":this.op.address,
		"type":this.op.type || 'post',
		"data":this.op.data,
		"dataType":this.op.dataType || '',
		"success":function(result){
			_this.Dispose.call(_this,result,type || _this.op.paymentMethod || 'alipay');
		},
		"error":function(){
			_this.op.error&&_this.op.error({"code":1,"msg":'请求签名失败'});
		}
	});
};
//处理支付事宜
Payment.prototype.Dispose = function(result,type){
	//运行plus 避免undefined
	var _this = this;
	type = type || 'alipay';
	mui.plusReady(function(){
		//获取支付对象
		plus.payment.getChannels(function(pList){
			var pay = _this.ReturnObj(pList,type);
			//判断是否为微信支付 是否阿安装微信 PS:支付宝未安装则进行wap版支付操作
			if(type === 'wxpay' && !pay.serviceReady){
				_this.op.error&&_this.op.error({"code":3,"msg":'未安装微信'});
				return;
			};
			//调用原生支付
			plus.payment.request(pay,result,function(){
				_this.op.success&&_this.op.success({"code":0,"msg":'支付成功'});
			},function(err){
				_this.op.error&&_this.op.error({"code":4,"msg":'支付失败',"error":err});
			});
		},function(){
			_this.op.error&&_this.op.error({'code':2,"msg":'获取支付通道失败'});
		});
	});
};
//返回支付对象
Payment.prototype.ReturnObj = function(obj,type){
	for(var key in obj){
		if(obj[key].id == type){ return obj[key]; }
	};
};