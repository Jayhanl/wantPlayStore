<template>
	<view class="u-padding-20">
		<u-form :model="form" ref="uForm" :rules="rules" label-width="auto">
			<view class="title">公司信息：</view>
			<!-- <u-line color="red" /> -->
			<u-form-item label="统一社会信用代码" prop="uscCode"><u-input v-model="form.uscCode" maxlength="20" /></u-form-item>
			<u-form-item label="公司名称" prop="companyName"><u-input v-model="form.companyName" maxlength="20" /></u-form-item>
			<u-form-item label="公司类型" prop="companyType" :border-bottom="false">
				<u-input v-model="typeList[form.companyType].text" type="select" @click="typeShow = true" />
				<u-action-sheet :list="typeList" v-model="typeShow" @click="index => (form.companyType = index)"></u-action-sheet>
			</u-form-item>

			<view class="title">店铺信息：</view>
			<u-form-item label="店铺名称" prop="merchName"><u-input v-model="form.merchName" maxlength="50" placeholder="有分店请括号标明地区点，例(赤岗店)" /></u-form-item>
			<u-form-item label="负责人名称" prop="merchMaster"><u-input v-model="form.merchMaster" maxlength="20" /></u-form-item>
			<u-form-item label="负责人联系方式" prop="masterMobile"><u-input v-model="form.masterMobile" type="number" maxlength="11" /></u-form-item>
			<u-form-item label="店铺地址" prop="merchAddr">
				<u-input v-model="form.merchAddr" disabled type="text" maxlength="100" />
				<u-button slot="right" type="success" size="mini" @click="selectAddr">选择</u-button>
			</u-form-item>
			<u-form-item label="店铺主营" prop="mcateId" :border-bottom="false">
				<u-input v-model="masterList[form.mcateId].text" type="select" @click="masterShow = true" />
				<u-action-sheet :list="masterList" v-model="masterShow" @click="index => (form.mcateId = index)"></u-action-sheet>
			</u-form-item>

			<view class="title">营业资质：</view>
			<u-form-item><u-upload ref="yyzz" :max-size="2097152" :auto-upload="false" max-count="9"></u-upload></u-form-item>
		</u-form>
		<u-button class="u-m-t-40" type="primary" @click="submit">提交入驻</u-button>
		<!-- <view class="map_container"></view> -->
	</view>
</template>

<script>
// import amap from '@/common/utils/amap-wx.130.js';
export default {
	data() {
		return {
			// amapPlugin: null,
			// amapKey: '64d6e6f376e862e35c5d8891d3ec6cd5',
			form: {
				uscCode: '',
				companyName: '',
				companyType: '',
				merchName: '',
				merchMaster: '',
				masterMobile: '',
				merchAddr: '',
				mcateId: ''
			},
			typeShow: false,
			masterShow: false,
			typeList: [
				{
					text: '企业'
				},
				{
					text: '个体工商户'
				}
			],
			masterList: [],
			rules: {
				uscCode: [
					{
						required: true,
						message: '请输入统一社会信用代码',
						trigger: 'blur'
					}
				],
				companyName: [
					{
						required: true,
						message: '请输入公司名称',
						trigger: 'blur'
					}
				],
				companyType: [
					{
						required: true,
						type: 'number',
						message: '请选择公司类型',
						trigger: 'change'
					}
				],
				merchName: [
					{
						required: true,
						message: '请输入店铺名称',
						trigger: 'blur'
					}
				],
				merchMaster: [
					{
						required: true,
						message: '请输入负责人名称',
						trigger: 'blur'
					}
				],
				masterMobile: [
					{
						required: true,
						message: '请输入负责人联系方式',
						trigger: ['change', 'blur']
					},
					{
						validator: (rule, value, callback) => this.$u.test.mobile(value),
						message: '手机号码不正确',
						trigger: ['change', 'blur']
					}
				],
				merchAddr: [
					{
						required: true,
						message: '请选择店铺地址',
						trigger: 'blur'
					}
				],
				mcateId: [
					{
						required: true,
						type: 'number',
						message: '请选择店铺主营',
						trigger: 'change'
					}
				]
			}
		};
	},
	methods: {
		//获取商家主营分类
		getData(){
			this.$api('data.merch_cate', {
				parentId: ''
			}).then(res => {
				console.log(res.data);
				this.masterList = res.data
			});
		},
		//选择位置
		selectAddr() {
			const that = this;
			//#ifdef MP-WEIXIN
			uni.getSetting({
				success(res) {
					if (!res.authSetting['scope.userLocation']) {
						uni.authorize({
							scope: 'scope.userLocation',
							success() {
								that.chooseLocation();
								return;
							}
						});
					} else {
						that.chooseLocation();
						return;
					}
				}
			});
			//#endif
			//#ifndef MP-WEIXIN
			that.chooseLocation();
			//#endif
		},
		chooseLocation() {
			const that = this;
			// this.amapPlugin.getRegeo({
			//     success: (data) => {
			//         console.log(data)
			//     }
			// });
			uni.chooseLocation({
				geocode: true,
				success: function(res) {
					console.log(res);
					that.form.merchAddr = res.address;
				}
			});
		},
		submit(e) {
			let url = '',
				formD = this.form;
			if (!this.$refs.yyzz.lists.length) {
				this.$tools.msg('请上传营业资质');
				return;
			}
			url = this.$tools.imgAddSuffix(this.$refs.yyzz.lists.map(item=>item.url));
			this.$refs.uForm.validate(valid => {
				if (valid) {
					console.log('验证成功');
					this.$api('login.create_data', {
						uscCode: formD.uscCode,
						companyName: formD.companyName,
						companyType: formD.companyType+1,
						merchName: formD.merchName,
						merchMaster: formD.merchMaster,
						masterMobile: formD.masterMobile,
						merchAddr: formD.merchAddr,
						mcateId: this.masterList[formD.mcateId].mcateId,
						businessQa: url
					}).then(res => {
						console.log(res);
						uni.reLaunch({
							url: '/pages/home/home',
							success() {
								uni.showToast({
									title: '入住成功'
								});
							}
						});
					});
				}
			});
		}
	},
	onLoad() {
		this.getData()
		// //#ifdef MP-WEIXIN
		// this.amapPlugin = new amap.AMapWX({
		// 	key: this.amapKey
		// });
		// //#endif
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	}
};
</script>

<style lang="scss" scoped>
.title {
	padding-top: 14rpx;
	font-size: 32rpx;
	font-weight: bold;
}
// .map_container {
// 	position: absolute;
// 	top: 0;
// 	bottom: 0;
// 	left: 0;
// 	right: 0;
// }
</style>
