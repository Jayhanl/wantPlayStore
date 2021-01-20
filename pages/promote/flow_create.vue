<template>
	<view class="u-padding-20">
		<u-form :model="form" ref="uForm" label-width="auto">
			<u-form-item label="提成奖励" prop="tcNum"><u-input v-model="form.tcCondition" type="number" maxlength="8" placeholder="请输入提成奖励(人/元)" /></u-form-item>
			<u-form-item label="奖励组数"><u-input type="number" v-model="form.tcNum" maxlength="8" placeholder="请输入奖励组数" /></u-form-item>
			<u-form-item label="目标流量人数">
				<text>{{form.tcCondition * form.tcNum}} 人</text>
			</u-form-item>
			<u-form-item label="总奖励金额">
				<text>{{ form.tcNum || 0 }} 元</text>
			</u-form-item>
			<u-form-item label="截止时间" prop="endTime">
				<u-input v-model="form.endTime" placeholder="请选择截止时间" type="select" @click="endShow = true" />
				<u-picker mode="time" v-model="endShow" title="截止日期" @confirm="e => (form.endTime = e.year + '-' + e.month + '-' + e.day)"></u-picker>
			</u-form-item>
			<u-form-item label="开放推广" prop="isOpen">
				<u-radio-group v-model="form.isOpen" @change="e => (form.isOpen = e)">
					<u-radio :name="1">是</u-radio>
					<u-radio :name="0">否</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="支付方式" prop="payType">
				<u-input v-model="typeList[form.payType].text" type="select" @click="typeShow = true" placeholder="请选择支付方式" />
				<u-action-sheet :list="typeList" v-model="typeShow" @click="index => (form.payType = index)"></u-action-sheet>
			</u-form-item>
		</u-form>
		<u-button type="primary" @click="submit">确认发布</u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			endShow: false,
			typeShow: false,
			form: {
				tcCondition: '',
				tcNum: '',
				endTime: '',
				isOpen: 1,
				merchAddr: '',
				payType: 0
			},
			typeList: [
				{
					text: '钱包余额'
				},
				{
					text: '微信支付'
				}
			],
			rules: {
				tcCondition: [
					{
						required: true,
						message: '请输入提成奖励',
						trigger: 'blur'
					}
				],
				tcNum: [
					{
						required: true,
						message: '请输入奖励组数',
						trigger: 'blur'
					}
				],
				endTime: [
					{
						required: true,
						type: 'string',
						message: '请选择截止时间',
						trigger: 'change'
					}
				],
				isOpen: [
					{
						required: true,
						type: 'number',
						message: '请选择是否开放推广',
						trigger: 'change'
					}
				],
				payType: [
					{
						required: true,
						type: 'number',
						message: '请选择支付方式',
						trigger: 'change'
					}
				]
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
		//发布流量推广
		submit(e) {
			console.log(e);
			let formD = this.form,
				that = this;
			this.$refs.uForm.validate(valid => {
				if (valid) {
					console.log('验证通过');
					uni.showModal({
						title: '发布确认',
						content: `是否确认使用 ${that.typeList[formD.payType].text} 预支付 ¥${formD.tcNum} 元发布流量推广`,
						success: res => {
							if (res.confirm) {
								that.$api('lltg.create', {
									tcCondition: formD.tcCondition,
									tcNum: formD.tcNum,
									isOpen: formD.isOpen,
									endTime: formD.endTime,
									payType: formD.payType + 1
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
