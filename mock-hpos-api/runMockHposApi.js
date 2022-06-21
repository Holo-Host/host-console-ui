#!/usr/bin/env node
const { hideBin } = require('yargs/helpers')
const yargs = require('yargs/yargs')
const argv = yargs(hideBin(process.argv)).argv
const MockHposApi = require('./index')
require('dotenv').config()

let port

if (argv.port) {
  port = argv.port
} else {
  port = process.env.VUE_APP_HPOS_PORT
}

if (!port) {
  throw new Error(
    'no port provided. Please pass in a port arg with --port or define a VUE_APP_HPOS_PORT env variable'
  )
}

MockHposApi.start(port, argv.email, argv.password)
