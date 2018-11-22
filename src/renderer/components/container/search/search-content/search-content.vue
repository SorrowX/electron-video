<template>
	<transition>
		<div class="search-content" v-show="show">
			<search-content-result></search-content-result>
			<search-content-correlation></search-content-correlation>
		</div>
	</transition>
</template>

<script>
    import SearchContentResult from './search-content-result'
    import SearchContentCorrelation from './search-content-correlation'

	export default {
		name: 'SearchContent',
		components: { SearchContentResult, SearchContentCorrelation },
		data() {
			return {
				show: false
			}
		},
		methods: {
			isShow(bool) {
				this.show = bool
			}
		}
	}
</script>

<style scoped>
	.search-content {
        display: flex;
        padding-bottom: 52px;
        position: absolute;
	    left: 0;
	    top: 52px;
	    width: 100%;
	    height: 100%;
	    background-color: rgba(27,34,38,1);
	    overflow: auto;
	}
</style>