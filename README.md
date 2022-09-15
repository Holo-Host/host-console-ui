# host-console-ui

## Git Submodules
This project contains git submodules, remember to initialize submodules after cloning.

```
git clone https://github.com/Holo-Host/host-console-ui.git
```

Initialize submodules:

```
git submodule init
```

To fetch the submodules for an existing branch you can execute:

```
git submodule update --remote
```

The submodules default to the develop branch.

## Project setup

Install required packages
```
yarn
```

Create the .env file in the root folder and add following value.

### Start UI server using real HoloPort as backend
Set `VUE_APP_HOLOPORT_URL` value in .env file to the HoloPort URL.

```
VUE_APP_HOLOPORT_URL=your_holoport_url_here
```

e.g.

```
VUE_APP_HOLOPORT_URL=https://00000000000000000000.holohost.dev
```

Start UI server
```
yarn serve
```

Using this command, all requests to `localhost:8080/api/` and `localhost:8080/holochain-api/` are forwarded to the holoport. This is really helpful for development/testing.

If you want to run it against mocked data you will need to run it as below.

### Start mock HPOS API server for development
Remove `VUE_APP_HOLOPORT_URL` value from .env file.
Set `VUE_APP_HPOS_PORT=4567` in .env file.

Run mock HPOS API server
```
yarn start-mock-hpos-api
```

Start UI server in another terminal
```
yarn serve
```

The login email and password for this server are in the package.json script
`test@test.com`
and
`asasas`

### Run tests
```
yarn test
```

Note: you must have a .env file with `VUE_APP_HPOS_PORT` for tests to pass as it uses the mocked HPOS API server.

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Storybook
This project contains Storybook stories. To run storybook in the development mode:

1. Run storybook `yarn storybook`
2. Visit `http://localhost:6006/`

Storybook is automatically deployed to `https://holo-host.github.io/host-console-ui` on every merge to the
`develop` branch.

### User authentication mechanism
See [Token authentication](https://hackmd.io/Evi5CVFqTI22UD8_OrDgYA?view) description.
