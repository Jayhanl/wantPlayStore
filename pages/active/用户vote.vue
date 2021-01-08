<template>
	<view class="content">
		<view class="u-flex">
			<view class="title">{{voteD.voteTitle}}</view>
			<view class="voteNum">
				<view class="color-main u-font-36 ">{{voteD.voteTotal}}</view>
				<view class="u-tips-color u-font-20">参与人数</view>
			</view>
		</view>
		<view class="u-flex">
			<u-avatar src="" size="60"></u-avatar>
			<text class="u-m-l-12">{{dataD.merchName}}</text>
			<text class="u-m-l-8 u-tips-color">发起</text>
		</view>
		<view class="">
			<view class="tips">
				<text class="name">投票选项</text>
				<text class="u-tips-color">请选择1项</text>
			</view>
			<!-- 投票 -->
			<view class="vote">
				<!-- 未投票 -->
				<u-radio-group style="width: 100%;" wrap size="45" active-color="#f06c7a" v-model="vote" @change="e => (vote = e)">
					<view v-for="item in voteD.optionList" :key="voteId" class="radio">
						<u-radio :name="item.voteId">{{ item.optionTitle }}</u-radio>
					</view>
				</u-radio-group>
				<!-- 已投票 -->
				<view v-for="item in voteD.optionList" :key="voteId" class="radio">
					<view class="u-flex-1">
						<view class="name">{{ item.optionTitle }}</view>
						<text class="u-tips-color">{{ item.selectTotal }}票</text>
					</view>
					<view class="u-tips-color">{{ item.proportion }}%</view>
				</view>
			</view>

			<u-button class="u-m-t-20" type="primary" @click="postVote">确认投票</u-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			minfoId:'',
			dataD:{},
			voteD:{},
			list: [
				{
					name: 'apple',
					disabled: false
				},
				{
					name: 'banner',
					disabled: false
				},
				{
					name: 'orange',
					disabled: false
				}
			],
			// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
			vote: ''
		};
	},
	onLoad() {
		this.minfoId=this.$Route.query.id
		this.getData()
	},
	methods: {
		// 确认投票
		postVote(e) {
			this.$api('info.update_info', {}).then(res => {
				uni.showToast({
					title: '修改成功'
				});
				setTimeout( () => this.$Router.back(1), 800);
			});
		},
		// 获取详情
		getData() {
			this.$api('info.detail',{
				minfoId:this.minfoId
			}).then(res => {
				console.log(res.data);
				this.dataD = res.data
				this.voteD = res.data.voteData
			});
		},
	}
};
</script>

<style lang="scss" scoped>
.content {
	// background-color: #fdfdfd;
	padding: 30rpx 24rpx;
	.title {
		flex: 1;
		font-size: 38rpx;
		font-weight: bold;
		margin-right: 20rpx;
	}
	.voteNum {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 170rpx;
		height: 170rpx;
		border: 1px solid #eee;
		border-radius: 50%;
	}
	.tips {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 40rpx;
		.name {
			font-weight: bold;
			font-size: 34rpx;
		}
	}
	.vote {
		margin: 20rpx 0;
		.radio {
			display: flex;
			align-items: center;
			width: 100%;
			height: 90rpx;
			padding: 0 20rpx;
			margin: 14rpx 0;
			font-weight: bold;
			border: 1px solid #d9d9d9;
			border-radius: 10rpx;
		}
	}
}
</style>
