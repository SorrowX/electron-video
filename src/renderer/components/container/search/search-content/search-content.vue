<template>
	<transition>
		<div class="search-content" v-show="show">
			<base-loading 
			    v-show="loading"
			    size="min" 
			>
			</base-loading>
			<search-content-result 
			    ref="resultComp"
			    v-show="!loading"
			></search-content-result>
			<search-content-correlation 
			    ref="correlationComp"
			    v-show="!loading"
			>
			</search-content-correlation>
		</div>
	</transition>
</template>

<script>
    import SearchContentResult from './search-content-result'
    import SearchContentCorrelation from './search-content-correlation'
    import BaseLoading from '@/components/base/base-loading'

	export default {
		name: 'SearchContent',
		components: { SearchContentResult, SearchContentCorrelation, BaseLoading },
		data() {
			return {
				show: false,
				loading: false
			}
		},
		methods: {
			isShow(bool, key) {
				this.show = bool
				if (bool) {
					this.updateRenderData(key)
				}
			},
			async updateRenderData(key) {
				this.loading = true
				await this.$refs.resultComp.getRenderData(key)
				await this.$refs.correlationComp.getRenderData(key)
				this.loading = false
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