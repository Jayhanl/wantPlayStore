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
			<info :dataList="dataList" />
			<u-empty :show="dataList.length===0&&dataStatus==='nomore'" mode="list"></u-empty>
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
			dataStatus:'loadmore',
			bannerList: [],
			dataList: [],
			categoryList: [
				// 分类菜单
				{ id: 1, name: '店铺管理', img: '/static/category/1.png', url: 'store' },
				{ id: 2, name: '优惠管理', img: '/static/category/2.png', url: 'store_edit' },
				{ id: 3, name: '推广管理', img: '/static/category/3.png',url: 'store'  },
				{ id: 4, name: '会员管理', img: '/static/category/4.png',url:'store_tgw' }
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
		this.getMore()
	},
	methods: {
		//分类跳转页面
		goCategory(index) {
			console.log(this.categoryList[index].url)
			this.$Router.push({
				name: this.categoryList[index].url
			});
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
			this.dataStatus = 'loading' 
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
				let resD = res.data.info;
				if (resD.length === 0) {
					this.dataStatus = 'nomore'
					this.dataList = this.page === 1 ? [] : this.resD;
					return;
				}
				this.dataList = load === 'more' ? this.resD.concat(resD) : resD;
				this.dataStatus = resD.length === this.limit ? 'loadmore' : 'nomore';
			});
		},
		//加载下一页
		getMore(){
			if (this.dataStatus==='nomore') return;
			this.page += 1;
			this.getList('more');
		},
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
