<template>
	<div class="base-loading">
		<div>
			<div class="load-effect" :style="loadEffectDivStyle">
				<div v-for="num in 4"><span :style="spanStyle"></span></div>
            </div>
        </div>
        <div class="tip"> {{ speedProgressTip }} </div>
	</div>
</template>

<script>
	export default {
		name: 'BaseLoading',
		props: {
			size: {
				type: String,
				default: 'min' // min | middle | max
			},
            speedProgress: {
                type: [Number, String],
                default: ''
            }
		},
		computed: {
			loadEffectDivStyle() {
				let sty = {
					min: { width: '30px', height: '30px' },
					middle: { width: '40px', height: '40px' },
					max: { width: '50px', height: '50px' },
				}
				return sty[this.size]
			},
			spanStyle() {
				let sty = {
					min: { width: '5px', height: '5px' },
					middle: { width: '6px', height: '6px' },
					max: { width: '7px', height: '7px' },
				}
				return sty[this.size]
			},
            speedProgressTip() {
                if (typeof this.speedProgress === 'number') {
                    return this.speedProgress + '%'
                } else {
                    return this.speedProgress
                }
            }
		}
	}
</script>

<style scoped>
	.base-loading {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
        position: relative;
	}

	.load-effect {
        width: 30px;
        height: 30px;
        position: relative;
    }

    .tip {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        color: rgba(51,190,9,1);
    }

    .load-effect div {
        width: 100%;
        height: 100%;
        position: absolute;
        -webkit-animation: load 2.08s linear infinite;
    }

    .load-effect div span {
        display: inline-block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: rgba(51,190,9,1);
        position: absolute;
        left: 50%;
        margin-top: -10px;
        margin-left: -10px;
    }

    @-webkit-keyframes load {
        0%{
            -webkit-transform: rotate(0deg);
        }
        10%{
            -webkit-transform: rotate(45deg);
        }
        50%{
            opacity: 1;
            -webkit-transform: rotate(160deg);
        }
        62%{
            opacity: 0;
        }
        65%{
            opacity: 0;
            -webkit-transform: rotate(200deg);
        }
        90%{
            -webkit-transform: rotate(340deg);
        }
        100%{
            -webkit-transform: rotate(360deg);
        }
    }

    .load-effect div:nth-child(1){
        -webkit-animation-delay:0.2s;
    }

    .load-effect div:nth-child(2){
        -webkit-animation-delay:0.4s;
    }

    .load-effect div:nth-child(3){
        -webkit-animation-delay:0.6s;
    }

    .load-effect div:nth-child(4){
        -webkit-animation-delay:0.8s;
    }
</style>