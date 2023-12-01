<template>
	<view class="container container25488">
		<view class="flex flex-wrap diygw-col-24 flex-direction-column">
			<view class="diygw-col-24 text-clz"> 说明：投稿审核通过后会有积分奖励；资源被下载会有积
				分奖励；提交的资源不得包含广告、侵权信息，百度盘地 址建议有密码。 </view>
			<view class="flex flex-wrap diygw-col-24">
				<view class="diygw-title flex diygw-col-20 title-clz">
					<view class="title title-title font-normal"> 原创 </view>
				</view>
				<u-form-item labelClass="text-blue" class="diygw-col-4 radio-clz" labelPosition="top" prop="radio">
					<u-radio-group class="flex flex-wrap diygw-col-24 justify-between" wrapClass=" justify-between"
						activeColor="#0081ff" v-model="isOriginal" @change="changeRadio">
						<u-radio shape="circle" name="1">
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<view class="flex diygw-col-24 line-clz">
					<view class="diygw-pzx" style="border-bottom: 1px solid #eee"></view>
				</view>
				<view class="diygw-title flex diygw-col-20 title1-clz">
					<view class="title title1-title font-normal"> 转载 </view>
				</view>
				<u-form-item labelClass="text-blue" class="diygw-col-4 radio-clz" labelPosition="top" prop="radio">
					<u-radio-group class="flex flex-wrap diygw-col-24 justify-between" wrapClass=" justify-between"
						activeColor="#0081ff" v-model="isOriginal" @change="changeRadio">
						<u-radio shape="circle" name="0">
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<view class="flex diygw-col-24 line1-clz">
					<view class="diygw-pzx" style="border-bottom: 1px solid #eee"></view>
				</view>
				<view class="diygw-title flex diygw-col-20 title1-clz">
					<view class="title title1-title font-normal"> 标题 </view>
				</view>
				<u-form-item class="diygw-col-15" labelPosition="top" prop="input">
					<u-input :focus="inputFocus" class="" placeholder="请输入标题" v-model="title" type="text"></u-input>
				</u-form-item>
				<view class="flex diygw-col-24 line2-clz">
					<view class="diygw-pzx" style="border-bottom: 1px solid #eee"></view>
				</view>
				<view class="diygw-title flex diygw-col-5 title3-clz">
					<view class="title title3-title font-normal"> 价格 </view>
				</view>
				<u-form-item class="diygw-col-15" labelPosition="top" prop="input1">
					<u-input :focus="input1Focus" class="" placeholder="请输入价格" v-model="price" type="text"></u-input>
				</u-form-item>
				<view class="flex diygw-col-24 line3-clz">
					<view class="diygw-pzx" style="border-bottom: 1px solid #eee"></view>
				</view>
				<view class="diygw-title flex diygw-col-5 title4-clz">
					<view class="title title4-title font-normal"> 简介 </view>
				</view>
				<u-form-item class="diygw-col-15" labelPosition="top" prop="input2">
					<u-input :focus="input2Focus" class="" placeholder="介绍一下技术干货" v-model="summary" type="text">
					</u-input>
				</u-form-item>
				<view class="flex diygw-col-24 line4-clz">
					<view class="diygw-pzx" style="border-bottom: 1px solid #eee"></view>
				</view>
				<view class="diygw-title flex diygw-col-5 title3-clz">
					<view class="title title3-title font-normal"> 封面图 </view>
				</view>
				<u-form-item class="diygw-col-15" labelPosition="top" prop="input3">
					<u-input :focus="input3Focus" class="" placeholder="请输入图片链接" v-model="cover" type="text"></u-input>
				</u-form-item>
				<view class="flex diygw-col-24 line5-clz">
					<view class="diygw-pzx" style="border-bottom: 1px solid #eee"></view>
				</view>
				<view class="diygw-title flex diygw-col-5 title4-clz">
					<view class="title title4-title font-normal"> 下载 </view>
				</view>
				<u-form-item class="diygw-col-15" labelPosition="top" prop="input4">
					<u-input :focus="input4Focus" class="" placeholder="请填写下载地址" v-model="downloadUrl" type="text">
					</u-input>
				</u-form-item>
				<view class="flex diygw-col-24 line6-clz">
					<view class="diygw-pzx" style="border-bottom: 1px solid #eee"></view>
				</view>
				<view class="flex diygw-col-24">
					<button @tap="submit"
						class="diygw-btn red radius-xs flex-sub margin-xs button-button-clz">提交</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { CONTRIBUTE_URL } from '../../util/api';
