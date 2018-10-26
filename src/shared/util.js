const ip = require('ip')
const path = require('path')
import { encode } from '../server/util'

export function getLocalIp() {
	return ip.address()
}

export function getMobileUrl() {
    let mobilePath = process.cwd() + '\\' + path.join(__dirname,'../mobile/index.html')
    return encode(mobilePath)
}