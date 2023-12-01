<template>
	<view class="container container25494">
		<view class="flex diygw-col-24 flex-direction-column tabs-clz">
			<view class="diygw-tabs text-center solid-bottom justify-center tabs-title">
				<view class="diygw-tab-item tabs-item-title flex-sub" :class="index == tabsIndex ? ' cur text-green ' : ''" v-for="(item, index) in tabsDatas" :key="index" @click="changeTabs" :data-index="index"> <text v-if="item.icon" :class="item.icon"></text> {{ item.text }} </view>
			</view>
			<view class="">
				<view v-if="tabsIndex == 0" class="flex-sub">
					<view class="flex diygw-col-24">
						<diy-noticebar class="flex1 diy-notice-bar" color="#db5e54" bgColor="#fff" leftIcon="diy-icon-notification">
							<block v-slot:content>
								<text class="diy-notice-item" >{{notice}}</text>
							</block>
						</diy-noticebar>
					</view>
					<view class="diygw-col-24">
						<view class="diygw-search">
							<view class="flex1 align-center flex padding-xs solid radius search-search">
								<text style="color: #555 !important" class="diy-icon-search"></text>
								<input class="flex1" name="search" type="" v-model="search" placeholder="请输入搜索内容" />
							</view>
						</view>
					</view>
					<scroll-view class="itemList-container">
					  <view v-for="(share,index) in shares" :key="index">
					  	<view class="flex diygw-col-24 flex-nowrap flex-clz">
					  		<view style="z-index: 999; color: white; line-height: 100%; ">
					  			<text style="position: absolute;left: -15px; margin-left: 18px;top: 8px; background-color: red; font-size: 13px; padding: 2px 5px;letter-spacing: 2px;"
					  				v-if="share.isOriginal" >原创</text>
					  			<text style="position: absolute;left: -15px; margin-left: 18px;top: 8px; background-color: lightgreen;font-size: 13px; padding: 2px 5px; letter-spacing: 2px;"
					  				v-else >转载</text>
					  		</view>
					  		<view class="diygw-col-10 flex margin-top-5 justify-center align-center" style="height: 97px; padding: 3px 5px;">
					  			<image :src="share.cover"  style=" height: 60px;width: 60px; z-index: 33;" mode="aspectFill"></image>
					  		</view>
					  		<view class="flex flex-wrap diygw-col-24 flex-direction-column">
					  			<view class="diygw-col-24 text-clz" style="height: 30px; margin-top: 6px;">{{share.title}} </view>
					  			<view class="diygw-text-line2 diygw-col-24 text1-clz margin-top-sm" style="line-height: 16px;">{{share.summary}}</view>
					  		</view>
					  		<view class="flex flex-wrap diygw-col-7 flex-direction-column">
					  			<view class="diygw-col-21 text2-clz" style="margin-top: 32px;line-height: 18px;">{{share.price}} 积分</view>
					  			<view @tap="gotoDetail(share.id)" v-if="share.downloadUrl" style="line-height: 18px;" class=" diygw-col-21 text3-clz"> 下载 </view>
					  			<view @tap="gotoExchange(share.id)" v-else style="line-height: 18px;" class="diygw-col-21 text3-clz"> 兑换 </view>
					  		</view>
					  	</view>
					  </view>
					</scroll-view>

					
				</view>
				<view v-if="tabsIndex == 1" class="flex-sub">
					<view class="flex flex-wrap diygw-col-24 flex-direction-column flex6-clz">
						<view class="flex diygw-col-24 flex-nowrap flex7-clz">
							<view class="diygw-col-4 text8-clz diygw-text-xs"> 01 </view>
							<view class="diygw-col-9 text9-clz"> 积分获得方式 </view>
						</view>
						<view class="flex flex-wrap diygw-col-24 flex-direction-column flex8-clz">
							<view class="diygw-col-24 text10-clz"> 每日签到 </view>
							<view class="diygw-col-24 text11-clz"> 投稿 </view>
						</view>
					</view>
					<view class="flex flex-wrap diygw-col-24 flex-direction-column flex21-clz">
						<view class="flex diygw-col-24 flex-nowrap flex22-clz">
							<view class="diygw-col-4 text28-clz diygw-text-xs"> 01 </view>
							<view class="diygw-col-9 text29-clz"> 深入交流 </view>
						</view>
						<view class="flex flex-wrap diygw-col-24 flex-direction-column flex23-clz">
							<view class="diygw-col-24 text30-clz"> 技术交流QQ群：88888888 </view>
							<view class="diygw-col-24 text31-clz"> 私人微信：OMG1A </view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="clearfix"></view>
	</view>
</template>

