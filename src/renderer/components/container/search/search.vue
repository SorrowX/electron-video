<template>
	<transition name="search-fade">
		<div class="search-page" v-show="show">
			<search-header @search="handleSearch"></search-header>
			<search-record></search-record>
			<search-content ref="searchContentComp"></search-content>
		</div>
	</transition>
</template>

<script>
	import {
		WINDOW_BAR_SHOW_BACK_ARROW_MESSAGE,
		SHOW_SEARCH_PAGE_MESSAGE 
	} from '@/constant/index'
	import SearchHeader from './search-header/search-header'
	import SearchRecord from './search-record/search-record'
	import SearchContent from './search-content/search-content'

	export default {
		name: 'Search',
		components: { SearchHeader, SearchRecord, SearchContent },
		data() {
			return {
				show: false,
				currentComponent: 'SearchRecord'
			}
		},
		watch: {
			show(bool) {
				if (bool) {
					this.$root.$emit(WINDOW_BAR_SHOW_BACK_ARROW_MESSAGE, bool)
				}
			}
		},
		methods: {
			isShow(bool) {
				this.show = bool
			},
			handleSearch(key) {
				let show = this.$refs.searchContentComp.show
				if (key.replace(/\s*/g, '') === '') {
					if (show) {
						this.$refs.searchContentComp.isShow(false, key)
					}
					return
				}
				this.$refs.searchContentComp.isShow(true, key)
			}
		},
		mounted() {
			this.$root.appSearchComponent = this
			this.$root.$on(SHOW_SEARCH_PAGE_MESSAGE, (isShow) => {
				this.show = isShow
			})
		}
	}
</script>

<style scoped>
    .search-fade-enter-active,
    .search-fade-leave-active {
    	transition: all .35s;
    }

    .search-fade-enter,
    .search-fade-leave-to {
        opacity: 0;
        transform: translate3d(0, -100%, 0);
    }

	.search-page {
	    height: 100%;
	    width: 100%;
	    position: absolute;
	    left: 0;
	    top: 0;
	    z-index: 1000;
	    background-color: rgba(27,34,38,1);
	    /*background-color: rgba(52,62,70,.8);*/
	}
</style>