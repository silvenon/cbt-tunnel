var Download = require('download');
var downloadStatus = require('download-status');

new Download()
	.get('http://crossbrowsertesting.com/cbttunnel.jar')
	.dest('bin')
	.use(downloadStatus())
	.run();
