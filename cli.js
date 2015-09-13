#!/usr/bin/env node
'use strict';
var meow = require('meow');
var cbtTunnel = require('./');

var cli = meow({
	help: [
		'Usage',
		'  $ cbt-tunnel [input]',
		'',
		'Options',
		'  --foo  Lorem ipsum. [Default: false]',
		'',
		'Examples',
		'  $ cbt-tunnel',
		'  unicorns & rainbows',
		'  $ cbt-tunnel ponies',
		'  ponies & rainbows'
	]
});

console.log(cbtTunnel(cli.input[0] || 'unicorns'));
