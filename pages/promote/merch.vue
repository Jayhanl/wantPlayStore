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
				<u-th class="u-th" width="40%">地址</u-th>
				<u-th class="u-th">操作</u-th>
			</u-tr>
			<u-tr v-for="(item, index) in dataList" :key="item.planId">
				<u-td class="u-td">{{ item.merchName }}</u-td>
				<u-td class="u-td">{{ item.mcateName }}</u-td>
				<u-td class="u-td" width="40%">{{ item.merchAddr }}</u-td>
				<u-td class="u-td"><u-button type="success" size="mini" ripple @click="inviteMerch(item)">邀请</u-button></u-td>
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
			planId: '',
			mcateId: 0,
			merchName: '',
			api: ['lltg.invite', 'publicity.need.invite_add'],
			dataStatus: 'loadmore',
			dataList: [],
			masterShow: false,
			masterList: []
		};
	},
	onLoad() {
		console.log('id', this.$Route.query);
		this.type = this.$Route.query.type;
		this.planId = this.$Route.query.planId;
		this.goodsId = this.$Route.query.goodsId;
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
		// 邀请商家
		inviteMerch(item) {
			let that = this;
			uni.showModal({
				title: '邀请商家',
				content: `是否确认邀请商家：${item.merchName} 进行推广吗？`,
				success: res => {
					if (res.confirm) {
						let data = {
							merchId: item.merchId
						};
						if (that.type) data.goodsId = that.goodsId;
						else data.planId = that.planId;
						that.$api(that.api[this.type], data).then(res => {
							that.getList('reload', '邀请成功');
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
		//获取商家列表数据
		getList(load, msg) {
			if (load === 'reload') this.page = 1;
			this.dataStatus = 'loading';
			this.$api('lltg.merch_list', {
				page: this.page,
				limit: this.limit,
				mcateId: this.masterList[this.mcateId].mcateId,
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
					console.log(resD.length === this.limit ? 'loadmore' : 'nomore');
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
		// width: calc(100% / 7);
	}
}
</style>
