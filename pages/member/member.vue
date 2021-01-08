<template>
	<view class="content">
		<u-subsection :list="list" :current="current" @change="changeCurrent" style="width: 100%;" active-color="#F06C7A"></u-subsection>
		<!-- 关注列表 -->
		<view v-if="current === 0">
			<view class="member-title">关注总数据</view>
			<view class="member-info">
				<u-grid :col="3" :border="false">
					<u-grid-item>
						<view class="grid-num">{{ totalD.tBrowse }}</view>
						<view class="grid-text">今日浏览人数</view>
					</u-grid-item>
					<u-grid-item>
						<view class="grid-num">{{ totalD.tFans }}</view>
						<view class="grid-text">今日关注人数</view>
					</u-grid-item>
					<u-grid-item>
						<view class="grid-num">{{ infoD.memberTotal }}</view>
						<view class="grid-text">总关注人数</view>
					</u-grid-item>
				</u-grid>
			</view>
			<view class="member-title">关注我的用户</view>
			<view v-for="(item, index) in dataList[0]" :key="index" class="u-flex member-box">
				<u-avatar :src="item.userAvatarUrl" mode="square" :show-sex="item.userGender" :sex-icon="sex[item.userGender]" size="80"></u-avatar>
				<view class="u-flex-col u-m-l-30 u-font-24">
					<text>
						<text class="u-tips-color">用户名：</text>
						{{ item.userNickname }}
					</text>
					<text>
						<text class="u-tips-color">核销次数：</text>
						{{ item.consumeTotal }} 次
					</text>
					<text>
						<text class="u-tips-color">关注日期：</text>
						{{ item.subscribeDate }}
					</text>
				</view>
			</view>
		</view>

		<!-- 顾客列表 -->
		<view v-if="current === 1">
			<view class="member-title">订单数据</view>
			<view class="member-info">
				<u-grid :col="3" :border="false">
					<u-grid-item>
						<view class="grid-num">{{ totalD.tGet }}</view>
						<view class="grid-text">今日下单人数</view>
					</u-grid-item>
					<u-grid-item>
						<view class="grid-num">{{ totalD.tRefund }}</view>
						<view class="grid-text">退款人数</view>
					</u-grid-item>
					<u-grid-item>
						<view class="grid-num">{{ infoD.orderTotal }}</view>
						<view class="grid-text">总下单人数</view>
					</u-grid-item>
				</u-grid>
			</view>
			<view class="member-title">今日的顾客</view>
			<view v-for="(item, index) in dataList[1]" :key="index" class="u-flex member-box">
				<u-avatar :src="item.userAvatarUrl" mode="square" size="80"></u-avatar>
				<view class="u-flex-col u-m-l-30 u-font-24">
					<text>
						<text class="u-tips-color">用户名：</text>
						{{ item.userNickname }}
					</text>
					<text>
						<text class="u-tips-color">核销次数：</text>
						{{ item.consumeTotal }} 次
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			sex:['','man','woman'],
			current: 0,
			totalD:{},
			infoD: {},
			list: [
				{
					name: '关注列表'
				},
				{
					name: '顾客列表'
				}
			],
			api: ['fans_list', 'today_list'],
			page: [1, 1],
			limit: [10, 10],
			dataStatus: ['loadmore', 'loadmore'],
			dataList: [[],[]]
		};
	},
	onLoad() {
		this.getData();
		this.getList();
		this.getTotal();
	},
	onShow() {
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
			if (this.dataList[e].length === 0) this.getList();
		},
		// 前往发布流量推广
		goCreateFlow() {
			this.$Router.push({
				name: 'promote_create_flow'
			});
		},
		//获取商家数据
		getData(msg) {
			this.$api('store.data', {
				info: true
			}).then(res => {
				if (msg) {
					uni.showToast({
						title: msg
					});
				}
				this.infoD = res.data.info;
			});
		},
		//获取统计数据
		getTotal(msg) {
			this.$api('mine.total').then(res => {
				this.totalD = res.data;
			});
		},
		//获取数据
		getList(load, msg) {
			let current = this.current;
			if (load === 'reload') this.page[current] = 1;
			this.dataStatus[current] = 'loading';
			this.$api(`member.${this.api[current]}`, {
				page: this.page[current],
				limit: this.limit[current]
			})
				.then(res => {
					if (msg) {
						uni.showToast({
							title: msg
						});
					}
					let resD = res.data;
					if (resD.length === 0) {
						this.dataStatus[current] = 'nomore';
						this.dataList[current] = this.page[current] === 1 ? [] : this.dataList[current];
						this.$forceUpdate(); //强制刷新
						return;
					}
					this.dataList[current] = load === 'more' ? this.dataList[current].concat(resD) : resD;
					this.dataStatus[current] = resD.length === this.limit[current] ? 'loadmore' : 'nomore';
					this.$forceUpdate()//强制刷新
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
	.member-title {
		margin: 20rpx 40rpx;
		font-size: 36rpx;
		font-weight: bold;
	}
	.member-info {
		width: 92%;
		margin: 20rpx 4%;
		padding: 30rpx;
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0 2rpx 8rpx rgba(241, 241, 241, 1);
		// & > view {
		// 	display: block;
		// 	margin: 30rpx 0;
		// 	color: $u-tips-color;
		// }

		.grid-num {
			font-size: 38rpx;
			font-weight: bold;
			color: #f06c7a;
			margin-bottom: 10rpx;
		}
		.grid-text {
			font-size: 26rpx;
			padding: 0 20rpx;
			color: $u-type-info;
		}
	}
	.member-box {
		width: 92%;
		min-height: 140rpx;
		margin: 20rpx 4%;
		padding: 20rpx 30rpx;
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0 2rpx 8rpx rgba(241, 241, 241, 1);
	}
}
</style>
