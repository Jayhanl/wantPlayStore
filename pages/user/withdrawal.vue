<template>
	<view class="content">
		<view class="header">
			<u-cell-group>
				<u-cell-item
					icon="weixin-circle-fill"
					icon-size="90"
					:icon-style="{ color: '#04BE02', marginRight: '36rpx' }"
					:border-bottom="false"
					title="微信钱包"
					label="1-2个工作日审核"
					@click="showTip"
				></u-cell-item>
			</u-cell-group>
		</view>
		<view class="main">
			<view class="u-tips-color">提现金额</view>
			<view class="withdrawal">
				<text class="price">¥</text>
				<u-input v-model="withdrawalPrice" :custom-style="withdrawalInput" :focus="true" type="number" maxlength="8" :placeholder="placeholder" />
			</view>
			<view class="u-tips-color">可用余额 {{infoD.balance}}元</view>
		</view>
		<view class="notice">
			<view style="padding: 20rpx;"><u-button type="primary" @click="withdrawal">确认提现</u-button></view>
			<text class="title">注意：</text>
			<text>1、微信提现会提现到当前登录本平台的微信中;</text>
			<text>2、微信提现将会1-2个工作日审核完毕后完成;</text>
			<text>4、平台会收取提现金额的1%作为手续费.</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			placeholder:'',
			withdrawalPrice: '',
			infoD: {},
			withdrawalInput: {
				height: '120rpx',
				lineHeight: '120rpx',
				fontSize: '70rpx',
				fontWeight: 'bold'
			}
		};
	},
	onLoad() {
		this.getStore();
	},
	methods: {
		// 更换提现方式
		showTip(){
			this.$tools.msg('暂时仅支持提现到微信钱包');
		},
		// 提现
		withdrawal() {
			if (!this.$tools.isNumber(this.withdrawalPrice) || this.withdrawalPrice <= 0) {
				this.$tools.msg('请输入正确的提现金额');
			} else {
				this.$api('wallet.withdrawal', {
					txNum: this.withdrawalPrice,
					txType: 1
				}).then(res => {
					uni.showToast({
						title: '提现成功'
					});
					setTimeout(() => this.$Router.back(1), 800);
				});
			}
		},
		//获取商家数据
		getStore() {
			this.$api('store.data', {
				info: true
			}).then(res => {
				console.log(res);
				this.infoD = res.data.info;
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	background-color: #f6f6f6;
	.header {
		padding: 30rpx 0;
		// background-color: #f6f6f6;
	}
	.main {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 40rpx 40rpx;

		.withdrawal {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin: 40rpx 0;
			border-bottom: 1px solid #eee;
			.price {
				font-size: 50rpx;
				font-weight: bold;
				margin-right: 18rpx;
			}
			// text-decoration: underline
		}
	}

	.notice {
		background-color: #fff;
		display: flex;
		flex-direction: column;
		font-size: 24rpx;
		padding: 20rpx 40rpx;
		.title {
			font-size: 26rpx;
			font-weight: bold;
			margin-top: 40rpx;
		}
		& > text {
			margin: 4rpx 0;
		}
	}
}
</style>
