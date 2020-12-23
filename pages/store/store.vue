<template>
	<view class="content">
		<u-subsection :list="list" :current="current" @change="e => (this.current = e)" style="width: 100%;" active-color="#F06C7A"></u-subsection>
		<!-- 图片管理 -->
		<view v-if="current === 0">
			<view class="shop-title">店铺Logo管理</view>
			<view class="u-m-l-20">
				<u-upload
					ref="logo"
					:action="apiUrl + 'store/update_logo'"
					:header="header"
					:form-data="formData"
					:before-upload="beforeUpload"
					@on-success="uploadLogoSuccess"
					:limitType="['jpg']"
					:show-progress="false"
					:max-size="2097152"
					:file-list="storeLogo"
					max-count="1"
				></u-upload>
			</view>
			<view class="shop-title">店铺Banner管理</view>
			<view class="u-m-l-20 u-flex u-flex-wrap">
				<u-upload
					v-for="(item, index) in 5"
					:key="index"
					:ref="'banner' + index"
					:action="apiUrl + 'store/update_banner'"
					:header="header"
					:form-data="formData"
					:before-upload="beforeUpload"
					@on-success="uploadBannerSuccess"
					@on-choose-complete="chooseBanner"
					:show-progress="false"
					:max-size="2097152"
					:upload-text="'第' + (index + 1) + '张'"
					:file-list="bannerList[index]"
					:index="index + 1"
					max-count="1"
				></u-upload>
			</view>
		</view>
		<!-- 店铺信息 -->
		<view v-else-if="current === 1">
			<view class="shop-title">店铺信息管理</view>
			<view class="shop-info">
				<text>
					商铺名：
					<text>{{ store.merchName }}</text>
				</text>
				<text>
					商铺简介：
					<text>{{ store.merchDesc }}</text>
				</text>
				<text>
					营业时间：
					<text>{{ store.merchYyrq + store.merchYysjStart + '~' + store.merchYysjEnd }}</text>
				</text>
				<text>
					人均消费：
					<text>￥{{ store.merchCpp }}元</text>
				</text>
				<text>
					商铺联系方式：
					<text>{{ store.merchMobile }}</text>
				</text>
				<text>
					商铺联系地址：
					<text>{{ store.merchAddr }}</text>
				</text>
				<text>
					商铺标签：
					<text>{{ store.merchLabel }}</text>
				</text>
				<view class="u-text-center"><u-button type="primary" size="medium" ripple @click="goEdit">修改信息</u-button></view>
			</view>
		</view>
		<!-- 推广位设置 -->
		<view v-else-if="current === 2">
			<view class="shop-title">店铺信息管理</view>
			<view class="u-text-right u-m-r-20 u-m-b-20"><u-button type="primary" size="mini" ripple @click="goTgw">获取开放推广</u-button></view>
			<u-table fontSize="20">
				<u-tr>
					<u-th class="u-th">商家</u-th>
					<u-th class="u-th">目标</u-th>
					<u-th class="u-th">提成</u-th>
					<u-th class="u-th">截止</u-th>
					<u-th class="u-th">进度</u-th>
					<u-th class="u-th">总进度</u-th>
					<u-th class="u-th">状态</u-th>
					<u-th class="u-th">操作</u-th>
				</u-tr>
				<u-tr v-for="(item, index) in dataList" :key="item.planId">
					<u-td class="u-td">{{ item.merchName }}</u-td>
					<u-td class="u-td">{{ item.targetNum }}人</u-td>
					<u-td class="u-td">{{ item.tcNum }}人/元</u-td>
					<u-td class="u-td">{{ item.endTime }}</u-td>
					<u-td class="u-td">{{ item.browseTotal }}人</u-td>
					<u-td class="u-td">{{ item.doneNum }}人</u-td>
					<u-td class="u-td">{{ item.statusChina }}</u-td>
					<u-td class="u-td">
						<u-button
							:custom-style="{ padding: '0 10rpx' }"
							v-if="item.status === 0 || item.status === 1 || item.status === 2"
							type="primary"
							size="mini"
							ripple
							@click="showSheet(item)"
						>
							操作
						</u-button>
					</u-td>
				</u-tr>
			</u-table>
			<u-empty :show="dataList.length === 0 && dataStatus === 'nomore'" mode="list"></u-empty>
			<u-loadmore :status="dataStatus" @loadmore="getMore" />
		</view>
		<!-- 开关店 -->
		<u-gap height="80" bg-color="#fdfdfd"></u-gap>
		<view class="business">
			<u-button :type="store.isOpen ? 'success' : 'error'" size="mini" ripple @click="openDoor">{{ store.isOpen ? '营业中' : '休息中' }}</u-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			apiUrl: this.$apiUrl,
			header: { Authorization: this.$store.state.user.tokenInfo.token },
			formData: {
				listOrder: '',
				imageFile: ''
			},
			storeLogo: [],
			bannerList: [],
			info: '',
			store: '',
			current: 2,
			list: [
				{
					name: '图片管理'
				},
				{
					name: '信息管理'
				},
				{
					name: '推广位设置'
				}
			],
			page: 1,
			limit: 10,
			dataStatus: 'loadmore',
			dataList: []
		};
	},
	onLoad() {
		this.getData();
		this.getList();
	},
	onShow() {},
	methods: {
		//前往编辑商家信息
		goEdit() {
			this.$Router.push({
				name: 'store_edit',
				params: { name: this.store.merchName }
			});
		},
		//前往开放推广
		goTgw() {
			this.$Router.push({
				name: 'store_tgw'
			});
		},
		//是否营业
		openDoor() {
			let that = this,
				status = that.store.isOpen;
			uni.showModal({
				title: `${status ? '休息' : '营业'}确认`,
				success: res => {
					if (res.confirm) {
						that.$api(`store.${status ? 'close_store' : 'open_store'}`).then(res => {
							that.store.isOpen = status ? 0 : 1;
							uni.showToast({
								title: '操作成功'
							});
						});
					}
				}
			});
		},
		// 当前选择的Banner图
		chooseBanner(ists, name) {
			this.formData.listOrder = name;
		},
		// 图片上传前
		beforeUpload(index, list) {
			return new Promise((resolve, reject) => {
				this.formData.imageFile = this.$tools.imgAddSuffix(list.map(item => item.url))[index];
				resolve();
			});
		},
		// Logo上传成功后
		uploadLogoSuccess(data, index, lists, name) {
			this.storeLogo[index] = { url: data.data.imageFile };
			uni.showToast({
				title: '上传成功'
			});
		},
		// Banner上传成功后
		uploadBannerSuccess(data, index, lists, name) {
			this.bannerList[name] = [{ url: data.data.imageFile }];
			uni.showToast({
				title: '上传成功'
			});
		},
		// 显示推广位操作
		showSheet(item) {
			let list = [],
				api = [],
				that = this;
			if (item.status === 0) {
				list = ['接受', '拒绝'];
				api = ['allow_tgwtg', 'refuse_tgwtg'];
			} else if (item.status === 1) {
				list = ['重新推广', '终止推广'];
				api = ['start_tgwtg', 'stop_tgwtg'];
			} else if (item.status === 2) {
				list = ['暂停推广', '终止推广'];
				api = ['pause_tgwtg', 'stop_tgwtg'];
			}
			uni.showActionSheet({
				itemList: list,
				success: function(res) {
					that.$api(`store.${api[res.tapIndex]}`, {
						planId: item.planId
					}).then(res => {
						that.getList('', '操作成功');
					});
				},
				fail: function(res) {
					console.log(res.errMsg);
				}
			});
		},
		//获取商家数据
		getData() {
			this.$api('store.data').then(res => {
				console.log(res);
				this.bannerList = res.data.bannerList.map(item => {
					item.url = item.imageSrc;
					return [item];
				});
				this.info = res.data.info;
				this.store = res.data.store;
				if (res.data.store.merchLogo) {
					this.storeLogo = [{ url: res.data.store.merchLogo }];
				}
			});
		},
		//获取推广位数据
		getList(load, msg) {
			this.$api('store.tgw_list').then(res => {
				if (load === 'reload') {
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh(); //停止下拉刷新
					uni.showToast({
						title: msg || '刷新成功'
					});
				}
				if (msg) {
					uni.showToast({
						title: msg || '刷新成功'
					});
				}
				let resD = res.data;
				if (resD.length === 0) {
					this.dataStatus = 'nomore';
					this.dataList = this.page === 1 ? [] : this.resD;
					return;
				}
				this.dataList = load === 'more' ? this.resD.concat(resD) : resD;
				this.dataStatus = resD.length === this.limit ? 'loadmore' : 'nomore';
			});
		},
		//加载下一页
		getMore() {
			if (this.dataStatus === 'nomore') return;
			this.page += 1;
			this.getList('more');
		},
		//重新获取数据
		getReload(load, msg) {
			this.page = 1;

			this.getList('reload', msg);
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	background-color: #fdfdfd;
	.shop-title {
		margin: 20rpx 40rpx;
		font-size: 36rpx;
		font-weight: bold;
	}
	.shop-info {
		width: 92%;
		margin: 20rpx 4%;
		padding: 30rpx;
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0 2rpx 8rpx rgba(241, 241, 241, 1);
		& > text {
			display: block;
			margin: 24rpx 0;
			color: $u-tips-color;
			text {
				color: $u-content-color !important;
			}
		}
	}
	.u-td {
		height: auto;
		width: calc(100% / 7);
	}
	.u-size-mini {
		padding: 0 10rpx;
	}
	.business {
		position: fixed;
		bottom: 10rpx;
		right: 50rpx;
	}
}
</style>
