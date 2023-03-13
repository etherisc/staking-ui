/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { UFixedType, UFixedTypeInterface } from "../UFixedType";

const _abi = [
  {
    inputs: [],
    name: "EXP",
    outputs: [
      {
        internalType: "int8",
        name: "",
        type: "int8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MULTIPLIER",
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
    name: "MULTIPLIER_HALF",
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
    name: "ROUNDING_DEFAULT",
    outputs: [
      {
        internalType: "enum UFixedType.Rounding",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "UFixed",
        name: "a",
        type: "uint256",
      },
      {
        internalType: "enum UFixedType.Rounding",
        name: "rounding",
        type: "uint8",
      },
    ],
    name: "ftoi",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "UFixed",
        name: "a",
        type: "uint256",
      },
    ],
    name: "ftoi",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "a",
        type: "uint256",
      },
    ],
    name: "itof",
    outputs: [
      {
        internalType: "UFixed",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "a",
        type: "uint256",
      },
      {
        internalType: "int8",
        name: "exp",
        type: "int8",
      },
    ],
    name: "itof",
    outputs: [
      {
        internalType: "UFixed",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506106dc806100206000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c806392ae8ce01161006657806392ae8ce0146100e8578063d05b0452146100fb578063dd45daa11461010e578063eb646d7114610121578063f30ed5981461012957600080fd5b8063059f8b16146100985780631a12cd47146100b3578063313ce567146100ce5780638f24f601146100d5575b600080fd5b6100a061013e565b6040519081526020015b60405180910390f35b6100bb601281565b60405160009190910b81526020016100aa565b60126100a0565b6100a06100e3366004610431565b61014d565b6100a06100f6366004610465565b6101f3565b6100a0610109366004610465565b61020b565b6100a061011c36600461047e565b610218565b6100a061030e565b610131600281565b6040516100aa91906104bf565b61014a6012600a6105e1565b81565b60006002826002811115610163576101636104a9565b036101a9576101a260026101796012600a6105e1565b6101839190610603565b61018d9085610625565b600161019b6012600a6105e1565b6000610326565b90506101ed565b60008260028111156101bd576101bd6104a9565b036101d4576101a283600161019b6012600a6105e1565b6101a28360016101e66012600a6105e1565b6001610326565b92915050565b60006102016012600a6105e1565b6101ed9083610638565b60006101ed82600261014d565b60008061022683601261064f565b60000b121561027c5760405162461bcd60e51b815260206004820152601f60248201527f4552524f523a464d2d3031303a4558504f4e454e545f544f4f5f534d414c4c0060448201526064015b60405180910390fd5b61028860126002610670565b60000b61029683601261064f565b60000b13156102e75760405162461bcd60e51b815260206004820152601f60248201527f4552524f523a464d2d3031313a4558504f4e454e545f544f4f5f4c41524745006044820152606401610273565b6102f282601261064f565b6102fd90600a610697565b6103079084610638565b9392505050565b600261031c6012600a6105e1565b61014a9190610603565b600080610334868686610383565b9050600183600281111561034a5761034a6104a9565b148015610367575060008480610362576103626105ed565b868809115b1561037a57610377600182610625565b90505b95945050505050565b60008080600019858709858702925082811083820303915050806000036103bd578382816103b3576103b36105ed565b0492505050610307565b8084116103c957600080fd5b600084868809600260036001881981018916988990049182028318808302840302808302840302808302840302808302840302808302840302918202909203026000889003889004909101858311909403939093029303949094049190911702949350505050565b6000806040838503121561044457600080fd5b8235915060208301356003811061045a57600080fd5b809150509250929050565b60006020828403121561047757600080fd5b5035919050565b6000806040838503121561049157600080fd5b8235915060208301358060000b811461045a57600080fd5b634e487b7160e01b600052602160045260246000fd5b60208101600383106104e157634e487b7160e01b600052602160045260246000fd5b91905290565b634e487b7160e01b600052601160045260246000fd5b600181815b8085111561053857816000190482111561051e5761051e6104e7565b8085161561052b57918102915b93841c9390800290610502565b509250929050565b60008261054f575060016101ed565b8161055c575060006101ed565b8160018114610572576002811461057c57610598565b60019150506101ed565b60ff84111561058d5761058d6104e7565b50506001821b6101ed565b5060208310610133831016604e8410600b84101617156105bb575081810a6101ed565b6105c583836104fd565b80600019048211156105d9576105d96104e7565b029392505050565b60006103078383610540565b634e487b7160e01b600052601260045260246000fd5b60008261062057634e487b7160e01b600052601260045260246000fd5b500490565b808201808211156101ed576101ed6104e7565b80820281158282048414176101ed576101ed6104e7565b600081810b9083900b01607f8113607f19821217156101ed576101ed6104e7565b60008260000b8260000b028060000b9150808214610690576106906104e7565b5092915050565b600061030760ff84168361054056fea26469706673582212209091edad1007263a1dc93d33d882a3064ae7645cb5f16e18f528be98770c798164736f6c63430008130033";

type UFixedTypeConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UFixedTypeConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UFixedType__factory extends ContractFactory {
  constructor(...args: UFixedTypeConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<UFixedType> {
    return super.deploy(overrides || {}) as Promise<UFixedType>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): UFixedType {
    return super.attach(address) as UFixedType;
  }
  override connect(signer: Signer): UFixedType__factory {
    return super.connect(signer) as UFixedType__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UFixedTypeInterface {
    return new utils.Interface(_abi) as UFixedTypeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UFixedType {
    return new Contract(address, _abi, signerOrProvider) as UFixedType;
  }
}