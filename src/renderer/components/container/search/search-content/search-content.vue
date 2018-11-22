<template>
	<div class="search-content">
		<search-content-result></search-content-result>
		<search-content-correlation></search-content-correlation>
	</div>
</template>

<script>
    import SearchContentResult from './search-content-result'
    import SearchContentCorrelation from './search-content-correlation'

	export default {
		name: 'SearchContent',
		components: { SearchContentResult, SearchContentCorrelation }
	}
</script>

<style scoped>
	.search-content {
        flex: 1;
        display: flex;
	}
</style>