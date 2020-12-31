<template>
	<view class="content">
		<!-- 用户信息 -->
		<view class="user">
			<view class="u-flex u-p-30">
				<u-avatar :src="storeD.merchLogo" show-level size="100"></u-avatar>
				<view class="right">
					<view class="u-font-32 u-p-b-10">{{storeD.merchName}}</view>
					<view class="u-flex">
						<uni-rate disabled disabledColor="#FED150" size="20" allow-half :value="3.5" />
						<text class="u-p-l-20">4.5</text>
					</view>
				</view>
			</view>

			<view class="u-flex u-p-t-20">
				<view class="u-flex-1 u-flex-col u-col-center">
					<u-icon name="scan" size="70"></u-icon>
					<text class="u-p-t-10 u-font-30">核销</text>
				</view>
				<view class="u-flex-1 u-flex-col u-col-center">
					<u-icon name="qrcode" custom-prefix="custom-icon" size="70"></u-icon>
					<text class="u-p-t-10 u-font-30">商家码</text>
				</view>
			</view>
		</view>
		<!-- 数据及工具 -->
		<view class="tools">
			<!-- 钱包 -->
			<view class="cell-cont">
				<u-cell-group><u-cell-item icon="red-packet-fill" :icon-style="{color:'#F06C7A'}" title="钱包" value="收益明细" @click="goWallet"></u-cell-item></u-cell-group>
				<view class="u-flex data-cont">
					<u-grid :col="3" :border="false">
						<u-grid-item>
							<view class="grid-num">{{ totalD.tEarnings }}</view>
							<view class="grid-text">今日收益</view>
						</u-grid-item>
						<u-grid-item>
							<view class="grid-num">{{ totalIncome }}</view>
							<view class="grid-text">总收益</view>
						</u-grid-item>
						<u-grid-item>
							<view class="grid-num">{{ infoD.balance }}</view>
							<view class="grid-text">钱包余额</view>
						</u-grid-item>
					</u-grid>
				</view>
			</view>
			<!-- 今日经营数据 -->
			<view class="cell-cont">
				<u-cell-group><u-cell-item icon="calendar-fill" :icon-style="{color:'#F06C7A'}" title="今日经营数据" value="查看全部订单" @click="goD"></u-cell-item></u-cell-group>
				<view class="u-flex data-cont">
					<u-grid :col="4" :border="false">
						<u-grid-item>
							<view class="grid-num">{{ totalD.tGet }}</view>
							<view class="grid-text">优惠下单/领取人数</view>
						</u-grid-item>
						<u-grid-item>
							<view class="grid-num">{{ totalD.tUse }}</view>
							<view class="grid-text">优惠使用人数</view>
						</u-grid-item>
						<u-grid-item>
							<view class="grid-num">{{ totalD.tRefund }}</view>
							<view class="grid-text">退款人数</view>
						</u-grid-item>
						<u-grid-item>
							<view class="grid-num">5</view>
							<view class="grid-text">总体评价</view>
						</u-grid-item>
					</u-grid>
				</view>
			</view>
			<!-- 推荐工具 -->
			<view class="cell-cont">
				<u-cell-group><u-cell-item icon="setting-fill" :icon-style="{color:'#F06C7A'}" title="推荐工具" :arrow="false"></u-cell-item></u-cell-group>
				<view class="u-flex data-cont">
					<u-grid :col="3" :border="false">
						<u-grid-item>
							<u-icon name="sign" custom-prefix="custom-icon" :size="46" color="#3998EA"></u-icon>
							<view class="grid-text">签到</view>
						</u-grid-item>
						<u-grid-item>
							<u-icon name="consociation" custom-prefix="custom-icon" :size="46" color="#3998EA"></u-icon>
							<view class="grid-text">品牌加盟</view>
						</u-grid-item>
					</u-grid>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			totalD: {},
			infoD: {},
			storeD: {}
		};
	},
	computed: {
		totalIncome: function() {
			return this.$tools.accAdd(this.$tools.accAdd(this.infoD.tgEarningsTotal, this.infoD.orderEarningsTotal), this.totalD.tEarnings);
		}
	},
	onPullDownRefresh() {
		this.getData();
		this.getStore('刷新成功');
	},
	onLoad() {
		this.getData();
		this.getStore();
	},
	methods: {
		// 前往钱包
		goWallet() {
			this.$Router.push({
				name: 'user_wallet'
			});
		},
		//获取统计数据
		getData() {
			this.$api('mine.total').then(res => {
				this.totalD = res.data;
			});
		},
		//获取商家数据
		getStore(msg) {
			this.$api('store.data', {
				info: true,
				store: true
			}).then(res => {
				if (msg) {
					uni.showToast({
						title: msg
					});
				}
				this.infoD = res.data.info;
				this.storeD = res.data.store;
			});
		}
	}
};
</script>

<style lang="scss">
.content {
	background-color: #fdfdfd;
	.user {
		// min-height: 300rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-bottom: 20rpx;
		color: #fff;
		background-color: #f06c7a;
		.right {
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin-left: 30rpx;
		}
		.user-gird {
			color: #fff;
			background-color: #f06c7a;
		}
	}
	.grid-num {
		font-size: 38rpx;
		font-weight: bold;
		color: #f06c7a;
	}
	.grid-text {
		padding: 0 20rpx;
		margin-top: 10rpx;
		font-size: 26rpx;
		color: $u-type-info;
	}
	.tools {
		padding: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.cell-cont {
		width: 100%;
		margin: 20rpx;
		background-color: #fff;
		border-radius: 10rpx;
		box-shadow: 0 2rpx 8rpx rgba(241, 241, 241, 1);
		.data-cont {
			width: 100%;
		}
	}
	.u-grid {
		align-items: flex-start;
	}
}
</style>
