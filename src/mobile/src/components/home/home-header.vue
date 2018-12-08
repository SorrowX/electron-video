<template>
	<header>
		<div class="logo">
			<i class="logo-icon"></i>
		</div>
		<div class="search">
			<input type="text">
			<i class="search-icon"></i>
		</div>
	</header>
</template>

<script>
	export default {
		name: 'HomeHeader'
	}
</script>

<style scoped>
	header {
		max-width: 7.5rem;
		height: 44px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 0.24rem;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		margin: auto;
		z-index: 10;
		background-color: #fff;
	}

	/* logo样式 */
	.logo {
		flex: none;
		width: 88px;
		height: 100%;
		overflow: hidden;
		position: relative;
		overflow: hidden;
	}
	.logo-icon {
		display: block;
		background-image: url(../../assets/lg.png);
		background-size: contain;
		background-repeat: no-repeat;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 13px;
	}

	/* 搜索样式 */
	.search {
		min-width: 200px;
		flex: 1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 100%;
		position: relative;
	}
	.search>input {
		width: 90%;
		height: 72%;
		padding-left: 20px;
		border: none;
		outline: none;
		-webkit-appearance: none;
		border-radius: 20px;
		background-color: rgba(240,240,240,1);
	}
	.search-icon {
		display: block;
		width: 16px;
		height: 16px;
		position: absolute;
		top: 14px;
		right: 10px;
		background-image: url(../../assets/search.png);
		background-size: contain;
	}
</style>