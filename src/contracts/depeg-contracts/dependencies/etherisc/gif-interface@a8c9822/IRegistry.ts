/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export interface IRegistryInterface extends utils.Interface {
  functions: {
    "contractName(uint256)": FunctionFragment;
    "contracts()": FunctionFragment;
    "deregister(bytes32)": FunctionFragment;
    "deregisterInRelease(bytes32,bytes32)": FunctionFragment;
    "ensureSender(address,bytes32)": FunctionFragment;
    "getContract(bytes32)": FunctionFragment;
    "getContractInRelease(bytes32,bytes32)": FunctionFragment;
    "getRelease()": FunctionFragment;
    "prepareRelease(bytes32)": FunctionFragment;
    "register(bytes32,address)": FunctionFragment;
    "registerInRelease(bytes32,bytes32,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "contractName"
      | "contracts"
      | "deregister"
      | "deregisterInRelease"
      | "ensureSender"
      | "getContract"
      | "getContractInRelease"
      | "getRelease"
      | "prepareRelease"
      | "register"
      | "registerInRelease"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "contractName",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "contracts", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "deregister",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "deregisterInRelease",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "ensureSender",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getContract",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getContractInRelease",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRelease",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "prepareRelease",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "register",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerInRelease",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "contractName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "contracts", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deregister", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deregisterInRelease",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ensureSender",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getContractInRelease",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getRelease", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "prepareRelease",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "register", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "registerInRelease",
    data: BytesLike
  ): Result;

  events: {
    "LogContractDeregistered(bytes32,bytes32)": EventFragment;
    "LogContractRegistered(bytes32,bytes32,address,bool)": EventFragment;
    "LogReleasePrepared(bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "LogContractDeregistered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogContractRegistered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogReleasePrepared"): EventFragment;
}

export interface LogContractDeregisteredEventObject {
  release: string;
  contractName: string;
}
export type LogContractDeregisteredEvent = TypedEvent<
  [string, string],
  LogContractDeregisteredEventObject
>;

export type LogContractDeregisteredEventFilter =
  TypedEventFilter<LogContractDeregisteredEvent>;

export interface LogContractRegisteredEventObject {
  release: string;
  contractName: string;
  contractAddress: string;
  isNew: boolean;
}
export type LogContractRegisteredEvent = TypedEvent<
  [string, string, string, boolean],
  LogContractRegisteredEventObject
>;

export type LogContractRegisteredEventFilter =
  TypedEventFilter<LogContractRegisteredEvent>;

export interface LogReleasePreparedEventObject {
  release: string;
}
export type LogReleasePreparedEvent = TypedEvent<
  [string],
  LogReleasePreparedEventObject
>;

export type LogReleasePreparedEventFilter =
  TypedEventFilter<LogReleasePreparedEvent>;

export interface IRegistry extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IRegistryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    contractName(
      idx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string] & { _contractName: string }>;

    contracts(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { _numberOfContracts: BigNumber }>;

    deregister(
      _contractName: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    deregisterInRelease(
      _release: PromiseOrValue<BytesLike>,
      _contractName: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    ensureSender(
      sender: PromiseOrValue<string>,
      _contractName: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean] & { _senderMatches: boolean }>;

    getContract(
      _contractName: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string] & { _contractAddress: string }>;

    getContractInRelease(
      _release: PromiseOrValue<BytesLike>,
      _contractName: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string] & { _contractAddress: string }>;

    getRelease(
      overrides?: CallOverrides
    ): Promise<[string] & { _release: string }>;

    prepareRelease(
      _newRelease: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    register(
      _contractName: PromiseOrValue<BytesLike>,
      _contractAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registerInRelease(
      _release: PromiseOrValue<BytesLike>,
      _contractName: PromiseOrValue<BytesLike>,
      _contractAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  contractName(
    idx: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  contracts(overrides?: CallOverrides): Promise<BigNumber>;

  deregister(
    _contractName: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  deregisterInRelease(
    _release: PromiseOrValue<BytesLike>,
    _contractName: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  ensureSender(
    sender: PromiseOrValue<string>,
    _contractName: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getContract(
    _contractName: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  getContractInRelease(
    _release: PromiseOrValue<BytesLike>,
    _contractName: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  getRelease(overrides?: CallOverrides): Promise<string>;

  prepareRelease(
    _newRelease: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  register(
    _contractName: PromiseOrValue<BytesLike>,
    _contractAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registerInRelease(
    _release: PromiseOrValue<BytesLike>,
    _contractName: PromiseOrValue<BytesLike>,
    _contractAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    contractName(
      idx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    contracts(overrides?: CallOverrides): Promise<BigNumber>;

    deregister(
      _contractName: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    deregisterInRelease(
      _release: PromiseOrValue<BytesLike>,
      _contractName: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    ensureSender(
      sender: PromiseOrValue<string>,
      _contractName: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getContract(
      _contractName: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    getContractInRelease(
      _release: PromiseOrValue<BytesLike>,
      _contractName: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    getRelease(overrides?: CallOverrides): Promise<string>;

    prepareRelease(
      _newRelease: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    register(
      _contractName: PromiseOrValue<BytesLike>,
      _contractAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    registerInRelease(
      _release: PromiseOrValue<BytesLike>,
      _contractName: PromiseOrValue<BytesLike>,
      _contractAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "LogContractDeregistered(bytes32,bytes32)"(
      release?: null,
      contractName?: null
    ): LogContractDeregisteredEventFilter;
    LogContractDeregistered(
      release?: null,
      contractName?: null
    ): LogContractDeregisteredEventFilter;

    "LogContractRegistered(bytes32,bytes32,address,bool)"(
      release?: null,
      contractName?: null,
      contractAddress?: null,
      isNew?: null
    ): LogContractRegisteredEventFilter;
    LogContractRegistered(
      release?: null,
      contractName?: null,
      contractAddress?: null,
      isNew?: null
    ): LogContractRegisteredEventFilter;

    "LogReleasePrepared(bytes32)"(
      release?: null
    ): LogReleasePreparedEventFilter;
    LogReleasePrepared(release?: null): LogReleasePreparedEventFilter;
  };

  estimateGas: {
    contractName(
      idx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    contracts(overrides?: CallOverrides): Promise<BigNumber>;

    deregister(
      _contractName: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    deregisterInRelease(
      _release: PromiseOrValue<BytesLike>,
      _contractName: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    ensureSender(
      sender: PromiseOrValue<string>,
      _contractName: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getContract(
      _contractName: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getContractInRelease(
      _release: PromiseOrValue<BytesLike>,
      _contractName: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRelease(overrides?: CallOverrides): Promise<BigNumber>;

    prepareRelease(
      _newRelease: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    register(
      _contractName: PromiseOrValue<BytesLike>,
      _contractAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registerInRelease(
      _release: PromiseOrValue<BytesLike>,
      _contractName: PromiseOrValue<BytesLike>,
      _contractAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    contractName(
      idx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    contracts(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deregister(
      _contractName: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    deregisterInRelease(
      _release: PromiseOrValue<BytesLike>,
      _contractName: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    ensureSender(
      sender: PromiseOrValue<string>,
      _contractName: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getContract(
      _contractName: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getContractInRelease(
      _release: PromiseOrValue<BytesLike>,
      _contractName: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRelease(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    prepareRelease(
      _newRelease: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    register(
      _contractName: PromiseOrValue<BytesLike>,
      _contractAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registerInRelease(
      _release: PromiseOrValue<BytesLike>,
      _contractName: PromiseOrValue<BytesLike>,
      _contractAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
