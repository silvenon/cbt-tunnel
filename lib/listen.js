import Promise from 'pinkie-promise';

export default (child) => {
	return Promise.race([
		new Promise((resolve, reject) => {
			child.stdout.on('data', (data) => {
				if (/CONNECTED/.test(data)) {
					resolve();
				} else if (/ERR/.test(data)) {
					reject(new Error(data.toString().trim()));
				}
			});
		}),
		new Promise((resolve, reject) => {
			child.stderr.on('data', (data) => {
				reject(new Error(data.toString().trim()));
			});
		})
	]);
};
