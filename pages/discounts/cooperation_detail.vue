<template>
	<view class="content">
		<view class="discounts-title">商品信息</view>
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
		<view class="discounts-title">销售情况</view>
		<u-cell-group>
			<u-cell-item title="标题" :value="dataD.goodsTitle" :arrow="false"></u-cell-item>
			<u-cell-item title="领取数量" :value="dataD.gpmGetNum" :arrow="false"></u-cell-item>
			<u-cell-item title="销售数量" :value="dataD.gpmSellNum" :arrow="false"></u-cell-item>
			<u-cell-item title="商品收益" :value="dataD.gpmIncome+'元'" :arrow="false"></u-cell-item>
		</u-cell-group>
		<view class="discounts-title">助推商家信息</view>
		<u-cell-group>
			<u-cell-item title="商家名" :value="dataD.publicityMerchName" :arrow="false"></u-cell-item>
			<u-cell-item title="商品提成" :value="dataD.income+'元/份'" :arrow="false"></u-cell-item>
		</u-cell-group>
		<!-- 占位 -->
		<u-gap height="90" bg-color="#FDFDFD"></u-gap>
		<view class="bottom-fixed">
				<u-button class="u-m-r-20" plain ripple shape="circle" size="mini" type="primary" @click="goDetail(item)">查看详情</u-button>
				<u-button plain ripple shape="circle" size="mini" :type="item.gpmIsSoldOut?'error':'success'" @click="updateStatus(item)">{{item.gpmIsSoldOut?'下架':'上架'}}</u-button>
		</view>
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
	.bottom-fixed{
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 20rpx 40rpx;
		z-index: 99;
		text-align: right;
		background-color: #FFF;
		border-top: 1px solid #F2F2F2;
		box-shadow: 0 2rpx 8rpx rgba(241, 241, 241, 1);
	}
}
</style>
