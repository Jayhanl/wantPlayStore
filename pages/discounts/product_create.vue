<template>
	<view class="u-padding-20">
		<u-form :model="form" ref="uForm" label-width="auto">
			<u-form-item label="产品标题" prop="couponTitle"><u-input v-model="form.couponTitle"/></u-form-item>
			<u-form-item label="产品描述" prop="couponDesc"><u-input type="textarea" v-model="form.couponDesc" /></u-form-item>
			<u-form-item label="适用产品"><u-input v-model="form.crProduct" placeholder="不填默认:全场通用" /></u-form-item>
			<u-form-item label="产品类型" prop="couponType">
				<u-input v-model="typeList[form.couponType].text" type="select" @click="typeShow = true" placeholder="请选择产品类型" />
				<u-action-sheet :list="typeList" v-model="typeShow" @click="index => (form.couponType = index)"></u-action-sheet>
			</u-form-item>
			<u-form-item label="消费门槛" prop="crUseRequire"><u-input type="number" v-model="form.crUseRequire" maxlength="8" placeholder="不填默认:无门槛" /></u-form-item>
			<u-form-item v-if="form.couponType!==0" :label="typeList[form.couponType].label"><u-input type="number" v-model="form.couponDiscount" /></u-form-item>
			<u-form-item label="使用开始时间" prop="crUseStartDate">
				<u-input v-model="form.crUseStartDate" placeholder="请选择使用开始时间" type="select" @click="startShow = true" />
				<u-picker mode="time" v-model="startShow" :params="dateParams" title="开始时间" @confirm="e => (form.crUseStartDate = e.year + '-' + e.month + '-' + e.day+ ' ' +e.hour+':00:00')"></u-picker>
			</u-form-item>
			<u-form-item label="使用截止时间" prop="crUseEndDate">
				<u-input v-model="form.crUseEndDate" placeholder="请选择使用截止时间" type="select" @click="endShow = true" />
				<u-picker mode="time" v-model="endShow" :params="dateParams" title="截止日期" @confirm="e => (form.crUseEndDate = e.year + '-' + e.month + '-' + e.day+ ' ' +e.hour+':00:00')"></u-picker>
			</u-form-item>
		</u-form>
		<u-button type="primary" @click="submit">确认发布</u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			dateParams: {
				year: true,
				month: true,
				day: true,
				hour: true
			},
			startShow: false,
			endShow: false,
			typeShow: false,
			form: {
				couponTitle: '',
				couponDesc: '',
				crUseStartDate: '',
				crUseEndDate: '',
				crProduct: '',
				crUseRequire: '',
				couponDiscount: '',
				couponType: 0
			},
			typeList: [
				{
					value:0,
					text: '赠送商品卷',
					label:''
				},
				{
					value:1,
					text: '定价商品卷',
					label:'商品价格'
				},
				{
					value:2,
					text: '满减优惠卷',
					label:'满减值'
				},
				{	
					value:3,
					text: '折扣优惠卷',
					label:'折扣值'
				},
				// {
				// 	value:4,
				// 	text: '活动卷',
				//	label:'商品价格'
				// },
			],
			rules: {
				couponTitle: [
					{
						required: true,
						message: '请输入优惠券标题',
						trigger: 'blur'
					}
				],
				couponDesc: [
					{
						required: true,
						message: '请输入优惠券详细描述',
						trigger: 'blur'
					}
				],
				couponType: [
					{
						required: true,
						type: 'number',
						message: '请选择优惠类型',
						trigger: 'change'
					}
				],
				crUseStartDate: [
					{
						required: true,
						type: 'string',
						message: '请选择使用开始时间',
						trigger: 'change'
					}
				],
				crUseEndDate: [
					{
						required: true,
						type: 'string',
						message: '请选择使用截止时间',
						trigger: 'change'
					}
				],
			}
		};
	},
	computed: {
	},
	onLoad() {},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		//发布优惠券
		submit(e) {
			console.log(e);
			let formD = this.form,
				that = this;
			this.$refs.uForm.validate(valid => {
				if (valid) {
					console.log('验证通过');
					uni.showModal({
						title: '发布确认',
						content: `是否确认发布商品：${formD.couponTitle + '的' +that.typeList[formD.couponType].text}`,
						success: res => {
							if (res.confirm) {
								that.$api('coupon.add', {
									couponTitle: formD.couponTitle,
									couponDesc: formD.couponDesc,
									crProduct: formD.crProduct||0,
									crUseRequire: formD.crUseRequire||0,
									crUseStartDate: formD.crUseStartDat,
									crUseEndDate: formD.crUseEndDate,
									couponType: formD.couponType,
									couponDiscount: formD.couponDiscount||0,
								}).then(res => {
									uni.showToast({
										title: '发布成功'
									});
									setTimeout(() => that.$Router.back(1), 800);
								});
							}
						}
					});
				}
			});
		}
	}
};
</script>

<style></style>