<script>
import {LATEST_NOTICE_URL, SHARE_LIST_URL} from '../../util/api.js';
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
				tabsDatas: [
					{ text: `发现`, icon: `diy-icon-discover` },
					{ text: `使用说明`, icon: `diy-icon-wendang` }
				],
				tabsLeft: 0,
				tabsWidth: 0,
				tabsItemWidth: 0,
				tabsIndex: 0,
				search: '',
				notice: '',
				shares:[],
				pageNo: 1,
				pageSize: 8,
				more: true
			};
		},
		onShow() {
			this.setCurrentPage(this);
			this.getNotice();
			this.getShares(true);
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
		// 下拉刷新
		onPullDownRefresh(){
			// 参数为true，就是重新开始加载
			this.getShares(true);
		},
		// 触底加载更多
		onReachBottom(){
			// 没有更多数据
			if(!this.more){
				uni.showToast({
					title:'已加载完毕',
					duration: 1000
				});
				// 直接返回，不执行下面代码
				return false;
			}
			// 正常加载下一页
			this.pageNo = this.pageNo+1;
			uni.showLoading({
				title:'加载中'
			});
			// 不带参数的请求，就是分页加载
			this.getShares();
			setTimeout(()=>{
				uni.hideLoading();
			},1000);
		},
		methods: {
			async init() {},
			gotoDetail(id){
				uni.navigateTo({
					url:"/pages/shareDetails/shareDetails?id="+id
				})
			},
			gotoExchange(id){
				uni.navigateTo({
					url:"/pages/exchange/exchange?id="+id
				})
			},
			async getNotice(){
				let res = await request(LATEST_NOTICE_URL,'GET');
				console.log(res.data)
				this.notice = res.data.content;
			},
			async getShares(init){
				// 入参为true,从第一页重新开始加载数据，场景为：下拉刷新，每次进入
				if(init){
					this.pageNo=1;
					this.more=true;
				}
				
				let res = await request(SHARE_LIST_URL,'GET',{
					pageNo: this.pageNo,
					pageSize: this.pageSize
				});
				setTimeout(()=>{
					uni.hideLoading();
				},2000);
				
				// 处理进入首页加载数据和下拉刷新场景
				if(init){
					// 获取新的数据集合，将数据初始化为本次请求返回结果
					this.shares = res.data;
					console.log(this.shares);
					// 停止下拉刷新
					uni.stopPullDownRefresh();
				}else{
					// 不是下拉刷新，是加载下一页数据，则把新数据追加到后面，不能覆盖原值
					this.shares = this.shares.concat(res.data);
				}
				// 加载到了最后一页
				if(res.data.length <this.pageSize && this.pageNo >0){
					this.more = false;
				}
			},
			changeTabs(evt) {
				let { index } = evt.currentTarget.dataset;
				if (index == this.tabsIndex) return;
				this.setData({
					tabsIndex: index
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.tabs-clz {
		margin-left: 10rpx;
		flex-shrink: 0;
		width: calc(100% - 10rpx - 10rpx) !important;
		font-size: 28rpx !important;
		line-height: 3;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		height: 1500rpx !important;
		text-align: center;
		margin-right: 10rpx;
	}
	.tabs-item-title {
		color: #000000 !important;
	}
	.tabs-title {
	}
	.tabs-item-title.cur {
		color: #db5e54 !important;
	}
	.search-search {
		background-color: #f8f8f8 !important;
	}
	.flex-clz {
		border-bottom: 4rpx solid #eee;
	}
	.text-clz {
		font-weight: bold;
		font-size: 29rpx !important;
		text-align: left;
	}
	.text1-clz {
		font-size: 20rpx !important;
		line-height: 2;
	}
	.text2-clz {
		font-size: 25rpx;
		font-weight: bold;
		text-align: right;
	}
	.text3-clz {
		font-size: 23rpx;
		line-height: 2;
		text-align: right;
	}
	.flex3-clz {
		border-bottom: 4rpx solid #eee;
	}
	.image1-clz {
		background-size: 100% 100%;
		background-position: center center;
	}
	.text4-clz {
		font-weight: bold;
		font-size: 28rpx !important;
		text-align: left;
	}
	.text5-clz {
		font-size: 20rpx !important;
		line-height: 2;
	}
	.text6-clz {
		font-weight: bold;
		text-align: right;
	}
	.text7-clz {
		line-height: 2;
		text-align: right;
	}
	.flex6-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		border-bottom: 4rpx solid #eee;
		margin-right: 10rpx;
	}
	.itemList-container {
	  height: 100%; /* 设置scroll-view的高度为100% */
	  overflow-y: auto; /* 显示垂直滚动条 */
	  /* 其他样式设置 */
	}
	.flex7-clz {
		flex-shrink: 0;
		height: 88rpx !important;
	}
	.text8-clz {
		background-color: #db5e54;
		margin-left: 40rpx;
		background-size: 100% 100%;
		color: #ffffff;
		width: calc(16.6666666667% - 40rpx - 14rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		text-align: center;
		margin-right: 14rpx;
	}
	.text9-clz {
		color: #db5e54;
		font-size: 30rpx !important;
		border-bottom: 6rpx solid #ffab06;
	}
	.flex8-clz {
		margin-left: 56rpx;
		width: calc(100% - 56rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.text10-clz {
		font-size: 22rpx !important;
		text-align: left;
	}
	.text11-clz {
		font-size: 22rpx !important;
		text-align: left;
	}
	.flex21-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		border-bottom: 4rpx solid #eee;
		margin-right: 10rpx;
	}
	.flex22-clz {
		flex-shrink: 0;
		height: 88rpx !important;
	}
	.text28-clz {
		background-color: #db5e54;
		margin-left: 40rpx;
		background-size: 100% 100%;
		color: #ffffff;
		width: calc(16.6666666667% - 40rpx - 14rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		text-align: center;
		margin-right: 14rpx;
	}
	.text29-clz {
		color: #db5e54;
		font-size: 30rpx !important;
		border-bottom: 6rpx solid #ffab06;
	}
	.flex23-clz {
		margin-left: 56rpx;
		width: calc(100% - 56rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.text30-clz {
		font-size: 22rpx !important;
		text-align: left;
	}
	.text31-clz {
		font-size: 22rpx !important;
		text-align: left;
	}
	.container25494 {
		padding-left: 0px;
		padding-right: 0px;
	}
</style>
