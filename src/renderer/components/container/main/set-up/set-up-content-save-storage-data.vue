<template>
	<div class="save-storage-data">
		<div class="title">存储 Storage 数据</div>
		<div class="operat">
			<div class="create-file">
				<span>创建一个空的存储数据文件</span> 
				<input type="text" placeholder="请输入文件名" v-model="genFileName"> 
				<button @click="createFile">生成</button>
			</div>
			<div class="delete-file">
				<span>删除存储文件</span>
			    <div>
			        <select v-model="deleteFile" class="select">
			        	<option disabled value="">选择要删除的文件</option>
			            <option 
			                v-for="name in storageFileNames" 
			                v-bind:value="name"
			            >
			                {{ name }}
			            </option>
			        </select>
			    </div>
			</div>
			<div class="save-to-file">
			    <span>当前所有 Local Storage数据 存储到</span>
			    <div>
			        <select v-model="selectedToSave" class="select">
			        	<option disabled value="">选择存储文件</option>
			            <option 
			                v-for="name in storageFileNames" 
			                v-bind:value="name"
			            >
			                {{ name }}
			            </option>
			        </select>
			    </div>
		        <span>文件中</span>
			</div>
			<div class="switch-data">
				<span>切换存储文件中的数据</span>
			    <div>
			        <select v-model="selectedToSwitchData" class="select">
			        	<option disabled value="">切换存储数据</option>
			            <option 
			                v-for="name in storageFileNames" 
			                v-bind:value="name"
			            >
			                {{ name }}
			            </option>
			        </select>
			    </div>
			</div>
		</div>
	</div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import { 
    	createLocalStorageDataFile,
    	refreshData
    } from '../../../../store/local'

	export default {
		name: 'SaveStorageData',
		data() {
			return {
				genFileName: '',
				selectedToSave: '',
				selectedToSwitchData: '',
				deleteFile: ''
			}
		},
		computed: {
			...mapState([
				'curStorageFileName', 
				'storageFileNames'
			])
		},
		watch: {
			selectedToSave(fileName) {
				this.saveStorageDataToGenFile(fileName)
			},
			selectedToSwitchData(fileName) {
				refreshData(fileName)
				this.setCurStorageFileName(fileName)
			},
			deleteFile(fileName) {
                this.deleteStorageFileName(fileName)
			}
		},
		methods: {
			...mapActions([
				'addStorageFileName',
				'setCurStorageFileName',
				'deleteStorageFileName'
			]),
			createFile() {
                this.addStorageFileName(this.genFileName)
			},
			saveStorageDataToGenFile(fileName) {
				createLocalStorageDataFile(fileName)
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

	.create-file>input {
		width: 120px;
		padding: 3px;
		margin: 0 10px;
		border-radius: 3px;
		outline: none;
		border: none;
		color: #fff;
		font-size: 10px;
		color: rgba(204,204,204, 1);
		background-color: rgba(76,174,80,.8);
	}
	.create-file>input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
	    color: rgba(204,204,204, 1);
	}
	.create-file>button {
		border: none;
		padding: 3px 15px;
		text-align: center;
		text-decoration: none;
		font-size: 10px;
		border-radius: 2px;
		color: rgba(204,204,204, 1);
		background-color: #4CAF50; /* Green */
	}

	.save-to-file>div,
	.switch-data>div,
	.delete-file>div {
		margin: 0 10px;
	}
	.select {
		padding: 4px;
		border-radius: 3px;
		outline: none;
		border: none;
		color: rgba(204,204,204, 1);
		font-size: 10px;
		background-color: rgba(76,174,80,.8);
	}
	.select option {
		font-size: 12px;
		color: #fff;
	}
</style>