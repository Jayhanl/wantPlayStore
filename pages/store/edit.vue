<template>
	<view class="u-padding-20">
		<u-form :model="form" ref="uForm" label-width="auto">
			<u-form-item label="商铺名"><u-input disabled v-model="form.merchName" maxlength="20" /></u-form-item>
			<u-form-item label="商铺简介" prop="merchDesc"><u-input v-model="form.merchDesc" type="textarea" maxlength="500" /></u-form-item>
			<u-form-item label="营业日" prop="merchYyrq">
				<u-checkbox-group @change="e => (form.merchYyrq = e)">
					<u-checkbox v-model="item.checked" v-for="(item, index) in dayList" :key="index" :name="item.text">{{ item.text }}</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item label="营业开始时间" prop="merchYysjStart">
				<u-input v-model="form.merchYysjStart" placeholder="请选择营业开始时间" type="select" @click="startShow = true" />
				<u-picker mode="time" v-model="startShow" :params="dateParams" title="营业开始时间" @confirm="e => (form.merchYysjStart = e.hour + ':' + e.minute)"></u-picker>
			</u-form-item>
			<u-form-item label="营业结束时间" prop="merchYysjEnd">
				<u-input v-model="form.merchYysjEnd" placeholder="请选择营业结束时间" type="select" @click="endShow = true" />
				<u-picker mode="time" v-model="endShow" :params="dateParams" title="营业结束时间" @confirm="e => (form.merchYysjEnd = e.hour + ':' + e.minute)"></u-picker>
			</u-form-item>
			<u-form-item label="人均消费" prop="merchCpp"><u-input v-model="form.merchCpp" type="number" maxlength="6" /></u-form-item>
			<u-form-item label="商铺联系方式" prop="merchMobile"><u-input v-model="form.merchMobile" maxlength="20" /></u-form-item>
			<u-form-item label="商铺联系地址" prop="merchAddr">
				<u-input v-model="form.merchAddr" disabled type="textarea" maxlength="100" />
				<u-button slot="right" type="success" size="mini" @click="selectAddr">选择</u-button>
			</u-form-item>
			<u-form-item label="商铺标签" prop="merchLabel">
				<u-checkbox-group @change="e => (form.merchLabel = e)">
					<u-checkbox v-model="item.checked" v-for="(item, index) in labelList" :key="index" :name="item.labelName">{{ item.labelName }}</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
		</u-form>
		<u-button type="primary" @click="submit">确认修改</u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			startShow: false,
			endShow: false,
			dateParams: {
				year: false,
				month: false,
				day: false,
				hour: true,
				minute: true
			},
			form: {
				merchName:'',
				merchYyrq: '',
				merchYysjStart: '',
				merchYysjEnd: '',
				merchDesc: '',
				merchCpp: '',
				merchMobile: '',
				merchAddr: '',
				merchLabel: ''
			},
			dayList: [
				{ checked: false, text: '周一' },
				{ checked: false, text: '周二' },
				{ checked: false, text: '周三' },
				{ checked: false, text: '周四' },
				{ checked: false, text: '周五' },
				{ checked: false, text: '周六' },
				{ checked: false, text: '周日' }
			],
			labelList: [],
			rules: {
				merchDesc: [
					{
						required: true,
						message: '请输入商铺名',
						trigger: 'blur'
					}
				],
				merchCpp: [
					{
						required: true,
						message: '请输入人均消费',
						trigger: 'blur'
					}
				],
				merchYyrq: [
					{
						required: true,
						type: 'array',
						message: '请选择营业日',
						trigger: 'change'
					}
				],
				merchYysjStart: [
					{
						required: true,
						type: 'string',
						message: '请选择营业开始时间',
						trigger: 'change'
					}
				],
				merchYysjEnd: [
					{
						required: true,
						type: 'string',
						message: '请选择营业结束时间',
						trigger: 'change'
					}
				],
				merchMobile: [
					{
						required: true,
						message: '请输入商铺联系方式',
						trigger: 'blur'
					}
				],
				// merchAddr: [
				// 	{
				// 		required: true,
				// 		message: '请输入商铺联系地址',
				// 		trigger: 'blur'
				// 	}
				// ],
				merchLabel: [
					{
						required: true,
						type: 'array',
						message: '请选择商铺标签',
						trigger: 'change'
					}
				]
			}
		};
	},
	onLoad() {
		this.getData();
		this.form.merchName = this.$Route.query.name
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		//获取商家主营分类
		getData() {
			this.$api('data.merch_label').then(res => {
				console.log(res.data);
				this.labelList = res.data.map(item => {
					item.checked = false;
					return item;
				});
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
			uni.chooseLocation({
				geocode: true,
				success: function(res) {
					console.log(res);
					that.form.merchAddr = res.address;
				}
			});
		},
		//修改信息
		submit(e) {
			console.log(e);
					let formD = this.form
			this.$refs.uForm.validate(valid => {
				if (valid) {
					console.log('验证通过');
					console.log(parseInt(formD.merchYysjStart.replace(':','')));
					this.$api('store.update_info', {
						merchDesc: formD.merchDesc,
						merchCpp: formD.merchCpp,
						merchMobile: formD.merchMobile,
						merchYyrq: formD.merchYyrq,
						merchYysjStart: parseInt(formD.merchYysjStart.replace(':','')),
						merchYysjEnd: parseInt(formD.merchYysjEnd.replace(':','')),
						merchAddr: formD.merchAddr,
						merchLabel: formD.merchLabel
					}).then(res => {
						uni.showToast({
							title:'修改成功'
						})
						setTimeout(()=>this.$Router.back(1),1500)
						
					})
				}
			});
		}
	}
};
</script>

<style></style>
