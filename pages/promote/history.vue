<template>
	<view class="content">
		<u-subsection :list="list" :current="current" @change="changeCurrent" style="width: 100%;" active-color="#F06C7A"></u-subsection>
		<u-table fontSize="20">
			<u-tr>
				<u-th class="u-th">目标</u-th>
				<u-th class="u-th">提成</u-th>
				<u-th class="u-th">截止</u-th>
				<u-th class="u-th">操作</u-th>
			</u-tr>
			<u-tr v-if="current===0" v-for="item in dataList[current]" :key="item.couponId">
				<u-td class="u-td">{{ item.goodsLimit }}份</u-td>
				<u-td class="u-td">{{ item.income }}元/份</u-td>
				<u-td class="u-td">{{ item.issueEndDate }}</u-td>
				<u-td class="u-td"><u-button :custom-style="{ padding: '0 10rpx' }" type="primary" size="mini" ripple @click="goDetail(item.goodsId)">查看详情</u-button></u-td>
			</u-tr>
			<u-tr v-else v-for="item in dataList[current]" :key="item.planId">
				<u-td class="u-td">{{ item.targetNum }}人</u-td>
				<u-td class="u-td">{{ item.tcCondition }}人/元</u-td>
				<u-td class="u-td">{{ item.endTime }}</u-td>
				<u-td class="u-td"><u-button :custom-style="{ padding: '0 10rpx' }" type="primary" size="mini" ripple @click="goDetail(item.planId)">查看详情</u-button></u-td>
			</u-tr>
		</u-table>
		<u-empty :show="dataList[current].length === 0 && dataStatus[current] === 'nomore'" mode="list"></u-empty>
		<u-loadmore :status="dataStatus[current]" @loadmore="getMore" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			current: 1,
			list: [
				{
					name: '商品推广'
				},
				{
					name: '流量推广'
				}
			],
			api: ['publicity.need.goods_list', 'lltg.done_list'],
			page: [1, 1],
			limit: [10, 10],
			dataStatus: ['loadmore', 'loadmore'],
			dataList: [[], []]
		};
	},
	onLoad() {
		this.current = this.$Route.query.type;
		this.getList();
	},
	onPullDownRefresh() {
		this.getList('reload', '刷新成功');
	},
	onReachBottom() {
		this.getMore();
	},
	methods: {
		// 切换分类
		changeCurrent(e) {
			this.current = e;
			if (this.dataList[this.current].length === 0) {
				this.getList();
			}
		},
		// 前往历史详情
		goDetail(id) {
			this.$Router.push({
				name: 'promote_history_detail',
				params: { id,current:this.current }
			});
		},
		//获取数据
		getList(load, msg) {
			let current = this.current;
			if (load === 'reload') this.page[current] = 1;
			this.dataStatus[current] = 'loading';
			this.$api(`${this.api[current]}`, {
				page: this.page[current],
				limit: this.limit[current],
				pubOrderStatus: 3
			})
				.then(res => {
					if (msg) {
						uni.showToast({
							title: msg
						});
					}
					let resD = current === 0 ? res.data.records : res.data;
					if (resD.length === 0) {
						this.dataStatus[current] = 'nomore';
						this.dataList[current] = this.page[current] === 1 ? [] : this.dataList[current];
						this.$forceUpdate(); //强制刷新
						return;
					}
					this.dataList[current] = load === 'more' ? this.dataList[current].concat(resD) : resD;
					this.dataStatus[current] = resD.length === this.limit[current] ? 'loadmore' : 'nomore';
					this.$forceUpdate(); //强制刷新
				})
				.catch(() => (this.dataStatus[current] = 'loadmore'));
		},
		//加载下一页
		getMore() {
			if (this.dataStatus[this.current] === 'nomore') return;
			this.page[this.current] += 1;
			this.getList('more');
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	.u-td {
		height: auto;
		width: calc(100% / 4);
	}
}
</style>
