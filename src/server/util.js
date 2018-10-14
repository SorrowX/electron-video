import serverCfg from './config'

const ip = serverCfg.serverConfig.ip
const port = serverCfg.serverConfig.port
const address = serverCfg.serverConfig.address

export function getServerCfgInfo() {
    return { ip, port, address }
}

export function encode(localFilePath) { // 对中文url特殊处理进行编码
    let encodeUrl = encodeURIComponent(localFilePath)
    return address + '/' + encodeUrl
}

export const getDecodeUrl = function(url) { // 对中文url特殊处理进行解码
    return address + decodeURIComponent(url)
}

export function parseRange (str, size) {
    if (str.indexOf(',') != -1) return

    let pos = str.indexOf('=')
    if(pos != -1){
        str = str.substr(6, str.length)
    }
    let range = str.split('-')
    let start = parseInt(range[0], 10)
    let end = parseInt(range[1], 10) || size - 1

    // Case: -100
    if (isNaN(start)) {
        start = size - end
        end = size - 1
        // Case: 100-
    } else if (isNaN(end)) {
        end = size - 1
    }

    // Invalid
    if (isNaN(start) || isNaN(end) || start > end || end > size) {
        return
    }
    return {
        start: start,
        end: end
    }
}
