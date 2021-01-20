<template>
	<view>
		<view class="chat-list">
			<view class="chat" v-for="(item, index) in dataList" :key="item.sessionId">
				<view class="row" @tap="goChat(item)">
					<u-avatar :src="item.merchLogo" mode="square" size="80"></u-avatar>
					<view class="right">
						<view class="top">
							<view class="username">{{ item.merchName }}</view>
							<view class="time">{{ item.briefLastTime }}</view>
						</view>
						<view class="bottom">
							<view class="msg">{{ item.lastTitle }}</view>
							<!-- <view class="tis" v-if="item.tisNum > 0">{{ item.tisNum }}</view> -->
						</view>
					</view>
				</view>
			</view>
			<u-empty :show="dataList.length === 0 && dataStatus === 'nomore'" mode="list"></u-empty>
			<u-loadmore :status="dataStatus" @loadmore="getMore" />
		</view>
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
			today: ''
		};
	},
	onLoad() {
		this.today = this.$tools.dateFormat('YYYY-mm-dd', new Date());
		this.getList();
	},
	onPullDownRefresh() {
		this.today = this.$tools.dateFormat('YYYY-mm-dd', new Date());
		this.getList('reload', '刷新成功');
	},
	onReachBottom() {
		this.getMore();
	},
	methods: {
		//前往聊天室
		goChat(item) {
			this.$Router.push({
				name: 'msg_chat',
				params: { name: item.merchName, id: item.sessionId, logo: item.merchLogo }
			});
		},
		//获取数据列表
		getList(load, msg) {
			if (load === 'reload') this.page = 1;
			let date = new Date(),
				startTime = this.$tools.timestamp(date.setDate(date.getDate() - 7 * this.page));
			this.dataStatus = 'loading';
			this.$api('session.session_list', {
				page: this.page,
				limit: this.limit,
				endTime: this.today,
				startTime: startTime
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

<style lang="scss">
.chat-list {
	width: 94%;
	padding: 0 3%;
	.chat {
		width: 100%;
		min-height: 100rpx;
		padding: 20rpx 0;
		border-bottom: solid 1rpx #eaeaea;
		.row {
			display: flex;
			justify-content: flex-start;
			.left {
			}
			.right {
				flex-shrink: 1;
				width: 98%;
				padding-left: 2%;
				.top {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					.usernam {
						font-size: 26rpx;
					}
					.time {
						font-size: 22rpx;
						color: #bebebe;
					}
				}
				.bottom {
					width: 100%;
					height: 40rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.msg {
						font-size: 25rpx;
						color: #777;
					}
					.tis {
						width: 35rpx;
						height: 35rpx;
						font-size: 22rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						background-color: #eb4d3d;
						color: #fff;
						border-radius: 100%;
					}
				}
			}
		}
	}
}
</style>
