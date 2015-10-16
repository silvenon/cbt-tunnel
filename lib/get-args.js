import path from 'path';

export default (opts) => {
	const args = [];

	args.push('-jar', path.join(process.cwd(), 'bin', 'cbttunnel.jar'));
	args.push('-authkey', opts.authKey);

	if (opts.dir) {
		args.push('-dir', opts.dir);
	}

	if (opts.proxy) {
		args.push('-proxyip', opts.proxy.ip);
		args.push('-proxyport', opts.proxy.port);
	}

	return args;
};
