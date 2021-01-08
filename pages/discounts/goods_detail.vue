<template>
	<view class="content">
		<!-- <view class="discounts-title">直销优惠商品</view> -->
		<u-cell-group>
			<u-cell-item title="标题" :value="dataD.goodsTitle" :arrow="false"></u-cell-item>
			<u-cell-item title="商品类型" :value="dataD.goodsTypeString" :arrow="false"></u-cell-item>
			<u-cell-item title="商品描述" :value="dataD.goodsDesc" :arrow="false"></u-cell-item>
			<u-cell-item title="商品价值" :value="dataD.goodsValue+'元'" :arrow="false"></u-cell-item>
			<u-cell-item title="开始时间" :value="dataD.issueStartDate" :arrow="false"></u-cell-item>
			<u-cell-item title="截止时间" :value="dataD.issueEndDate" :arrow="false"></u-cell-item>
			<u-cell-item title="商品状态" :value="dataD.gpmIsSoldOut?'正常':'已下架' " :arrow="false"></u-cell-item>
			<u-cell-item title="剩余数量" :value="dataD.goodsLimit" :arrow="false"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
export default {
	data() {
		return {
			dataD:{},
		};
	},
	onLoad() {
		this.dataD = this.$Route.query.item
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
