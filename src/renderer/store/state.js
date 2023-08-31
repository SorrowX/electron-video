import { 
	getCollectVideoFromCache,
	getVideoRecordFromCache
} from './cache'

const state = {
	videoCollection: getCollectVideoFromCache(),
	videoRecord: getVideoRecordFromCache()
}

export default state