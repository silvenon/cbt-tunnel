import test from 'ava';
import cbtTunnel from './';
import path from 'path';
import fs from 'fs';

test('should download the executable', (t) => {
	t.true(fs.existsSync(path.join(__dirname, 'bin', 'cbttunnel.jar')));
	t.end();
});

test('should reject if there is no auth key', async (t) => {
	try {
		await cbtTunnel();
		t.fail();
	} catch(err) {
		t.pass();
	}
});
