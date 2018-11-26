<template>
	<transition>
		<div class="base-tip" v-show="show">
			{{ text }} 
		</div>
	</transition>
</template>

<script>
    let tick = null

	export default {
		name: 'BaseTip',
		data() {
			return {
				text: '提示信息',
				show: false
			}
		},
		methods: {
            tip(text) {
            	this.show = true
                this.text = text
                clearTimeout(tick)
                tick = setTimeout(() => {
                	this.show = false
                }, 3000)
            }
		},
		mounted() {
			this.$root.$Tips = this
		}
	}
</script>

<style scoped>
	.base-tip {
	    position: fixed;
	    top: 50%;
	    left: 50%;
	    padding: 6px 16px;
	    border-radius: 3px;
	    background-color: rgba(52,62,70,.3);
	    transform: translateX(-50%) translateY(-50%);
	    color: rgba(51,190,9,1);
	}
</style>