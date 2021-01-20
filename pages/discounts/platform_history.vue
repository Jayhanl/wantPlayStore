<template>
	<view class="content">
		<discounts-platform-history :dataList="dataList" @on-status="updateStatus" />
		<u-empty :show="dataList.length === 0 && dataStatus === 'nomore'" mode="list"></u-empty>
		<u-loadmore :status="dataStatus" @loadmore="getMore" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			page: 1,
			limit: 10,
			dataStatus: 'loadmore',
			bannerList: [],
			dataList: []
		};
	},
	onLoad() {
		this.getList()
	},
	onPullDownRefresh() {
		this.getList('reload', '刷新成功');
	},
	onReachBottom() {
		this.getMore();
	},
	methods: {
		//获取首页数据
		getList(load, msg) {
			if (load === 'reload') this.page = 1;
			this.dataStatus = 'loading';
			this.$api('discounts_platform.log', {
				page: this.page,
				limit: this.limit
			})
				.then(res => {
					if (msg) {
						uni.showToast({
							title: msg
						});
					}
					let resD = res.data.records;
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
	.discounts-title {
		margin: 20rpx 40rpx;
		font-size: 36rpx;
		font-weight: bold;
	}
}
</style>
