/**
 * 接口列表文件
 * auth代表接口是否需要token
 */
export default {
	/** 登录 **/
	login: {
		register_code: {//手机注册验证码
			url: 'login/register_code',
			auth: false,
			method: 'GET',
			loading: true,
			msg: '请求中'
			// desc: '初始化数据',
		},
		wx_session: {//微信code
			url: 'login/wx_session',
			auth: false,
			method: 'GET',
			loading: true,
			msg: '请求中'
		},
		account_register: {//手机账号注册
			url: 'login/account_register',
			auth: false,
			method: 'POST',
			loading: true,
		},
		create_data: {//商户入驻
			url: 'login/create_data',
			auth: false,
			method: 'POST',
			loading: true,
			msg: '提交中'
		},
	},

	/** 数据模块 ↓ **/
	data: {
		homepage: {//首页数据
			url: 'data/homepage',
			auth: false,
			method: 'GET',
			loading: true,
		},
		merch_cate: {//商家主营类型
			url: 'data/merch_cate',
			auth: false,
			method: 'GET',
		},
		merch_label: {//商家标签
			url: 'data/merch_label',
			auth: false,
			method: 'GET',
		},
	},

	/** 商家模块 ↓ **/
	store: {
		data: {//获取店铺信息
			url: 'store/data',
			auth: false,
			method: 'GET',
			loading: true,
		},
		update_info: {//更新店铺信息
			url: 'store/update_info',
			auth: false,
			method: 'PUT',
			loading: true,
		},
		update_logo: {//更新店铺logo
			url: 'store/update_logo',
			auth: false,
			method: 'POST',
			loading: true,
		},
		update_banner: {//更新店铺banner
			url: 'store/update_banner',
			auth: false,
			method: 'POST',
			loading: true,
		},
		open_store: {//开店
			url: 'store/open_store',
			auth: false,
			method: 'PUT',
			loading: true,
		},
		close_store: {//关店
			url: 'store/close_store',
			auth: false,
			method: 'PUT',
			loading: true,
		},
		lltg_list: {//获取开放推广列表
			url: 'store/lltg_list',
			auth: false,
			method: 'GET',
			loading: true,
		},
		tgw_list: {//推广位列表
			url: 'store/tgw_list',
			auth: false,
			method: 'GET',
			loading: true,
		},
		add_tgwtg: {//添加开放推广
			url: 'store/add_tgwtg',
			auth: false,
			method: 'POST',
			loading: true,
		},
		pause_tgwtg: {//暂停推广
			url: 'store/pause_tgwtg',
			auth: false,
			method: 'PUT',
			loading: true,
		},
		start_tgwtg: {//重新开始推广
			url: 'store/start_tgwtg',
			auth: false,
			method: 'PUT',
			loading: true,
		},
		stop_tgwtg: {//终止推广
			url: 'store/stop_tgwtg',
			auth: false,
			method: 'PUT',
			loading: true,
		},
		allow_tgwtg: {//允许邀请
			url: 'store/allow_tgwtg',
			auth: false,
			method: 'PUT',
			loading: true,
		},
		refuse_tgwtg: {//拒绝邀请
			url: 'store/refuse_tgwtg',
			auth: false,
			method: 'PUT',
			loading: true,
		},
	},


	/** 上传Base64图片 ↓ **/
	uploadBase64: {
		url: 'index/uploadBase64',
		auth: false,
		method: 'POST',
		// desc: '上传Base64位图片',
	},

	/** 用户 ↓ **/
	user: {
		info: {
			url: 'user',
			auth: true,
			method: 'GET',
			// desc: '用户信息',
		},

		profile: {
			url: 'user/profile',
			auth: true,
			method: 'POST',
			// desc: '修改用户信息',
		},

		changeMobile: {
			url: 'user/changemobile',
			auth: true,
			method: 'POST',
			// desc: '修改手机号',
		},

	},

	/** 短信 ↓ **/
	sms: {
		send: {
			url: 'sms/send',
			auth: false,
			method: 'POST',
			// desc: '发送短信',
		},
	},

};
