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
} from "./common";

export declare namespace IVersionable {
  export type VersionInfoStruct = {
    version: PromiseOrValue<BigNumberish>;
    implementation: PromiseOrValue<string>;
    activatedBy: PromiseOrValue<string>;
    activatedIn: PromiseOrValue<BigNumberish>;
    activatedAt: PromiseOrValue<BigNumberish>;
  };

  export type VersionInfoStructOutput = [
    number,
    string,
    string,
    number,
    number
  ] & {
    version: number;
    implementation: string;
    activatedBy: string;
    activatedIn: number;
    activatedAt: number;
  };
}

export interface VersionedOwnableInterface extends utils.Interface {
  functions: {
    "activate(address,address)": FunctionFragment;
    "activateAndSetOwner(address,address,address)": FunctionFragment;
    "blockNumber()": FunctionFragment;
    "getVersion(uint256)": FunctionFragment;
    "getVersionInfo(uint48)": FunctionFragment;
    "intToBytes(uint256,uint8)": FunctionFragment;
    "isActivated(uint48)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "toInt(bytes5)": FunctionFragment;
    "toInt(uint32)": FunctionFragment;
    "toInt(uint40)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "version()": FunctionFragment;
    "versionParts()": FunctionFragment;
    "versions()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "activate"
      | "activateAndSetOwner"
      | "blockNumber"
      | "getVersion"
      | "getVersionInfo"
      | "intToBytes"
      | "isActivated"
      | "owner"
      | "renounceOwnership"
      | "toInt(bytes5)"
      | "toInt(uint32)"
      | "toInt(uint40)"
      | "transferOwnership"
      | "version"
      | "versionParts"
      | "versions"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "activate",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "activateAndSetOwner",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "blockNumber",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getVersion",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getVersionInfo",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "intToBytes",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "isActivated",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "toInt(bytes5)",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "toInt(uint32)",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "toInt(uint40)",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "versionParts",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "versions", values?: undefined): string;

  decodeFunctionResult(functionFragment: "activate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "activateAndSetOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "blockNumber",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getVersion", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getVersionInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "intToBytes", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isActivated",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "toInt(bytes5)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "toInt(uint32)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "toInt(uint40)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "versionParts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "versions", data: BytesLike): Result;

  events: {
    "Initialized(uint8)": EventFragment;
    "LogVersionableActivated(uint48,address,address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogVersionableActivated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface LogVersionableActivatedEventObject {
  version: number;
  implementation: string;
  activatedBy: string;
}
export type LogVersionableActivatedEvent = TypedEvent<
  [number, string, string],
  LogVersionableActivatedEventObject
>;

export type LogVersionableActivatedEventFilter =
  TypedEventFilter<LogVersionableActivatedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface VersionedOwnable extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VersionedOwnableInterface;

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
    activate(
      implementation: PromiseOrValue<string>,
      activatedBy: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    activateAndSetOwner(
      implementation: PromiseOrValue<string>,
      newOwner: PromiseOrValue<string>,
      activatedBy: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    blockNumber(overrides?: CallOverrides): Promise<[number]>;

    getVersion(
      idx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[number]>;

    getVersionInfo(
      _version: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[IVersionable.VersionInfoStructOutput]>;

    intToBytes(
      x: PromiseOrValue<BigNumberish>,
      shift: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    isActivated(
      _version: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "toInt(bytes5)"(
      x: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "toInt(uint32)"(
      x: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "toInt(uint40)"(
      x: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    version(overrides?: CallOverrides): Promise<[number]>;

    versionParts(
      overrides?: CallOverrides
    ): Promise<
      [number, number, number] & { major: number; minor: number; patch: number }
    >;

    versions(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  activate(
    implementation: PromiseOrValue<string>,
    activatedBy: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  activateAndSetOwner(
    implementation: PromiseOrValue<string>,
    newOwner: PromiseOrValue<string>,
    activatedBy: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  blockNumber(overrides?: CallOverrides): Promise<number>;

  getVersion(
    idx: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<number>;

  getVersionInfo(
    _version: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<IVersionable.VersionInfoStructOutput>;

  intToBytes(
    x: PromiseOrValue<BigNumberish>,
    shift: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  isActivated(
    _version: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "toInt(bytes5)"(
    x: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "toInt(uint32)"(
    x: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "toInt(uint40)"(
    x: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  version(overrides?: CallOverrides): Promise<number>;

  versionParts(
    overrides?: CallOverrides
  ): Promise<
    [number, number, number] & { major: number; minor: number; patch: number }
  >;

  versions(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    activate(
      implementation: PromiseOrValue<string>,
      activatedBy: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    activateAndSetOwner(
      implementation: PromiseOrValue<string>,
      newOwner: PromiseOrValue<string>,
      activatedBy: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    blockNumber(overrides?: CallOverrides): Promise<number>;

    getVersion(
      idx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<number>;

    getVersionInfo(
      _version: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<IVersionable.VersionInfoStructOutput>;

    intToBytes(
      x: PromiseOrValue<BigNumberish>,
      shift: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    isActivated(
      _version: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "toInt(bytes5)"(
      x: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "toInt(uint32)"(
      x: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "toInt(uint40)"(
      x: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    version(overrides?: CallOverrides): Promise<number>;

    versionParts(
      overrides?: CallOverrides
    ): Promise<
      [number, number, number] & { major: number; minor: number; patch: number }
    >;

    versions(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "LogVersionableActivated(uint48,address,address)"(
      version?: null,
      implementation?: null,
      activatedBy?: null
    ): LogVersionableActivatedEventFilter;
    LogVersionableActivated(
      version?: null,
      implementation?: null,
      activatedBy?: null
    ): LogVersionableActivatedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    activate(
      implementation: PromiseOrValue<string>,
      activatedBy: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    activateAndSetOwner(
      implementation: PromiseOrValue<string>,
      newOwner: PromiseOrValue<string>,
      activatedBy: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    blockNumber(overrides?: CallOverrides): Promise<BigNumber>;

    getVersion(
      idx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVersionInfo(
      _version: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    intToBytes(
      x: PromiseOrValue<BigNumberish>,
      shift: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isActivated(
      _version: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "toInt(bytes5)"(
      x: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "toInt(uint32)"(
      x: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "toInt(uint40)"(
      x: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    version(overrides?: CallOverrides): Promise<BigNumber>;

    versionParts(overrides?: CallOverrides): Promise<BigNumber>;

    versions(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    activate(
      implementation: PromiseOrValue<string>,
      activatedBy: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    activateAndSetOwner(
      implementation: PromiseOrValue<string>,
      newOwner: PromiseOrValue<string>,
      activatedBy: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    blockNumber(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getVersion(
      idx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVersionInfo(
      _version: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    intToBytes(
      x: PromiseOrValue<BigNumberish>,
      shift: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isActivated(
      _version: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "toInt(bytes5)"(
      x: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "toInt(uint32)"(
      x: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "toInt(uint40)"(
      x: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    version(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    versionParts(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    versions(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
