<template>
	<transition name="fade">
    	<div class="operation-page" v-if="show" @dblclick="show = false">
    		<keep-alive>
		        <component :is="curComponnet"></component>
		    </keep-alive>
        </div>
	</transition>
</template>

<script>
	import VideoThumb from './video-thumb/video-thumb'
	import OperateStorage from './operate-storage/operate-storage'

	const components = { VideoThumb, OperateStorage } 

	export default {
		name: 'SetUpOperation',
		components,
		data() {
			return {
				curComponnet: 'VideoThumb',
				show: false
			}
		},
		methods: {
			changePage(Comp) {
				this.show = true
				this.curComponnet = components[Comp]
			},
			togglePage() {
				this.show = !this.show
			}
		}
	}
</script>

<style scoped>
	.operation-page { /* 各个操作页面 */
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 20;
		background-color: rgba(52,62,70,.8);
	}

	.fade-enter-active, 
	.fade-leave-active {
	    transition: all .35s;
	}

	.fade-enter, 
	.fade-leave-to {
	    transform: translate3d(0, 100%, 0);
	}
</style>