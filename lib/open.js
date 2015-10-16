import getArgs from './get-args';
import {spawn} from 'child_process';
import which from 'which';
import logger from './logger';
import chalk from 'chalk';
import listen from './listen';
import Promise from 'pinkie-promise';

const info = chalk.cyan;
const aux = chalk.dim.gray;
const success = chalk.green;
const error = chalk.red;

export default (opts) => {
	const tunnel = spawn(which.sync('java'), getArgs(opts));

	logger(info('Creating a Local Connection'), aux('(eta 30s)'));

	return listen(tunnel)
		.then(() => {
			logger(success('Connected!'));
		}, (err) => {
			logger(err.message);
			logger(error('Failed to connect.'));
			return Promise.reject(err);
		});
};
