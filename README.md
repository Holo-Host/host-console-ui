# host-console-ui

## Project setup
```
npm install
```

Copy the .env.example file to .env, and modify values to taste.

### Start UI server for development
```
npm run serve
```

You will mostly want to run this along with the next command

### Start mock HPOS API server for development
```
npm run start-mock-hpos-api
```

### Start both UI server and mock API server with one command
```
npm run start-ui-and-mock
```

### Run tests
```
npm run test
```

Note: you must have a .env file with `VUE_APP_HPOS_PORT` for tests to pass.

### Compiles and minifies for production
```
npm run  build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
