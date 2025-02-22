import Request from './request'
import apiList from './api'
import store from '@/common/store/index.js'
import tools from '@/common/utils/tools'

export default function api(url, data = {}, loading = false) {
	const request = new Request();
	let api = getApiObj(url);

	request.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
		if (api.loading || loading) uni.showLoading({
			title: api.msg || ''
		})

		let tokenFlag = store.getters.loginFlag;
		if (api.auth && !tokenFlag) {
			store.commit('OUT_LOGIN');
			console.log('暂未登录,已阻止此次API请求~');
			throw ('暂未登录,已阻止此次API请求~');
		}
		if (tokenFlag) {
			//token 即为登录token
			config.header.Authorization = store.state.user.tokenInfo.token;
		}
		return config
	});

	request.interceptor.response((response) => { /* 请求之后拦截器 */
		uni.hideLoading() //停止加载
		uni.hideNavigationBarLoading() //完成停止加载
		uni.stopPullDownRefresh() //停止下拉刷新
		let resData = response.data
		if (response.statusCode === 401) { // 服务端返回的状态码不等于200，则reject()
			uni.showToast({
				title: resData.data.errMsg || '请求出错,稍后重试',
				icon: 'none',
				duration: 2000,
				mask: true
			});
			//401代表token失效
			store.commit('OUT_LOGIN');
			tools.wxLogin()
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
		uni.hideLoading() //停止加载
		uni.hideNavigationBarLoading() //完成停止加载
		uni.stopPullDownRefresh() //停止下拉刷新
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
		urlType: api.urlType,
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
