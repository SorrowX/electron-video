<template>
    <div id="app">
        <transition 
            :name="transitionName"
            @after-leave="afterLeave"
        >
            <keep-alive>
                <router-view class="view" />
            </keep-alive>
        </transition>  
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                transitionName: 'slide-right'
            }
        },
        watch: {
            '$route' (to, from) {
                if (to.fullPath === '/') {
                    this.transitionName = 'slide-right'
                } else {
                    this.transitionName = 'slide-left'
                }
            }
        },
        methods: {
            afterLeave () {
                this.$root.$emit('triggerScroll')
            }
        }
    }
</script>

<style scoped>
    #app {
        max-width: 7.5rem;
        min-width: 6.4rem;
        position: relative;
        margin: 0 auto;
    }

    .view {
        /*transition: all .5s cubic-bezier(.55,0,.1,1);*/
        transition: all .35s linear;
    }

    .slide-left-enter {
        opacity: 0;
        transform: translate(100%, 0);
    }
    .slide-left-leave-active {
        opacity: 0;
        transform: translate(-100%, 0);
    }

    .slide-right-enter {
        opacity: 0;
        transform: translate(-100%, 0);
    }
    .slide-right-leave-active {
        opacity: 0;
        transform: translate(100%, 0);
    }


</style>
