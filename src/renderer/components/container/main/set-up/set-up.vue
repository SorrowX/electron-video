<template>
	<div class="set-up">
		<set-up-header></set-up-header>
		<main class="set-up-main">
			<set-up-content
			    @video-thumb-page="changeCompent"
			></set-up-content>
		</main>
		<set-up-operation ref="operationComp"></set-up-operation>
	</div>
</template>

<script>
    import SetUpHeader from './set-up-header'
    import setUpContent from './set-up-content'
    import SetUpOperation from './set-up-operation'
    
    const components = { SetUpHeader, setUpContent, SetUpOperation }
	export default {
		name: 'SetUp',
		components: components,
		data() {
			return {
			}
		},
		methods: {
			changeCompent(comp) {
				this.$refs.operationComp.changePage(comp)
			}
		}
	}
</script>

<style scoped>
	.set-up{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		position: relative;
	}

	.set-up-main {
		padding: 0 0 0 4.2%;
		background-color: #1B2226;
		overflow: auto;
	}

	/* 滚动条控制样式 */
	.set-up-main::-webkit-scrollbar {
		width: 3px;
		height: 4px;
	}

	.set-up-main::-webkit-scrollbar-track {
	    background-color: var(--common-header-bg-color);
	    border-radius: 10px;
	}

	.set-up-main::-webkit-scrollbar-thumb {
	    background-color: #434648;
	    border-radius: 10px;
	}
</style>