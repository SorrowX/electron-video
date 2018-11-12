import { 
	getCollectVideoFromCache,
	getVideoRecordFromCache,
	getStorageFileNameInCache,
	getCurStorageFileNameInCache
} from './cache'

const state = {
	videoCollection: getCollectVideoFromCache(),
	videoRecord: getVideoRecordFromCache(),
	storageFileNames: getStorageFileNameInCache(),
	curStorageFileName: getCurStorageFileNameInCache()
}

export default state