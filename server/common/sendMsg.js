/**
 * 云通信基础能力业务短信发送、查询详情以及消费消息示例，供参考。
 * Created on 2017-07-31
 */
const SMSClient = require('@alicloud/sms-sdk');
const aliyunConfig = require('./../utils/aliyunConfig');
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = aliyunConfig.accessKey;
const secretAccessKey = aliyunConfig.secretKey;
//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey})



function sendSMS(phoneNum){
    const code = Math.random().toString(4).substr(2,4)
	//发送短信
	return new Promise((resolve,reject)=>{
		smsClient.sendSMS({
				PhoneNumbers: phoneNum,
				SignName: '英雄谱',
				TemplateCode: aliyunConfig.TemplateCode,
				TemplateParam: '{"code":"'+code+'"}'
		}).then(function (res) {
				let {Code}=res
				// if (Code === 'OK') {
				//     //处理返回参数
				//     console.log(res)
				//
				// }
				return res;
				//resolve(res)
		}, function (err) {
				//console.log('--->',err)
				return err;
				//resolve(err)
		}).then((res) => {
			resolve(res)
		})
	})
}

module.exports = {
	sendSMS
}
