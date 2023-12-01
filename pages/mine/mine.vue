<template>
	<view class="container container25494">
		<view class="flex flex-wrap diygw-col-24 flex-direction-column"  v-if="!userInfo">
			<view class="flex diygw-col-24 justify-center avatar-clz">
				<view class="diygw-avatar avatar-avatar radius bg-none">
					<image mode="aspectFill" class="diygw-avatar-img radius" src="../../static/OIP.jpg"></image>
				</view>
			</view>
			<view class="diygw-col-24 text-clz margin-bottom-md" style="line-height: 30px;font-size: 16px;"> 登录，享受技术之旅 </view>
			<view class="flex diygw-col-24 flex-nowrap">
				<view class="flex diygw-col-24 justify-center">
					<button @tap="navigateTo" data-type="page" data-url="/pages/login/login" class="diygw-btn red radius-xs button-button-clz">登录</button>
				</view>
			</view>
		</view>
		<view class="flex flex-wrap diygw-col-24 flex-direction-column" v-else>
			<view class="flex diygw-col-24 justify-center avatar-clz">
				<view class="diygw-avatar avatar-avatar radius bg-none">
					<image mode="aspectFill" class="diygw-avatar-img radius" :src="userInfo.avatarUrl"></image>
				</view>
			</view>
			<view class="diygw-col-24 text-clz"> {{userInfo.nickname}} </view>
			<view class="diygw-col-24 text1-clz"> 积分：{{userInfo.bonus}} </view>
			<view class="flex diygw-col-24 flex-nowrap">
				<view class="flex diygw-col-24 button-clz">
					<button class="diygw-btn blue radius-xs flex-sub margin-xs button-button-clz">签到</button>
				</view>
				<view class="flex diygw-col-24 button1-clz">
					<button @tap="logout" class="diygw-btn blue radius-xs flex-sub margin-xs button1-button-clz">退出</button>
				</view>
			</view>
		</view>
		<view v-if="userInfo" class="margin-top">
			<view class="flex flex-wrap diygw-col-24 flex-direction-column margin-top-lg">
				<view @tap="navigateTo" data-type="page" data-url="/pages/myExchange/myExchange" class="diygw-col-24 text2-clz"> 我的兑换 </view>
			</view>
			<view  @tap="navigateTo" data-type="page" data-url="/pages/pointsDetail/pointsDetail" class="diygw-col-24 text3-clz"> 积分明细 </view>
			<view @tap="navigateTo" data-type="page" data-url="/pages/myContribute/myContribute" class="diygw-col-24 text4-clz"> 我的投稿 </view>
			<view @tap="navigateTo" data-type="page" data-url="/pages/examine/examine" v-if="userInfo.roles =='admin'" class="diygw-col-24 text5-clz"> 审核投稿 </view>
		</view>
		
		
		
		<view class="clearfix"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//用户全局信息
				userInfo: null,
				//页面传参
				globalOption: {},
				//自定义全局变量
				globalData: {}
			};
		},
		onShow() {
			this.setCurrentPage(this);
			if(uni.getStorageSync("user")){
				this.userInfo = uni.getStorageSync('user');
			}
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
			async init() {},
			logout(){
				this.userInfo = null;
				uni.clearStorageSync();
			}
		}
	};
</script>

<style lang="scss" scoped>
	.avatar-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 50rpx;
		margin-bottom: 20rpx;
		margin-right: 10rpx;
	}
	.avatar-avatar {
		width: 100px;
		height: 100px;
	}
	.text-clz {
		font-weight: bold;
		text-align: center;
	}
	.text1-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		text-align: center;
		margin-right: 10rpx;
	}
	.button-clz {
		margin-left: 200rpx;
		width: calc(100% - 200rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.button-button-clz {
		margin: 3px !important;
	}
	.button1-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 200rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 200rpx;
	}
	.button1-button-clz {
		margin: 3px !important;
	}
	.text2-clz {
		margin-left: 20rpx;
		padding-top: 10rpx;
		padding-left: 10rpx;
		width: calc(100% - 20rpx - 10rpx) !important;
		padding-bottom: 10rpx;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		border-bottom: 2rpx solid #eee;
		margin-right: 10rpx;
		padding-right: 10rpx;
	}
	.text3-clz {
		margin-left: 20rpx;
		padding-top: 10rpx;
		padding-left: 10rpx;
		width: calc(100% - 20rpx - 10rpx) !important;
		padding-bottom: 10rpx;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		border-bottom: 2rpx solid #eee;
		margin-right: 10rpx;
		padding-right: 10rpx;
	}
	.text4-clz {
		margin-left: 20rpx;
		padding-top: 10rpx;
		padding-left: 10rpx;
		width: calc(100% - 20rpx - 10rpx) !important;
		padding-bottom: 10rpx;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		border-bottom: 2rpx solid #eee;
		margin-right: 10rpx;
		padding-right: 10rpx;
	}
	.text5-clz {
		margin-left: 20rpx;
		padding-top: 10rpx;
		padding-left: 10rpx;
		width: calc(100% - 20rpx - 10rpx) !important;
		padding-bottom: 10rpx;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		border-bottom: 2rpx solid #eee;
		margin-right: 10rpx;
		padding-right: 10rpx;
	}
	.container25494 {
		padding-left: 0px;
		padding-right: 0px;
	}
	.container25494 {
	}
</style>
