# tariswap-ui

## Getting started

The `tari-connector` package must be installed in the global `npm` folder. To do it:
* Clone the `tari-connector` repository
* Run `npm install`
* Run `npm link`

Also, a `tari_signaling_server` must be running and connected to a `tari_dan_wallet_daemon`. This project needs an environment variable 
`VITE_SIGNALING_SERVER_ADDRESS` that points to the signaling server. By default, the value is `http://localhost:9100`, but you can check [the ViteJs documentation](https://vitejs.dev/guide/env-and-mode.html) on how to set up a custom value.

Then, to run the project, in this project's folder (`tariswap-ui`) run:
```
npm install
npm link tari-connector
npm run dev
```


