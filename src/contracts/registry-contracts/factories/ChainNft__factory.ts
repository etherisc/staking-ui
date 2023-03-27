/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { ChainNft, ChainNftInterface } from "../ChainNft";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "registry",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "NAME",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SYMBOL",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "exists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRegistry",
    outputs: [
      {
        internalType: "contract IChainRegistry",
        name: "registry",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "implementsIChainNft",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "setURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalMinted",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200216b3803806200216b833981016040819052620000349162000187565b60405180606001604052806029815260200162002142602991396040805180820190915260048152632224a82960e11b602082015260006200007783826200025e565b5060016200008682826200025e565b5050506001600160a01b038116620000e45760405162461bcd60e51b815260206004820152601b60248201527f4552524f523a4352472d3031303a52454749535452595f5a45524f0000000000604482015260640160405180910390fd5b600a80546001600160a01b0319166001600160a01b03831617905546600c819055620001109062000153565b600d8190556200012290600a6200043f565b600e556001461480620001355750466005145b1562000146576001600f556200014c565b6002600f555b506200048c565b60005b811562000182578062000169816200044d565b91506200017a9050600a8362000469565b915062000156565b919050565b6000602082840312156200019a57600080fd5b81516001600160a01b0381168114620001b257600080fd5b9392505050565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680620001e457607f821691505b6020821081036200020557634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200025957600081815260208120601f850160051c81016020861015620002345750805b601f850160051c820191505b81811015620002555782815560010162000240565b5050505b505050565b81516001600160401b038111156200027a576200027a620001b9565b62000292816200028b8454620001cf565b846200020b565b602080601f831160018114620002ca5760008415620002b15750858301515b600019600386901b1c1916600185901b17855562000255565b600085815260208120601f198616915b82811015620002fb57888601518255948401946001909101908401620002da565b50858210156200031a5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b600181815b80851115620003815781600019048211156200036557620003656200032a565b808516156200037357918102915b93841c939080029062000345565b509250929050565b6000826200039a5750600162000439565b81620003a95750600062000439565b8160018114620003c25760028114620003cd57620003ed565b600191505062000439565b60ff841115620003e157620003e16200032a565b50506001821b62000439565b5060208310610133831016604e8410600b841016171562000412575081810a62000439565b6200041e838362000340565b80600019048211156200043557620004356200032a565b0290505b92915050565b6000620001b2838362000389565b6000600182016200046257620004626200032a565b5060010190565b6000826200048757634e487b7160e01b600052601260045260246000fd5b500490565b611ca6806200049c6000396000f3fe608060405234801561001057600080fd5b50600436106101735760003560e01c80636352211e116100de578063a2309ff811610097578063c87b56dd11610071578063c87b56dd14610308578063d0def5211461031b578063e985e9c51461032e578063f76f8d781461036a57600080fd5b8063a2309ff8146102e5578063a3f4df7e146102ed578063b88d4fde146102f557600080fd5b80636352211e1461028a5780636701e8711461029d57806370a08231146102a4578063862440e2146102b757806395d89b41146102ca578063a22cb465146102d257600080fd5b80632f745c59116101305780632f745c591461021a57806342842e0e1461022d57806342966c68146102405780634f558e79146102535780634f6ccce7146102665780635ab1bd531461027957600080fd5b806301ffc9a71461017857806306fdde03146101a0578063081812fc146101b5578063095ea7b3146101e057806318160ddd146101f557806323b872dd14610207575b600080fd5b61018b61018636600461159f565b61038d565b60405190151581526020015b60405180910390f35b6101a86103b8565b6040516101979190611609565b6101c86101c336600461161c565b61044a565b6040516001600160a01b039091168152602001610197565b6101f36101ee366004611651565b610471565b005b6008545b604051908152602001610197565b6101f361021536600461167b565b61058b565b6101f9610228366004611651565b6105bc565b6101f361023b36600461167b565b610652565b6101f361024e36600461161c565b61066d565b61018b61026136600461161c565b6106c3565b6101f961027436600461161c565b6106e2565b600a546001600160a01b03166101c8565b6101c861029836600461161c565b610775565b600161018b565b6101f96102b23660046116b7565b6107d5565b6101f36102c536600461177e565b61085b565b6101a86108f7565b6101f36102e03660046117c5565b610906565b6010546101f9565b6101a8610915565b6101f3610303366004611801565b610931565b6101a861031636600461161c565b610969565b6101f961032936600461187d565b610a12565b61018b61033c3660046118b5565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6101a8604051806040016040528060048152602001632224a82960e11b81525081565b60006001600160e01b0319821663780e9d6360e01b14806103b257506103b282610a8e565b92915050565b6060600080546103c7906118e8565b80601f01602080910402602001604051908101604052809291908181526020018280546103f3906118e8565b80156104405780601f1061041557610100808354040283529160200191610440565b820191906000526020600020905b81548152906001019060200180831161042357829003601f168201915b5050505050905090565b600061045582610ade565b506000908152600460205260409020546001600160a01b031690565b600061047c82610775565b9050806001600160a01b0316836001600160a01b0316036104ee5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b038216148061050a575061050a813361033c565b61057c5760405162461bcd60e51b815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c00000060648201526084016104e5565b6105868383610b3d565b505050565b6105953382610bab565b6105b15760405162461bcd60e51b81526004016104e590611922565b610586838383610c2a565b60006105c7836107d5565b82106106295760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b60648201526084016104e5565b506001600160a01b03919091166000908152600660209081526040808320938352929052205490565b61058683838360405180602001604052806000815250610931565b600a546001600160a01b031633146106975760405162461bcd60e51b81526004016104e59061196f565b6106a081610ade565b6106a981610d9b565b6000818152600b602052604081206106c09161153b565b50565b6000818152600260205260408120546001600160a01b031615156103b2565b60006106ed60085490565b82106107505760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201526b7574206f6620626f756e647360a01b60648201526084016104e5565b60088281548110610763576107636119b0565b90600052602060002001549050919050565b6000818152600260205260408120546001600160a01b0316806103b25760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016104e5565b60006001600160a01b03821661083f5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b60648201526084016104e5565b506001600160a01b031660009081526003602052604090205490565b600a546001600160a01b031633146108855760405162461bcd60e51b81526004016104e59061196f565b60008151116108d65760405162461bcd60e51b815260206004820152601760248201527f4552524f523a4352472d3031313a5552495f454d50545900000000000000000060448201526064016104e5565b6108df82610ade565b6000828152600b602052604090206105868282611a14565b6060600180546103c7906118e8565b610911338383610e3e565b5050565b604051806060016040528060298152602001611c486029913981565b61093b3383610bab565b6109575760405162461bcd60e51b81526004016104e590611922565b61096384848484610f0c565b50505050565b606061097482610ade565b6000828152600b60205260409020805461098d906118e8565b80601f01602080910402602001604051908101604052809291908181526020018280546109b9906118e8565b8015610a065780601f106109db57610100808354040283529160200191610a06565b820191906000526020600020905b8154815290600101906020018083116109e957829003601f168201915b50505050509050919050565b600a546000906001600160a01b03163314610a3f5760405162461bcd60e51b81526004016104e59061196f565b610a47610f3f565b601080549192506000610a5983611aea565b9190505550610a688382610f90565b8151156103b2576000818152600b60205260409020610a878382611a14565b5092915050565b60006001600160e01b031982166380ac58cd60e01b1480610abf57506001600160e01b03198216635b5e139f60e01b145b806103b257506301ffc9a760e01b6001600160e01b03198316146103b2565b6000818152600260205260409020546001600160a01b03166106c05760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016104e5565b600081815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610b7282610775565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610bb783610775565b9050806001600160a01b0316846001600160a01b03161480610bfe57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b80610c225750836001600160a01b0316610c178461044a565b6001600160a01b0316145b949350505050565b826001600160a01b0316610c3d82610775565b6001600160a01b031614610c635760405162461bcd60e51b81526004016104e590611b03565b6001600160a01b038216610cc55760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016104e5565b610cd28383836001610faa565b826001600160a01b0316610ce582610775565b6001600160a01b031614610d0b5760405162461bcd60e51b81526004016104e590611b03565b600081815260046020908152604080832080546001600160a01b03199081169091556001600160a01b0387811680865260038552838620805460001901905590871680865283862080546001019055868652600290945282852080549092168417909155905184937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6000610da682610775565b9050610db6816000846001610faa565b610dbf82610775565b600083815260046020908152604080832080546001600160a01b03199081169091556001600160a01b0385168085526003845282852080546000190190558785526002909352818420805490911690555192935084927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b816001600160a01b0316836001600160a01b031603610e9f5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016104e5565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610f17848484610c2a565b610f23848484846110de565b6109635760405162461bcd60e51b81526004016104e590611b48565b6000600d54600c54600e54600f54610f579190611b9a565b610f619190611bb1565b610f6c906064611b9a565b610f769190611bb1565b600f80549192506000610f8883611aea565b919050555090565b6109118282604051806020016040528060008152506111df565b60018111156110195760405162461bcd60e51b815260206004820152603560248201527f455243373231456e756d657261626c653a20636f6e7365637574697665207472604482015274185b9cd9995c9cc81b9bdd081cdd5c1c1bdc9d1959605a1b60648201526084016104e5565b816001600160a01b0385166110755761107081600880546000838152600960205260408120829055600182018355919091527ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee30155565b611098565b836001600160a01b0316856001600160a01b031614611098576110988582611212565b6001600160a01b0384166110b4576110af816112af565b6110d7565b846001600160a01b0316846001600160a01b0316146110d7576110d7848261135e565b5050505050565b60006001600160a01b0384163b156111d457604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290611122903390899088908890600401611bc4565b6020604051808303816000875af192505050801561115d575060408051601f3d908101601f1916820190925261115a91810190611c01565b60015b6111ba573d80801561118b576040519150601f19603f3d011682016040523d82523d6000602084013e611190565b606091505b5080516000036111b25760405162461bcd60e51b81526004016104e590611b48565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610c22565b506001949350505050565b6111e983836113a2565b6111f660008484846110de565b6105865760405162461bcd60e51b81526004016104e590611b48565b6000600161121f846107d5565b6112299190611c1e565b60008381526007602052604090205490915080821461127c576001600160a01b03841660009081526006602090815260408083208584528252808320548484528184208190558352600790915290208190555b5060009182526007602090815260408084208490556001600160a01b039094168352600681528383209183525290812055565b6008546000906112c190600190611c1e565b600083815260096020526040812054600880549394509092849081106112e9576112e96119b0565b90600052602060002001549050806008838154811061130a5761130a6119b0565b600091825260208083209091019290925582815260099091526040808220849055858252812055600880548061134257611342611c31565b6001900381819060005260206000200160009055905550505050565b6000611369836107d5565b6001600160a01b039093166000908152600660209081526040808320868452825280832085905593825260079052919091209190915550565b6001600160a01b0382166113f85760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016104e5565b6000818152600260205260409020546001600160a01b03161561145d5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016104e5565b61146b600083836001610faa565b6000818152600260205260409020546001600160a01b0316156114d05760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016104e5565b6001600160a01b038216600081815260036020908152604080832080546001019055848352600290915280822080546001600160a01b0319168417905551839291907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b508054611547906118e8565b6000825580601f10611557575050565b601f0160209004906000526020600020908101906106c091905b808211156115855760008155600101611571565b5090565b6001600160e01b0319811681146106c057600080fd5b6000602082840312156115b157600080fd5b81356115bc81611589565b9392505050565b6000815180845260005b818110156115e9576020818501810151868301820152016115cd565b506000602082860101526020601f19601f83011685010191505092915050565b6020815260006115bc60208301846115c3565b60006020828403121561162e57600080fd5b5035919050565b80356001600160a01b038116811461164c57600080fd5b919050565b6000806040838503121561166457600080fd5b61166d83611635565b946020939093013593505050565b60008060006060848603121561169057600080fd5b61169984611635565b92506116a760208501611635565b9150604084013590509250925092565b6000602082840312156116c957600080fd5b6115bc82611635565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff80841115611703576117036116d2565b604051601f8501601f19908116603f0116810190828211818310171561172b5761172b6116d2565b8160405280935085815286868601111561174457600080fd5b858560208301376000602087830101525050509392505050565b600082601f83011261176f57600080fd5b6115bc838335602085016116e8565b6000806040838503121561179157600080fd5b82359150602083013567ffffffffffffffff8111156117af57600080fd5b6117bb8582860161175e565b9150509250929050565b600080604083850312156117d857600080fd5b6117e183611635565b9150602083013580151581146117f657600080fd5b809150509250929050565b6000806000806080858703121561181757600080fd5b61182085611635565b935061182e60208601611635565b925060408501359150606085013567ffffffffffffffff81111561185157600080fd5b8501601f8101871361186257600080fd5b611871878235602084016116e8565b91505092959194509250565b6000806040838503121561189057600080fd5b61189983611635565b9150602083013567ffffffffffffffff8111156117af57600080fd5b600080604083850312156118c857600080fd5b6118d183611635565b91506118df60208401611635565b90509250929050565b600181811c908216806118fc57607f821691505b60208210810361191c57634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602d908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526c1c881bdc88185c1c1c9bdd9959609a1b606082015260800190565b60208082526021908201527f4552524f523a4352472d3030313a43414c4c45525f4e4f545f524547495354526040820152605960f81b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b601f82111561058657600081815260208120601f850160051c810160208610156119ed5750805b601f850160051c820191505b81811015611a0c578281556001016119f9565b505050505050565b815167ffffffffffffffff811115611a2e57611a2e6116d2565b611a4281611a3c84546118e8565b846119c6565b602080601f831160018114611a775760008415611a5f5750858301515b600019600386901b1c1916600185901b178555611a0c565b600085815260208120601f198616915b82811015611aa657888601518255948401946001909101908401611a87565b5085821015611ac45787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b600060018201611afc57611afc611ad4565b5060010190565b60208082526025908201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060408201526437bbb732b960d91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b80820281158282048414176103b2576103b2611ad4565b808201808211156103b2576103b2611ad4565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090611bf7908301846115c3565b9695505050505050565b600060208284031215611c1357600080fd5b81516115bc81611589565b818103818111156103b2576103b2611ad4565b634e487b7160e01b600052603160045260246000fdfe44657a656e7472616c697a656420496e737572616e63652050726f746f636f6c205265676973747279a2646970667358221220daf6be5dc3a7479634a0e67059ce7dfbc31b11079ccdd2960b084e4a6c7761b564736f6c6343000813003344657a656e7472616c697a656420496e737572616e63652050726f746f636f6c205265676973747279";

type ChainNftConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ChainNftConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ChainNft__factory extends ContractFactory {
  constructor(...args: ChainNftConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    registry: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ChainNft> {
    return super.deploy(registry, overrides || {}) as Promise<ChainNft>;
  }
  override getDeployTransaction(
    registry: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(registry, overrides || {});
  }
  override attach(address: string): ChainNft {
    return super.attach(address) as ChainNft;
  }
  override connect(signer: Signer): ChainNft__factory {
    return super.connect(signer) as ChainNft__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ChainNftInterface {
    return new utils.Interface(_abi) as ChainNftInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ChainNft {
    return new Contract(address, _abi, signerOrProvider) as ChainNft;
  }
}
