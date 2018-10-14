import { getLocalIp } from '../shared/util'

export default {
	serverConfig: {
		ip: getLocalIp(),
		port: 9420,
		address: `http://${getLocalIp()}:${9420}`
	}
}