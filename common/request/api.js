/**
 * 接口列表文件
 * auth代表接口是否需要token
 */
export default {
	/** 登录 **/
	login: {
		register_code: { //手机注册验证码
			url: 'login/register_code',
			method: 'GET',
			loading: true,
			msg: '请求中'
			// desc: '初始化数据',
		},
		wx_session: { //微信code
			url: 'login/wx_session',
			method: 'GET',
			loading: true,
			msg: '请求中'
		},
		account_register: { //手机账号注册
			url: 'login/account_register',
			method: 'POST',
			loading: true,
		},
		create_data: { //商户入驻
			url: 'login/create_data',
			method: 'POST',
			loading: true,
			msg: '提交中'
		},
	},

	/** 数据模块 ↓ **/
	data: {
		homepage: { //首页数据
			url: 'data/homepage',
			method: 'GET',
			loading: true,
		},
		merch_cate: { //商家主营类型
			url: 'data/merch_cate',
			method: 'GET',
		},
		merch_label: { //商家标签
			url: 'data/merch_label',
			method: 'GET',
		},
	},

	/** 动态模块 ↓ **/
	info: {
		list: { //列表数据
			url: 'info/list',
			method: 'GET',
			loading: false,
		},
		detail: { //列表数据
			url: 'info/detail',
			method: 'GET',
			loading: true,
		},
		create: { //发布
			url: 'info/create',
			method: 'POST',
		},
		'delete': { //删除
			url: 'info/delete',
			method: 'DELETE',
		},
	},

	/** 消息模块 ↓ **/
	session: {
		session_list: { //消息列表数据
			url: 'session/session_list',
			method: 'GET',
		},
		msg_list: { //对话内容
			url: 'session/msg_list',
			method: 'GET',
		},
		send_msg: { //发送消息
			url: 'session/send_msg',
			method: 'POST',
		},
	},

	/** 商家模块 ↓ **/
	store: {
		data: { //获取店铺信息
			url: 'store/data',
			method: 'GET',
		},
		update_info: { //更新店铺信息
			url: 'store/update_info',
			method: 'PUT',
			loading: true,
		},
		update_logo: { //更新店铺logo
			url: 'store/update_logo',
			method: 'POST',
			loading: true,
		},
		update_banner: { //更新店铺banner
			url: 'store/update_banner',
			method: 'POST',
			loading: true,
		},
		open_store: { //开店
			url: 'store/open_store',
			method: 'PUT',
			loading: true,
		},
		close_store: { //关店
			url: 'store/close_store',
			method: 'PUT',
			loading: true,
		},
		lltg_list: { //获取开放推广列表
			url: 'store/lltg_list',
			method: 'GET',
			loading: true,
		},
		tgw_list: { //推广位列表
			url: 'store/tgw_list',
			method: 'GET',
			loading: true,
		},
		add_tgwtg: { //添加开放推广
			url: 'store/add_tgwtg',
			method: 'POST',
			loading: true,
		},
		pause_tgwtg: { //暂停推广
			url: 'store/pause_tgwtg',
			method: 'PUT',
			loading: true,
		},
		start_tgwtg: { //重新开始推广
			url: 'store/start_tgwtg',
			method: 'PUT',
			loading: true,
		},
		stop_tgwtg: { //终止推广
			url: 'store/stop_tgwtg',
			method: 'PUT',
			loading: true,
		},
		allow_tgwtg: { //接受邀请
			url: 'store/allow_tgwtg',
			method: 'PUT',
			loading: true,
		},
		refuse_tgwtg: { //拒绝邀请
			url: 'store/refuse_tgwtg',
			method: 'PUT',
			loading: true,
		},
	},

	/** 平台推广 ↓ **/
	pttg: {
		homepage: { //首页推广位申请
			url: 'pttg/homepage',
			method: 'POST',
			loading: true,
		},
		picked: { //精选商家申请
			url: 'pttg/picked',
			method: 'POST',
		},
		round_top: { //周边商家置顶
			url: 'pttg/round_top',
			method: 'POST',
		},
	},

	/** 流量推广 ↓ **/
	lltg: {
		doing_ist: { //推广中列表
			url: 'lltg/doing_list',
			method: 'GET',
		},
		done_list: { //推广历史列表
			url: 'lltg/done_list',
			method: 'GET',
		},
		detail: { //推广历史详情
			url: 'lltg/detail',
			method: 'GET',
		},
		create: { //发布
			url: 'lltg/create',
			method: 'POST',
			loading: true,
		},
		update: { //更新，是否开放
			url: 'lltg/update',
			method: 'PUT',
			loading: true,
		},
		stop: { //终止推广
			url: 'lltg/stop',
			method: 'PUT',
			loading: true,
		},
		merch_list: { //商家列表
			url: 'lltg/merch_list',
			method: 'GET',
			loading: true,
		},
		invite: { //邀请商家
			url: 'lltg/invite',
			method: 'POST',
			loading: true,
		},
	},

	/** 会员管理 ↓ **/
	member: {
		fans_list: { //关注列表
			url: 'member/fans_list',
			method: 'GET',
		},
		today_list: { //今日顾客列表
			url: 'member/today_list',
			method: 'GET',
		},
	},

	/** 我的模块 ↓ **/
	mine: {
		total: { //统计数据
			url: 'mine/total',
			method: 'GET',
		},
	},

	/** 钱包模块 ↓ **/
	wallet: {
		balance_list: { //余额日志
			url: 'wallet/balance_list',
			method: 'GET',
		},
		withdrawal_list: { //提现申请列表
			url: 'wallet/withdrawal_list',
			method: 'GET',
		},
		withdrawal: { //提现申请
			url: 'wallet/withdrawal',
			method: 'POST',
		},
	},

	/** 商品模块 ↓ **/
	goods: {
		list: { //优惠商品列表
			url: 'goods/data/page',
			urlType: 'Bin',
			method: 'GET',
		},
		add: { //添加优惠商品
			url: 'goods/add',
			urlType: 'Bin',
			method: 'POST',
			loading: true,
		},
		update: { //修改优惠商品
			url: 'goods/update',
			urlType: 'Bin',
			method: 'PUT',
			loading: true,
		},
		delete: { //删除优惠商品
			url: 'goods/delete',
			urlType: 'Bin',
			method: 'DELETE',
			loading: true,
		},
		soldOut: { //上下架优惠商品
			url: 'goods/soldOut',
			urlType: 'Bin',
			method: 'PUT',
			loading: true,
		},
	},

	/** 商品推广模块 ↓ **/
	publicity: {
		need: {
			goods_list: { //目前正在推广的商品
				url: 'publicity/need/goods/data/page',
				urlType: 'Bin',
				method: 'GET',
			},
			goods_add: { //发布推广需求
				url: 'publicity/need/goods/add',
				urlType: 'Bin',
				method: 'POST',
				loading: true,
			},
			goods_update: { //商品修改
				url: 'publicity/need/goods/update',
				urlType: 'Bin',
				method: 'PUT',
				loading: true,
			},
			goods_soldOut: { //上下架推广需求，不影响核销收益计算
				url: 'publicity/need/goods/soldOut',
				urlType: 'Bin',
				method: 'PUT',
				loading: true,
			},
			invite_add: { //邀约推广
				url: 'publicity/need/goods/invite/add',
				urlType: 'Bin',
				method: 'POST',
				loading: true,
			},
		},
		help: {
			goods_list: { //获取自己正在助推的商品
				url: 'publicity/help/goods/data/page',
				urlType: 'Bin',
				method: 'GET',
			},
			platform_list: { //平台所有需要推广的商品列表
				url: 'publicity/help/goods/platform/data/page',
				urlType: 'Bin',
				method: 'GET',
			},
			invite_dispose: { //处理邀约推广
				url: 'publicity/help/goods//invite/dispose',
				urlType: 'Bin',
				method: 'PUT',
				loading: true,
			},
			help_add: { //添加助推商品
				url: 'publicity/help/goods/help/add',
				urlType: 'Bin',
				method: 'PUT',
				loading: true,
			},
			help_soldOut: { //下架助推
				url: 'publicity/help/goods/help/soldOut',
				urlType: 'Bin',
				method: 'PUT',
				loading: true,
			},
		}
	},

	/** 平台商品推广模块 ↓ **/
	platform: {
		platform_list: { //平台推广商品
			url: 'platform/data/page',
			urlType: 'Bin',
			method: 'GET',
		},
		log_list: { //平台推广商品的操作记录
			url: 'platform/log/page',
			urlType: 'Bin',
			method: 'GET',
		},
		add: { //发布推广需求
			url: 'platform/add',
			urlType: 'Bin',
			method: 'POST',
			loading: true,
		},
		update: { //修改平台推广商品
			url: 'platform/update',
			urlType: 'Bin',
			method: 'PUT',
			loading: true,
		},
		delete: { //删除平台优惠券
			url: 'platform/delete',
			urlType: 'Bin',
			method: 'DELETE',
			loading: true,
		},
	},

	/** 优惠券模块 ↓ **/
	coupon: {
		list: { //查看优惠券列表
			url: 'coupon/data/page',
			urlType: 'Bin',
			method: 'GET',
		},
		add: { //发布优惠券
			url: 'coupon/add',
			urlType: 'Bin',
			method: 'POST',
			loading: true,
		},
		update: { //修改优惠券
			url: 'coupon/update',
			urlType: 'Bin',
			method: 'PUT',
			loading: true,
		},
		delete: { //删除优惠券
			url: 'coupon/delete',
			urlType: 'Bin',
			method: 'DELETE',
			loading: true,
		},
	},

	/** 平台商品推广模块 ↓ **/
	discounts_platform: {
		list: { //查看平台推广商品列表
			url: 'platform/data/page',
			urlType: 'Bin',
			method: 'GET',
		},
		log: { //查看平台推广商品操作记录
			url: 'platform/log/page',
			urlType: 'Bin',
			method: 'GET',
		},
		add: { //发布平台推广商品
			url: 'platform/add',
			urlType: 'Bin',
			method: 'POST',
			loading: true,
		},
		update: { //修改平台推广商品
			url: 'platform/update',
			urlType: 'Bin',
			method: 'PUT',
			loading: true,
		},
		delete: { //删除平台推广商品
			url: 'platform/delete',
			urlType: 'Bin',
			method: 'DELETE',
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
			method: 'POST',
			// desc: '发送短信',
		},
	},

};
