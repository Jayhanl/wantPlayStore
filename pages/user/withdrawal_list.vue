<template>
	<view class="content">
		<u-cell-group>
			<u-cell-item
				v-for="(item, index) in dataList"
				:key="item.txId"
				:title="item.orderCode + '('+item.statusChina+')'"
				:label="item.createTime"
				:value="item.txNum"
				:arrow="false"
				:value-style="{ color:'#42B983'  }"
			></u-cell-item>
		</u-cell-group>
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
			dataList: []
		};
	},
	onLoad() {
		this.getList();
	},
	onShow() {},
	onPullDownRefresh() {
		this.getList('reload', '刷新成功');
		uni.hideNavigationBarLoading(); //完成停止加载
		uni.stopPullDownRefresh(); //停止下拉刷新
	},
	onReachBottom() {
		this.getMore();
	},
	methods: {
		//获取数据
		getList(load, msg) {
			if (load === 'reload') this.page = 1;
			this.dataStatus = 'loading';
			this.$api('wallet.withdrawal_list', {
				page: this.page,
				limit: this.limit
			})
				.then(res => {
					if (msg) {
						uni.showToast({
							title: msg
						});
					}
					let resD = res.data;
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
	padding-bottom: 20rpx;
}
</style>
