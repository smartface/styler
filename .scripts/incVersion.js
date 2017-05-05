#!/usr/bin/env node

var semver = require("semver");
var minimist = require("minimist");

var preId = "";
var opts = {
  alias: {
    version: ['v'],
    preId: ['pd'],
    minor: ['mn'],
    major: ['mj'],
    patch: ['pt']
  },
  default: {
    indent: 2
  }
};

var argv = minimist(process.argv.slice(2), opts);

// console.log("old version : ", argv.version);

if (!argv.version) {
  console.log('Usage:');
  console.log(' <key> [options]');
  console.log('');
  console.log('Options:');
  console.log('  -v, --version <value>     Current version of repo.');
  console.log('  -pd, --preId  <value>     If It\'s prerelease version, use beta, alpha or rc as value.');
  console.log('  -mn, --minor              Increase version as minor.');
  console.log('  -mj, --major              Increase version as major.');
  console.log('  -pt, --patch              Increase version as patch.');
  console.log('');
  return;
}

var type = "";

if(argv.minor){
  type = "minor";
} else if(argv.major){
  type = "major";
} else if(argv.patch){
  type = "patch";
}

var version = argv.version;

if (version && version.indexOf("-rc") > -1) {
  preId = "rc";
}
else if (version && version.indexOf("-beta") > -1) {
  preId = "beta";
}
else if (version && version.indexOf("-alpha") > -1) {
  preId = "alpha";
}

if(argv.preId){
  preId = argv.preId;
}

if (!type && preId)
  version = semver.inc(version, 'prerelease', preId);
else if(type)
  version = semver.inc(version, type);
  

process.stdout.write(version);
process.exit(0);
