<template>
	<view>
		<view v-for="item in dataList" :key="item.infoId" class="info-item" @click="goDetail(item)">
			<u-image
				:src="item.surfaceImg"
				width="150"
				height="150"
				border-radius="10"
				:fade="true"
				duration="450"
				:lazy-load="true"
				mode="widthFix"
			></u-image>
			<view class="u-flex-col u-m-l-20">
				<text class="u-m-t-10">{{item.infoTitle}}</text>
				<text>{{item.infoDesc}}</text>
				<text>{{item.issuer}}</text>
				<text class="u-tips-color u-font-24">{{item.createTime | timeFrom}}</text>
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
	methods:{
		//前往详情
		goDetail(item) {
			this.$Router.push({
				name: 'home_info_detail',
				params: {
					item: item
				}
			});
		},}
};
</script>

<style lang="scss" scoped>
.info-item {
	display: flex;
	flex-direction: row;
	margin-top: 20rpx;
	font-size: 26rpx;
	color: $u-content-color;
}
</style>
