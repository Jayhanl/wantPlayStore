<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录想玩</view>
			<input class="u-border-bottom" type="number" maxlength="11" v-model="accountName" placeholder="请输入手机号" />
			<view class="tips">未注册的手机号验证后自动发布想玩账号</view>
			<button @tap="submit" :class="['getCaptcha', accountName ? 'bg-main' : '']">获取短信验证码</button>
			<view class="alternative">
				<view class="password"><!-- 密码登录 --></view>
				<view class="issue">遇到问题</view>
			</view>
		</view>
		<view class="buttom">
			<view class="loginType">
				<u-button :custom-style="btn" border-none plain open-type="getPhoneNumber" @getphonenumber="bindgetphonenumber">
					<view class="wechat item">
						<view class="icon"><u-icon size="70" name="weixin-fill" color="rgb(83,194,64)"></u-icon></view>
						<view class="text">微信</view>
					</view>
				</u-button>

				<u-button :custom-style="btn" border-none plain open-type="getPhoneNumber" @click="doNoting">
					<view class="QQ item">
						<view class="icon"><u-icon size="70" name="qq-fill" color="rgb(17,183,233)"></u-icon></view>
						<view class="text">QQ</view>
					</view>
				</u-button>
			</view>
			<view class="hint">
				登录代表同意
				<text class="color-main">想玩用户协议、隐私政策，</text>
				并授权使用您的想玩账号信息（如昵称、头像、收获地址）以便您统一管理
			</view>
		</view>
		<u-toast ref="uToast" />
		<version />
	</view>
</template>

<script>
export default {
	data() {
		return {
			btn: {
				height: '140rpx',
				paddingTop: '20rpx'
			},
			accountName: ''
		};
	},
	onLoad() {
		// console.log(this.$store.user.token)
	},
	computed: {
		inputStyle() {
			let style = {};
			if (this.accountName) {
				style.color = '#fff';
				style.backgroundColor = this.$u.color['warning'];
			}
			return style;
		}
	},
	methods: {
		// 暂未开放
		doNoting() {
			this.$tools.msg('暂未开放');
		},
		//手机授权
		bindgetphonenumber(e) {
			let that = this;
			if (e.detail.errMsg === 'getPhoneNumber:ok') {
				this.$api('login.wx_login', {
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv
				}).then(res => {
					that.$tools.login(res.data);
					// uni.redirectTo({
					// 	url: '/pages/login/enter',
					// 	success() {
					// 		uni.showToast({
					// 			title: '注册成功'
					// 		});
					// 	}
					// });
				});
			} else {
				this.$tools.msg('登录失败');
			}
		},
		// 注册登录
		submit() {
			if (this.$u.test.mobile(this.accountName)) {
				this.$Router.push({
					path: '/pages/login/code',
					query: { accountName: this.accountName }
				});
			} else {
				this.$refs.uToast.show({
					title: '请输入正确的手机号码',
					type: 'error',
					icon: false
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.getCaptcha {
			background-color: rgb(240, 193, 199);
			color: $u-tips-color;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;

			&::after {
				border: none;
			}
		}
		.alternative {
			color: $u-tips-color;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
	.buttom {
		.loginType {
			display: flex;
			padding: 200rpx 150rpx 100rpx;
			justify-content: space-between;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: $u-content-color;
				font-size: 28rpx;
			}
			.text {
				margin-top: -20rpx;
			}
		}
		.hint {
			padding: 20rpx 40rpx;
			font-size: 20rpx;
			color: $u-tips-color;
		}
	}
}
</style>
