<template>
	<view class="content">
		<!-- 搜索 -->
		<view class="search">
			<u-input class="u-m-r-20" placeholder="请输入商家名" border v-model="merchName" maxlength="20" />
			<u-input class="u-m-r-20" placeholder="请选择主营类型" border v-model="masterList[mcateId].text" type="select" @click="masterShow = true" />
			<u-action-sheet :list="masterList" v-model="masterShow" @click="searchList" :cancel-btn="false"></u-action-sheet>
			<u-button type="primary" size="mini" ripple @click="getList('reload', '搜索成功')">搜索</u-button>
		</view>
		<!-- 数据表格 -->
		<u-table fontSize="20">
			<u-tr>
				<u-th class="u-th">商家</u-th>
				<u-th class="u-th">行业</u-th>
				<u-th class="u-th">目标</u-th>
				<u-th class="u-th">提成</u-th>
				<u-th class="u-th">截止</u-th>
				<u-th class="u-th">进度</u-th>
				<u-th class="u-th">操作</u-th>
			</u-tr>
			<u-tr v-for="(item, index) in dataList" :key="item.planId">
				<u-td class="u-td">{{ item.merchName }}</u-td>
				<u-td class="u-td">{{ item.mcateName }}</u-td>
				<u-td class="u-td">{{ item.targetNum }}人</u-td>
				<u-td class="u-td">{{ item.tcNum }}人/元</u-td>
				<u-td class="u-td">{{ item.endTime }}</u-td>
				<u-td class="u-td">{{ item.tcNum - item.surplusNum }}人</u-td>
				<u-td class="u-td"><u-button type="success" size="mini" ripple @click="addTg(item)">推广</u-button></u-td>
			</u-tr>
		</u-table>
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
			mcateId: '',
			merchName: '',
			dataStatus: 'loadmore',
			dataList: [],
			masterShow: false,
			masterList: []
		};
	},
	onLoad() {
		this.getData();
	},
	onPullDownRefresh() {
		this.getList('reload', '刷新成功');
	},
	onReachBottom() {
		this.getMore();
	},
	methods: {
		// 选择下拉框并搜索
		searchList(e) {
			this.mcateId = e;
			this.getList('reload', '搜索成功');
		},
		// 商家推广
		addTg(item) {
			let that = this;
			uni.showModal({
				title: '进行推广',
				content: `是否为商家：${item.merchName} 进行推广吗？`,
				success: res => {
					if (res.confirm) {
						that.$api('store.add_tgwtg', {
							planId: item.planId
						}).then(res => {
							that.getList('reload', '推广成功');
						});
					}
				}
			});
		},
		//获取商家主营分类
		getData() {
			this.$api('data.merch_cate', {
				parentId: ''
			}).then(res => {
				res.data.unshift({
					merchId: '',
					text: '全部'
				});
				this.masterList = res.data;
				this.getList();
			});
		},
		//获取推广位数据
		getList(load, msg) {
			if (load === 'reload') this.page = 1;
			this.dataStatus = 'loading';
			this.$api('store.lltg_list', {
				page: this.page,
				limit: this.limit,
				mcateId: this.mcateId?this.masterList[this.mcateId].mcateId:'',
				merchName: this.merchName
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
	display: flex;
	flex-direction: column;
	background-color: #fdfdfd;
	.search {
		display: flex;
		flex-direction: row;
		margin: 10rpx 20rpx 30rpx;
		align-items: center;
	}
	.u-th {
		font-size: 20rpx !important;
		color: #007aff;
	}
	.u-td {
		height: auto;
		width: calc(100% / 7);
	}
}
</style>
