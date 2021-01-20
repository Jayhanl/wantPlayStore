<template>
	<view class="wrap">
		<view class="key-input">
			<view class="title">输入验证码</view>
			<view class="tips">验证码已发送至 +{{ tel }}</view>
			<u-message-input :focus="true" @finish="register" mode="bottomLine" :maxlength="6"></u-message-input>
			<text :class="{ error: error }">验证码错误，请重新输入</text>
			<view class="captcha">
				<text :class="{ noCaptcha: show }" @click="getCode">重新获取</text>
				<text :class="{ regain: !show }">{{ second }}秒后重新获取验证码</text>
			</view>
		</view>
		<!-- <button @click="register" :disabled="accountCode.length !== 6" :class="['getCaptcha', accountCode.length === 6 ? 'bg-main' : '']">完成注册</button> -->
		<u-toast ref="uToast" />
		<version />
	</view>
</template>

<script>
export default {
	data() {
		return {
			accountName: '',
			tel: '',
			accountCode: '',
			second: 60,
			show: true,
			error: false,
			codeTime: ''
		};
	},
	computed: {},
	onLoad(e) {
		if (this.$Route.query.accountName) {
			this.accountName = this.$Route.query.accountName;
			this.tel = this.accountName.replace(/^(\d{3})\d*(\d{4})$/, '$1****$2');
			this.getCode();
		}
	},
	methods: {
		//获取验证码
		getCode() {
			if (!this.accountName) {
				uni.showToast({
					title: '手机号码有误',
					icon: 'none'
				});
				uni.navigateBack();
			}
			this.$api('login.login_code', {
				accountName: this.accountName
			}).then(res => {
				this.show = false;
				this.codeTime = setInterval(() => {
					this.second--;
					if (this.second <= 0) {
						this.show = true;
						// if (this.value.lenth != 4) {
						// 	this.error = true;
						// }
						clearInterval(this.codeTime);
					}
				}, 1000);
				uni.showToast({
					title: '已发送'
				});
				console.log(res);
			});
		},
		//注册登录
		register(value) {
			this.accountCode = value;
			this.$api('login.account_login', {
				accountName: this.accountName,
				accountCode: this.accountCode
			})
				.then(res => {
					this.$tools.login(res.data);
					// uni.redirectTo({
					// 	url: '/pages/login/enter',
					// 	success() {
					// 		uni.showToast({
					// 			title: '注册成功'
					// 		});
					// 	}
					// });
				})
		},
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	padding: 60rpx;
}

.box {
	margin: 30rpx 0;
	font-size: 30rpx;
	color: 555;
}

.key-input {
	padding: 30rpx 0;
	text {
		display: none;
	}
	.error {
		display: block;
		color: red;
		font-size: 30rpx;
		margin: 20rpx 0;
	}
}

.title {
	font-size: 50rpx;
	color: #333;
}

.key-input .tips {
	font-size: 30rpx;
	color: #333;
	margin-top: 20rpx;
	margin-bottom: 60rpx;
}
.captcha {
	color: $u-type-warning;
	font-size: 30rpx;
	margin-top: 40rpx;
	.noCaptcha {
		display: block;
	}
	.regain {
		display: block;
	}
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
</style>
