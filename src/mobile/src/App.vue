<template>
    <div id="app">
        <keep-alive>
            <router-view />
        </keep-alive>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                transitionName: 'slide-left'
            }
        },
        watch: {
            '$route' (to, from) {
                if (from.fullPath === '/') {
                    this.transitionName = 'slide-left'
                } else {
                    this.transitionName = 'slide-right'
                }
            }
        },
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
