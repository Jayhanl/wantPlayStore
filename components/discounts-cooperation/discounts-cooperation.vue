<template>
	<view>
		<view v-for="item in dataList" :key="item.gpmId" class="goods-cont">
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
						支付方式：
						<text>{{ item.payWayTypeString }}</text>
					</text>
					<text>
						助推商家：
						<text>{{ item.merchName }}</text>
					</text>
					<text>
						推广提成：
						<text>{{ item.income }}元/份</text>
					</text>
					<text>
						完成推广数：
						<text>{{ item.goodsGetNum }}</text>
					</text>
					<text>
						截止时间：
						<text>{{ item.issueEndDate }}</text>
					</text>
					<text>
						商品状态：
						<text>{{ item.gpmIsSoldOut ? '已下架' : '正常' }}</text>
					</text>
					<text>
						推广状态：
						<text>{{ item.merchPublicityStatusString }}</text>
					</text>
				</view>
			</view>
			<view class="goods-btns">
				<u-button class="u-m-r-20" plain ripple shape="circle" size="mini" type="primary" @click="goDetail(item)">查看详情</u-button>
				<u-button plain ripple shape="circle" size="mini" :type="item.gpmIsSoldOut ? 'success' : 'error'" @click="updateStatus(item)">
					{{ item.gpmIsSoldOut ? '上架' : '下架' }}
				</u-button>
				<u-button class="u-m-r-20 u-m-l-20" v-if="item.merchPublicityStatus === 0" ripple shape="circle" size="mini" type="success" @click="updatePromote(item, true)">
					接受推广
				</u-button>
				<u-button v-if="item.merchPublicityStatus === 0" ripple shape="circle" size="mini" type="error" @click="updatePromote(item, false)">拒绝推广</u-button>
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
		remaining: false,
		completed: false
	},
	methods: {
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
		},
		//处理推广邀请
		updatePromote(item, status) {
			let that = this;
			uni.showModal({
				title: `${status ? '接受' : '拒绝'}推广`,
				content: `是否确认${status ? '接受' : '拒绝'}商家：${item.merchName} 的推广邀请`,
				success(res) {
					if (res.confirm) {
						that.$api('publicity.help.invite_dispose', {
							gpmId: item.gpmId,
							isAccept: status
						}).then(() => {
							that.$emit('on-get', 'reload', '操作成功');
						});
					}
				}
			});
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
