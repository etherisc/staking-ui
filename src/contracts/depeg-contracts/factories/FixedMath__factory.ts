/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { FixedMath, FixedMathInterface } from "../FixedMath";

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
        internalType: "enum FixedMath.Rounding",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "af",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bf",
        type: "uint256",
      },
    ],
    name: "div",
    outputs: [
      {
        internalType: "uint256",
        name: "a_bf",
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
        name: "af",
        type: "uint256",
      },
      {
        internalType: "enum FixedMath.Rounding",
        name: "rounding",
        type: "uint8",
      },
    ],
    name: "ftoi",
    outputs: [
      {
        internalType: "uint256",
        name: "a",
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
        name: "af",
        type: "uint256",
      },
    ],
    name: "ftoi",
    outputs: [
      {
        internalType: "uint256",
        name: "a",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getMultiplier",
    outputs: [
      {
        internalType: "uint256",
        name: "multiplier",
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
        internalType: "uint256",
        name: "aUFixed",
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
        internalType: "uint256",
        name: "af",
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
        name: "af",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bf",
        type: "uint256",
      },
    ],
    name: "mul",
    outputs: [
      {
        internalType: "uint256",
        name: "abf",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061088e806100206000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c8063a391c15b11610071578063a391c15b14610112578063c8a4ac9c14610125578063d05b045214610138578063dd45daa11461014b578063eb646d711461015e578063f30ed59814610166576100a9565b8063059f8b16146100ae5780631a12cd47146100c957806340490a90146100e45780638f24f601146100ec57806392ae8ce0146100ff575b600080fd5b6100b661017b565b6040519081526020015b60405180910390f35b6100d1601281565b60405160009190910b81526020016100c0565b6100b661018a565b6100b66100fa366004610561565b61019d565b6100b661010d366004610549565b610261565b6100b66101203660046105bb565b610279565b6100b66101333660046105bb565b6102ec565b6100b6610146366004610549565b610304565b6100b6610159366004610593565b610311565b6100b66103fb565b61016e600281565b6040516100c091906105dc565b6101876012600a6106c2565b81565b60006101986012600a6106c2565b905090565b600060028260028111156101c157634e487b7160e01b600052602160045260246000fd5b14156102085761020160026101d86012600a6106c2565b6101e2919061065c565b6101ec9085610644565b60016101fa6012600a6106c2565b6000610413565b905061025b565b600082600281111561022a57634e487b7160e01b600052602160045260246000fd5b1415610242576102018360016101fa6012600a6106c2565b6102018360016102546012600a6106c2565b6001610413565b92915050565b600061026f6012600a6106c2565b61025b9083610823565b60008082116102cf5760405162461bcd60e51b815260206004820152601960248201527f4552524f523a464d2d3032303a44495649534f525f5a45524f0000000000000060448201526064015b60405180910390fd5b6102e5836102df6012600a6106c2565b8461048c565b9392505050565b60006102e583836102ff6012600a6106c2565b61048c565b600061025b82600261019d565b60008061031f836012610604565b60000b12156103705760405162461bcd60e51b815260206004820152601f60248201527f4552524f523a464d2d3031303a4558504f4e454e545f544f4f5f534d414c4c0060448201526064016102c6565b61037c601260026107a3565b60000b61038a836012610604565b60000b13156103db5760405162461bcd60e51b815260206004820152601f60248201527f4552524f523a464d2d3031313a4558504f4e454e545f544f4f5f4c415247450060448201526064016102c6565b6103e6826012610604565b6103f190600a6106d1565b6102e59084610823565b60026104096012600a6106c2565b610187919061065c565b60008061042186868661048c565b9050600183600281111561044557634e487b7160e01b600052602160045260246000fd5b14801561047057506000848061046b57634e487b7160e01b600052601260045260246000fd5b868809115b1561048357610480600182610644565b90505b95945050505050565b6000808060001985870985870292508281108382030391505080600014156104d5578382816104cb57634e487b7160e01b600052601260045260246000fd5b04925050506102e5565b8084116104e157600080fd5b600084868809600260036001881981018916988990049182028318808302840302808302840302808302840302808302840302808302840302918202909203026000889003889004909101858311909403939093029303949094049190911702949350505050565b60006020828403121561055a578081fd5b5035919050565b60008060408385031215610573578081fd5b82359150602083013560038110610588578182fd5b809150509250929050565b600080604083850312156105a5578182fd5b82359150602083013580820b8114610588578182fd5b600080604083850312156105cd578182fd5b50508035926020909101359150565b60208101600383106105fe57634e487b7160e01b600052602160045260246000fd5b91905290565b600081810b83820b82821282607f0382138115161561062557610625610842565b82607f1903821281161561063b5761063b610842565b50019392505050565b6000821982111561065757610657610842565b500190565b60008261067757634e487b7160e01b81526012600452602481fd5b500490565b80825b600180861161068e57506106b9565b8187048211156106a0576106a0610842565b808616156106ad57918102915b9490941c93800261067f565b94509492505050565b60006102e560001984846106df565b60006102e560001960ff8516845b6000826106ee575060016102e5565b816106fb575060006102e5565b8160018114610711576002811461071b57610748565b60019150506102e5565b60ff84111561072c5761072c610842565b6001841b91508482111561074257610742610842565b506102e5565b5060208310610133831016604e8410600b841016171561077b575081810a8381111561077657610776610842565b6102e5565b610788848484600161067c565b80860482111561079a5761079a610842565b02949350505050565b600081810b83820b82811383831382607f04841182821616156107c8576107c8610842565b607f19858412828116868305861216156107e4576107e4610842565b8686129250848205861284841616156107ff576107ff610842565b84607f058612818416161561081657610816610842565b5050509102949350505050565b600081600019048311821515161561083d5761083d610842565b500290565b634e487b7160e01b600052601160045260246000fdfea2646970667358221220b86db2a3e3956a59d542d71739379d94c17420fccb5b4e6d517a4a9a8325d73264736f6c63430008020033";

type FixedMathConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FixedMathConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FixedMath__factory extends ContractFactory {
  constructor(...args: FixedMathConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<FixedMath> {
    return super.deploy(overrides || {}) as Promise<FixedMath>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): FixedMath {
    return super.attach(address) as FixedMath;
  }
  override connect(signer: Signer): FixedMath__factory {
    return super.connect(signer) as FixedMath__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FixedMathInterface {
    return new utils.Interface(_abi) as FixedMathInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FixedMath {
    return new Contract(address, _abi, signerOrProvider) as FixedMath;
  }
}
