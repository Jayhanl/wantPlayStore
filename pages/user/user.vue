<template>
	<view>
        <view class="title">
        	<u-link href="http://www.uviewui.com">本项目使用uView！</u-link>
        </view>
        
        <view class="title">
        	<u-link href="https://hhyang.cn/src/router/start/quickstart.html">本项目使用uni-simple-router！</u-link>
        </view>

        
        <button type="default" @click="toLogin" class="login-button" style="margin-top: 150upx;">前往登录页</button>
        
        <!-- 未登录时会跳转登录页 -->
        <button type="default" @click="toOrder" class="login-button">前往订单页</button>
        
        <view>
            <u-calendar v-model="show" :mode="mode"></u-calendar>
            <u-button @click="show = true" style="width: 260upx;margin-top: 100upx;">打开uView日历</u-button>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
            return {
                show: false,
                mode: 'date'
            	
            };
        },
        methods: {
            toLogin(){
                //跳转传参示例
                this.$Router.push({
                    path: '/pages/login/login',
                    query: {msg:'我要登录！'}
                });
            },
            toOrder(){
                //跳转传参示例
                this.$Router.push({
                    path: '/pages/order/order',
                    query: {msg:'前往订单！'}
                });
            }
        }
	}
</script>

<style lang="scss">
    .title{
        text-align: center;
        margin-top: 100upx;
    }
    .login-button{
        width: 250upx;
        margin-top: 20upx;
    }
    

</style>
