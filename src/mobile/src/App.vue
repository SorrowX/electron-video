<template>
    <div id="app">
    	<keep-alive>
	        <router-view />
    	</keep-alive>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style scoped>
    #app {
        max-width: 7.5rem;
        min-width: 6.4rem;
        position: relative;
        margin: 0 auto;
    }
</style>
