<template>
	<view class="u-padding-20">
		<u-form :model="form" ref="uForm" label-width="auto">
			<view class="title">商品图片：</view>
			<u-form-item><u-upload ref="sptp" :max-size="2097152" :auto-upload="false" max-count="1" :file-list="goodsImg" :show-progress="false"></u-upload></u-form-item>
			<view class="title">商品信息</view>
			<u-form-item label="商品标题" prop="goodsTitle"><u-input v-model="form.goodsTitle" /></u-form-item>
			<u-form-item label="商品描述" prop="goodsDesc"><u-input type="textarea" v-model="form.goodsDesc" /></u-form-item>
			<u-form-item label="商品价值" prop="goodsValue"><u-input v-model="form.goodsValue" type="number" maxlength="6" placeholder="商品原价或总价值" /></u-form-item>
			<u-form-item label="商品支付方式" prop="payWayType">
				<u-input v-model="typeList[form.payWayType].text" type="select" @click="typeShow = true" placeholder="请选择商品支付方式" />
				<u-action-sheet :list="typeList" v-model="typeShow" @click="index => (form.payWayType = index)"></u-action-sheet>
			</u-form-item>
			<u-form-item v-if="form.payWayType === 0 || form.payWayType === 1" :label="typeList[form.payWayType].label">
				<u-input type="number" v-model="form.goodsPayValue" />
			</u-form-item>
			<u-form-item label="商品修改数量" prop="goodsLimit"><u-input v-model="form.goodsLimit" type="number" maxlength="6" placeholder="不填默认:无限制" /></u-form-item>
			<u-form-item label="使用次数" prop="goodsGetNum"><u-input v-model="form.goodsGetNum" type="number" maxlength="6" placeholder="用户可使用的次数" /></u-form-item>
			<u-form-item label="限购数量" prop="goodsGetLimit"><u-input v-model="form.goodsGetLimit" type="number" maxlength="6" placeholder="不填默认:无限制" /></u-form-item>
			<u-form-item label="开始时间" prop="issueStartDate">
				<u-input v-model="form.issueStartDate" placeholder="请选择开始时间" type="select" @click="startShow = true" />
				<u-picker
					mode="time"
					v-model="startShow"
					:params="dateParams"
					title="开始时间"
					@confirm="e => (form.issueStartDate = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour +':00:00')"
				></u-picker>
			</u-form-item>
			<u-form-item label="截止时间" prop="issueEndDate">
				<u-input v-model="form.issueEndDate" placeholder="请选择截止时间" type="select" @click="endShow = true" />
				<u-picker
					mode="time"
					v-model="endShow"
					:params="dateParams"
					title="截止日期"
					@confirm="e => (form.issueEndDate = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour +':00:00')"
				></u-picker>
			</u-form-item>
		</u-form>
		<u-button type="primary" @click="submit">确认修改</u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			goodsImg: '',
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
				goodsTitle: '',
				goodsDesc: '',
				issueStartDate: '',
				issueEndDate: '',
				goodsValue: '',
				goodsLimit: '',
				payWayType: 0,
				goodsGetNum: '',
				goodsGetLimit: ''
			},
			typeList: [
				{
					text: '金钱支付',
					label: '商品价格'
				},
				{
					text: '助力推荐',
					label: '助力人数'
				},
				{
					text: '关注我'
				},
				{
					text: '新人专享'
				}
			],
			rules: {
				goodsTitle: [
					{
						required: true,
						message: '请输入商品标题',
						trigger: 'blur'
					}
				],
				goodsDesc: [
					{
						required: true,
						message: '请输入商品描述',
						trigger: 'blur'
					}
				],
				goodsValue: [
					{
						required: true,
						type: 'number',
						message: '请输入商品价值',
						trigger: 'blur'
					}
				],
				payWayType: [
					{
						required: true,
						type: 'number',
						message: '请选择支付方式',
						trigger: 'change'
					}
				],
				goodsGetNum: [
					{
						required: true,
						type: 'number',
						message: '请输入使用次数',
						trigger: 'blur'
					}
				],
				issueStartDate: [
					{
						required: true,
						type: 'string',
						message: '请选择开始时间',
						trigger: 'change'
					}
				],
				issueEndDate: [
					{
						required: true,
						type: 'string',
						message: '请选择截止时间',
						trigger: 'change'
					}
				]
			}
		};
	},
	computed: {},
	onLoad() {
		let item = this.$Route.query.item;
		this.form = item;
		this.goodsImg = [{ url: item.goodsImageUrl }];
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		//选择优惠产品
		selectProduct() {
			this.$Router.push({
				name: 'product_select'
			});
		},
		//修改
		submit(e) {
			console.log(e);
			let formD = this.form,
				that = this,
				url = '';
			this.$refs.uForm.validate(valid => {
				if (valid) {
					if (this.$refs.sptp.lists.length) {
						url = this.$tools.imgAddSuffix(this.$refs.sptp.lists.map(item => item.url), true)[0];
					}
					if (this.product === '') {
						this.$tools.msg('请选择优惠产品');
						return;
					}
					if ((formD.payWayType === 0 || formD.payWayType === 1) && !formD.goodsPayValue) {
						this.$tools.msg(`请输入${that.typeList[formD.payWayType].label}`);
						return;
					}
					console.log('验证通过');
					uni.showModal({
						title: '修改确认',
						content: `是否确认修改直销商品：${formD.goodsTitle}`,
						success: res => {
							if (res.confirm) {
								that.$api('goods.update', {
									goodsId: formD.goodsId,
									goodsImageString: url || null,
									goodsTitle: formD.goodsTitle,
									goodsDesc: formD.goodsDesc,
									goodsValue: formD.goodsValue,
									payWayType: formD.payWayType,
									goodsPayValue: formD.goodsPayValue || 0,
									goodsLimit: formD.goodsLimit || 0,
									goodsGetNum: formD.goodsGetNum,
									goodsGetLimit: formD.goodsGetLimit || 0,
									issueStartDate: formD.issueStartDate,
									issueEndDate: formD.issueEndDate
								}).then(res => {
									uni.showToast({
										title: '修改成功'
									});
									setTimeout(() => that.$Router.back(2), 800);
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

<style lang="scss" scoped>
.title {
	padding-top: 14rpx;
	font-size: 32rpx;
	font-weight: bold;
}
</style>
