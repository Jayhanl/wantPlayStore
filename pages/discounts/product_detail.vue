<template>
	<view class="content">
		<!-- <view class="discounts-title">直销优惠商品</view> -->
		<u-cell-group>
			<u-cell-item title="标题" :value="dataD.couponTitle" :arrow="false"></u-cell-item>
			<u-cell-item title="优惠券类型" :value="dataD.couponTypeString" :arrow="false"></u-cell-item>
			<u-cell-item title="商品描述" :value="dataD.couponDesc" :arrow="false"></u-cell-item>
			<u-cell-item title="使用规则" :value="dataD.couponRuleData.crProduct" :arrow="false"></u-cell-item>
			<u-cell-item title="商品状态" :value="dataD.couponRuleData.isDisable ? '正常' : '已过期'" :arrow="false"></u-cell-item>
			<u-cell-item title="开始时间" :value="dataD.couponRuleData.crUseStartDate" :arrow="false"></u-cell-item>
			<u-cell-item title="截止时间" :value="dataD.couponRuleData.crUseEndDate" :arrow="false"></u-cell-item>
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
