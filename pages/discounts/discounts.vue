<template>
	<view class="content">
		<u-subsection :list="list" :current="current" @change="changeCurrent" style="width: 100%;" active-color="#F06C7A"></u-subsection>
		<!-- 直销优惠商品 -->
		<view v-if="current === 0">
			<view class="discounts-title">直销优惠商品</view>
			<discounts-goods remaining :dataList="dataList[0]" @on-status="updateStatus" />
			<view class="bottom-sticky"><u-button type="success" ripple @click="goGoods">发布直销商品</u-button></view>
		</view>
		<!-- 合作优惠商品 -->
		<view v-if="current === 1">
			<view class="discounts-title">合作优惠商品</view>
			<discounts-cooperation remaining completed :dataList="dataList[1]" @on-status="updateStatus" />
			<view class="bottom-sticky"><u-button type="success" ripple @click="goCooperation">获取合作商品</u-button></view>
		</view>
		<!-- 优惠商品管理 -->
		<view v-if="current === 2">
			<view class="discounts-title">优惠商品</view>
			<discounts-product :dataList="dataList[2]" @on-status="updateStatus" />
			<view class="bottom-sticky"><u-button type="success" ripple @click="goProduct">发布优惠产品</u-button></view>
		</view>
		<!-- 占位 -->
		<u-gap height="100" bg-color="#FDFDFD"></u-gap>
	</view>
</template>

<script>
export default {
	data() {
		return {
			current: 0,
			discounts: {},
			info: {
				syggStatus: 0,
				pickedStatus: 0
			},
			list: [
				{
					name: '直销优惠商品'
				},
				{
					name: '合作优惠商品'
				},
				{
					name: '优惠商品管理'
				}
			],
			api: ['goods.list', 'publicity.need.goods_list', 'coupon.list'],
			delApi: ['goods.soldOut', 'publicity.need.goods_soldOut', 'coupon.delete'],
			statusApi: ['goods.soldOut', 'publicity.need.help_soldOut', 'coupon.delete'],
			page: [1, 1, 1],
			limit: [10, 10, 10],
			dataStatus: ['loadmore', 'loadmore', 'loadmore'],
			dataList: [[], [], []]
		};
	},
	onLoad() {
		// this.getData();
		// this.getList();
	},
	onShow() {
		this.getList('reload');
		// if (this.current === 0) this.getData();
		// else if (this.current === 2) this.getList('reload');
	},
	onPullDownRefresh() {
		if (this.current === 0) this.getData('刷新成功');
		else if (this.current === 3) this.getList('reload', '刷新成功');
		else {
			uni.hideNavigationBarLoading(); //完成停止加载
			uni.stopPullDownRefresh(); //停止下拉刷新
		}
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
		// 前往发布滞销商品
		goGoods() {
			this.$Router.push({
				name: 'discounts_create_goods'
			});
		},
		// 前往获取合作商品
		goCooperation() {
			this.$Router.push({
				name: 'cooperation_goods'
			});
		},
		// 前往发布优惠产品
		goProduct() {
			this.$Router.push({
				name: 'create_product'
			});
		},
		// 下架
		updateStatus(item) {
			let that = this,
				data = {};
			console.log(item);
			if (that.current === 0) {
				data.goodsId = item.goodsId;
				data.isSoldOut = item.isSoldOut ? false : true;
			}
			if (that.current === 1) {
				data.gpmId = item.gpmId;
				data.isSoldOut = item.gpmIsSoldOut ? false : true;
			}
			uni.showModal({
				content: '是否确认下架，不影响核销收益计算',
				success(res) {
					if (res.confirm) {
						that.$api(`${that.statusApi[that.current]}`, data).then(() => {
							that.getList('reload', '操作成功');
						});
					}
				}
			});
		},
		// 删除
		delItem(item) {
			let that = this;
			uni.showModal({
				content: '是否确认删除（删除后无法恢复）',
				success(res) {
					if (res.confirm) {
						that.$api(`${that.delApi[that.current]}`, {
							couponId: item.couponId
						}).then(() => {
							that.getList('reload', '操作成功');
						});
					}
				}
			});
		},
		//获取商家数据
		getData(msg) {
			this.$api('store.data', {
				info: true,
				store: true
			}).then(res => {
				if (msg) {
					uni.showToast({
						title: msg
					});
				}
				res.data.info.topScore = res.data.store.topScore;
				this.info = res.data.info;
			});
		},
		//获取数据
		getList(load, msg) {
			let current = this.current;
			if (load === 'reload') this.page[current] = 1;
			this.dataStatus[current] = 'loading';
			this.$api(`${this.api[current]}`, {
				page: this.page[current],
				limit: this.limit[current]
			})
				.then(res => {
					if (msg) {
						uni.showToast({
							title: msg
						});
					}
					let resD = res.data.records;
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
