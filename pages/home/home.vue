<template>
	<view class="content">
		<!-- 轮播 -->
		<view class="wrap"><u-swiper title :list="bannerList" mode="rect" @click="goBanner"></u-swiper></view>

		<!-- 栅格系统 -->
		<u-grid col="4" class="category" :border="false" @click="goCategory">
			<u-grid-item v-for="(item, index) in categoryList" :index="index" :key="index">
				<image :src="item.img" class="category-img"></image>
				<view class="grid-text">{{ item.name }}</view>
			</u-grid-item>
		</u-grid>

		<!-- 热点资讯 info -->
		<view class="info">
			<text class="info-title">热点资讯</text>
			<info :infoList="infoList" :dataNull="dataNull" />
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			page: 1,
			limit: 10,
			dataNull: false,
			bannerList: [],
			infoList: [],
			categoryList: [
				// 分类菜单
				{ id: 1, name: '店铺管理', img: '/static/category/1.png', url: '/pages/shop/shop' },
				{ id: 2, name: '优惠管理', img: '/static/category/2.png' },
				{ id: 3, name: '推广管理', img: '/static/category/3.png' },
				{ id: 4, name: '会员管理', img: '/static/category/4.png' }
			]
		};
	},
	onLoad() {
		this.getList();
	},
	onPullDownRefresh() {
		uni.showNavigationBarLoading(); //在标题栏中显示加载
		this.page = 1;
		this.getList('reload');
	},
	onReachBottom() {
		console.log('加载下一页');
		if (this.dataNull) return;
		this.page += 1;
		this.getList('more');
	},
	methods: {
		//分类跳转页面
		goCategory(index) {
			if (this.categoryList[index].url) {
				this.$Router.push({
					path: this.categoryList[index].url
				});
			}
		},
		//Banner跳转页面
		goBanner(index) {
			console.log(index)
			if (this.bannerList[index].banner_path) {
				this.$Router.push({
					path: this.bannerList[index].banner_path
				});
			}
		},
		//获取首页数据
		getList(load) {
			this.$api('data.homepage', {
				page: this.page,
				limit: this.limit
			}).then(res => {
				if (load === 'reload') {
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh(); //停止下拉刷新
					uni.showToast({
						title: '刷新成功'
					});
				}
				if(res.data.banner) this.bannerList = res.data.banner;
				let infoList = res.data.info;
				if (infoList.length === 0) {
					this.dataNull = this.page === 1 ? false : true;
					this.infoList = this.page === 1 ? [] : this.infoList;
					return;
				}
				this.infoList = load === 'more' ? this.infoList.concat(infoList) : infoList;
				this.dataNull = infoList.length === this.limit ? false : true;
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #fdfdfd;
}

.wrap {
	padding: 30rpx;
	width: 100vw;
}
.category {
	padding: 0 30rpx;
	border: 1rpx solid #fdf6ec;
	border-left: none;
	border-right: none;
	margin-bottom: 10rpx;
}
.category-img {
	width: 55rpx;
	height: 55rpx;
	margin-bottom: 5rpx;
}

.info {
	padding: 20rpx 50rpx;
	width: 100vw;
	background-color: #fff;
	.info-title {
		font-weight: bold;
		font-size: 34rpx;
	}
}
</style>
