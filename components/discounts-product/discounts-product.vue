<template>
	<view>
		<view v-for="item in dataList" :key="item.couponId" class="goods-cont">
			<view class="goods-item">
				<!-- <u-image :src="item.surfaceImg" width="150" height="150" border-radius="10" mode="widthFix"></u-image> -->
				<u-icon name="coupon" color="#3998EA" custom-prefix="custom-icon" size="150"></u-icon>
				<view class="goods-info">
					<text>
						标题：
						<text>{{ item.couponTitle }}</text>
					</text>
					<text>
						优惠券类型：
						<text>{{ item.couponTypeString }}</text>
					</text>
					<text>
						商品描述：
						<text>{{ item.couponDesc }}</text>
					</text>
					<text>
						使用规则：
						<text>{{ item.couponRuleData.crProduct==='0'?'全场通用':item.couponRuleData.crProduct }}</text>
					</text>
					<text>
						截止时间：
						<text>{{ item.couponRuleData.crUseEndDate }}</text>
					</text>
					<text>
						商品状态：
						<text>{{ item.couponRuleData.isDisable ? '不可用': '正常'  }}</text>
					</text>
				</view>
			</view>
			<view class="goods-btns">
				<u-button class="u-m-r-20" plain ripple shape="circle" size="mini" type="primary" @click="goDetail(item)">查看详情</u-button>
				<u-button v-if="select" plain ripple shape="circle" size="mini" type="success" @click="choiceItem(item)">选择</u-button>
				<u-button v-else plain ripple shape="circle" size="mini" type="error" @click="updateStatus(item)">下架</u-button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		dataList: Array,
		select: Boolean,
	},
	methods: {
		//前往详情
		goDetail(item) {
			this.$Router.push({
				name: 'product_detail',
				params: {
					item: item
				}
			});
		},
		//上下架
		updateStatus(item) {
			this.$emit('on-del', item);
		},
		//选择并返回上一页
		choiceItem(item){
			let pages = getCurrentPages();  //获取所有页面栈实例列表
			let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
			prevPage.$vm.product = item;
			console.log(prevPage)
			uni.navigateBack({});
		}
	}
};
</script>

<style lang="scss" scoped>
.goods-cont {
	width: 92%;
	margin: 20rpx 4%;
	padding: 30rpx;
	font-size: 26rpx;
	color: $u-content-color;
	background-color: #fff;
	border-radius: 20rpx;
	box-shadow: 0 2rpx 8rpx rgba(241, 241, 241, 1);
	.goods-item {
		display: flex;
		flex-direction: row;
		margin-bottom: 4rpx;
		color: $u-tips-color;

		.goods-info {
			display: flex;
			flex-direction: column;
			margin-left: 20rpx;
			& > text text {
				color: $u-content-color;
			}
		}
	}
	.goods-btns {
		padding-top: 10rpx;
		text-align: right;
	}
}
</style>
