import Promise from 'pinkie-promise';
import open from './open';

export default (opts) => {
	opts = opts || {};
	opts.authKey = opts.authKey || process.env.CBT_AUTH_KEY;

	if (!opts.authKey) {
		return Promise.reject(new Error('The authentication key is missing'));
	}

	return open(opts);
};
