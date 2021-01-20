<template>
	<view class="u-padding-20">
		<u-form :model="form" ref="uForm" label-width="auto">
			<view class="title">商品图片：</view>
			<u-form-item><u-upload ref="sptp" :max-size="2097152" :auto-upload="false" max-count="1" :file-list="goodsImg" :show-progress="false"></u-upload></u-form-item>
			<view class="title">商品信息</view>
			<u-form-item label="商品标题" prop="pcTitle"><u-input v-model="form.pcTitle" /></u-form-item>
			<u-form-item label="商品描述" prop="pcDesc"><u-input type="textarea" v-model="form.pcDesc" /></u-form-item>
			<u-form-item label="商品类型" prop="platformCouponType">
				<u-input v-model="typeList[form.platformCouponType].text" type="select" @click="typeShow = true" placeholder="请选择商品类型" />
				<u-action-sheet :list="typeList" v-model="typeShow" @click="index => (form.platformCouponType = index)"></u-action-sheet>
			</u-form-item>
			<u-form-item :label="form.platformCouponType ? '免单份数' : '每月免单份数'" prop="pcNum">
				<u-input v-model="form.pcNum" type="number" maxlength="6" :placeholder="form.platformCouponType ? '最低每月5份起' : '最低10份起'" />
			</u-form-item>
			<u-form-item label="商品价值" prop="pcValue"><u-input v-model="form.pcValue" type="number" maxlength="6" placeholder="商品原价或总价值" /></u-form-item>
			<u-form-item label="适用产品"><u-input v-model="form.pcProduct" placeholder="不填默认:全场通用" /></u-form-item>
			<u-form-item label="产品从领取日起有效使用期(周)"><u-input v-model="form.pcValidWeek" /></u-form-item>
		</u-form>
		<u-button type="primary" @click="submit">确认修改</u-button>
		<view class="notice">
			<text class="title">注意：</text>
			<text>1、免单产品会由平台进行活动统一发放，免单产品的 推广方式以及发布时间由平台自定;</text>
			<text>2、平台每月固定推广模式：商家需每月固定提供免单 产品供平台进行推广，不同类型的商家需提供的免单 份数不一致;</text>
			<text>3、平台推广模式：商家提供免单产品到平台，平台进 行推广，推广方式以及发布时间由平台自定.</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			goodsImg: [],
			typeShow: false,
			form: {
				pcTitle: '',
				pcDesc: '',
				pcValue: '',
				platformCouponType: 0,
				pcNum: '',
				pcProduct: ''
			},
			typeList: [
				{
					text: '责任 '
				},
				{
					text: '推广'
				}
			],
			rules: {
				pcTitle: [
					{
						required: true,
						message: '请输入商品标题',
						trigger: 'blur'
					}
				],
				pcDesc: [
					{
						required: true,
						message: '请输入商品描述',
						trigger: 'blur'
					}
				],
				platformCouponType: [
					{
						required: true,
						type: 'number',
						message: '请选择产品类型',
						trigger: 'change'
					}
				],
				pcNum: [
					{
						required: true,
						type: 'number',
						message: '请输入免单份数',
						trigger: 'blur'
					}
				],
				pcValue: [
					{
						required: true,
						type: 'number',
						message: '请输入商品价值',
						trigger: 'blur'
					}
				],
				pcValidWeek: [
					{
						required: true,
						message: '请输入有效期',
						trigger: 'blur'
					}
				]
			}
		};
	},
	computed: {},
	onLoad() {
		this.form = this.$Route.query.item;
		this.goodsImg = [{ url: this.$Route.query.item.pcImageUrl }];
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		//修改
		updateItem(isCover) {
			let formD = this.form,
				that = this,
				url = '';
			console.log('url',url)
			if (that.$refs.sptp.lists.length) {
				url = that.$tools.imgAddSuffix(that.$refs.sptp.lists.map(item => item.url), true)[0];
			}
			console.log('url',url)
			that.$api('discounts_platform.update', {
				pcId: formD.pcId,
				isCover: isCover,
				pcImageString: url || null,
				pcTitle: formD.pcTitle,
				pcDesc: formD.pcDesc,
				pcValue: formD.pcValue,
				platformCouponType: formD.platformCouponType,
				pcNum: formD.pcNum,
				pcProduct: formD.pcProduct,
				pcValidWeek: formD.pcValidWeek
			})
				.then(res => {
					uni.showToast({
						title: '修改成功'
					});
					setTimeout(() => that.$Router.back(2), 800);
				})
				.catch(err => {
					console.log(err);
					if (err.data.data.errCode === 40022) {
						uni.showModal({
							title: '覆盖确认',
							content: `有系统未审核的操作记录，确定进行覆盖操作吗？`,
							success: res => {
								if (res.confirm) {
									that.updateItem(true);
								}
							}
						});
					}
				});
		},
		//发布
		submit(e) {
			console.log(e);
			let that = this,
			formD = this.form
			this.$refs.uForm.validate(valid => {
				if (valid) {
					console.log('验证通过');
					uni.showModal({
						title: '修改确认',
						content: `是否确认修改直销商品：${formD.pcTitle}`,
						success: res => {
							if (res.confirm) {
								that.updateItem(false);
							}
						}
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.title {
	padding-top: 14rpx;
	font-size: 32rpx;
	font-weight: bold;
}
.notice {
	display: flex;
	flex-direction: column;
	font-size: 24rpx;
	padding: 20rpx 20rpx;
	.title {
		font-size: 26rpx;
		font-weight: bold;
	}
	& > text {
		margin: 4rpx 0;
	}
}
</style>
