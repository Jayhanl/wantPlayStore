import Request from './request'
import apiList from './api'
import store from '@/common/store/index.js'
import tools from '@/common/utils/tools'

export default function api(url, data = {}, loading = false) {
	const request = new Request();
	let api = getApiObj(url);

	request.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
		console.log(api.loading)
		if (api.loading || loading) uni.showLoading({
			title: api.msg || ''
		})

		let tokenFlag = store.getters.loginFlag;
		console.log(store)
		console.log(store.getters)
		if (api.auth && !tokenFlag) {
			store.commit('OUT_LOGIN');
			console.log('暂未登录,已阻止此次API请求~');
			throw ('暂未登录,已阻止此次API请求~');
		}
		if (tokenFlag) {
			//token 即为登录token
			console.log(store.state)
			config.header.Authorization = store.state.user.tokenInfo.token;
		}
		return config
	});

	request.interceptor.response((response) => { /* 请求之后拦截器 */
		uni.hideLoading()
		let resData = response.data
		if (resData.data.errCode === 40001) { // 服务端返回的状态码不等于200，则reject()
			uni.showToast({
				title: resData.data.errMsg || '请求出错,稍后重试',
				icon: 'none',
				duration: 2000,
				mask: true
			});
			//401代表token失效
			tools.wxLogin()
			store.commit('OUT_LOGIN');
		}
		if (response.statusCode !== 200) { // 服务端返回的状态码不等于200，则reject()
			uni.showToast({
				title: resData.data.errMsg || '请求出错,稍后重试',
				icon: 'none',
				duration: 2000,
				mask: true
			});
		}
		// if (response.config.custom.verification) { // 演示自定义参数的作用
		//   return resData
		// }
		return response
	}, (response) => { // 预留可以日志上报
		console.log('出错了', response)
		uni.hideLoading()
		uni.showToast({
			title: response.data.data.errMsg || '请求出错,稍后重试',
			icon: 'none',
			duration: 2000,
			mask: true
		});
		return response
	})

	return request.request({
		url: api.url,
		data,
		method: api.method
	})

}

function getApiObj(url) {
	let apiArray = url.split(".");
	let api = apiList;
	apiArray.forEach(v => {
		api = api[v];
	});
	return api;
}
