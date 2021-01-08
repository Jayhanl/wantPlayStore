<template>
	<view class="content">
		<view class="discounts-title">直销优惠商品</view>
		<u-cell-group><u-cell-item icon="setting-fill" :icon-style="{ color: '#F06C7A' }" title="推荐工具" :arrow="false"></u-cell-item></u-cell-group>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.content {
	.discounts-title {
		margin: 20rpx 40rpx;
		font-size: 36rpx;
		font-weight: bold;
	}
}
</style>
