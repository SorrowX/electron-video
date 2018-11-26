<template>
	<div class="save-storage-data">
		<div class="title">存储 Storage 数据</div>
		<div class="operat">
			<p>
			    进入操作页面
			    <button @click="$emit('operate-storage-page', 'OperateStorage')">Go</button>
			</p>
			<p>
				刪除当前存储数据
				<button @click="delCurStorageData">删除</button>
			</p>
		</div>
	</div>
</template>

<script>
	import { 
		refreshData
	} from '@/store/local'

	export default {
		name: 'SaveStorageData',
		methods: {
			delCurStorageData() {
				refreshData()
				this.$root.$Tips.tip('刪除成功,数据已恢复默认数据!')
			}
		}
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
		margin-bottom: 13px;
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