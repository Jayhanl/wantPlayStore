<template>
	<view>
		<view class="content">
			<scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop" :scroll-into-view="scrollToView">
				<view class="row" v-for="(item, index) in dataList" :key="index" :id="'msg' + index">
					<view class="other">
						<view class="left"><image :src="merchLogo"></image></view>
						<view class="right">
							<view class="username">
								<view class="name">{{ item.username }}</view>
								<view class="time">{{ item.briefCreateTime }}</view>
							</view>
							<view class="bubble">
								<view class="">
									{{ item.msgContent }}
									<navigator url="/pages/store/store?current=2" class="go-link" v-if="item.msgType === 1">点击前往>></navigator>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//文字消息
			textMsg: '',
			//消息列表
			scrollAnimation: false,
			scrollTop: 0,
			scrollToView: '',
			msgList: [],
			msgImgList: [],
			myuid: 0,
			merchName: '',
			merchLogo: '',
			sessionId: '',
			page: 1,
			limit: 10,
			dataStatus: 'loadmore',
			dataList: []
		};
	},
	onLoad(option) {
		uni.setNavigationBarTitle({
			title: this.$Route.query.name
		});
		this.merchName = this.$Route.query.name;
		this.sessionId = this.$Route.query.id;
		this.merchLogo = this.$Route.query.logo;
		// this.getMsgList();
		this.getList();
	},
	methods: {
		// 预览图片
		showPic(row) {
			uni.previewImage({
				indicator: 'none',
				current: row.msg.url,
				urls: this.msgImgList
			});
		},
		//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
		setPicSize(row) {
			let maxW = uni.upx2px(350);
			let maxH = uni.upx2px(350);
			if (row.msg.w > maxW || row.msg.h > maxH) {
				let scale = row.msg.w / row.msg.h;
				if (row.msg.w > row.msg.h) {
					row.msg.w = maxW;
					row.msg.h = row.msg.w / scale;
				} else {
					row.msg.h = maxH;
					row.msg.w = row.msg.h * scale;
				}
			}
			return row;
		},
		//获取数据列表
		getList(load, msg) {
			if (load === 'reload') this.page = 1;
			this.dataStatus = 'loading';
			this.$api('session.msg_list', {
				page: this.page,
				limit: this.limit,
				sessionId: this.sessionId
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
					// 滚动到底部
					this.$nextTick(function() {
						this.scrollTop = 9999;
						this.scrollAnimation = true;
					});
				})
				.catch(() => (this.dataStatus = 'loadmore'));
		},
		//加载下一页
		getMore() {
			if (this.dataStatus === 'nomore') return;
			this.page += 1;
			this.getList('more');
		},
		getMsgList() {
			// 消息列表
			let list = [
				{ id: 0, uid: 0, username: '大黑哥', face: '/static/chat/face.jpg', time: '12:56', type: 'text', msg: { content: '为什么温度会相差那么大？' } },
				{
					id: 1,
					uid: 1,
					username: '售后客服008',
					face: '/static/chat/im/face/face_2.jpg',
					time: '12:57',
					type: 'text',
					msg: { content: '这个是有偏差的，两个温度相差十几二十度是很正常的，如果相差五十度，那即是质量问题了。' }
				},
				{
					id: 2,
					uid: 1,
					username: '售后客服008',
					face: '/static/chat/im/face/face_2.jpg',
					time: '12:59',
					type: 'voice',
					msg: { url: '/static/voice/3.aac', length: '00:06' }
				},
				{ id: 3, uid: 0, username: '大黑哥', face: '/static/chat/face.jpg', time: '13:05', type: 'voice', msg: { url: '/static/voice/2.mp3', length: '00:06' } },
				{ id: 4, uid: 0, username: '大黑哥', face: '/static/chat/face.jpg', time: '13:05', type: 'img', msg: { url: '/static/chat/goods/p10.jpg', w: 200, h: 200 } },
				{
					id: 5,
					uid: 1,
					username: '售后客服008',
					face: '/static/chat/im/face/face_2.jpg',
					time: '12:59',
					type: 'img',
					msg: { url: '/static/chat/q.jpg', w: 1920, h: 1080 }
				}
			];
			// 获取消息中的图片,并处理显示尺寸
			for (let i = 0; i < list.length; i++) {
				if (list[i].type == 'img') {
					list[i] = this.setPicSize(list[i]);
					console.log('list[i]: ' + JSON.stringify(list[i]));
					this.msgImgList.push(list[i].msg.url);
				}
			}
			this.msgList = list;
			// 滚动到底部
			this.$nextTick(function() {
				this.scrollTop = 9999;
				this.scrollAnimation = true;
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #e5e5e5;
}

.icon {
	font-size: 56rpx;
	color: #333;
}
.hidden {
	display: none !important;
}
@keyframes showEM {
	0% {
		transform: translateY(0);
	}
	100% {
		transform: translateY(-42vw);
	}
}
@keyframes hideEM {
	0% {
		transform: translateY(-42vw);
	}
	100% {
		transform: translateY(0);
	}
}
.emoji-box {
	&.hideEmoji {
		animation: hideEM 0.15s linear both;
	}
	&.showEmoji {
		animation: showEM 0.15s linear both;
	}
	width: 96%;
	height: 42vw;
	padding: 20upx 2%;
	background-color: #f3f3f3;
	border-top: solid 1upx #ddd;
	position: fixed;
	z-index: 20;
	top: 100%;
	.swiper {
		swiper-item {
			display: flex;
			flex-wrap: wrap;
			view {
				width: 12vw;
				height: 12vw;
				display: flex;
				justify-content: center;
				image {
					width: 60%;
				}
			}
		}
	}
}
.input-box {
	&.hideEmoji {
		animation: hideEM 0.15s linear both;
	}
	&.showEmoji {
		animation: showEM 0.15s linear both;
	}
	width: 100%;
	min-height: 100rpx;
	padding: 0 1%;
	background-color: #f2f2f2;
	display: flex;
	position: fixed;
	z-index: 20;
	bottom: 0;
	.voice,
	.more {
		flex-shrink: 0;
		width: 90rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.send {
		//H5发送按钮左边距
		/* #ifdef H5 */
		margin-left: 20rpx;
		/* #endif */
		flex-shrink: 0;
		width: 100rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		.btn {
			width: 90rpx;
			height: 56rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: linear-gradient(to right, #f09b37, #eb632c);
			color: #fff;
			border-radius: 6rpx;
			font-size: 24rpx;
		}
	}
	.textbox {
		width: 100%;
		min-height: 70rpx;
		margin-top: 15rpx;
		.voice-mode {
			width: calc(100% - 2upx);
			height: 68rpx;
			border-radius: 70rpx;
			border: solid 1upx #cdcdcd;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
			background-color: #fff;
			color: #555;
			&.recording {
				background-color: #e5e5e5;
			}
		}
		.text-mode {
			width: 100%;
			min-height: 70rpx;
			display: flex;
			background-color: #fff;
			border-radius: 40rpx;
			.box {
				width: 100%;
				padding-left: 30rpx;
				min-height: 70rpx;
				display: flex;
				align-items: center;
				textarea {
					width: 100%;
				}
			}
			.em {
				flex-shrink: 0;
				width: 80rpx;
				height: 70rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
}
.record {
	width: 40vw;
	height: 40vw;
	position: fixed;
	top: 55%;
	left: 30%;
	background-color: rgba(0, 0, 0, 0.6);
	border-radius: 20rpx;
	.ing {
		width: 100%;
		height: 30vw;
		display: flex;
		justify-content: center;
		align-items: center;
		@keyframes volatility {
			0% {
				background-position: 0% 130%;
			}
			20% {
				background-position: 0% 150%;
			}
			30% {
				background-position: 0% 155%;
			}
			40% {
				background-position: 0% 150%;
			}
			50% {
				background-position: 0% 145%;
			}
			70% {
				background-position: 0% 150%;
			}
			80% {
				background-position: 0% 155%;
			}
			90% {
				background-position: 0% 140%;
			}
			100% {
				background-position: 0% 135%;
			}
		}
		.icon {
			background-image: linear-gradient(to bottom, #f09b37, #fff 50%);
			background-size: 100% 200%;
			animation: volatility 1.5s ease-in-out -1.5s infinite alternate;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			font-size: 150rpx;
			color: #f09b37;
		}
	}
	.cancel {
		width: 100%;
		height: 30vw;
		display: flex;
		justify-content: center;
		align-items: center;
		.icon {
			color: #fff;
			font-size: 150rpx;
		}
	}
	.tis {
		width: 100%;
		height: 10vw;
		display: flex;
		justify-content: center;
		font-size: 28rpx;
		color: #fff;
		&.change {
			color: #f09b37;
		}
	}
}
.content {
	width: 100%;
	.msg-list {
		width: 96%;
		padding: 0 2%;
		position: absolute;
		top: 0;
		bottom: 100rpx;
		.row {
			&:first-child {
				margin-top: 20rpx;
			}
			padding: 20upx 0;
			.my .left,
			.other .right {
				width: 100%;
				display: flex;
				.bubble {
					max-width: 70%;
					min-height: 50rpx;
					border-radius: 10rpx;
					padding: 15upx 20rpx;
					display: flex;
					align-items: center;
					font-size: 32rpx;
					word-break: break-word;
					&.img {
						background-color: transparent;
						padding: 0;
						overflow: hidden;
						image {
							max-width: 350rpx;
							max-height: 350rpx;
						}
					}
					&.voice {
						.icon {
							font-size: 40rpx;
							display: flex;
							align-items: center;
						}
						.icon:after {
							content: ' ';
							width: 53rpx;
							height: 53rpx;
							border-radius: 100%;
							position: absolute;
							box-sizing: border-box;
						}
						.length {
							font-size: 28rpx;
						}
					}
				}
			}
			.my .right,
			.other .left {
				flex-shrink: 0;
				width: 80rpx;
				height: 80rpx;
				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 10rpx;
				}
			}
			.my {
				width: 100%;
				display: flex;
				justify-content: flex-end;
				.left {
					min-height: 80rpx;

					align-items: center;
					justify-content: flex-end;
					.bubble {
						background-color: #f06c7a;
						color: #fff;
						&.voice {
							.icon {
								color: #fff;
							}
							.length {
								margin-right: 20rpx;
							}
						}
						&.play {
							@keyframes my-play {
								0% {
									transform: translateX(80%);
								}
								100% {
									transform: translateX(0%);
								}
							}
							.icon:after {
								border-left: solid 10upx rgba(240, 108, 122, 0.5);
								animation: my-play 1s linear infinite;
							}
						}
					}
				}
				.right {
					margin-left: 15rpx;
				}
			}
			.other {
				width: 100%;
				display: flex;
				.left {
					margin-right: 15rpx;
				}
				.right {
					flex-wrap: wrap;
					.username {
						width: 100%;
						height: 45rpx;
						font-size: 24rpx;
						color: #999;
						display: flex;
						.name {
							margin-right: 50rpx;
						}
					}
					.bubble {
						background-color: #fff;
						color: #333;
						&.voice {
							.icon {
								color: #333;
							}
							.length {
								margin-left: 20rpx;
							}
						}
						&.play {
							@keyframes other-play {
								0% {
									transform: translateX(-80%);
								}
								100% {
									transform: translateX(0%);
								}
							}
							.icon:after {
								border-right: solid 10upx rgba(255, 255, 255, 0.8);

								animation: other-play 1s linear infinite;
							}
						}
					}
				}
			}
		}
	}
	.go-link {
		display: inline-block;
		color: #2979ff;
		text-decoration: underline;
	}
}
</style>
