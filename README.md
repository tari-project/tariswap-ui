# tariswap-ui

This project implements a web interface using [Vite](https://vitejs.de) for the `tariswap` template in the [Tari network](https://github.com/tari-project/tari-dan).

The `tariswap` template implements a decentralized exchange smart contract on the Tari network, using a constant-product automated market maker. It allows swapping tokens, adding liquidity and removing liquidity.

## Getting started

### tari-connector npm dependency
The `tari-connector` package must be installed in the global `npm` folder. To do it:
* Clone the `tari-connector` repository
* Run `npm install`
* Run `npm link`

### Tari network
A Tari network must be running with the following requisites:
* All basic pieces running and connected: base node, wallet, validator node (registered) and indexer.
* A `tari_signaling_server` must be running and connected to a `tari_dan_wallet_daemon`.
* A `tariswap` component must have been created, that represents a swap pool of two different resources.
* An account created in the wallet daemon, with enough balance to perform the actions (swap, add/remove liquidity).

### Environment variables
This project uses [dotenv](https://github.com/motdotla/dotenv) to specify the configuration needed.

The `.env.example` file contains an example with all required environment variables and a description. You will need to create a copy of that file to a new `.env` file and modify there the values to match your Tari network. The `.env` is particular for each developer, so it's ignored in `.gitignored` and never uploaded into the repository.

Check [the ViteJs documentation](https://vitejs.dev/guide/env-and-mode.html) for more information on environment variables.

### Run the Tariswap UI
With all previous prerequisites in order, in this project's folder (`tariswap-ui`) run:
```
npm install
npm link tari-connector
npm run dev
```

And finally open the browser in the indicated URL being displayed in then console

