<template>
	<view class="content">
		<!-- <view class="u-flex top">
			<view class="item">
				<text class="name">推广商家数</text>
				<text>{{ dataD.doingMerchNum }}</text>
			</view>
			<view class="item">
				<text class="name">流量人数</text>
				<text>{{ dataD.browseTotal }}</text>
			</view>
			<view class="item">
				<text class="name">目标流量人数</text>
				<text>{{ dataD.targetNum }}</text>
			</view>
		</view> -->
		<view v-if="current === 0" v-for="(item,ind) in dataList" :key="ind" class="u-flex store">
			<u-avatar src="" mode="square"></u-avatar>
			<view class="info">
				<text class="u-font-30">{{item.gpmMerchName}}</text>
				<text class="u-font-26">商品核销：{{item.gpmSellNum}}份</text>
			</view>
		</view>
		<view v-else v-for="(item,index) in dataList" :key="index" class="u-flex store">
			<u-avatar src="" mode="square"></u-avatar>
			<view class="info">
				<text class="u-font-30">{{item.merchName}}</text>
				<text class="u-font-26">流量人数：{{item.browseTotal}}份</text>
			</view>
		</view>
		<u-empty :show="dataList.length === 0 && dataStatus === 'nomore'" mode="list"></u-empty>
		<u-loadmore :status="dataStatus" @loadmore="getMore" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			current: 0,
			api:['publicity.need.merch_list','lltg.detail'],
			page: 1,
			limit: 10,
			dataStatus: 'loadmore',
			data:{},
			historyId:'',
			dataList: []
		};
	},
	onLoad() {
		this.historyId = this.$Route.query.id;
		this.current = this.$Route.query.current;
		this.getList();
	},
	onPullDownRefresh() {
		this.getList('reload', '刷新成功');
	},
	onReachBottom() {
		this.getMore();
	},
	methods: {
		//获取流量推广历史详情数据
		getList(load, msg) {
			if (load === 'reload') this.page = 1;
			this.dataStatus = 'loading';
			this.$api(this.api[this.current], {
				planId: this.historyId,
				goodsId: this.goodsId,
				page: this.page,
				limit: this.limit
			}).then(res => {
					if (msg) {
						uni.showToast({
							title: msg
						});
					}
					// if(this.page === 1) this.dataD = res.data
					let resD = (this.current? res.data.doingMerchantList:res.data.records);
					if (resD.length === 0) {
						this.dataStatus = 'nomore';
						this.dataList = this.page === 1 ? [] : this.dataList;
						return;
					}
					this.dataList = load === 'more' ? this.dataList.concat(resD) : resD;
					this.dataStatus = resD.length === this.limit ? 'loadmore' : 'nomore';
				})
				.catch(() => (this.dataStatus = 'loadmore'));
		},
		//加载下一页
		getMore() {
			if (this.dataStatus === 'nomore') return;
			this.page += 1;
			this.getList('more');
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	.top {
		height: 220rpx;
		width: 100%;
		background-color: #1778fb;
		color: #fff;
		.item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex: 1;
			font-size: 38rpx;
			.name {
				color: rgba(193, 237, 255, 0.6);
				margin-bottom: 16rpx;
				font-size: 30rpx;
			}
		}
	}
	.store {
		height: 130rpx;
		padding: 20rpx 20rpx;
		margin: 30rpx 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0 2rpx 8rpx rgba(241, 241, 241, 1);
		.info {
			height: 100%;
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 20rpx;
			// padding: 10rpx 0;
		}
	}
}
</style>
