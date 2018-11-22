<template>
	<div class="container">
        <app-main></app-main>
        <app-movie></app-movie>
        <app-search></app-search>
    </div>
</template>

<script>
    import AppMain from '@/components/container/main/main'
    import AppMovie from '@/components/container/movie/movie'
    import AppSearch from '@/components/container/search/search'
    
	export default {
		name: 'Container',
        components: { AppMain, AppMovie, AppSearch }
	}
</script>

<style scoped>
    .container {
        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;
    	background-color: var(--container-bg-color);
    }
</style>