<template>
	<view class="content">
		<view class="u-flex">
			<view class="title">{{ dataD.infoTitle }}</view>
		</view>
		<view class="u-flex u-p-t-20">
			<u-avatar src="" size="60"></u-avatar>
			<text class="u-m-l-12">{{ dataD.issuer }}</text>
			<text class="u-m-l-10 u-tips-color">{{dataD.createTime | timeFrom}}</text>
		</view>
		<div class="desc">
			<u-image :src="dataD.surfaceImg" mode="widthFix"></u-image>
			<text class="desc-text">{{ dataD.infoDesc }}</text>
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			dataD: {}
		};
	},
	onLoad() {
		this.dataD = this.$Route.query.item;
	},
	methods: {
		// 获取详情
		getData() {
			this.$api('info.detail', {
				minfoId: this.minfoId
			}).then(res => {
				console.log(res.data);
				this.dataD = res.data;
				this.voteD = res.data.voteData;
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	// background-color: #fdfdfd;
	padding: 30rpx 24rpx;
	.title {
		flex: 1;
		font-size: 38rpx;
		font-weight: bold;
		margin-right: 20rpx;
	}
	.desc {
		margin-top: 20rpx;
		padding-top: 20rpx;
		border-top: 2rpx solid #eee;
		.desc-text {
		padding-top: 20rpx;
			font-size: 30rpx;
			text-indent: 60rpx;
		}
	}
}
</style>
