const path = require('path')

module.exports = {
	mode: process.env.NODE_ENV,
	resolveUnderRootDir: p => {
		return path.join(__dirname, `../${p}`)
	}
}
