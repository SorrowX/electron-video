<template>
	<div class="base-search-box">
		<input type="text" placeholder="搜索" class="search-input">
		<button class="search-button">
			<i></i>
			搜全网
		</button>
	</div>
</template>

<script>
	export default {
		name: 'BaseSearchBox'
	}
</script>

<style scoped>
	.base-search-box{
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: relative;
		width: 240px;
		height: 39px;
		margin-right: 12px;
	}

	.search-input{
		width: 78%;
		height: 60%;
		font-size: 12px;
		font-weight: 400;
		padding-left: 10px;
		border-radius: 50px;
		border: 1px solid rgba(22,132,23,1);
		background-color: rgba(39,45,49,1);
		outline: 0;
	}

	.search-button{
		position: absolute;
		border: 0;
		outline: 0;
		right: 1px;
		top: 20.3%;
		width: 62px;
		height: 60%;
		padding-left: 12px;
		border-radius: 50px;
		background-color: rgba(11,190,6,1);
		font-size: 12px;
		font-weight: 400;
		color: #fff;
	}

	.search-button i{
		display: block;
		width: 12px;
		height: 12px;
		position: absolute;
		left: 4px;
		top: 5.5px;
		background-image: url(../../assets/search.scale-200.png);
		background-repeat: no-repeat;
		background-size: contain;
	}
</style>