<template>
	<view class="container container25494">
		<view class="flex flex-wrap diygw-col-24 diygw-col-10 justify-center items-center " style="height: 290px;">
			<view class="diygw-col-12">
				<image  src="/static/QQtp20231008121354.png" class="response diygw-col-24" mode="widthFix"></image>
			</view>
		</view>
		<view class="flex flex-wrap diygw-col-24 flex-direction-column">
			<u-form-item class="diygw-col-24 input-clz" label="手机号" prop="input">
				<u-input :focus="inputFocus" class="" placeholder="清输入手机号" v-model="phone" type="text"></u-input>
			</u-form-item>
			<u-form-item class="diygw-col-24 input1-clz" label="密码" prop="input1">
				<u-input :focus="input1Focus" class="" placeholder="清输入密码" v-model="password" type="text"></u-input>
			</u-form-item>
			<view class="flex diygw-col-24 button-clz">
				<button @tap="login" :disabled="disabled"
				style="background-color: #db5e54 !important" 
				class="diygw-btn green radius-xs flex-sub margin-xs button-button-clz">登录</button>
			</view>
		</view>
		
		<view class="clearfix"></view>
	</view>
</template>

<script>
import {LOGIN_URL} from '../../util/api.js';
import {request} from '../../util/request.js';
	export default {
		data() {
			return {
				//用户全局信息
				userInfo: {},
				//页面传参
				globalOption: {},
				//自定义全局变量
				globalData: {},
				inputFocus: false,
				phone: '13951905171',
				input1Focus: false,
				password: '123123'
			};
		},
		computed:{
			disabled(){
				if((this.phone===''||this.password==='')){
					return true;
				}
				return false;
			}
		},
		onShow() {
			this.setCurrentPage(this);
		},
		onLoad(option) {
			this.setCurrentPage(this);
			if (option) {
				this.setData({
					globalOption: this.getOption(option)
				});
			}

			this.init();
		},
		methods: {
			async init() {
				
			},
			// initResetform(){
			// 	this.initform = JSON.stringify(this.form);
			// },
			// resetForm(){
			// 	this.form = JSON.parse(this.initform);
			// }
			async login(){
				const loginDTO={
					phone: this.phone,
					password: this.password
				}
				const res = await request(LOGIN_URL,'POST',loginDTO);
				console.log(res)
				if(res.success === true){
					uni.showToast({
						title: '登录成功'
					});
					console.log(JSON.stringify(res.data.user)+"$$$$$$")
					uni.setStorageSync('user',res.data.user);
					uni.setStorageSync('token',res.data.token);
					uni.switchTab({
						url: "/pages/mine/mine"
					})
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.flex-clz {
		margin-left: 252rpx;
		width: calc(100% - 252rpx - 10rpx) !important;
		margin-top: 160rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.input-clz {
		margin-left: 60rpx;
		width: calc(100% - 60rpx - 60rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 60rpx;
	}
	.input1-clz {
		margin-left: 60rpx;
		width: calc(100% - 60rpx - 60rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 60rpx;
	}
	.button-clz {
		margin-left: 48rpx;
		width: calc(100% - 48rpx - 48rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 48rpx;
	}
	.button-button-clz {
		margin: 3px !important;
	}
	.container25494 {
		padding-left: 0px;
		padding-right: 0px;
	}
	.container25494 {
	}
</style>
