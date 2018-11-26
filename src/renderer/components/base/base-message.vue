<template>
	<transition>
		<div 
		    class="base-message" 
		    v-show="show"
		    @dblclick="show=false"
		>
			<div class="box">
				<div class="header">
					<i></i>
					<span>提示</span>
				</div>
				<div class="msg">
					<p v-html="msgHtml">{{ msgs }}</p>
				</div>
				<div class="btn">
					<button @click="handleCallBack('cancel')">取消</button>
					<button @click="handleCallBack('confirm')">确定</button>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name: 'BaseMessage',
		data() {
			return {
				show: false,
				msgs: '提示内容'
			}
		},
		computed: {
			msgHtml() {
				let html = ''
				if (Array.isArray(this.msgs)) {
					this.msgs.forEach((msg) => {
						html += `<p> ${msg} </p>`
					})
					return html
				} else {
					return `<p> ${this.msgs} </p>`
				}
			}
		},
		methods: {
			handleCallBack(type) {
				this.show = false
				this.callback && this.callback(type)
			},
			alert(msgs, callback) {
				this.show = true
				this.msgs = msgs
				this.callback = callback
			}
		},
		mounted() {
			this.$root.$Message = this
		}
	}
</script>

<style scoped>
	.base-message {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		left: 0;
		top: 0;
		position: fixed;
	    background-color: rgba(52,62,70,.8);
	}

	.box {
		width: 35%;
		height: 35%;
		position: relative;
		border: 1px solid rgba(187,188,189,.3);
		overflow: hidden;
	}

	.header {
        height: 20%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(187,188,189,.1);
	}

	.header>span {
		font-size: 13px;
		color: #fff;
	}

	.header>i {
		width: 22px;
	    height: 18px;
		display: block;
		margin: 0 2% 0 3%;
		background-image: url(../../assets/min-logo.png);
		background-size: contain;
		background-repeat: no-repeat;
	}

	.msg {
		height: 60%;
		padding: 1% 5%;
		overflow: auto;
	}

	/* 滚动条控制样式 */
	.msg::-webkit-scrollbar {
		width: 2px;
	}

	.msg p {
		font-size: 13px;
		color: rgba(76,174,80,.5);
		letter-spacing: 2px;
	}

	.btn {
		width: 100%;
		height: 20%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: absolute;
		bottom: 0;
		left: 0;
		border-top: 1px solid rgba(187,188,189,.1);
	}

    .btn button {
    	width: 16%;
	    height: 70%;
	    outline-color: rgba(187,188,189,1);
	    border: none;
	    font-size: 12px;
	    border-radius: 3px;
	    color: #ccc;
	    background-color: rgba(76,174,80,.5);
    }
</style>