<template>
	<div class="media-details">
		<div class="container">
			<div class="bg">
				<img :src="bgImg">
			</div>
			<main class="main-content">
				<div class="content">
					<media-recommend-info-details-film :show="show"></media-recommend-info-details-film>
				</div>
			</main>
		</div>
	</div>
</template>

<script>
    import MediaRecommendInfoDetailsFilm from './media-recommend-info-details-film'
    import MediaRecommendInfoDetailsMusic from './media-recommend-info-details-music'

    const components = { MediaRecommendInfoDetailsFilm, MediaRecommendInfoDetailsMusic }

	export default {
		name: 'MediaRecommendDetails',
		components,
		props: {
			bgImg: {
				type: String,
				default: ''
			},
			show: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style scoped>
	.media-details {
		flex-shrink: 0;
		width: 100%;
		height: 100%;
		padding: .8% 0 0 1.5%;
	}

	.container {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.bg {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
	}

	.bg>img {
		width: 100%;
		height: 100%;
		filter: blur(6px) opacity(.1);
	}

	.main-content {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10;
		overflow: auto;
	}

	.content {
		width: calc(100% - 100px);
		/*height: 800px;*/
		/*border: 1px solid #ccc;*/
	}

	@media screen and (min-height: 768px) {
		.content {
			width: calc(100% - 160px);
		}
	}

	/* 滚动条控制样式 */
	.main-content::-webkit-scrollbar {
		width: 4px;
		height: 4px;
	}

	.main-content::-webkit-scrollbar-track {
	    background-color: var(--common-header-bg-color);
	    border-radius: 10px;
	}

	.main-content::-webkit-scrollbar-thumb {
	    background-color: #484B4D;
	    border-radius: 10px;
	}

</style>