#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const MockHposApi = require('./index')
require('dotenv').config()

let port

if (argv.port) {
  port = argv.port
} else {
  port = process.env.VUE_APP_HPOS_PORT
}


MockHposApi.start(port, argv.email, argv.password)
