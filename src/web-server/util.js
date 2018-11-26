import config from './config'

const ip = config.webServerConfig.ip
const port = config.webServerConfig.port
const address = config.webServerConfig.address

export function getWebServerConfigInfo() {
    return { ip, port, address }
}