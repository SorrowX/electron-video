<template>
	<div class="set-up-content-mobile">
		<div class="title">访问手机页面</div>
		<div class="operat">
			<p>
				扫一扫 QR Code
			</p>
			<button @click="reMakeCode">重新生成</button>
		</div>
		<div id="mobile-qrcode"></div>
	</div>
</template>

<script>
	import QRCode from '../../../../../shared/qrcode'
	import { getWebServerConfigInfo } from '../../../../../web-server/util'
	export default {
		name: 'Mobile',
		methods: {
			makeCode(url) {
				if (!this.qrcode) {
					this.qrcode = new QRCode(document.getElementById('mobile-qrcode'), {
						text: url,
						width: 120,
						height: 120,
						colorDark : '#000000',
						colorLight : '#ffffff',
						correctLevel : QRCode.CorrectLevel.L
					})
				} else {
					this.qrcode.clear()
					this.qrcode.makeCode(url)
				}
			},
			reMakeCode() {
				let { address } = getWebServerConfigInfo()
				this.makeCode(address + '/')
				this.$root.$Tips.tip('已重新生成新的二维码!')
			}
		},
		mounted() {
			this.qrcode = null
			let { address } = getWebServerConfigInfo()
			this.makeCode(address + '/')
		}
	}
</script>

<style scoped>
	.set-up-content-mobile,
	.operat {
		margin: 30px 0;
	}

	.operat {
		font-size: 13px;
		display: flex;
		margin-bottom: 13px;
	}

	.operat>div {
		display: flex;
		margin-bottom: 8px;
	}

	.operat>p {
		font-size: 13px;
	}

	.operat button {
	    display: inline-block;
	    border: none;
	    padding: 3px 15px;
	    margin-left: 10px;
	    text-align: center;
	    text-decoration: none;
	    font-size: 10px;
	    border-radius: 2px;
	    color: rgba(204,204,204, 1);
	    background-color: #4CAF50; /* Green */
	}

	#mobile-qrcode {
		width: 126px;
		height: 126px;
		border: 3px solid #fff;
	}
</style>