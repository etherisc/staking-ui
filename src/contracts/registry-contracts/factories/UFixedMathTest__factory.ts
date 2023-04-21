/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  UFixedMathTest,
  UFixedMathTestInterface,
} from "../UFixedMathTest";

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
    inputs: [
      {
        internalType: "UFixed",
        name: "a",
        type: "uint256",
      },
      {
        internalType: "UFixed",
        name: "b",
        type: "uint256",
      },
    ],
    name: "add",
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
        internalType: "UFixed",
        name: "b",
        type: "uint256",
      },
    ],
    name: "div",
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
        internalType: "UFixed",
        name: "a",
        type: "uint256",
      },
      {
        internalType: "UFixed",
        name: "b",
        type: "uint256",
      },
    ],
    name: "dlt",
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
        name: "n",
        type: "uint256",
      },
    ],
    name: "epsilon",
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
        internalType: "UFixed",
        name: "a",
        type: "uint256",
      },
      {
        internalType: "UFixed",
        name: "b",
        type: "uint256",
      },
    ],
    name: "eq",
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
        internalType: "UFixed",
        name: "a",
        type: "uint256",
      },
    ],
    name: "eqzUFixed",
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
        internalType: "UFixed",
        name: "a",
        type: "uint256",
      },
      {
        internalType: "UFixed",
        name: "b",
        type: "uint256",
      },
    ],
    name: "gt",
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
        internalType: "UFixed",
        name: "a",
        type: "uint256",
      },
    ],
    name: "gtzUFixed",
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
  {
    inputs: [
      {
        internalType: "UFixed",
        name: "a",
        type: "uint256",
      },
      {
        internalType: "UFixed",
        name: "b",
        type: "uint256",
      },
    ],
    name: "mul",
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
    inputs: [],
    name: "multiplier",
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
        internalType: "UFixed",
        name: "b",
        type: "uint256",
      },
    ],
    name: "sub",
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
    inputs: [],
    name: "testAdd",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "n",
        type: "uint256",
      },
    ],
    name: "testFrac",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "testSub",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610d36806100206000396000f3fe608060405234801561001057600080fd5b506004361061014d5760003560e01c80638f24f601116100c3578063ca61cdac1161007c578063ca61cdac146102a0578063d05b0452146102a8578063d518d578146102bb578063dd45daa1146102ce578063eb646d71146102e1578063f30ed598146102e957600080fd5b80638f24f6011461023957806392ae8ce01461024c578063a391c15b1461025f578063ae40f72f14610272578063b67d77c51461027a578063c8a4ac9c1461028d57600080fd5b8063313ce56711610115578063313ce567146101c657806332148d73146101cd57806336a7617e146101e05780635c0f856114610200578063771602f714610213578063817df4861461022657600080fd5b806303f6d6ea14610152578063059f8b16146101785780631a12cd47146101805780631b3ed7221461019b57806321e5749b146101a3575b600080fd5b6101656101603660046109f2565b6102fe565b6040519081526020015b60405180910390f35b610165610313565b610188601281565b60405160009190910b815260200161016f565b610165610322565b6101b66101b13660046109f2565b610335565b604051901515815260200161016f565b6012610165565b6101b66101db3660046109f2565b61033f565b6101f36101ee366004610a14565b610349565b60405161016f9190610a2d565b6101b661020e366004610a14565b6103f7565b6101656102213660046109f2565b610400565b610165610234366004610a14565b61040c565b610165610247366004610a7b565b610424565b61016561025a366004610a14565b6104c4565b61016561026d3660046109f2565b6104dc565b6101f36104e8565b6101656102883660046109f2565b6105d1565b61016561029b3660046109f2565b6105dd565b6101f36105e9565b6101656102b6366004610a14565b610693565b6101b66102c9366004610a14565b6106a0565b6101656102dc366004610aaf565b6106aa565b610165610799565b6102f1600281565b60405161016f9190610af0565b600061030a83836107b1565b90505b92915050565b61031f6012600a610c12565b81565b60006103306012600a610c12565b905090565b600082821061030a565b600081831461030a565b6060600061036961035a60016104c4565b61036460026104c4565b6107cf565b9050600061038461037a60016104c4565b61036460036104c4565b9050600061039f61039560016104c4565b61036460066104c4565b90506103c46103b7826103b28686610833565b610848565b6103c08761040c565b1190565b6103d0576103d0610c1e565b50506040805180820190915260078152667375636365737360c81b60208201529392505050565b6000811561030d565b600061030a83836108a4565b600061030d61041b60016104c4565b610364846104c4565b6000600282600281111561043a5761043a610ada565b036104805761047960026104506012600a610c12565b61045a9190610c4a565b6104649085610c6c565b60016104726012600a610c12565b60006108b0565b905061030d565b600082600281111561049457610494610ada565b036104ab576104798360016104726012600a610c12565b6104798360016104bd6012600a610c12565b60016108b0565b60006104d26012600a610c12565b61030d9083610c7f565b600061030a83836107cf565b60606105116105056104f861090d565b61050061090d565b6108a4565b61050d61090d565b1490565b61051d5761051d610c1e565b61053b61053361052b61090d565b610500610919565b61050d610919565b61054757610547610c1e565b6105556105336104f8610919565b61056157610561610c1e565b61057761056f61052b610919565b61050d610925565b61058357610583610c1e565b6105a361059b61059360286104c4565b610500610925565b61050d610931565b6105af576105af610c1e565b506040805180820190915260078152667375636365737360c81b602082015290565b600061030a8383610848565b600061030a8383610833565b60606106016105056105f961090d565b6103b261090d565b61060d5761060d610c1e565b61061b6105336105f9610919565b61062757610627610c1e565b61063d610505610635610919565b6103b2610919565b61064957610649610c1e565b61065761056f6105f9610925565b61066357610663610c1e565b610671610533610635610925565b61067d5761067d610c1e565b6105a361050561068b610925565b6103b2610925565b600061030d826002610424565b600081151561030d565b6000806106b8836012610c96565b60000b121561070e5760405162461bcd60e51b815260206004820152601f60248201527f4552524f523a464d2d3031303a4558504f4e454e545f544f4f5f534d414c4c0060448201526064015b60405180910390fd5b61071a60126002610cb7565b60000b610728836012610c96565b60000b13156107795760405162461bcd60e51b815260206004820152601f60248201527f4552524f523a464d2d3031313a4558504f4e454e545f544f4f5f4c41524745006044820152606401610705565b610784826012610c96565b61078f90600a610cde565b61030a9084610c7f565b60026107a76012600a610c12565b61031f9190610c4a565b6000828210156107c5576104798383610848565b61030a8284610848565b60008082116108205760405162461bcd60e51b815260206004820152601a60248201527f4552524f523a55464d2d3032303a44495649534f525f5a45524f0000000000006044820152606401610705565b61030a83670de0b6b3a76400008461093d565b600061030a8383670de0b6b3a764000061093d565b60008282111561089a5760405162461bcd60e51b815260206004820152601d60248201527f4552524f523a55464d2d3031303a4e454741544956455f524553554c540000006044820152606401610705565b61030a8284610ced565b600061030a8284610c6c565b6000806108be86868661093d565b905060018360028111156108d4576108d4610ada565b1480156108f15750600084806108ec576108ec610c34565b868809115b1561090457610901600182610c6c565b90505b95945050505050565b600061033060006104c4565b600061033060016104c4565b600061033060026104c4565b6000610330602a6104c4565b60008080600019858709858702925082811083820303915050806000036109775783828161096d5761096d610c34565b04925050506109eb565b80841161098357600080fd5b600084868809851960019081018716968790049682860381900495909211909303600082900391909104909201919091029190911760038402600290811880860282030280860282030280860282030280860282030280860282030280860290910302029150505b9392505050565b60008060408385031215610a0557600080fd5b50508035926020909101359150565b600060208284031215610a2657600080fd5b5035919050565b600060208083528351808285015260005b81811015610a5a57858101830151858201604001528201610a3e565b506000604082860101526040601f19601f8301168501019250505092915050565b60008060408385031215610a8e57600080fd5b82359150602083013560038110610aa457600080fd5b809150509250929050565b60008060408385031215610ac257600080fd5b8235915060208301358060000b8114610aa457600080fd5b634e487b7160e01b600052602160045260246000fd5b6020810160038310610b1257634e487b7160e01b600052602160045260246000fd5b91905290565b634e487b7160e01b600052601160045260246000fd5b600181815b80851115610b69578160001904821115610b4f57610b4f610b18565b80851615610b5c57918102915b93841c9390800290610b33565b509250929050565b600082610b805750600161030d565b81610b8d5750600061030d565b8160018114610ba35760028114610bad57610bc9565b600191505061030d565b60ff841115610bbe57610bbe610b18565b50506001821b61030d565b5060208310610133831016604e8410600b8410161715610bec575081810a61030d565b610bf68383610b2e565b8060001904821115610c0a57610c0a610b18565b029392505050565b600061030a8383610b71565b634e487b7160e01b600052600160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b600082610c6757634e487b7160e01b600052601260045260246000fd5b500490565b8082018082111561030d5761030d610b18565b808202811582820484141761030d5761030d610b18565b600081810b9083900b01607f8113607f198212171561030d5761030d610b18565b60008260000b8260000b028060000b9150808214610cd757610cd7610b18565b5092915050565b600061030a60ff841683610b71565b8181038181111561030d5761030d610b1856fea264697066735822122045d0f8d5a71613a153951146aa1c7db5a96126d14a6fefa84b986b40ea269e0164736f6c63430008130033";

type UFixedMathTestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UFixedMathTestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UFixedMathTest__factory extends ContractFactory {
  constructor(...args: UFixedMathTestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<UFixedMathTest> {
    return super.deploy(overrides || {}) as Promise<UFixedMathTest>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): UFixedMathTest {
    return super.attach(address) as UFixedMathTest;
  }
  override connect(signer: Signer): UFixedMathTest__factory {
    return super.connect(signer) as UFixedMathTest__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UFixedMathTestInterface {
    return new utils.Interface(_abi) as UFixedMathTestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UFixedMathTest {
    return new Contract(address, _abi, signerOrProvider) as UFixedMathTest;
  }
}
