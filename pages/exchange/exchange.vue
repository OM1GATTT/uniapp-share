<template>
	<view class="container container25494">
		<u-form-item class="diygw-col-24 input-clz" labelPosition="top">
			{{share.title}}
		</u-form-item>
		<view class="flex diygw-col-24 flex-nowrap justify-center flex-clz align-center" style="line-height: 40px; margin-left:18px;margin-right: 18px;">
			<view  class=" diygw-col-8">
				作者：{{share.author}}
			</view>
			<view class=" diygw-col-8">
				发布人：{{nickname}}
			</view>
			<view class=" diygw-col-8">
				下载次数：{{share.buyCount}}
			</view>
		</view>
		<view class="flex align-center justify-center diygw-col-24" style="margin-top: -20px;">
			<image :src="share.cover" class="diygw-col-20" mode="aspectFit"></image>
		</view>
		<view class="flex flex-wrap diygw-col-24 flex-direction-column">
			<view class="diygw-col-24 text-clz"> {{share.summary}} </view>
		</view>
		<view class="flex diygw-col-24 diygw-bottom flex-nowrap">
			<view class="flex diygw-col-19 justify-end items-center flex-nowrap">
				<view class="diygw-col-5"> ￥积分:{{share.price}} </view>
			</view>
			<view class="flex diygw-col-5 button-clz">
				<button @tap="exchange" class="diygw-btn red md radius-xs flex-sub margin-xs button-button-clz">兑换</button>
			</view>
		</view>
		<view class="clearfix"></view>
	</view>
</template>

<script>
import { EXCHANGE_URL,SHARE_URL } from '../../util/api';
import { request } from '../../util/request';
	export default {
		data() {
			return {
				share: {},
				nickname: '',
				avatarUrl: '',
				id: ''
			};
		},
		onShow() {
			this.setCurrentPage(this);
		},
		onLoad(option) {
			this.id = option.id;
			this.getShare();
		},
		methods: {
			async getShare(){
				let id = this.id;
				uni.showLoading({
					title: '加载中'
				});
				let res = await request(SHARE_URL+ `/${id}`,'GET');
				setTimeout(()=>{
					uni.hideLoading();
				},500);
				console.log(res.data);
				this.share = res.data.share;
				this.nickname = res.data.nickname;
				this.avatarUrl = res.data.avatarUrl;
			},
			async exchange(){
				await request(EXCHANGE_URL,'POST',{
					userId: uni.getStorageSync("user").id,
					shareId: this.share.id
				}).then(res=>{
					uni.showModal({
						title: '兑换成功',
						content: '确定去查看，取消继续兑换',
						success: res=>{
							if(res.confirm){
								uni.redirectTo({
									url: `/pages/shareDetails/shareDetails?id=${this.id}`
								});
							}else if(res.cancel){
								uni.switchTab({
									url: "/pages/index/index"
								});
							}
						}
					})
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.input-clz {
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.flex-clz {
		padding-top: 0rpx;
		padding-left: 0rpx;
		padding-bottom: 0rpx;
		padding-right: 0rpx;
	}
	.text-clz {
		margin-left: 20rpx;
		width: calc(100% - 20rpx - 20rpx) !important;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		margin-right: 20rpx;
	}
	.flex3-clz {
		left: 0rpx;
		bottom: 80rpx;
	}
	.button-clz {
		margin-left: 4rpx;
		width: calc(20.8333333333% - 4rpx - 4rpx) !important;
		margin-top: 0rpx;
		margin-bottom: 0rpx;
		margin-right: 4rpx;
	}
	.button-button-clz {
		font-size: 11px !important;
		margin: 3px !important;
	}
	.container25494 {
		padding-left: 0px;
		padding-right: 0px;
	}
	.container25494 {
	}
</style>