import { request } from '../../util/request';
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
				input: '',
				input1Focus: false,
				input1: '',
				input2Focus: false,
				input2: '',
				input3Focus: false,
				input3: '',
				input4Focus: false,
				input4: '',
				title: '技术干货',
				author: 'yy',
				isOriginal: 1,
				price: 10,
				summary: '很棒的干货',
				cover: 'https://img3.sycdn.imooc.com/5c3eaa0a08d7052706000338-360-202.jpg',
				downloadUrl: 'https://pan.baidu.com'
			};
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
			async submit() {
				uni.showLoading({
					title: '投稿中'
				});
				let res = await request(CONTRIBUTE_URL, 'POST', {
					isOriginal: this.isOriginal == 1 ? true : false,
					title: this.title,
					author: this.author,
					price: this.price,
					cover: this.cover,
					summary: this.summary,
					downloadUrl: this.downloadUrl
				})
				
				console.log(res)
				if (res === '1') {
					setTimeout(() => {
					uni.hideLoading();
				}, 200);
					uni.showModal({
						title: '提示',
						content: '投稿成功，将在最短时间内审核资源',
						cancelText: '返回首页',
						confirmText: '继续投稿',
						success(res) {
							if (res.confirm) {
								this.isOriginal = false;
								this.title = '';
								this.author = '';
								this.price = '';
								this.summary = '';
								this.downloadUrl = '';
							} else {
								uni.switchTab({
									url: '/pages/index/index'
								})
							}
						}
					})
				}
			},
			async init() {},
			changeCheckbox(evt) {},
			changeCheckbox1(evt) {}
		}
	};
</script>

<style lang="scss" scoped>
	.text-clz {
		margin-left: 20rpx;
		width: calc(100% - 20rpx - 20rpx) !important;
		font-size: 28rpx !important;
		line-height: 1.5;
		font-family: 雅黑;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		margin-right: 20rpx;
	}

	.title-clz {
		color: #000000;
		font-size: 20rpx !important;
		font-family: 雅黑;
	}

	.title-title {
		font-size: 13px;
	}

	.title-more {
		font-size: 12px;
	}

	.line-clz {
		margin-left: 0rpx;
		width: calc(100% - 0rpx - 0rpx) !important;
		margin-top: -10rpx;
		margin-bottom: 0rpx;
		margin-right: 0rpx;
	}

	.title1-clz {
		font-size: 20rpx !important;
		font-family: 雅黑;
	}

	.title1-title {
		font-size: 13px;
	}

	.title1-more {
		font-size: 12px;
	}

	.line1-clz {
		margin-left: 0rpx;
		width: calc(100% - 0rpx - 0rpx) !important;
		margin-top: -10rpx;
		margin-bottom: 0rpx;
		margin-right: 0rpx;
	}

	.title2-clz {
		font-size: 20rpx !important;
		font-family: 雅黑;
	}

	.title2-title {
		font-size: 13px;
	}

	.title2-more {
		font-size: 12px;
	}

	.line2-clz {
		margin-left: 0rpx;
		width: calc(100% - 0rpx - 0rpx) !important;
		margin-top: -10rpx;
		margin-bottom: 0rpx;
		margin-right: 0rpx;
	}

	.title3-clz {
		font-size: 20rpx !important;
		font-family: 雅黑;
	}

	.title3-title {
		font-size: 13px;
	}

	.title3-more {
		font-size: 12px;
	}

	.line3-clz {
		margin-left: 0rpx;
		width: calc(100% - 0rpx - 0rpx) !important;
		margin-top: -10rpx;
		margin-bottom: 0rpx;
		margin-right: 0rpx;
	}

	.title4-clz {
		font-size: 20rpx !important;
		font-family: 雅黑;
	}

	.title4-title {
		font-size: 13px;
	}

	.title4-more {
		font-size: 12px;
	}

	.line4-clz {
		margin-left: 0rpx;
		width: calc(100% - 0rpx - 0rpx) !important;
		margin-top: -10rpx;
		margin-bottom: 0rpx;
		margin-right: 0rpx;
	}

	.title5-clz {
		font-size: 20rpx !important;
		font-family: 雅黑;
	}

	.title5-title {
		font-size: 13px;
	}

	.title5-more {
		font-size: 12px;
	}

	.title6-clz {
		font-size: 20rpx !important;
		font-family: 雅黑;
	}

	.title6-title {
		font-size: 13px;
	}

	.title6-more {
		font-size: 12px;
	}

	.line5-clz {
		margin-left: 0rpx;
		width: calc(100% - 0rpx - 0rpx) !important;
		margin-top: -10rpx;
		margin-bottom: 0rpx;
		margin-right: 0rpx;
	}

	.title7-clz {
		font-size: 20rpx !important;
		font-family: 雅黑;
	}

	.title7-title {
		font-size: 13px;
	}

	.title7-more {
		font-size: 12px;
	}

	.title8-clz {
		font-size: 20rpx !important;
		font-family: 雅黑;
	}

	.title8-title {
		font-size: 13px;
	}

	.title8-more {
		font-size: 12px;
	}

	.line6-clz {
		margin-left: 0rpx;
		width: calc(100% - 0rpx - 0rpx) !important;
		margin-top: -10rpx;
		margin-bottom: 0rpx;
		margin-right: 0rpx;
	}

	.button-button-clz {
		margin: 3px !important;
	}

	.container25488 {
		padding-left: 0px;
		padding-right: 0px;
	}

	.container25488 {}
</style>
