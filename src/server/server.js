import fs from 'fs'
import path from 'path'
import url from 'url'
import http from 'http'
import zlib from 'zlib'
import mime from './mime'
import { parseRange, getDecodeUrl, getServerCfgInfo } from './util'

const { ip, port, address } = getServerCfgInfo()

const server = http.createServer(function(request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*') // 解决canvas生成缩略图跨域的问题

    let correctUrl = getDecodeUrl(request.url)
    let pathname = correctUrl.slice(address.length)
    let realpath = path.normalize(pathname.replace(/\.\./g, '')).slice(1)
    
    if (realpath.indexOf('?') !== -1) {
        realpath = realpath.slice(0, realpath.indexOf('?'))
    }
    let ext = path.extname(realpath)
    ext = ext ? ext.slice(1) : 'unknown'
    let contentType = mime[ext] || 'text/plain'

    fs.exists(realpath, function(exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            })
            response.write('This request URL ' + pathname + 'was not found on this server')
            response.end()
        } else {
            response.setHeader('Content-Type', contentType)
            let stats = fs.statSync(realpath)
            if (request.headers['range']) {
                let range = parseRange(request.headers['range'], stats.size)
                if (range) {
                    response.setHeader('Content-Range', 'bytes ' + range.start + '-' + range.end + '/' + stats.size)
                    response.setHeader('Content-Length', (range.end - range.start + 1))
                    let stream = fs.createReadStream(realpath, {
                        'start': range.start,
                        'end': range.end
                    })
                    response.writeHead('206', 'Partial Content')
                    stream.pipe(response)
                } else {
                    response.removeHeader('Content-Length')
                    response.writeHead(416, 'Request Range Not Satisfiable')
                    response.end()
                }
            } else {
                let stream = fs.createReadStream(realpath)
                response.writeHead('200', 'Partial Content')
                stream.pipe(response)
            }
        }
    })
})

server.listen(port, ip, function() {
    console.log(`资源服务器启动成功: ${address}`)
})

server.on('error', (err) => {
    alert('服务器已挂', JSON.stringify(err, null, 4))
    console.error(JSON.stringify(err, null, 4))
})

export default server

