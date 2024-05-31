import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'


export const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;
console.log("wallet connect config", "chainid", CHAIN_ID);

export const WALLET_CONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "0";

// 2. Set chains
const mainnet = {
    chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "1"),
    name: process.env.NEXT_PUBLIC_CHAIN_NAME || 'Ethereum Mainnet',
    currency: process.env.NEXT_PUBLIC_CHAIN_TOKEN_SYMBOL || 'ETH',
    explorerUrl: process.env.NEXT_PUBLIC_CHAIN_TOKEN_BLOCKEXPLORER_URL || 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
}

// 3. Create a metadata object
const metadata = {
    name: 'Etherisc Staking',
    description: 'Etherisc GIF dapp for DIP staking',
    url: 'https://staking.etherisc.com', // origin must match your domain & subdomain
    icons: ['https://avatars.mywebsite.com/']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
    /*Required*/
    metadata,

    /*Optional*/
    enableEIP6963: true, // true by default
    enableInjected: true, // true by default
    enableCoinbase: true, // true by default
    // rpcUrl: '...', // used for the Coinbase SDK
    defaultChainId: 1 // used for the Coinbase SDK
})

// 5. Create a Web3Modal instance
createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId: WALLET_CONNECT_PROJECT_ID,
    enableAnalytics: true // Optional - defaults to your Cloud configuration
});

