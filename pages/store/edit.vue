<template>
	<view class="u-padding-20">
		<u-form :model="form" ref="uForm" label-width="auto">
			<u-form-item label="商铺名" prop="name"><u-input v-model="form.name" /></u-form-item>
			<u-form-item label="商铺简介" prop="name"><u-input v-model="form.name" /></u-form-item>
			<u-form-item label="营业时间" prop="name"><u-input v-model="form.name" /></u-form-item>
			<u-form-item label="人均消费" prop="name"><u-input v-model="form.name" /></u-form-item>
			<u-form-item label="商铺联系方式" prop="intro"><u-input v-model="form.intro" /></u-form-item>
			<u-form-item label="商铺联系地址" prop="intro"><u-input v-model="form.intro" /></u-form-item>
			<u-form-item label="商铺标签" prop="intro"><u-input v-model="form.intro" /></u-form-item>
		</u-form>
		<u-button type="primary" @click="submit">确认修改</u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				name: '',
				intro: ''
			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入姓名',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur']
					}
				],
				intro: [
					{
						min: 5,
						message: '简介不能少于5个字',
						trigger: 'change'
					}
				]
			}
		};
	},
	methods: {
		submit(e) {
			console.log(e)
			this.$refs.uForm.validate(valid => {
				if (valid) {
					console.log('验证通过');
				} else {
					console.log('验证失败');
				}
			});
		}
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	}
};
</script>

<style></style>
