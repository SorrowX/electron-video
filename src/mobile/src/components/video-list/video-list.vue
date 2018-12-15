<template>
	<div class="video-list">
		<base-back :title="tag"></base-back>
		<div class="list">
			<classic-video-list 
			    :allVideoList="allVideoList"
			    :tag="tag"
			>
			</classic-video-list>
		</div>
	</div>
</template>

<script>
    import BaseBack from '@/components/base/base-back'
    import ClassicVideoList from './classic-video-list'
    import { getVideoListByNavFromApi } from '@/api/api'

	export default {
		name: 'VideoList',
		components: { BaseBack, ClassicVideoList },
		props: {
			tag: String
		},
		data() {
			return {
                allVideoList: [],
                loading: false,
                error: null
			}
		},
		beforeRouteEnter (to, from, next) {
			// 导航完成前获取数据,获取完数据再跳转页面
			let tag = to.params.tag
			getVideoListByNavFromApi({ tag }).then((ret) => {
				next((vm) => {
					if (ret.status === 200 && ret.data.code === 0) {
	                    vm.setData(null, ret.data.data)
					} else {
						vm.setData('error', [])
					}
				})
			}).catch((err) => {
				vm.setData(err, [])
			})
		},
		beforeRouteUpdate(to, from, next) {
			next()
		},
		beforeRouteLeave (to, from, next) {
			next()
		},
		methods: {
			setData (err, list) {
		        if (err) {
		        	this.error = err.toString()
		        	alert(`数据获取失败: ${this.error}`)
		        } else {
		        	this.allVideoList = list
		        }
		    }
		}
	}
</script>

<style scoped>
	.video-list {
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		z-index: 20;
	}

	.list {
		position: relative;
		top: 44px;
	}
</style>