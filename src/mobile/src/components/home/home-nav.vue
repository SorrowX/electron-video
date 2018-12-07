<template>
	<div class="nav">
		<div class="nav-box" ref="wrapper">
			<ul ref="scroller">
				<li class="active">首页</li>
				<li>会员</li>
				<li>直播</li>
				<li>我的剧场</li>
				<li>剧集</li>
				<li>电影</li>
				<li>综艺</li>
				<li>音乐</li>
				<li>动漫</li>
				<li>少儿</li>
				<li>资源</li>
			</ul>
		</div>
		<div class="nav-arrow">
			<i class="nav-arrow-icon"></i>
		</div>
	</div>
</template>

<script>
    function getAllLiWidth(aLiDoms) {
    	let w = 0
    	let arr = Array.prototype.slice.call(aLiDoms)
    	arr.forEach((li) => {
    		let style = window.getComputedStyle(li, null)
    		let width = parseInt(style['width'])
    		let marginLeft = parseInt(style['marginLeft'])
    		let marginRight = parseInt(style['marginRight'])
    		w += (width + marginLeft + marginRight)
    	})
    	return  w
    }

	export default {
		name: 'HomeNav',
		methods: {
			initTouch() {
				if (!this.at) {
					let target = this.$refs.scroller
					let wrapper = this.$refs.wrapper
					this.Transform(target, true)

					this.at = new this.AlloyTouch({
			            touch: wrapper, //反馈触摸的dom
			            vertical: false, //不必需，默认是true代表监听竖直方向touch
			            target: target, //运动的对象
			            property: 'translateX',  //被运动的属性
			            sensitivity: 1, //不必需,触摸区域的灵敏度，默认值为1，可以为负数
			            min: getMin(), //不必需,滚动属性的最小值
			            max: 0,
			            change: function (v) {
			                // console.log(v)
			            },
			            animationEnd: function (value) {
			                // console.log('运动结束： ', value)
			            }
					})
                    
                    function getMin() {
                    	let allLiWidth = getAllLiWidth(target.children)
                    	let ulWidth = parseInt(window.getComputedStyle(wrapper, null)['width'])
                    	console.log(ulWidth, allLiWidth)
                    	return ulWidth - allLiWidth
                    }
				}
			}
		},
		mounted() {
			this.initTouch()
		}
	}
</script>

<style scoped>
	.nav {
		height: 44px;
		padding: 0 0.24rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
	}

    .nav-box {
    	flex: 1;
    	height: 100%;
    	display: flex;
    	align-items: center;
    	overflow: hidden;
    	overflow-x: auto;
    }
	.nav-box ul {
		/*border: 1px solid red;*/
		display: inline-flex;
	}
	.nav-box ul li {
		flex: none;
		margin: 0 12px;
	}
	.nav-box ul li:nth-child(1) {
		margin-left: 0;
	}
	.nav-box ul li:last-child {
		margin-right: 0;
	}
	.active {
		color: #2692FF;
		border-bottom: 2px solid #2692FF;
		font-weight: bold;
	}

	.nav-arrow {
		flex: none;
		width: 44px;
		height: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		/*border: 1px solid green;*/
	}

	.nav-arrow-icon {
		display: flex;
		width: 22px;
		height: 22px;
		background-image: url(../../assets/arrow.png);
		background-size: contain;
	}
</style>