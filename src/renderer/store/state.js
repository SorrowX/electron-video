import { 
	getCollectVideoFromCache,
	getVideoRecordFromCache,
	getSearchRecordFromCache
} from './cache'

const state = {
	videoCollection: getCollectVideoFromCache(),
	videoRecord: getVideoRecordFromCache(),
	searchRecord: getSearchRecordFromCache()
}

export default state