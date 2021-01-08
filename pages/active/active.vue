<template>
	<view class="content">
		<!-- 动态 active -->
		<active :dataList="dataList" />
		<view class="suspend" @click="goCreate"><u-icon name="edit-pen" color="#f06c7a" size="46"></u-icon></view>
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
	onPullDownRefresh() {
		this.getList('reload','刷新成功');
	},
	onReachBottom() {
		this.getMore();
	},
	methods: {
		//前往发布
		goCreate(item) {
			this.$Router.push({
				name: 'active_create'
			});
		},
		//获取动态数据
		getList(load, msg) {
			if(load==='reload') this.page = 1
			this.dataStatus = 'loading' 
			this.$api('info.list', {
				page: this.page,
				limit: this.limit
			}).then(res => {
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
			}).catch(()=>this.dataStatus = 'loadmore')
		},
		//加载下一页
		getMore() {
			if (this.dataStatus === 'nomore') return;
			this.page += 1;
			this.getList('more');
		},
	}
};
</script>

<style lang="scss" scoped>
.content {
	background-color: #fdfdfd;
}
</style>
