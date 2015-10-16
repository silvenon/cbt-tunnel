import Download from 'download';
import downloadStatus from 'download-status';

const download = new Download()
	.get('http://crossbrowsertesting.com/cbttunnel.jar')
	.dest('bin');

// if running on Travis CI, don't output download status
if (!process.env.TRAVIS_NODE_VERSION) {
	download.use(downloadStatus());
}

download.run();
