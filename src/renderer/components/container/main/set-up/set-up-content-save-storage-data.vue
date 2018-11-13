<template>
	<div class="save-storage-data">
		<div class="title">存储 Storage 数据</div>
		<div class="operat">
			<p>
			    进入操作页面
			    <button @click="$emit('operate-storage-page', 'OperateStorage')">Go</button>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'SaveStorageData'
	}
</script>

<style scoped>
	.save-storage-data,
	.operat {
		margin-top: 30px;
	}

	.operat {
		font-size: 13px;
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

	
</style>