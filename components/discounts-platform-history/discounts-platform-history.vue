<template>
	<view>
		<view v-for="item in dataList" :key="item.pcLogId" class="pc-cont">
			<view class="pc-item">
				<view class="pc-info">
					<text>
						标题：
						<text>{{ item.pcTitle }}</text>
					</text>
					<text>
						商品描述：
						<text>{{ item.pcDesc }}</text>
					</text>
					<text>
						适用产品：
						<text>{{ item.pcProduct||'全场通用' }}</text>
					</text>
					<text>
						免单份数：
						<text>{{ item.pcNum }} 份{{item.platformCouponType?'':'/月'}}</text>
					</text>
					<text>
						发布时间：
						<text>{{ item.createTime }}</text>
					</text>
					<text>
						有效时间：
						<text>{{ item.pcValidWeek }}周</text>
					</text>
					<text>
						商品状态：
						<text>{{ item.platformCouponChangeStatusString }}</text>
					</text>
				</view>
			</view>
			<!-- <view class="pc-btns">
				<u-button class="u-m-r-20" plain ripple shape="circle" size="mini" type="primary" @click="goDetail(item)">查看详情</u-button>
				<u-button plain ripple shape="circle" size="mini" :type="item.gpmIsSoldOut?'error':'success'" @click="updateStatus(item)">{{item.gpmIsSoldOut?'下架':'上架'}}</u-button>
			</view> -->
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
		remaining: false,
		completed: false
	},
	methods:{
		//前往详情
		goDetail(item) {
			this.$Router.push({
				name: 'cooperation_detail',
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
.pc-cont {
	width: 92%;
	margin: 20rpx 4%;
	padding: 30rpx;
	font-size: 26rpx;
	color: $u-content-color;
	background-color: #fff;
	border-radius: 20rpx;
	box-shadow: 0 2rpx 8rpx rgba(241, 241, 241, 1);
	.pc-item {
		display: flex;
		flex-direction: row;
		margin-bottom: 4rpx;
		color: $u-tips-color;

		.pc-info {
			display: flex;
			flex-direction: column;
			margin-left: 20rpx;
			& > text text {
				color: $u-content-color;
			}
		}
	}
	.pc-btns {
		padding-top: 10rpx;
		text-align: right;
	}
}
</style>
