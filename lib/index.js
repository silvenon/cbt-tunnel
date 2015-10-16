var path = require('path');
var Promise = require('pinkie-promise');
var spawn = require('child_process').spawn;
var which = require('which');
var chalk = require('chalk');

module.exports = function (opts) {
	opts = opts || {};

	var authKey = opts.authKey || process.env.CBT_AUTH_KEY;
	var args = [];
	var tunnel;
	var output;

	if (!authKey) {
		return Promise.reject(new Error('The authentication key is missing'));
	}

	args.push('-jar', path.join(process.cwd(), 'bin', 'cbttunnel.jar'));
	args.push('-authkey', authKey);

	if (opts.dir) {
		args.push('-dir', opts.dir);
	}

	if (opts.proxy) {
		args.push('-proxyip', opts.proxy.ip);
		args.push('-proxyport', opts.proxy.port);
	}

	tunnel = spawn(which.sync('java'), args);

	output = '';
	output += chalk.cyan('Creating a Local Connection... ');
	output += chalk.dim.gray('(eta 30s)');

	console.log(output);

	return Promise.race([
		new Promise(function (resolve, reject) {
			tunnel.stdout.on('data', function (data) {
				if (/CONNECTED/.test(data)) {
					resolve();
				} else if (/ERR/.test(data)) {
					reject(new Error(data.toString().trim()));
				}
			});
		}),
		new Promise(function (resolve, reject) {
			tunnel.stderr.on('data', function (data) {
				reject(new Error(data.toString().trim()));
			});
		})
	]).then(function () {
		console.log(chalk.green('Connected!'));
	}, function (err) {
		console.log(err.message);
		console.log(chalk.red('Failed to connect.'));
		return Promise.reject(err);
	});
};
