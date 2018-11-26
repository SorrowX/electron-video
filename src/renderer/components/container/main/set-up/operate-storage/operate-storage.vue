<template>
	<div class="operate-storage">
		<div class="back" @click="$emit('back')"></div>
		<div class="main">
			<div class="storage-data">
				<span>当前 local storage 数据存储到:</span>
				<div class="storage-data-form">
					<input type="text" placeholder="请输入文件名" v-model="storageFileName">
					<button @click="createFileAndSaveData" class="button">存储</button>
				</div>
				<div class="tip">
					Tip: {{ storageDataResultTip }}
				</div>
			</div>
			<div class="switch-storage-data">
				<span>更换UI数据来源及删除操作:</span>
				<div class="tip">
					Tip: {{ operateTip }}
				</div>
				<ul>
					<li 
					    v-for="(name,index) in allStorageFileNames"
                        :key="name"
					>
					    <span>{{ name }}</span>
					    <div class="operate-file">
					    	<button class="button" @click="switchStorageData(name)" @dblclick.stop>更换</button>
					    	<button class="button" @click="updateDateToFile(name)" @dblclick.stop>存储</button>
					    	<button class="button" @click="deleteStorageFile(name)" @dblclick.stop>删除</button>
					    </div>
				    </li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
    import { 
    	createLocalStorageDataFile,
    	delStorageFileByName,
    	getStorageFileNames,
    	refreshData,
    } from '@/store/local'
    import { REFRESH_VUEX_STATE_MESSAGE } from '@/constant/index'

    const storageDataResultDefaultTip = '存储完数据后,所有UI会恢复到初始状态,可以更换数据源来恢复UI.'
    const operateFileDefaultTip = '请对存储文件进行操作.'
    const noStorageFileTip = `
        1.更换: UI数据来源将会从该文件中读取; 
        2.存储: 把当前 local storage 存储到该文件中(会覆盖以前的数据); 
        3.删除: 会删除该文件`

	export default {
		name: 'OperateStorage',
		data() {
			return {
				storageFileName: '',
				allStorageFileNames: [],
				storageDataResultTip: storageDataResultDefaultTip,
				operateFileTip: operateFileDefaultTip
			}
		},
		computed: {
			operateTip() {
				if (this.allStorageFileNames.length === 0) {
					return noStorageFileTip
				}
				return this.operateFileTip
			}
		},
		methods: {
			createFileAndSaveData() {
				let storageFileName = this.storageFileName
                createLocalStorageDataFile(storageFileName)
                this.refreshStorageAndVuexData()
                this.updateFileNames()
                this.storageDataResultTip = `local storage 数据已存入 ${storageFileName} 文件中,且UI已经恢复初始状态.`
			},
			updateDateToFile(fileName) {
				createLocalStorageDataFile(fileName)
				this.operateFileTip = `当前 local storage 数据已存入 ${fileName} 文件中.`
			},
			switchStorageData(fileName) {
				this.refreshStorageAndVuexData(fileName)
				this.operateFileTip = `UI数据来源已更换为 ${fileName} 文件中的数据.`
			},
			deleteStorageFile(fileName) {
				delStorageFileByName(fileName)
				this.updateFileNames()
				this.operateFileTip = `${fileName} 文件删除成功.`
			},
			updateFileNames() {
				this.allStorageFileNames = getStorageFileNames()
			},
			refreshStorageAndVuexData(fileName) {
				refreshData(fileName)
				this.$root.$emit(REFRESH_VUEX_STATE_MESSAGE)
			}
		},
		mounted() {
			this.updateFileNames()
		}
	}
</script>

<style scoped>
	.operate-storage {
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.main {
		width: 50%;
		height: 60%;
		border: 1px solid rgba(187,188,189,.3);
		overflow: auto;
		position: relative;
	}

	.main>div {
		margin: 6% 8% 0 8%;
	}

	.button {
		width: 15%;
		height: 24px;
		margin-left: 1%;
		outline-color: rgba(187,188,189,1);
		border: none;
		font-size: 12px;
		border-radius: 3px;
		color: #ccc;
		background-color: rgba(76,174,80,.5);
	}

	/* 存储到文件 相关样式 */
	.storage-data {
		font-size: 13px;
		color: rgba(194,194,194,1);
		/*border: 1px solid rgba(187,188,189,.3);*/
	}
	.storage-data-form {
		margin-top: 2%;
	}
	.storage-data-form>input {
        width: 45%;
		height: 24px;
		padding-left: 2%;
		border: none;
		outline: none;
		outline-color: rgba(187,188,189,1);
		border-radius: 3px;
		font-size: 10px;
		color: #fff;
		background-color: rgba(187,188,189,.1);
	}
    .tip {
    	margin-top: 1%;
    	font-size: 12px;
    	color: rgba(76,174,80,.5);
    }

    /* 切换存储好的数据 样式 */
    .switch-storage-data {
    	font-size: 13px;
		color: rgba(194,194,194,1);
    }

    .switch-storage-data ul {
    	margin-top: 1%;
    }
    .switch-storage-data ul li {
    	display: flex;
    	justify-content: space-between;
    	margin-bottom: 2%;
    	border-bottom: 1px solid rgba(187,188,189,.1);
    	font-size: 12px;
    	color: rgba(76,174,80,.5);
    }
    .operate-file {
    	width: 25%;
    	display: flex;
    	justify-content: space-between;
    }
    .operate-file button {
    	height: 21px;
    	width: 90%;
    	font-size: 10px;
    }

	/* 滚动条控制样式 */
	.main::-webkit-scrollbar {
		width: 3px;
		height: 4px;
	}

	.main::-webkit-scrollbar-track {
	    background-color: var(--common-header-bg-color);
	    border-radius: 10px;
	}

	.main::-webkit-scrollbar-thumb {
	    background-color: #434648;
	    border-radius: 10px;
	}

	.back {
		position: absolute;
		left: calc(50% - 14px);
		top: 0;
		width: 0;
	    height: 0;
	    border-left: 14px solid transparent;
	    border-right: 14px solid transparent;
	    border-top: 14px solid rgba(27,34,38,1);
	}
	.back:hover {
		cursor: pointer;
	}
</style>