#!/bin/env node
'use strict';

// Ping graphing tool:
// pingg -h google.com,yahoo.com

const Config = require('bcfg');
const blessed = require('blessed');
const contrib = require('blessed-contrib');
const spawn = require('child_process').spawn;

// Parse arguments
const config = new Config('pingg', {
	alias: {
		'h': 'hosts',
		'c': 'colors',
		// 'f': 'flood',
	},
});

config.inject({
	'hosts': ['8.8.8.8', '1.1.1.1'],
	'colors': ['green', 'blue', 'red', 'yellow'],
});

config.load({argv: true});
const colors = config.array('colors');
const datas = {};
let cIndex = 0;

// Setup display
const screen = blessed.screen();
const line = contrib.line({
	xLabelPadding: 13,
	xPadding: 5,
	yLabelPadding: 25,
	yPadding: 15,
	showLegend: true,
	label: 'Network latency',
});
screen.append(line);
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
	return process.exit(0);
});
screen.render();

// Ping each host and display results
for (const host of config.array('hosts')) {
	const ping = spawn('ping', [host]);
	const data = {
		title: host,
		x:[],
		y:[],
		style: {
			line: colors[cIndex++ % colors.length],
		},
	};
	datas[host] = data;

	ping.stdout.on('data', function(d) {
		// console.log("DATA!!!", d.toString())
		const p = (/time=([\d\.]+) ms/g).exec(d.toString());
		if (p) {
			data.x.push((new Date()).toLocaleTimeString());
			data.y.push(parseFloat(p[1]));
			line.setData(Object.values(datas));
			screen.render();
		}
	});
}
