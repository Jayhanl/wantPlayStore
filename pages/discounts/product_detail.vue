<template>
	<view class="content">
		<!-- <view class="discounts-title">直销优惠商品</view> -->
		<u-cell-group>
			<u-cell-item title="标题" :value="dataD.couponTitle" :arrow="false"></u-cell-item>
			<u-cell-item title="优惠券类型" :value="dataD.couponTypeString" :arrow="false"></u-cell-item>
			<u-cell-item title="商品描述" :value="dataD.couponDesc" :arrow="false"></u-cell-item>
			<u-cell-item title="使用规则" :value="dataD.couponRuleData.crProduct==='0'?'全场通用':dataD.couponRuleData.crProduct" :arrow="false"></u-cell-item>
			<u-cell-item title="商品状态" :value="dataD.couponRuleData.isDisable ? '正常' : '已过期'" :arrow="false"></u-cell-item>
			<u-cell-item title="开始时间" :value="dataD.couponRuleData.crUseStartDate" :arrow="false"></u-cell-item>
			<u-cell-item title="截止时间" :value="dataD.couponRuleData.crUseEndDate" :arrow="false"></u-cell-item>
		</u-cell-group>
		<view class="bottom-fixed">
			<u-button class="u-m-r-20" plain ripple shape="circle" size="mini" type="primary" @click="goUpdate">修改</u-button>
			<u-button class="u-m-r-20" plain ripple shape="circle" size="mini" type="error" @click="delItem">删除</u-button>
		</view>
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
		//前往修改
		goUpdate() {
			this.$Router.push({
				name: 'product_update',
				params: { item: this.dataD }
			});
		},
		//删除
		delItem() {
			let that = this;
			uni.showModal({
				title: '删除确认',
				content: '是否确认删除该商品，删除后无法恢复，请谨慎操作！',
				success(res) {
					if (res.confirm) {
						that.$api('coupon.delete', {
							couponId: that.dataD.couponId
						})
							.then(() => {
								uni.showToast({
									title: '删除成功'
								});
								setTimeout(() => that.$Router.back(1), 800);
							})
							.catch(err => {
								console.log(err);
							});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	.discounts-title {
		margin: 20rpx 40rpx;
		font-size: 36rpx;
		font-weight: bold;
	}
	.bottom-fixed {
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 20rpx 40rpx;
		z-index: 99;
		text-align: right;
		background-color: #fff;
		border-top: 1px solid #f2f2f2;
		box-shadow: 0 2rpx 8rpx rgba(241, 241, 241, 1);
	}
}
</style>
