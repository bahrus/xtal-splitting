const jiife = require('jiife');
const tiffe = require('jiife/tiffe.js');
tiffe.processFiles(['node_modules/xtal-element/define.ts', 'node_modules/xtal-element/xtal-latx.ts', 'xtal-split.ts'], 'dist/iife.ts');
jiife.processFiles(['xtal-split.js'], 'dist/xtal-split.js', true);