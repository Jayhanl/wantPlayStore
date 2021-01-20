<template>
	<view>
		<view class="active" v-for="item in dataList" :key="item.minfoId">
			<view class="u-flex u-col-top">
				<view class="u-m-r-20"><u-avatar :src="item.merchLogo"></u-avatar></view>
				<view class="info">
					<view>{{ item.minfoTitle }}</view>
					<view class="u-tips-color u-font-22">{{ item.createTime }}</view>
					<view v-if="item.minfoType === 2" class="color-main" @click="goVote(item)">
						<u-icon name="vote" custom-prefix="custom-icon" size="30" color=""></u-icon>
						<text class="u-m-l-4">投票</text>
					</view>
				</view>
			</view>
			<u-read-more class="u-m-t-10" toggle text-indent="0" show-height="180">
				<rich-text :nodes="item.minfoDesc"></rich-text>
			</u-read-more>
			<view class="img">
				<u-image v-for="(itemImg, index) in item.imageList" :key="index" border-radius="4" height="100%" :src="itemImg" @click="showImg(item.imageList, index)"></u-image>
			</view>
			<view class="bot">
				<view class="u-flex u-flex-1 u-row-center">
					<u-icon name="share-fill" color="#f06c7a" size="44"></u-icon>
					<text class="u-m-l-15">{{ item.shareTotal }}</text>
				</view>
				<view class="u-flex u-flex-1 u-row-center">
					<u-icon name="thumb-up-fill" color="#f06c7a" size="44"></u-icon>
					<text class="u-m-l-15">{{ item.likeTotal }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		dataList: Array
	},
	methods: {
		//前往详情
		goDetail(item) {
			this.$Router.push({
				name: 'active_detail',
				params: { id: item.minfoId }
			});
		},
		//前往投票
		goVote(item) {
			this.$Router.push({
				name: 'active_vote',
				params: { id: item.minfoId }
			});
		},
		//查看图片
		showImg(item, index) {
			this.$tools.previewImage(item, index);
		}
	}
};
</script>

<style lang="scss" scoped>
.active {
	padding: 20rpx 20rpx;
	margin: 30rpx 20rpx;
	background-color: #fff;
	border-radius: 20rpx;
	box-shadow: 0 2rpx 8rpx rgba(241, 241, 241, 1);
	.img {
		display: grid;
		grid-template-columns: repeat(3, 32%);
		grid-auto-rows: 214rpx;
		grid-gap: 2%;
		margin-top: 20rpx;
	}
	.bot {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 20rpx;
		justify-content: flex-end;
	}
}
</style>
