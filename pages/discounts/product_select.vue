<template>
	<view class="content">
		<discounts-product :dataList="dataList" select />
	</view>
</template>

<script>
export default {
	data() {
		return {
			page: 1,
			limit: 10,
			dataStatus: ['loadmore'],
			dataList: []
		};
	},
	onLoad() {
		this.getList();
	},
	onPullDownRefresh() {
		this.getList('reload', '刷新成功');
	},
	onReachBottom() {
		this.getMore();
	},
	methods: {
		//获取数据
		getList(load, msg) {
			let current = this.current;
			if (load === 'reload') this.page = 1;
			this.dataStatus = 'loading';
			this.$api('coupon.list', {
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
						this.$forceUpdate(); //强制刷新
						return;
					}
					this.dataList = load === 'more' ? this.dataList.concat(resD) : resD;
					this.dataStatus = resD.length === this.limit ? 'loadmore' : 'nomore';
					this.$forceUpdate(); //强制刷新
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
	position: relative;
	.discounts-title {
		margin: 20rpx 40rpx;
		font-size: 36rpx;
		font-weight: bold;
	}

	.notice {
		display: flex;
		flex-direction: column;
		font-size: 24rpx;
		padding: 20rpx 40rpx;
		.title {
			font-size: 26rpx;
			font-weight: bold;
		}
		& > text {
			margin: 4rpx 0;
		}
	}
	.bottom-sticky {
		position: fixed;
		bottom: 10px;
		width: 100%;
		padding: 0 20rpx;
		z-index: 99;
	}
}
</style>
