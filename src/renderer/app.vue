<template>
	<div id="app">
        <window-bar></window-bar>
        <container></container>
	</div>
</template>

<script>
    import WindowBar from '@/components/window-bar/window-bar'
    import Container from '@/components/container/container'

    const components = { WindowBar, Container }
    
	export default {
	    name: 'ElectronVideo',
        components
	}
</script>

<style>
    @import url('./static/css/common-variable.css');
    @import url('./static/css/common.css');

    #app {
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 1px solid var(--app-border-color);
    }
</style>
