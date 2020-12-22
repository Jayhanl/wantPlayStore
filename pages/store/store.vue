<template>
	<view class="content">
		<u-subsection :list="list" :current="current" @change="e => (this.current = e)" style="width: 100%;" active-color="#F06C7A"></u-subsection>
		<view v-if="current === 1" class="">
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
		<view v-if="current === 0" class="">
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
				<!-- <u-button class="u-m-t-10 " type="primary" size="mini" @click="uploadLogo">确认上传</u-button> -->
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
	</view>
</template>

<script>
export default {
	computed:{
		bannerData:(index)=>{
			
		}
	},
	data() {
		return {
			apiUrl: this.$apiUrl,
			header: { Authorization: this.$store.state.user.tokenInfo.token },
			formData: {
				listOrder:'',
				imageFile:''
			},
			storeLogo: [],
			bannerList: [],
			info: '',
			store: '',
			current: 1,
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
			]
		};
	},
	onLoad() {
		this.getData();
	},
	onShow() {
		console.log(this.apiUrl);
		console.log(this.$apiUrl);
	},
	methods: {
		//前往编辑商家信息
		goEdit() {
			this.$Router.push({
				name: 'store_edit',
				params: { name: this.store.merchName }
			});
		},
		chooseBanner(ists, name){
			this.formData.listOrder = name
			console.log(name)
		},
		beforeUpload(index, list) {
			// 返回一个promise
			console.log('上传图片');
			console.log(index);
			console.log(list);
			return new Promise((resolve, reject) => {
				this.formData.imageFile = this.$tools.imgAddSuffix(list.map(item => item.url))[index]
				console.log(this.formData);
				resolve();
			});
		},
		uploadLogoSuccess(data, index, lists, name) {
			console.log(data);
			console.log(index);
			console.log(lists);
			console.log(name);
			this.storeLogo[index] = { url: data.data.imageFile };
			uni.showToast({
				title: '上传成功'
			});
		},
		uploadBannerSuccess(data, index, lists, name) {
			console.log('banner');
			console.log(data);
			console.log(index);
			console.log(lists);
			console.log(name);
			this.bannerList[name] = [{ url: data.data.imageFile }];
			console.log(this.bannerList[name]);
			console.log(this.bannerList);
			uni.showToast({
				title: '上传成功'
			});
		},
		//上传LOGO
		uploadLogo() {
			console.log('???', this.$refs.logo.lists);
			if (!this.$refs.logo.lists.length) {
				this.$tools.msg('未选择新Logo');
				return;
			}
			let url = this.$tools.imgAddSuffix(this.$refs.logo.lists.map(item => item.url))[0];
			console.log(url);
			this.$api('store.update_logo', {
				imageFile: url
			}).then(res => {
				this.storeLogo = [{ url: res.data.imageFile }];
				uni.showToast({
					title: '修改成功'
				});
			});
			// .catch(err=>{
			// 	console.log(err);
			// 	console.log('牛逼111');
			// })
		},
		//获取商家数据
		getData(load) {
			this.$api('store.data').then(res => {
				console.log(res);
				this.bannerList = res.data.bannerList.map(item => {
					item.url = item.imageSrc;
					return [item];
				});
				this.info = res.data.info;
				this.store = res.data.store;
				if (res.data.store.merchLogo) {
					console.log(res.data.store.merchLogo);
					this.storeLogo = [{ url: res.data.store.merchLogo }];
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	// align-items: center;
	// justify-content: center;
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
}
</style>
