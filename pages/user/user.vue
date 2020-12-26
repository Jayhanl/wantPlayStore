<template>
	<view class="content">
		<!-- 钱包 -->
		<view class="cell_cont">
			<u-cell-group><u-cell-item icon="red-packet-fill" title="钱包" value="收益明细" @click="goD"></u-cell-item></u-cell-group>
			<view class="u-flex data_cont">
				<view class="item">
					<text>5</text>
					<text class="name">今日收益</text>
				</view>
				<view class="item">
					<text>5</text>
					<text class="name">总收益</text>
				</view>
				<view class="item">
					<text>5</text>
					<text class="name">钱包余额</text>
				</view>
			</view>
		</view>
		<!-- 今日经营数据 -->
		<view class="cell_cont">
			<u-cell-group><u-cell-item icon="calendar-fill" title="今日经营数据" value="查看全部订单" @click="goD"></u-cell-item></u-cell-group>
			<view class="u-flex data_cont">
				<u-grid :col="4" :border="false">
					<u-grid-item>
						<view class="grid-num">5</view>
						<view class="grid-text">优惠下单/领取人数</view>
					</u-grid-item>
					<u-grid-item>
						<view class="grid-num">5</view>
						<view class="grid-text">优惠使用人数</view>
					</u-grid-item>
					<u-grid-item>
						<view class="grid-num">5</view>
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
		<view class="cell_cont">
			<u-cell-group><u-cell-item icon="setting-fill" title="推荐工具" :arrow="false"></u-cell-item></u-cell-group>
			<view class="u-flex data_cont">
				<u-grid :col="3" :border="false">
					<u-grid-item>
						<u-icon name="photo" :size="46"></u-icon>
						<view class="grid-text">签到</view>
					</u-grid-item>
					<u-grid-item>
						<u-icon name="lock" :size="46"></u-icon>
						<view class="grid-text">品牌加盟</view>
					</u-grid-item>
					<u-grid-item>
						<view class="grid-num">5</view>
						<view class="grid-text">品牌加盟</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			mode: 'date'
		};
	},
	methods: {
		goD() {
			console.log(123);
		}
	}
};
</script>

<style lang="scss">
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #fdfdfd;
	padding: 20rpx;
	.grid-num{
		font-size: 38rpx;
		font-weight: bold;
		color: #f06c7a;
	}
	.grid-text{
		font-size: 26rpx;
		padding: 0 20rpx;
		color: $u-type-info;
		min-height: 68rpx;
	}
	.cell_cont {
		width: 100%;
		margin: 20rpx;
		background-color: #fff;
		border-radius: 10rpx;
		box-shadow: 0 2rpx 8rpx rgba(241, 241, 241, 1);
		.data_cont {
			height: 180rpx;
			width: 100%;
			.item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				flex: 1;
				font-size: 38rpx;
				padding: 0 20rpx;
				color: #f06c7a;
				.name {
					// color: rgba(193, 237, 255, 0.6);
					color: $u-content-color;
					margin-top: 16rpx;
					font-size: 30rpx;
				}
			}
		}
	}
}
</style>
