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
            '$route'(to, from) {
                if (to.meta.hierarchy > from.meta.hierarchy) { // 层级越高的页面就从右向左地进来
                    this.transitionName = 'slide-left'
                } else { // 否则回退
                    this.transitionName = 'slide-right'
                }
            }
        },
        methods: {
            afterLeave (el) {
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
