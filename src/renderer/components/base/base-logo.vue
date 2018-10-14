<template>
	<div class="base-logo">
		<i class="logo"></i>
		<i class="delimiter"></i>
		<span class="title">{{ title }}</span>
	</div>
</template>

<script>
	export default {
        name: 'BaseLogo',
        props: {
        	title: {
        		type: String,
        		default: '首页'
        	}
        }
	}
</script>

<style scoped>
	.base-logo{
        display: flex;
        align-items: center;
        width: 150px;
        height: 100%;
        overflow: hidden;
        margin-left: 12px;
	}

	.logo{
		position: relative;
		left: -23px;
		display: block;
		width: 23px;
		height: 17px;
		background-image: url(../../assets/logo.png);
		background-size: contain;
		background-repeat: no-repeat;
		filter: drop-shadow(28px 0px rgba(11,200,6,1));
	}

	.delimiter{
		display: block;
		height: 40%;
		width: 1px;
		margin: 0 10px;
		background-color: rgba(11,200,6,.6);
	}

	.title {
		font-size: 13px;
        color: rgba(153,153,153, 1);
	}
</style>