<template>
	<view class="content">
		<!-- 我的余额 -->
		<view class="total-box">
			<view class="u-flex title">
				<text>我的余额(元)</text>
				<u-icon name="info-circle" size="40"></u-icon>
			</view>
			<view class="asset">￥{{ infoD.balance }}</view>
			<view class="u-m-b-20">
				<u-grid :col="3" :border="false">
					<u-grid-item bg-color="#3998ea">
						<view class="grid-num">{{ totalD.tEarnings || 0 }}</view>
						<view class="grid-text">今日收益(元)</view>
					</u-grid-item>
					<u-grid-item bg-color="#3998ea">
						<view class="grid-num">{{ totalIncome || 0 }}</view>
						<view class="grid-text">总收益(元)</view>
					</u-grid-item>
					<u-grid-item bg-color="#3998ea">
						<view class="grid-num">{{ infoD.tgkyBalance || 0 }}</view>
						<view class="grid-text">推广扣押(元)</view>
					</u-grid-item>
				</u-grid>
			</view>
			<view class="operat">
				<view class="item" @click="goWithdrawList">
					<u-icon name="tixian-list" custom-prefix="custom-icon" size="42"></u-icon>
					<text class="u-p-l-10">提现列表</text>
				</view>
				<view class="item" @click="goWithdraw">
					<u-icon name="tixian" custom-prefix="custom-icon" size="42"></u-icon>
					<text class="u-p-l-10">提现</text>
				</view>
			</view>
		</view>
		<!-- 余额列表 -->
		<view class="">
			<u-cell-group>
				<u-cell-item
					v-for="(item, index) in dataList"
					:key="item.mblogId"
					:title="item.logDesc"
					:label="item.createTime"
					:value="(item.isInc ? '+' : '-') + item.num"
					:arrow="false"
					:value-style="{ color: item.isInc ? '#42B983' : '#fa3534' }"
				></u-cell-item>
			</u-cell-group>
			<u-empty :show="dataList.length === 0 && dataStatus === 'nomore'" mode="list"></u-empty>
			<u-loadmore :status="dataStatus" @loadmore="getMore" />
		</view>
		<!-- <u-popup v-model="popShow" mode="center" closeable border-radius="14"><view>人生若只如初见，何事秋风悲画扇</view></u-popup> -->
		<!-- <u-modal v-model="popShow" show-cancel-button title="提现" @cancel="popShow = false" @confirm="withdrawal">
			<view class="u-padding-20"><u-input v-model="withdrawPrice" input-align="center" type="number" maxlength="8" placeholder="请输入提现金额" /></view>
		</u-modal> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			page: 1,
			limit: 10,
			dataStatus: 'loadmore',
			dataList: [],
			infoD: {},
			popShow: false,
			withdrawPrice: ''
		};
	},
	onLoad() {
	},
	onShow() {
		this.getStore();
		this.getList('reload');
	},
	onPullDownRefresh() {
		this.getStore();
		this.getList('reload', '刷新成功');
		uni.hideNavigationBarLoading(); //完成停止加载
		uni.stopPullDownRefresh(); //停止下拉刷新
	},
	onReachBottom() {
		this.getMore();
	},
	methods: {
		// 前往提现
		goWithdraw() {
			this.$Router.push({
				name: 'user_withdraw'
			});
		},
		// 前往提现记录
		goWithdrawList() {
			this.$Router.push({
				name: 'user_withdraw_list'
			});
		},
		//获取商家数据
		getStore() {
			this.$api('store.data', {
				info: true
			}).then(res => {
				console.log(res);
				this.infoD = res.data.info;
			});
		},
		//获取数据
		getList(load, msg) {
			if (load === 'reload') this.page = 1;
			this.dataStatus = 'loading';
			this.$api('wallet.balance_list', {
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
	.total-box {
		background-color: #3998ea;
		padding: 20rpx;
		color: #fff;
		.title {
			font-size: 30rpx;
			justify-content: space-between;
		}
		.asset {
			padding: 40rpx 0 20rpx;
			text-align: center;
			font-size: 80rpx;
		}
		.grid-num{
			margin-bottom: 10rpx;
		}
		.operat {
			display: flex;
			flex-direction: row;
			align-items: center;
			.item {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				flex: 1;
				&:first-of-type {
					border-right: 1px solid #fff;
				}
			}
		}
	}
}
</style>
