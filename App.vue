<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		this.$tools.wxLogin()
		// let that = this
		// uni.login({
		// 	provider: 'weixin',
		// 	success: function(res) {
		// 		console.log(res.code);
		// 		that.$api('login.wx_session', {
		// 			code: res.code
		// 		}).then(res => {
		// 			that.$store.commit('TOKEN_INFO', res.data);
		// 			console.log(that.$store.state)
		// 		});
		// 	}
		// });
		// uni.getSystemInfo({
		// 	success(res) {
		// 		console.log(res)
		// 	}
		// })
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import 'uview-ui/index.scss';
</style>
