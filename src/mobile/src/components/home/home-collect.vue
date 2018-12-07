<template>
	<div class="home-collect">
		<home-list
		    :videoList="videoList"
		    :isShowIdentifier="true"
		    :num="6"
		>
		</home-list>
	</div>
</template>

<script>
	import HomeList from './home-list'

	export default {
		name: 'HomeCollect',
		components: { HomeList },
		props: {
		    videoList: { // 接口返回的视频对象数组
		        type: Array,
		        default: function() { return [] }
		    }
		}
	}
</script>

<style scoped>
	.home-collect {
		margin-top: 0.4rem;
	}
</style>