import { getLocalIp } from '../shared/util'

export default {
	webServerConfig: {
		ip: getLocalIp(),
		port: 1314,
		address: `http://${getLocalIp()}:${1314}`
	}
}