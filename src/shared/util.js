const ip = require('ip')

export function getLocalIp() {
	return ip.address()
}