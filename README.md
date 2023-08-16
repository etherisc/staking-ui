![Build](https://github.com/etherisc/staking-ui/actions/workflows/build.yml/badge.svg)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![](https://dcbadge.vercel.app/api/server/cVsgakVG4R?style=flat)](https://discord.gg/Qb6ZjgE8)

# staking-ui 

This repository contains the source code for web application for staking

## Run in development mode 

The repository includes a vscode _devcontainer_ that installs all the necessary dependencies to run the application.

Create a `.env.local` file in the root directory of the project. Have a look a the `.env.example_local` file for the required environment variables of a setup running again a local ganache chain. The minimum required variables are described below
Then run the application in dev mode with `npm run dev`.

## Dependencies

### Redis

The application uses redis to store information. The redis modules search and JSON need to enabled. 
The application expects a environment variables called `REDIS_URL` to be set. The application will use the url`'redis://redis:6379'` if no connection is specified in the `REDIS_URL`.

The docker image `redis/redis-stack` can be used to run a redis instance with the required modules enabled.

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

NEXT_PUBLIC_DIP_ADDRESS=0xe4e47451AAd6C89a6D9E4aD104A7b77FfE1D3b36
NEXT_PUBLIC_DIP_SYMBOL=DIP
NEXT_PUBLIC_DIP_DECIMALS=18

NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS=0xF57f76D23568E31b12f62E7B8eB880f486369bCf
NEXT_PUBLIC_DIP_MIN_STAKE_AMOUNT=10000
NEXT_PUBLIC_DIP_MAX_STAKE_AMOUNT=10000000
NEXT_PUBLIC_STAKING_SUPPORTING_TOKEN_SYMBOL=USDT
NEXT_PUBLIC_STAKING_SUPPORTING_TOKEN_DECIMALS=6
```

### Google analytics

To enable Google Analytics, set the environment variable `NEXT_PUBLIC_GA_MEASUREMENT_ID` to the value you get from your Google Analytics settings.
Setting the environment variable `NEXT_PUBLIC_GA_ENVIRONMENT_ID` will add a parameter _environment_ with the given value to any events transmitted. 

### Faucet 

```
NEXT_PUBLIC_SHOW_FAUCET=true
NEXT_FAUCET_MNEMONIC=candy maple cake sugar pudding cream honey rich smooth crumble sweet treat
NEXT_FAUCET_COIN_ADDRESS=0x000Ea55EcF8E37477c2216B4416AB43147F32509
NEXT_FAUCET_SEND_ETHERS=true
NEXT_FAUCET_SEND_TESTCOIN=true
```



## Run docker image locally with mumbai instance configuration

```
docker build -t staking-ui --build-arg INSTANCE=mumbai .
docker run --rm -p 3003:3000 staking-ui
```

open browser at http://localhost:3003


## Deployment

### Docker

The application can be run in a docker container. The docker image can be build via the provided `Dockerfile`. We do not currently provide a prebuilt docker image as the image includes static instance information that needs to be configured at build time.

The build process requires the following arguments:

- `INSTANCE` - the name of the instance to build the image for. The instance name is used to load the correct configuration from the `.env.INSTANCE` file in the root diretory of the project (see `.env.mumbai` as an example). 

### Dokku

We use [dokku](https://dokku.com/) for deployment. 

With the current setup (dokku repo is added as remote repo called `dokku` to the local git), deployment is triggered by running the following command in the root directory of the project:

```
git push dokku <branch-to-deploy>:main
```

#### Initial instance setup

Replace application name (`goerli-setup`) with whatever fits your need. DNS is expected to be prepared in advance.

```
# create dokku application 
dokku apps:create goerli-staking

# add new domain and remove default domain
dokku domains:add goerli-staking staking.goerli.etherisc.com
dokku domains:remove goerli-staking goerli-staking.depeg-test.etherisc.com

# configure dokku docker build to load correct instance environment during build
dokku docker-options:add goerli-staking build --build-arg INSTANCE=goerli

# set correct proxy ports for http and https
dokku proxy:ports-add goerli-staking http:80:3000
dokku proxy:ports-add goerli-staking https:443:3000
dokku proxy:ports-remove goerli-staking http:80:5000

# create redis service
dokku redis:create staking-mumbai-redis -i redis/redis-stack-server -I 7.2.0-v0

# now you need to manually enable redissearch and redisjson modules in the redis config (replace 'sstaking-mumbai-redis' below with correct service name)
vi /var/lib/dokku/services/redis/staking-mumbai-redis/config/redis.conf
# scroll down to the section 'MODULES' and paste the following two lines (remove the # in front of the lines)
# loadmodule /opt/redis-stack/lib/redisearch.so
# loadmodule /opt/redis-stack/lib/rejson.so

# restart redis service
dokku redis:restart staking-mumbai-redis
# link the redis service to the app
dokku redis:link staking-mumbai-redis mumbai-staking


# now push deployment via git 
# 1. add new git remote 'git remote add dokku-goerli dokku@<host>:goerli-staking'
# 2. 'git push dokku-goerli develop:main'

# enable let's encrypt for https certificates
dokku letsencrypt:enable goerli-staking

# configure backend chain rpc url
dokku config:set goerli-depeg BACKEND_CHAIN_RPC_URL=<chain rpc url>

# app should be ready now - open in browser
```

#### Dokku redis debug connection

Example using service _depeg-mumbai-redis_:

1. Expose redis port on dokku `dokku redis:expose depeg-mumbai-redis`
1. Find the exposed port in the output above or via `dokku redis:info depeg-mumbai-redis`
1. Open ssh tunnel with dokku redis port forward `ssh -L 6479:localhost:15956 user@host`
1. Now connect with redis client of choice (e.g. RedisInsight) using `localhost:6479` as host and the password mentioned in redis info
1. When finished, close the ssh tunnel by logging out of the ssh shell and unexpose the redis port `dokku redis:unexpose depeg-mumbai-redis`

#### Dokku documentation links: 

- https://dokku.com/docs/deployment/application-deployment/
- https://dokku.com/docs/advanced-usage/docker-options/
- https://dokku.com/docs/configuration/domains/
- https://github.com/dokku/dokku-redis
- https://hub.docker.com/r/redis/redis-stack

