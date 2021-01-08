<template>
	<view class="content">
		<view class="u-flex u-col-top">
			<view class="u-m-r-20"><u-avatar :src="dataD.merchLogo"></u-avatar></view>
			<view class="info">
				<view>{{ dataD.minfoTitle }}</view>
				<view class="u-tips-color u-font-22">{{ dataD.createTime }}</view>
				<view v-if="dataD.minfoType === 2" class="color-main" @click="goVote">
					<u-icon name="vote" custom-prefix="custom-icon" size="30" color=""></u-icon>
					<text class="u-m-l-4">投票</text>
				</view>
				<view class="">
					{{dataD.minfoType === 1 ? dataD.minfoContent : dataD.minfoContent.voteDesc}}
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import tools from '@/common/utils/tools';
export default {
	data() {
		return {
			minfoId: '',
			dataD: {},
			voteD: {},
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
		this.minfoId = this.$Route.query.id;
		this.getData();
	},
	methods: {
		//前往投票
		goVote() {
			this.$Router.push({
				name: 'active_vote',
				params: { id: dataD.minfoId }
			});
		},
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
			this.$api('info.detail', {
				minfoId: this.minfoId
			}).then(res => {
				console.log(res.data);
				this.dataD = res.data;
				res.data.voteData.optionList.map(item => {
					item.proportion = this.$tools.accDiv(item.selectTotal, res.data.voteData.voteTotal).toFixed(2);
					return item;
				});
				this.voteD = res.data.voteData;
			});
		}
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
			height: 100rpx;
			padding: 0 20rpx;
			margin: 14rpx 0;
			border: 1px solid #d9d9d9;
			border-radius: 10rpx;
			.name {
				font-weight: bold;
				font-size: 30rpx;
			}
		}
	}
}
</style>
