<template>
	<view class="container container25494">
		<view class="flex diygw-col-24 flex-direction-column tabs-clz">
			<view class="">
					<view v-for="(share,index) in shares" :key="index">
						<view class="flex diygw-col-24 flex-nowrap flex-clz">
							<view class="diygw-col-10 flex margin-top-5 justify-center align-center" style="height: 97px; padding: 3px 5px;">
								<image :src="share.cover"  style="border-radius: 20%; height: 65px;width: 65px; z-index: 33;" mode="aspectFill"></image>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column">
								<view class="diygw-col-24 text-clz" style="height: 30px; margin-top: 6px;">{{share.title}} </view>
								<view class="diygw-text-line2 diygw-col-24 text1-clz margin-top-sm" style="line-height: 16px;">{{share.summary}}</view>
							</view>
							<view class="flex flex-wrap diygw-col-7 justify-center align-center">
								<view  @tap="openMd(share.id)" data-type="openmodal" data-id="modal" v-if="share.auditStatus === 'NOT_YET'" class="diygw-tag flex-direction-row-reverse margin-xs radius blue">
									<text class="diygw-icon diy-icon-pullright"></text>
									<text> 待审核 </text>
								</view>
							</view>
						</view>
					</view>
			</view>
		</view>
		
		<view class="diygw-modal basic modal-clz" :class="modal">
					<view class="diygw-dialog diygw-dialog-modal basis-lg">
						<view class="margin-top-lg margin-bottom-sm">
							<view class="flex diygw-dialog-content justify-center items-center">
								<view class="flex diygw-col-24 justify-center items-center flex-nowrap flex9-clz">
									<view class="diygw-col-24 text12-clz"> 审核状态 </view>
									<view class="flex  diygw-col-24">
										<u-dropdown class="dr-clz" style="z-index: 99999;" direction="down" ref="refDropdowns">
											<u-dropdown-item :title="dropdowns0" @change="changeDropdowns0" v-model="dropdowns0" :options="dropdownsDatas0"></u-dropdown-item>
										</u-dropdown>
									</view>
								</view>
								<view class="flex diygw-col-24 justify-center items-center flex-nowrap">
									<view class="diygw-col-24 text13-clz"> 是否显示 </view>
									<view class="flex diygw-col-24">
										<u-dropdown class="dr-clz" style="z-index: 88888;" direction="down" ref="refDropdowns1">
											<u-dropdown-item :title="dropdowns10" @change="changeDropdowns10" v-model="dropdowns10" :options="dropdowns1Datas0"></u-dropdown-item>
										</u-dropdown>
									</view>
								</view>
								<view class="flex diygw-col-24 justify-center items-center flex-nowrap">
									<view class="diygw-col-24 text14-clz"> 原因 </view>
									<u-form-item :borderBottom="false" class="flex justify-center diygw-col-24 input-clz" labelPosition="top" prop="input">
										<u-input  style="line-height: 25px;" placeholder="请输入原因" v-model="reason" type="text"></u-input>
									</u-form-item>
								</view>
								
							</view>
						</view>
						<view class="flex justify-end margin-bottom-md margin-top-sm margin-right-xl margin-left-xl">
							<button @tap="closeMd()" data-type="closemodal" data-id="modal" class="diygw-btn red flex1 margin-xs">取消</button>
							<button @tap="audit()" class="diygw-btn green flex1 margin-xs">确认</button>
						</view>
					</view>
				</view>
		
		
		<view class="clearfix"></view>
	</view>
</template>

<script>
import {AUDIT_URL, EXAMINE_LIST_URL} from '../../util/api.js';
import {request} from '../../util/request.js';
	export default {
		data() {
			return {
				id: '',
				modal: '',
				dropdowns0: 'PASS',
				dropdownsDatas0: [
					{ text: 'PASS', value: 'PASS' },
					{ text: 'REJECT', value: 'REJECT' }
				],
				dropdowns10: 'TRUE',
				dropdowns1Datas0: [
					{ text: 'TRUE', value: "TRUE" },
					{ text: 'FALSE', value: "FALSE" }
				],
				reason: '审核通过',
				shares:[],
				pageNo: 1,
				pageSize: 8,
				more: true,
				drawer: false
			};
		},
		onShow() {
			this.setCurrentPage(this);
			this.getShares(true);
		},
		onLoad(option) {
			this.setCurrentPage(this);

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
			async init() {
			},
			openMd(val){
				this.modal = 'show';
				this.id = val;
			},
			closeMd(){
				this.modal = '';
				this.id = '';
			},
			closeDropdowns() {
				this.$refs.refDropdowns.close();
			},
			changeDropdowns0(evt) {
				let item = this.dropdownsDatas0.find((item) => {
					return item.value == evt;
				});
				item && item.action && this.navigateTo(item.action);
				console.log(this.dropdowns0)
			},
			closeDropdowns1() {
				this.$refs.refDropdowns1.close();
			},
			changeDropdowns10(evt) {
				let item = this.dropdowns1Datas0.find((item) => {
					return item.value == evt;
				});
				item && item.action && this.navigateTo(item.action);
				console.log(this.dropdowns10)
			},
			async getShares(init){
				// 入参为true,从第一页重新开始加载数据，场景为：下拉刷新，每次进入
				if(init){
					this.pageNo=1;
					this.more=true;
				}
				
				let res = await request(EXAMINE_LIST_URL,'GET',{
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					token: uni.getStorageSync("token")
				});
				setTimeout(()=>{
					uni.hideLoading();
				},2000);
				// 处理进入首页加载数据和下拉刷新场景
				if(init){
					// 获取新的数据集合，将数据初始化为本次请求返回结果
					this.shares = res.data;
					console.log(this.shares)
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
			async audit(){
				console.log(this.id)
				console.log(this.dropdowns0)
				console.log(this.dropdowns10)
				let res = await request(AUDIT_URL+`/${this.id}`,'POST',{
					auditStatusEnum: this.dropdowns0,
					reason: this.reason,
					showFlag: this.dropdowns10
				});
				setTimeout(()=>{
					uni.hideLoading();
				},2000);
				if(res.success === true){
					uni.showToast({
						title: '审核成功'
					});
					this.closeMd();
					uni.navigateBack({
						delta:1,
						success: function(){
						}
					})
				}
				if(res.success === false){
					uni.showToast({
						title: '出现错误，请重新审核'
					})
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.modal-clz {
			padding-top: 10rpx;
			padding-left: 10rpx;
			padding-bottom: 10rpx;
			padding-right: 10rpx;
			
		}
		.flex9-clz {
		}
		.flex10-clz {
		}
		.text12-clz {
			font-weight: bold;
			font-size: 32rpx !important;
			text-align: center;
		}
		.text14-clz {
			font-weight: bold;
			font-size: 32rpx !important;
			text-align: center;
		}
		.text15-clz {
			font-size: 32rpx !important;
			text-align: center;
		}
		.text13-clz {
			font-weight: bold;
			font-size: 32rpx !important;
			text-align: center;
		}
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
	.input-clz{
		font-size: 29rpx !important;
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
	.text22-clz {
		font-size: 25rpx;
		text-align: left;
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
	.container25494 {
		padding-bottom: 80px;
	}
</style>
