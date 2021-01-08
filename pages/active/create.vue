<template>
	<view class="u-padding-20">
		<u-form :model="form" ref="uForm" :rules="rules" label-width="auto">
			<view class="title">动态信息：</view>
			<!-- <u-line color="red" /> -->
			<u-form-item label="标题" prop="minfoTitle"><u-input v-model="form.minfoTitle" maxlength="20" /></u-form-item>
			<u-form-item label="动态类型" prop="minfoType">
				<u-input v-model="typeList[form.minfoType].text" type="select" @click="typeShow = true" placeholder="请选择动态类型" />
				<u-action-sheet :list="typeList" v-model="typeShow" @click="index => (form.minfoType = index)"></u-action-sheet>
			</u-form-item>
			<u-form-item v-if="form.minfoType === 1" label="投票截止日期">
				<u-input v-model="form.endTime" placeholder="请选择投票截止日期" type="select" @click="endShow = true" />
				<u-picker mode="time" v-model="endShow" title="投票截止日期" @confirm="e => (form.endTime = e.year + '-' + e.month+ '-' + e.day)"></u-picker>
			</u-form-item>
			</u-form-item>
			<u-form-item label="正文" prop="minfoDesc"><u-input v-model="form.minfoDesc" type="textarea" :maxlength="form.minfoType === 1 ? 3000 : 500" /></u-form-item>
			<block v-if="form.minfoType === 0">
				<view class="title">上传图片：</view>
				<u-form-item><u-upload ref="img" :max-size="2097152" :auto-upload="false" max-count="9"></u-upload></u-form-item>
			</block>
			<!-- 投票选项 -->

			<block v-else-if="form.minfoType === 1">
				<view class="title u-m-t-20">投票选项：</view>
				<u-form-item v-for="(item, index) in voteList" :key="index" class="u-m-l-20" :label="'选项' + (index + 1)">
					<u-input v-model="item.text" maxlength="50" />

					<u-button slot="right" :type="index === 0 ? 'success' : 'error'" size="mini" @click="setItem(index)">{{ index === 0 ? '添加' : '删除' }}</u-button>
					<!-- <u-button v-else slot="right" type="error" size="mini" @click="delItem(index)">删除</u-button> -->
				</u-form-item>
			</block>
		</u-form>
		<u-button class="u-m-t-40" type="primary" @click="submit">发布动态</u-button>
		<!-- <view class="map_container"></view> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				minfoTitle: '',
				minfoType: 0,
				minfoDesc: '',
				endTime: ''
			},
			voteList: [{ text: '' }],
			typeShow: false,
			endShow: false,
			typeList: [
				{
					text: '图文'
				},
				{
					text: '投票'
				},
				{
					text: '活动'
				}
			],
			rules: {
				minfoTitle: [
					{
						required: true,
						message: '请输入动态标题',
						trigger: 'blur'
					}
				],
				minfoType: [
					{
						required: true,
						type: 'number',
						message: '请选择动态类型',
						trigger: 'change'
					}
				],
				minfoDesc: [
					{
						required: true,
						message: '请输入正文',
						trigger: 'blur'
					}
				],
				merchMaster: [
					{
						required: true,
						message: '请输入负责人名称',
						trigger: 'blur'
					}
				]
			}
		};
	},
	methods: {
		// 操作投票选项
		setItem(index) {
			if (index === 0) {
				this.voteList.push({ text: '' });
			} else {
				this.voteList.splice(index, 1);
				this.$tools.msg('删除成功');
			}
		},
		addItem() {
			this.voteList.push({ text: '' });
		},
		// 删除投票选项
		delItem(index) {
			this.voteList.splice(index, 1);
			this.$tools.msg('删除成功');
		},
		//发布动态
		submit(e) {
			console.log(this.voteList);
			let url = '',
				list = '',
				formD = this.form,
				minfoType = formD.minfoType + 1;
			if (minfoType === 1 && this.$refs.img.lists.length) {
				url = this.$tools.imgAddSuffix(this.$refs.img.lists.map(item => item.url));
			} else if (minfoType === 2) {
				list = this.voteList.filter(item => item.text).map(item => item.text);
				console.log(list);
				if (list.length < 2) {
					this.$tools.msg('投票选项不能少于2项！');
					return;
				}
			}
			console.log('哈哈哈');
			this.$refs.uForm.validate(valid => {
				if (valid) {
					console.log('验证成功');
					this.$api('info.create', {
						minfoTitle: formD.minfoTitle,
						minfoType: minfoType,
						minfoDesc: formD.minfoDesc,
						imageList: url,
						optionList: list,
						endTime: formD.endTime,
					}).then(res => {
						console.log(res);
						uni.switchTab({
							url: '/pages/active/active',
							success() {
								uni.showToast({
									title: '发布成功'
								});
							}
						});
					});
				}
			});
		}
	},
	onLoad() {},
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
