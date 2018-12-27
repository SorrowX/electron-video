<template>
	<div class="zoom">
		<div class="title">缩放(开发)</div>
		<div>
			<p>
			    控制页面缩放 当前比例: {{ zoomRatio }}%
			    <button @click="setZoom('subtract')">-</button>
			    <button @click="setZoom('add')">+</button>
			</p>
		</div>
	</div>
</template>

<script>
    import { local } from '../../../../../shared/storage'
    import { setZoomFactor } from '../../../../util/index'
    import { WINDOW_ZOOM_FACTOR } from '../../../../constant/index'

	export default {
		name: 'ZoomOption',
		data() {
			return {
				zoomRatio: parseInt(Math.ceil(local.getItem(WINDOW_ZOOM_FACTOR) * 100)),
			}
		},
		methods: {
			setZoom(type) {
				let curZoom = local.getItem(WINDOW_ZOOM_FACTOR)
				let val
				if (type === 'add') {
                    val = curZoom + 0.1
				} else {
					val = curZoom - 0.1
				}
				this.zoomRatio = parseInt(Math.ceil(setZoomFactor(val) * 100))
			}
		}
	}
</script>

<style scope>
	.zoom .title {
		margin-bottom: 30px;
	}

	.zoom p {
		font-size: 13px;
	}

	.zoom button {
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
</style>