<template>
	<div class="photo-wall-header">
	    <base-logo :title="'照片墙'"></base-logo>
	    <div class="operat">
	    	<button @click="handlerShowType">{{ oneByOne ? '逐个显示' : '全部显示' }}</button>
	    	<button @click="$emit('change-data')">更换数据</button>
	    </div>
	</div>
</template>

<script>
    import BaseLogo from '@/components/base/base-logo'

    const components = { BaseLogo }

	export default {
		name: 'PhotoWallHeader',
		components,
		data() {
			return {
				oneByOne: true
			}
		},
		methods: {
			handlerShowType() {
				this.$emit('show-type', (this.oneByOne = !this.oneByOne))
			}
		}
	}
</script>

<style scoped>
	.photo-wall-header{
		display: flex;
		justify-content: space-between;
	    flex: none;
		width: 100%;
		height: 39px;
		background-color: var(--common-header-bg-color);
	}

	.operat {
		display: flex;
		align-items: center;
	}

	.operat>button {
		border: none;
		background: rgba(27,34,38,1);
		padding: 5px 8px;
		font-size: 12px;
		color: rgba(153,153,153,1);
		margin-right: 20px;
	}
</style>