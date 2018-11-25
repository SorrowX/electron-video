<template>
	<div class="window-bar">
        <div class="bar-left">
            <transition name="slide-fade">
                <div 
                    class="back" 
                    v-show="isShowBack"
                    @click="goBack"
                >
                    <i class="arrow"></i>
                </div>
            </transition>
            <div class="title">爱奇艺</div>
        </div>
        <div class="bar-right">
        	<span @click="handlerWin(0)">
                <i class="min"></i>   
            </span>

        	<span @click="handlerWin(1)">
                <i class="max"></i>   
            </span>

        	<span @click="handlerWin(2)">
                <i class="close"></i>   
            </span>
        </div>
    </div>
</template>

<script>
    import { WINDOW_BAR_SHOW_BACK_ARROW_MESSAGE } from '@/constant/index'
    
	export default {
		name: 'TheWindowBar',
        data() {
            return {
                isShowBack: false // 返回箭头是否隐藏
            }
        },
        methods: {
            handlerWin(type) {
                if (type === 0) {
                    this.$root.$minWin()
                } else if (type === 1) {
                    this.$root.$maxWin()
                } else if (type === 2) {
                    this.$root.$closeWin()
                }
            },
            goBack() {
                let movieComponent = this.$root.appMovieComponent
                let searchComponent = this.$root.appSearchComponent
                let channelMovieComponent = this.$root.channelMovieComponent

                let movieComponentIsShow = movieComponent.show
                let searchComponentIsShow = searchComponent.show
                let channelMovieComponentIsShow = channelMovieComponent && channelMovieComponent.show

                if (movieComponentIsShow) {
                    movieComponent.isShow(false)
                    if (searchComponentIsShow || channelMovieComponentIsShow) {
                        return
                    }
                }

                if (searchComponentIsShow) {
                    searchComponent.isShow(false)
                    if (!channelMovieComponentIsShow) {
                        this.isShowBack = false
                    }
                    return
                }

                if (channelMovieComponentIsShow) {
                    channelMovieComponent.isShow(false)
                    this.isShowBack = false 
                }
            }
        },
        mounted() {
            this.$root.windowBarComponent = this
            this.$root.$on(WINDOW_BAR_SHOW_BACK_ARROW_MESSAGE, (bool) => { // 让外部告诉当前组件是否显示 回退箭头
                this.isShowBack = bool
            })
        }
	}
</script>

<style scoped>
    .window-bar{
        display: flex;
        flex: none;
        justify-content: space-between;
        align-items: center;
        height: 28px;
        background-color: rgb(36,37,40);
        -webkit-app-region: drag;
    }

    .slide-fade-enter-active,
    .slide-fade-leave-active {
        transition: all .35s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to{
        transform: translateX(-43px);
        opacity: 0;
    }

    .bar-left{
        display: flex;
        height: 100%;
        transition: all .35s;
        -webkit-app-region: no-drag;
    }

    .bar-left .back{
        width: 43px;
        height: 100%;
        display: flex;
        /*box-sizing: border-box;*/
        align-items: center;
        padding-left: 15px;
    }

    .bar-left .back:hover{
        background-color: rgba(4,201,0,1) !important;
        cursor: pointer;
    }

    .arrow{
        position: relative;
    }

    .arrow:before{
        content: '';
        display: block;
        width: 6.5px;
        height: 6.5px;
        border-left: 1.1px solid #fff;
        border-top: 1.1px solid #fff;
        transform: rotate(-45deg);
    }

    .arrow:after{
        content: '';
        display: block;
        width: 12px;
        height: .7px;
        position: absolute;
        top: 4px;
        left: .5px;
        background-color: #fff;
        opacity: 0.8;
    }

    .bar-left .title{
        margin-left: 10px;
        color: #fff;
        line-height: 28px;
    }

    .bar-right{
        -webkit-app-region: no-drag;
        display: flex;
    }

    .bar-right span{
        position: relative;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;

        transition: all .35s;
        padding: 0 4.5px;
        cursor: pointer;
        color: #fff;
    }

    .bar-right span:hover{
        background-color: rgba(10,190,5,1);
    }

    .bar-right span:nth-child(3):hover{
        background-color: red;
    }

    .min{
        position: absolute;
        width: 10px;
        height: 8.5px;
        top: 15px;
        display: block;
        border-top: 1px solid #fff;
    }

    .max{
        width: 8.2px;
        height: 8.2px;
        display: block;
        border: 1px solid #fff;
    }

    .close{
        width: 10px;
        height: 10px;
        display: block;
        background-image: url(../../assets/close.scale-200.png);
        background-size: contain;
    }
</style>