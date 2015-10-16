import test from 'ava';
import cbtTunnel from './dist';
import path from 'path';
import Promise from 'pinkie-promise';
import pify from 'pify';
import fs from 'fs';

const promiseFs = pify.all(fs, Promise);

test('should download the executable', (t) => {
	t.plan(1);
	t.doesNotThrow(promiseFs.access(path.join(__dirname, 'bin', 'cbttunnel.jar')));
});

test('should throw if there is no auth key', (t) => {
	t.plan(1);
	t.throws(cbtTunnel());
});
