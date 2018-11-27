import ip from 'ip'
import path from 'path'
import { encode } from '../file-server/util'

export function getLocalIp() {
	return ip.address()
}

export function getMobileUrl() {
    let mobilePath = process.cwd() + '\\' + path.join(__dirname,'../mobile/index.html')
    return encode(mobilePath)
}