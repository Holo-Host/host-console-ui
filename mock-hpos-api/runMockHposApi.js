#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const MockHposApi = require('./index')

let port

if (argv.port) {
  port = argv.port
} else {
  port = process.env.VUE_APP_HPOS_PORT
}


new MockHposApi(port, argv.email, argv.password)