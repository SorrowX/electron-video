<template>
	<div class="search-header">
		<div class="search">
			<i class="search-icon"></i>
			<i class="cut-off-rule"></i>
			<input 
			    type="text" 
			    placeholder="请输入视频关键词..."
			    v-model="value"
			    @keyup.13="submit"
			>
		</div>
		<button @click="submit">搜索</button>
	</div>
</template>

<script>
	export default {
		name: 'SearchHeader',
		data() {
			return {
				value: ''
			}
		},
		methods: {
			submit() {
				this.$emit('search', this.value)
			}
		}
	}
</script>

<style scoped>
	.search-header {
		height: 52px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 32px;
		padding-right: 19px;
		background-color: rgba(39,45,49,1);
	}

	.search {
		display: flex;
		align-items: center;
	}

	.search-icon {
		display: block;
		width: 24px;
		height: 24px;
		margin-right: 12px;
		background-image: url('../../../../assets/Search.png');
		background-size: contain;
	}

	.cut-off-rule {
		display: block;
		width: 3px;
		height: 23px;
		margin-right: 12px;
		background-color: rgba(103,108,110,1);
	}

	.search>input {
		border: 0;
		outline: none;
		height: 30px;
		width: 500px;
		padding: 5px 0px;
		font-size: 14px;
		color: #fff;
		background-color: rgba(39,45,49,1);
		font-family:"Microsoft YaHei";
	}

	.search-header>button {
		font-size: 14px;
		color: #fff;
		border: 0;
		outline: none;
		background: transparent;
		font-family:"Microsoft YaHei";
	}

	.search-header>button:hover {
		cursor: pointer;
	}
</style>