![Build](https://github.com/etherisc/gif-staking-ui/actions/workflows/build.yml/badge.svg)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![](https://dcbadge.vercel.app/api/server/cVsgakVG4R?style=flat)](https://discord.gg/Qb6ZjgE8)

# gif-staking-ui 

This repository contains the source code for web application for staking

## Run in development mode 

The repository includes a vscode _devcontainer_ that installs all the necessary dependencies to run the application.

Create a `.env.local` file in the root directory of the project. Have a look a the `.env.example_local` file for the required environment variables of a setup running again a local ganache chain. The minimum required variables are described below
Then run the application in dev mode with `npm run dev`.

## Configuration

## General config

```
# Blockchain connection configuration
NEXT_PUBLIC_CHAIN_ID=80001
NEXT_PUBLIC_CHAIN_NAME=Polygon Mumbai
NEXT_PUBLIC_CHAIN_RPC_URL=https://polygon-testnet-rpc.allthatnode.com:8545
NEXT_PUBLIC_CHAIN_TOKEN_NAME=TEST-MATIC
NEXT_PUBLIC_CHAIN_TOKEN_SYMBOL=MATIC
NEXT_PUBLIC_CHAIN_TOKEN_DECIMALS=18
NEXT_PUBLIC_CHAIN_TOKEN_BLOCKEXPLORER_URL=https://mumbai.polygonscan.com/
```

### Faucet 

```
NEXT_PUBLIC_SHOW_FAUCET=true
NEXT_FAUCET_MNEMONIC=candy maple cake sugar pudding cream honey rich smooth crumble sweet treat
NEXT_FAUCET_COIN_ADDRESS=0x000Ea55EcF8E37477c2216B4416AB43147F32509
NEXT_FAUCET_SEND_ETHERS=true
NEXT_FAUCET_SEND_TESTCOIN=true
```



## Deployment

TODO:

