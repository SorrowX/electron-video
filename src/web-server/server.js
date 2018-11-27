import http from 'http'
import fs from 'fs'
import path from 'path'
import url from 'url'
import { getWebServerConfigInfo } from './util'
import { loopGeneratPicture } from '../file-server/api'

const { ip, port, address } = getWebServerConfigInfo()

let vueInstance = null

export default function startWebServer(vue) {
	vueInstance = vue
	const server = http.createServer(function (req, res) {
	    let method = req.method
	    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
	    if (method === 'GET') {
	    	handlerResponse(req, res, url.parse(req.url, true))
	    }
	})
	server.listen(port)

	server.on('clientError', (err, socket) => {
	    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
	})
	console.log('web服务已启动: ', address)
}


function handlerResponse(req, res, urlObj) {
	switch(urlObj.pathname) {
		case '/get_nav_list':
		   handlerNavList(req, res)
		   break
		case '/get_video_list_by_nav':
		   handlerVideoListByNav(req, res, urlObj)
		   break
		case '/get_collect_video':
		   handlerCollectVideo(req, res)
		   break
		case '/get_video_record':
		   handlerVideoRecord(req, res)
		   break
		case '/search':
		   handlerSearch(req, res, urlObj)
		   break
		default:
			sendDefaultData(req, res)
	}
}

// 获取所有导航数据
function getNavArr() {
	if (vueInstance) {
		let $store = vueInstance.$store
		let navArr = $store.state.quickView.navArr
		return navArr
	} else {
		return []
	}
}

// 获取收藏视频列表
function getCollectVideoList() {
	if (vueInstance) {
		let $store = vueInstance.$store
		return $store.state.videoCollection
	} else {
		return []
	}
}

// 获取视频记录字典
function getVideoRecordMap() {
	if (vueInstance) {
		let $store = vueInstance.$store
		return $store.state.videoRecord
	} else {
		return {}
	}
}

/*
 * 处理导航信息
 * http://192.168.130.164:1314/get_nav_list
*/
function handlerNavList(req, res) {
	res.end(JSON.stringify(getNavArr()))
}

/*
 * 处理视频列表通过导航名称
 * http://192.168.130.164:1314/get_video_list_by_nav?tag=推荐&num=10&forceUpdate=true
 * num和forceUpdate可省略
*/
let videoCache = Object.create({}) // 视频缓存
function handlerVideoListByNav(req, res, urlObj) {
	let query = urlObj.query
	let navArr = getNavArr()
	let navObj = navArr.find((obj) => {
		return obj.tag === query.tag
	})

	if (videoCache[query.tag] && !Boolean(query.forceUpdate)) {
    	res.end(JSON.stringify({
			code: 0,
			data: videoCache[query.tag],
			message: '数据获取成功！'
		}))
	} else if (navObj) {
		loopGeneratPicture({
			videoResourcePath: navObj.videoDirPath,
			genImgResourcePath: navObj.imgDirPath,
			num: Number(query.num) || 0
	    }).then((data) => {
	    	videoCache[query.tag] = data
	    	res.end(JSON.stringify({
				code: 0,
				data,
				message: '数据获取成功！'
			}))
	    }).catch((e) => {
	    	res.end(JSON.stringify({
				code: -100,
				message: '数据获取异常！'
			}))
	    })
	} else {
    	res.end(JSON.stringify({
			code: -101,
			message: '数据获取异常！'
		}))
	}
}

/*
 * 处理收藏视频
 * http://192.168.130.164:1314/get_collect_video
*/
function handlerCollectVideo(req, res) {
	res.end(JSON.stringify(getCollectVideoList()))
}

/*
 * 处理视频记录
 * http://192.168.130.164:1314/get_video_record
*/
function handlerVideoRecord(req, res) {
	res.end(JSON.stringify(getVideoRecordMap()))
}

/*
 * 处理搜索视频根据搜索关键词
 * http://192.168.130.164:1314/search?key=http&forceUpdate=true
 * forceUpdate可以省略,是否强制更新
*/
async function handlerSearch(req, res, urlObj) {
	let searchKey = urlObj.query.key
	let forceUpdate = Boolean(urlObj.query.forceUpdate)
	let ret = []

	// 1.获取所有导航对应的数据
	let navArr = getNavArr()
	let i = 0, len = navArr.length
	for (; i < len; i++) {
		let navObj = navArr[i]
		if (!videoCache[navObj['tag']] || forceUpdate) {
			let data = await loopGeneratPicture({
				videoResourcePath: navObj.videoDirPath,
				genImgResourcePath: navObj.imgDirPath
		    })
		    videoCache[navObj['tag']] = data
		}
	}

	// 2.遍历所有数据
	for (let prop in videoCache) {
        let arr = videoCache[prop]
        arr.forEach((obj) => {
        	if (obj.filename.indexOf(searchKey) !== -1) {
        		ret.push(obj)
        	}
        })
	}

	res.end(JSON.stringify({
		code: 0,
		data: ret,
		message: '数据获取成功!'
	}))
}

function sendDefaultData(req, res) {
	res.end(JSON.stringify({
		code: 0,
		message: '请输入正确的接口'
	}))
}