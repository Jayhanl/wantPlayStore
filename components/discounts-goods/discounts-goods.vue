<template>
	<view>
		<view v-for="(item,index) in dataList" :key="item.goodsId" class="goods-cont">
			<view class="goods-item">
				<u-image :src="item.goodsImageUrl" width="150" height="150" border-radius="10" mode="widthFix"></u-image>
				<view class="goods-info">
					<text>
						标题：
						<text>{{ item.goodsTitle }}</text>
					</text>
					<text>
						商品类型：
						<text>{{ item.goodsTypeString }}</text>
					</text>
					<text>
						商品描述：
						<text>{{ item.goodsDesc }}</text>
					</text>
					<text>
						商品价值：
						<text>{{ item.goodsValue }}</text>
					</text>
					<text>
						开始时间：
						<text>{{ item.issueStartDate }}</text>
					</text>
					<text>
						截止时间：
						<text>{{ item.issueEndDate }}</text>
					</text>
					<text>
						剩余数量：
						<text>{{ item.goodsLimit }}</text>
					</text>
					<text>
						商品状态：
						<text>{{ item.isSoldOut?'已下架':'正常' }}</text>
					</text>
				</view>
			</view>
			<view class="goods-btns">
				<u-button class="u-m-r-20" plain ripple shape="circle" size="mini" type="primary" @click="goDetail(item)">查看详情</u-button>
				<u-button plain ripple shape="circle" size="mini" :type="item.isSoldOut?'success':'error'" @click="updateStatus(item)">{{item.isSoldOut?'上架':'下架'}}</u-button>
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
		dataList: Array
	},
	methods: {
		//前往详情
		goDetail(item) {
			this.$Router.push({
				name: 'discounts_goods_detail',
				params: {
					item: item
				}
			});
		},
		//上下架
		updateStatus(item) {
			this.$emit('on-status', item);
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
