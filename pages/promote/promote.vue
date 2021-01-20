<template>
	<view class="content">
		<u-subsection :list="list" :current="current" @change="changeCurrent" style="width: 100%;" active-color="#F06C7A"></u-subsection>
		<!-- 平台推广 -->
		<view v-if="current === 0">
			<view class="platform-title">平台推广管理</view>
			<view class="platform-info">
				<view>
					商户积分：
					<text class="color-main u-m-r-4">{{ info.merchScore }}</text>
					分
				</view>
				<view>
					平台首页广告位申请：
					<text class="u-m-r-20 u-content-color">{{ info.syggStatusChina }}</text>
					<u-button v-if="info.syggStatus === 0" type="success" size="mini" ripple @click="applyHomepage">申请</u-button>
				</view>
				<view>
					平台精选商家申请：
					<text class="u-m-r-20 u-content-color">{{ info.pickedStatusChina }}</text>
					<u-button v-if="info.pickedStatus === 0" type="success" size="mini" ripple @click="applyPicked">申请</u-button>
				</view>
				<view>
					平台周边商家置顶分：
					<text class="color-main u-m-r-4">{{ info.topScore }}</text>
					分
					<u-button class="u-m-l-20" type="warning" size="mini" ripple @click="applyStick">加分</u-button>
				</view>
				<view>
					免单产品推广：
					<text class="u-m-r-20 u-content-color">{{ merchStatus === 4 ? '有' : '无' }}</text>
					<u-button type="primary" size="mini" ripple @click="applyPromote">添加产品</u-button>
				</view>
			</view>
		</view>

		<!-- 商品推广 -->
		<view v-if="current === 1">
			<view class="platform-title">商品推广管理</view>
			<view class="notice">
				<text class="title">注意：</text>
				<text>1、已发布商品无法撤回，请谨慎发布;</text>
				<text>2、商品发布需要在平台进行预先支付，活动结束后， 剩余的金额未能成功推广将会全数退回;</text>
				<text>3、当用户通过推广方主页进入到发布方主页时，流量才 会进行计算;</text>
				<text>4、活动会在达到流量目标或在时间到达截止日期时停止.</text>
			</view>
			<view class="u-text-right u-m-r-20 u-m-b-20">
				<u-button class="u-m-r-20" type="primary" size="mini" ripple @click="goHistory">查看历史推广</u-button>
				<u-button type="success" size="mini" ripple @click="goCreateGoods">发布推广</u-button>
			</view>
			<u-table fontSize="20">
				<u-tr>
					<u-th class="u-th">商品</u-th>
					<u-th class="u-th">目标</u-th>
					<u-th class="u-th">提成</u-th>
					<u-th class="u-th">截止</u-th>
					<u-th class="u-th">商家数</u-th>
					<u-th class="u-th">状态</u-th>
					<u-th class="u-th">操作</u-th>
				</u-tr>
				<u-tr v-for="(item, index) in dataList[0]" :key="item.goodsId">
					<u-td class="u-td">{{ item.goodsTitle }}</u-td>
					<u-td class="u-td">{{ item.goodsLimit }}份</u-td>
					<u-td class="u-td">{{ item.income }}元/份</u-td>
					<u-td class="u-td">{{ item.issueEndDate }}</u-td>
					<u-td class="u-td">{{ item.publicityMerchNum }}家</u-td>
					<u-td class="u-td">{{ item.pubOrderStatusString + (item.isSoldOut ? '(已下架)' : '(上架中)') }}</u-td>
					<u-td class="u-td">
						<u-button v-if="item.pubOrderStatus === 1" :custom-style="{ padding: '0 10rpx' }" type="primary" size="mini" ripple @click="showSheetGoods(item)">
							操作
						</u-button>
					</u-td>
				</u-tr>
			</u-table>
			<u-empty :show="dataList[current - 1].length === 0 && dataStatus[current - 1] === 'nomore'" mode="list"></u-empty>
			<u-loadmore :status="dataStatus[current - 1]" @loadmore="getMore" />
		</view>
		<!-- 流量推广 -->
		<view v-if="current === 2">
			<view class="platform-title">流量推广管理</view>
			<view class="u-text-right u-m-r-20 u-m-b-20">
				<u-button class="u-m-r-20" type="primary" size="mini" ripple @click="goHistory">查看历史推广</u-button>
				<u-button type="success" size="mini" ripple @click="goCreateFlow">发布推广</u-button>
			</view>
			<u-table fontSize="20">
				<u-tr>
					<u-th class="u-th">目标</u-th>
					<u-th class="u-th">提成</u-th>
					<u-th class="u-th">截止</u-th>
					<u-th class="u-th">商家数</u-th>
					<u-th class="u-th">开放</u-th>
					<u-th class="u-th">状态</u-th>
					<u-th class="u-th">操作</u-th>
				</u-tr>
				<u-tr v-for="(item, index) in dataList[1]" :key="item.planId">
					<u-td class="u-td">{{ item.tcCondition }}人</u-td>
					<u-td class="u-td">{{ item.tcNum }}人/元</u-td>
					<u-td class="u-td">{{ item.endTime }}</u-td>
					<u-td class="u-td">{{ item.doingMerchNum }}家</u-td>
					<u-td class="u-td">{{ item.isOpen ? '开放推广' : '不推广' }}</u-td>
					<u-td class="u-td">{{ item.statusChina }}</u-td>
					<u-td class="u-td">
						<u-button :custom-style="{ padding: '0 10rpx' }" v-if="item.status === 1" type="primary" size="mini" ripple @click="showSheet(item)">操作</u-button>
					</u-td>
				</u-tr>
			</u-table>
			<u-empty :show="dataList[current - 1].length === 0 && dataStatus[current - 1] === 'nomore'" mode="list"></u-empty>
			<u-loadmore :status="dataStatus[current - 1]" @loadmore="getMore" />
			<view class="notice">
				<text class="title">注意：</text>
				<text>1、已发布商品无法撤回，请谨慎发布;</text>
				<text>2、商品发布需要在平台进行预先支付，活动结束后， 剩余的金额未能成功推广将会全数退回;</text>
				<text>3、当用户通过推广方主页进入到发布方主页时，流量才 会进行计算;</text>
				<text>4、活动会在达到流量目标或在时间到达截止日期时停止.</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			current: 0,
			platform: {},
			merchStatus: 0,
			info: {
				syggStatus: 0,
				pickedStatus: 0
			},
			list: [
				{
					name: '平台推广'
				},
				{
					name: '商品推广'
				},
				{
					name: '流量推广'
				}
			],
			api: ['publicity.need.goods_list', 'lltg.doing_list'],
			page: [1, 1],
			limit: [10, 10],
			dataStatus: ['loadmore', 'loadmore'],
			dataList: [[], []]
		};
	},
	onLoad() {
		this.merchStatus = this.$store.state.user.tokenInfo.status;
		// this.getData();
		// this.getList();
	},
	onShow() {
		if (this.current === 0) this.getData();
		else if (this.current === 1 || this.current === 2) this.getList('reload');
	},
	onPullDownRefresh() {
		if (this.current === 0) this.getData('刷新成功');
		else if (this.current === 1 || this.current === 2) this.getList('reload', '刷新成功');
	},
	onReachBottom() {
		this.getMore();
	},
	methods: {
		// 切换分类
		changeCurrent(e) {
			this.current = e;
			if (this.current > 0 && this.dataList[this.current - 1].length === 0) {
				this.getList();
			}
		},
		applyPromote() {
			uni.showModal({
				content: '是否前往“优惠管理”添加免单产品',
				success: res => {
					if (res.confirm) {
						this.$Router.push({
							name: 'discounts',
							params: { current: 3 }
						});
					}
				}
			});
		},
		// 前往发布商品推广
		goCreateGoods() {
			this.$Router.push({
				name: 'promote_goods_create'
			});
		},
		// 前往发布流量推广
		goCreateFlow() {
			this.$Router.push({
				name: 'promote_flow_create'
			});
		},
		// 前往历史推广
		goHistory() {
			this.$Router.push({
				name: 'promote_history',
				params: {
					type: this.current - 1
				}
			});
		},
		// 申请首页广告位
		applyHomepage() {
			uni.showModal({
				title: '申请确认',
				content: '是否确认申请首页广告位',
				success: res => {
					if (res.confirm) {
						this.$api('pttg.homepage').then(res => {
							this.getData('申请成功');
						});
					}
				}
			});
		},
		// 申请精选商家
		applyPicked() {
			uni.showModal({
				title: '申请确认',
				content: '是否确认消耗 100 积分申请精选商家',
				success: res => {
					if (res.confirm) {
						this.$api('pttg.picked').then(res => {
							this.getData('申请成功');
						});
					}
				}
			});
		},
		// 周边商家置顶
		applyStick() {
			uni.showModal({
				title: '增加置顶分',
				content: '是否确认消耗 10 积分增加置顶分 1 分',
				success: res => {
					if (res.confirm) {
						this.$api('pttg.round_top').then(res => {
							this.getData('增加成功');
						});
					}
				}
			});
		},
		// 显示商品推广操作
		showSheetGoods(item) {
			let that = this,
				list = [item.isSoldOut ? '上架' : '下架', '修改商品', '邀请商家'];
			uni.showActionSheet({
				itemList: list,
				success: function(res) {
					if (res.tapIndex === 2) {
						if (item.isSoldOut) {
							that.$tools.msg('商品已下架');
							return;
						}
						that.$Router.push({
							name: 'promote_merch',
							params: { type: 1, goodsId: item.goodsId }
						});
					} else if (res.tapIndex === 1) {
						that.$Router.push({
							name: 'update_goods'
						});
					} else {
						that.$api(`publicity.need.goods_soldOut`, {
							goodsId: item.goodsId,
							isSoldOut: !item.isSoldOut
						}).then(res => {
							that.getList('reload', '操作成功');
						});
					}
				},
				fail: function(res) {
					console.log(res.errMsg);
				}
			});
		},
		// 显示流量推广操作
		showSheet(item) {
			let that = this,
				list = [item.isOpen ? '暂停推广' : '开放推广', '终止推广', '邀请商家'],
				api = ['update', 'stop'];
			uni.showActionSheet({
				itemList: list,
				success: function(res) {
					if (res.tapIndex === 2) {
						that.$Router.push({
							name: 'promote_merch',
							params: { type: 0, planId: item.planId }
						});
					} else {
						that.$api(`lltg.${api[res.tapIndex]}`, {
							planId: item.planId,
							isOpen: item.isOpen ? 0 : 1
						}).then(res => {
							that.getList('reload', '操作成功');
						});
					}
				},
				fail: function(res) {
					console.log(res.errMsg);
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
			let current = this.current - 1;
			if (load === 'reload') this.page[current] = 1;
			this.dataStatus[current] = 'loading';
			this.$api(this.api[current], {
				page: this.page[current],
				limit: this.limit[current]
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
			if (this.dataStatus[this.current - 1] === 'nomore') return;
			this.page[this.current - 1] += 1;
			this.getList('more');
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	background: #f2f2f2;
}
.content {
	.platform-title {
		margin: 20rpx 40rpx;
		font-size: 36rpx;
		font-weight: bold;
	}
	.platform-info {
		width: 92%;
		margin: 20rpx 4%;
		padding: 30rpx;
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0 2rpx 8rpx rgba(241, 241, 241, 1);
		& > view {
			display: block;
			margin: 30rpx 0;
			color: $u-tips-color;
		}
	}
	.u-td {
		height: auto;
		width: calc(100% / 7);
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
}
</style>
