# host-console-ui

## Project setup
```
yarn install
```

Copy the .env.example file to .env, and modify values to taste.

### Start UI server using real HoloPort as backend
```
VUE_APP_HOLOPORT_URL=your_holoport_url_here
```

e.g.

```
VUE_APP_HOLOPORT_URL=https://00000000000000000000000000000000000000000000000000.holohost.dev yarn serve
```

Using this command, all requests to `localhost:8080/api/` and `localhost:8080/holochain-api/` are forwarded to the holoport. This is really helpful for development/testing.

### Start UI server for development
```
yarn run serve
```

You will mostly want to run this along with the next command

### Start mock HPOS API server for development
```
yarn run start-mock-hpos-api
```

The login email and password for this server are in the package.json script
`test@test.com`
and
`asasasas`

### Start both UI server and mock API server with one command
```
yarn run start-ui-and-mock
```


### Run tests
```
yarn run test
```

Note: you must have a .env file with `VUE_APP_HPOS_PORT` for tests to pass.

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Storybook

This project contains Storybook stories. To run storybook in the development mode:

1. Run storybook `yarn storybook`
2. Visit `http://localhost:6006/`

Storybook is automatically deployed to `https://holo-host.github.io/host-console-ui` on every merge to the
`develop` branch.
