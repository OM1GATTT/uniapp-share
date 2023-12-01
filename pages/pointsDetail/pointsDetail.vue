<template>
	<view class="container container25494">
		<scroll-view>
			<view v-for="(log,index) in logs" :key="index">
				<view v-if="log.event==='CONTRIBUTE'" class="flex diygw-col-24 justify-center items-center flex-nowrap flex-clz" style="color: green;">
					<text class="flex icon diygw-col-0 icon-clz diy-icon-pulldown"></text>
					<view class="diygw-col-24 text2-clz">{{log.createTime}}--{{log.description}}--积分+{{log.value}}</view>
					<text class="flex icon1 diygw-col-0 diy-icon-zuihouye"></text>
				</view>
				<view v-else class="flex diygw-col-24 justify-center items-center flex-nowrap flex-clz" style="color: deepskyblue;">
					<text class="flex icon diygw-col-0 icon-clz diy-icon-pulldown"></text>
					<view class="diygw-col-24 text2-clz">{{log.createTime}}--{{log.description}}--积分{{log.value}}</view>
					<text class="flex icon1 diygw-col-0 diy-icon-zuihouye"></text>
				</view>
			</view>
		</scroll-view>
		
		<view class="clearfix"></view>
	</view>
</template>

<script>
import {POINT_DETAILS_URL} from '../../util/api.js';
import {request} from '../../util/request.js';
	export default {
		data() {
			return {
				logs:[],
				pageNo: 1,
				pageSize: 15,
				more: true
			};
		},
		onShow() {
			this.setCurrentPage(this);
			this.getLogs(true);
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
		onPullDownRefresh(){
			this.getLogs(true);
		},
		onReachBottom(){
			if(!this.more){
				uni.showToast({
					title:'已加载完毕',
					duration: 1000
				});
				return false;
			}
			this.pageNo = this.pageNo+1;
			uni.showLoading({
				title:'加载中'
			});
			this.getLogs();
			setTimeout(()=>{
				uni.hideLoading();
			},1000);
		},
		methods: {
			async init() {},
			async getLogs(init){
				if(init){
					this.pageNo=1;
					this.more=true;
				}
				let res = await request(POINT_DETAILS_URL,'GET',{
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					token: uni.getStorageSync('token')
				});
				setTimeout(()=>{
					uni.hideLoading();
				},2000);
				
				// 处理进入首页加载数据和下拉刷新场景
				if(init){
					// 获取新的数据集合，将数据初始化为本次请求返回结果
					this.logs = res.data;
					console.log(this.logs);
					// 停止下拉刷新
					uni.stopPullDownRefresh();
				}else{
					// 不是下拉刷新，是加载下一页数据，则把新数据追加到后面，不能覆盖原值
					this.logs = this.logs.concat(res.data);
				}
				// 加载到了最后一页
				if(res.data.length <this.pageSize && this.pageNo >0){
					this.more = false;
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.flex-clz {
			border: 2rpx solid #eee;
			padding-top: 10rpx;
			padding-left: 10rpx;
			padding-bottom: 10rpx;
			padding-right: 10rpx;
		}
		.icon-clz {
			margin-left: 10rpx;
			margin-top: 10rpx;
			margin-bottom: 7rpx;
			margin-right: -16rpx;
		}
		.icon {
			font-size: 40rpx;
		}
		.text2-clz {
			margin-left: 10rpx;
			padding-top: 10rpx;
			padding-left: 10rpx;
			width: calc(100% - 10rpx - 0rpx) !important;
			font-size: 32rpx !important;
			padding-bottom: 10rpx;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			margin-right: 0rpx;
			padding-right: 10rpx;
		}
		.icon1 {
			font-size: 36rpx;
		}
		.container25494 {
			padding-left: 0px;
			padding-right: 0px;
		}
		.container25494 {
		}
</style>
