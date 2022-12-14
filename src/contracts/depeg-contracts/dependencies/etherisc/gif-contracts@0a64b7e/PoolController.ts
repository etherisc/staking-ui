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

export declare namespace IPool {
  export type PoolStruct = {
    id: PromiseOrValue<BigNumberish>;
    wallet: PromiseOrValue<string>;
    erc20Token: PromiseOrValue<string>;
    collateralizationLevel: PromiseOrValue<BigNumberish>;
    sumOfSumInsuredCap: PromiseOrValue<BigNumberish>;
    sumOfSumInsuredAtRisk: PromiseOrValue<BigNumberish>;
    capital: PromiseOrValue<BigNumberish>;
    lockedCapital: PromiseOrValue<BigNumberish>;
    balance: PromiseOrValue<BigNumberish>;
    createdAt: PromiseOrValue<BigNumberish>;
    updatedAt: PromiseOrValue<BigNumberish>;
  };

  export type PoolStructOutput = [
    BigNumber,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    id: BigNumber;
    wallet: string;
    erc20Token: string;
    collateralizationLevel: BigNumber;
    sumOfSumInsuredCap: BigNumber;
    sumOfSumInsuredAtRisk: BigNumber;
    capital: BigNumber;
    lockedCapital: BigNumber;
    balance: BigNumber;
    createdAt: BigNumber;
    updatedAt: BigNumber;
  };
}

export interface PoolControllerInterface extends utils.Interface {
  functions: {
    "COLLATERALIZATION_LEVEL_CAP()": FunctionFragment;
    "DEFAULT_MAX_NUMBER_OF_ACTIVE_BUNDLES()": FunctionFragment;
    "FULL_COLLATERALIZATION_LEVEL()": FunctionFragment;
    "activeBundles(uint256)": FunctionFragment;
    "addBundleIdToActiveSet(uint256,uint256)": FunctionFragment;
    "calculateCollateral(uint256,uint256)": FunctionFragment;
    "defund(uint256,uint256)": FunctionFragment;
    "fund(uint256,uint256)": FunctionFragment;
    "getActiveBundleId(uint256,uint256)": FunctionFragment;
    "getFullCollateralizationLevel()": FunctionFragment;
    "getMaximumNumberOfActiveBundles(uint256)": FunctionFragment;
    "getRiskPoolForProduct(uint256)": FunctionFragment;
    "getRiskpool(uint256)": FunctionFragment;
    "initialize(address)": FunctionFragment;
    "processPayout(bytes32,uint256)": FunctionFragment;
    "processPremium(bytes32,uint256)": FunctionFragment;
    "registerRiskpool(uint256,address,address,uint256,uint256)": FunctionFragment;
    "release(bytes32)": FunctionFragment;
    "removeBundleIdFromActiveSet(uint256,uint256)": FunctionFragment;
    "riskpools()": FunctionFragment;
    "setMaximumNumberOfActiveBundles(uint256,uint256)": FunctionFragment;
    "setRiskpoolForProduct(uint256,uint256)": FunctionFragment;
    "underwrite(bytes32)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "COLLATERALIZATION_LEVEL_CAP"
      | "DEFAULT_MAX_NUMBER_OF_ACTIVE_BUNDLES"
      | "FULL_COLLATERALIZATION_LEVEL"
      | "activeBundles"
      | "addBundleIdToActiveSet"
      | "calculateCollateral"
      | "defund"
      | "fund"
      | "getActiveBundleId"
      | "getFullCollateralizationLevel"
      | "getMaximumNumberOfActiveBundles"
      | "getRiskPoolForProduct"
      | "getRiskpool"
      | "initialize"
      | "processPayout"
      | "processPremium"
      | "registerRiskpool"
      | "release"
      | "removeBundleIdFromActiveSet"
      | "riskpools"
      | "setMaximumNumberOfActiveBundles"
      | "setRiskpoolForProduct"
      | "underwrite"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "COLLATERALIZATION_LEVEL_CAP",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "DEFAULT_MAX_NUMBER_OF_ACTIVE_BUNDLES",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "FULL_COLLATERALIZATION_LEVEL",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "activeBundles",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "addBundleIdToActiveSet",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateCollateral",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "defund",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "fund",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getActiveBundleId",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getFullCollateralizationLevel",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getMaximumNumberOfActiveBundles",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRiskPoolForProduct",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRiskpool",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "processPayout",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "processPremium",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerRiskpool",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "release",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "removeBundleIdFromActiveSet",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "riskpools", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setMaximumNumberOfActiveBundles",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setRiskpoolForProduct",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "underwrite",
    values: [PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(
    functionFragment: "COLLATERALIZATION_LEVEL_CAP",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "DEFAULT_MAX_NUMBER_OF_ACTIVE_BUNDLES",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "FULL_COLLATERALIZATION_LEVEL",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "activeBundles",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addBundleIdToActiveSet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "defund", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fund", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getActiveBundleId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFullCollateralizationLevel",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMaximumNumberOfActiveBundles",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRiskPoolForProduct",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRiskpool",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "processPayout",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "processPremium",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerRiskpool",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "release", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeBundleIdFromActiveSet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "riskpools", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setMaximumNumberOfActiveBundles",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRiskpoolForProduct",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "underwrite", data: BytesLike): Result;

  events: {
    "Initialized(uint8)": EventFragment;
    "LogRiskpoolCollateralReleased(uint256,bytes32,uint256)": EventFragment;
    "LogRiskpoolCollateralizationFailed(uint256,bytes32,uint256)": EventFragment;
    "LogRiskpoolCollateralizationSucceeded(uint256,bytes32,uint256)": EventFragment;
    "LogRiskpoolRegistered(uint256,address,address,uint256,uint256)": EventFragment;
    "LogRiskpoolRequiredCollateral(bytes32,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "LogRiskpoolCollateralReleased"
  ): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "LogRiskpoolCollateralizationFailed"
  ): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "LogRiskpoolCollateralizationSucceeded"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogRiskpoolRegistered"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "LogRiskpoolRequiredCollateral"
  ): EventFragment;
}

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface LogRiskpoolCollateralReleasedEventObject {
  riskpoolId: BigNumber;
  processId: string;
  amount: BigNumber;
}
export type LogRiskpoolCollateralReleasedEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  LogRiskpoolCollateralReleasedEventObject
>;

export type LogRiskpoolCollateralReleasedEventFilter =
  TypedEventFilter<LogRiskpoolCollateralReleasedEvent>;

export interface LogRiskpoolCollateralizationFailedEventObject {
  riskpoolId: BigNumber;
  processId: string;
  amount: BigNumber;
}
export type LogRiskpoolCollateralizationFailedEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  LogRiskpoolCollateralizationFailedEventObject
>;

export type LogRiskpoolCollateralizationFailedEventFilter =
  TypedEventFilter<LogRiskpoolCollateralizationFailedEvent>;

export interface LogRiskpoolCollateralizationSucceededEventObject {
  riskpoolId: BigNumber;
  processId: string;
  amount: BigNumber;
}
export type LogRiskpoolCollateralizationSucceededEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  LogRiskpoolCollateralizationSucceededEventObject
>;

export type LogRiskpoolCollateralizationSucceededEventFilter =
  TypedEventFilter<LogRiskpoolCollateralizationSucceededEvent>;

export interface LogRiskpoolRegisteredEventObject {
  riskpoolId: BigNumber;
  wallet: string;
  erc20Token: string;
  collateralizationLevel: BigNumber;
  sumOfSumInsuredCap: BigNumber;
}
export type LogRiskpoolRegisteredEvent = TypedEvent<
  [BigNumber, string, string, BigNumber, BigNumber],
  LogRiskpoolRegisteredEventObject
>;

export type LogRiskpoolRegisteredEventFilter =
  TypedEventFilter<LogRiskpoolRegisteredEvent>;

export interface LogRiskpoolRequiredCollateralEventObject {
  processId: string;
  sumInsured: BigNumber;
  collateral: BigNumber;
}
export type LogRiskpoolRequiredCollateralEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  LogRiskpoolRequiredCollateralEventObject
>;

export type LogRiskpoolRequiredCollateralEventFilter =
  TypedEventFilter<LogRiskpoolRequiredCollateralEvent>;

export interface PoolController extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PoolControllerInterface;

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
    COLLATERALIZATION_LEVEL_CAP(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    DEFAULT_MAX_NUMBER_OF_ACTIVE_BUNDLES(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    FULL_COLLATERALIZATION_LEVEL(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    activeBundles(
      riskpoolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { numberOfActiveBundles: BigNumber }>;

    addBundleIdToActiveSet(
      riskpoolId: PromiseOrValue<BigNumberish>,
      bundleId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    calculateCollateral(
      riskpoolId: PromiseOrValue<BigNumberish>,
      sumInsuredAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { collateralAmount: BigNumber }>;

    defund(
      riskpoolId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    fund(
      riskpoolId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getActiveBundleId(
      riskpoolId: PromiseOrValue<BigNumberish>,
      bundleIdx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { bundleId: BigNumber }>;

    getFullCollateralizationLevel(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getMaximumNumberOfActiveBundles(
      riskpoolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { maximumNumberOfActiveBundles: BigNumber }>;

    getRiskPoolForProduct(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { riskpoolId: BigNumber }>;

    getRiskpool(
      riskpoolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[IPool.PoolStructOutput] & { riskPool: IPool.PoolStructOutput }>;

    initialize(
      registry: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    processPayout(
      processId: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    processPremium(
      processId: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registerRiskpool(
      riskpoolId: PromiseOrValue<BigNumberish>,
      wallet: PromiseOrValue<string>,
      erc20Token: PromiseOrValue<string>,
      collateralizationLevel: PromiseOrValue<BigNumberish>,
      sumOfSumInsuredCap: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    release(
      processId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    removeBundleIdFromActiveSet(
      riskpoolId: PromiseOrValue<BigNumberish>,
      bundleId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    riskpools(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { idx: BigNumber }>;

    setMaximumNumberOfActiveBundles(
      riskpoolId: PromiseOrValue<BigNumberish>,
      maxNumberOfActiveBundles: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setRiskpoolForProduct(
      productId: PromiseOrValue<BigNumberish>,
      riskpoolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    underwrite(
      processId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  COLLATERALIZATION_LEVEL_CAP(overrides?: CallOverrides): Promise<BigNumber>;

  DEFAULT_MAX_NUMBER_OF_ACTIVE_BUNDLES(
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  FULL_COLLATERALIZATION_LEVEL(overrides?: CallOverrides): Promise<BigNumber>;

  activeBundles(
    riskpoolId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  addBundleIdToActiveSet(
    riskpoolId: PromiseOrValue<BigNumberish>,
    bundleId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  calculateCollateral(
    riskpoolId: PromiseOrValue<BigNumberish>,
    sumInsuredAmount: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  defund(
    riskpoolId: PromiseOrValue<BigNumberish>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  fund(
    riskpoolId: PromiseOrValue<BigNumberish>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getActiveBundleId(
    riskpoolId: PromiseOrValue<BigNumberish>,
    bundleIdx: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getFullCollateralizationLevel(overrides?: CallOverrides): Promise<BigNumber>;

  getMaximumNumberOfActiveBundles(
    riskpoolId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getRiskPoolForProduct(
    productId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getRiskpool(
    riskpoolId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<IPool.PoolStructOutput>;

  initialize(
    registry: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  processPayout(
    processId: PromiseOrValue<BytesLike>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  processPremium(
    processId: PromiseOrValue<BytesLike>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registerRiskpool(
    riskpoolId: PromiseOrValue<BigNumberish>,
    wallet: PromiseOrValue<string>,
    erc20Token: PromiseOrValue<string>,
    collateralizationLevel: PromiseOrValue<BigNumberish>,
    sumOfSumInsuredCap: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  release(
    processId: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  removeBundleIdFromActiveSet(
    riskpoolId: PromiseOrValue<BigNumberish>,
    bundleId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  riskpools(overrides?: CallOverrides): Promise<BigNumber>;

  setMaximumNumberOfActiveBundles(
    riskpoolId: PromiseOrValue<BigNumberish>,
    maxNumberOfActiveBundles: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setRiskpoolForProduct(
    productId: PromiseOrValue<BigNumberish>,
    riskpoolId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  underwrite(
    processId: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    COLLATERALIZATION_LEVEL_CAP(overrides?: CallOverrides): Promise<BigNumber>;

    DEFAULT_MAX_NUMBER_OF_ACTIVE_BUNDLES(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    FULL_COLLATERALIZATION_LEVEL(overrides?: CallOverrides): Promise<BigNumber>;

    activeBundles(
      riskpoolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    addBundleIdToActiveSet(
      riskpoolId: PromiseOrValue<BigNumberish>,
      bundleId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    calculateCollateral(
      riskpoolId: PromiseOrValue<BigNumberish>,
      sumInsuredAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    defund(
      riskpoolId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    fund(
      riskpoolId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getActiveBundleId(
      riskpoolId: PromiseOrValue<BigNumberish>,
      bundleIdx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFullCollateralizationLevel(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMaximumNumberOfActiveBundles(
      riskpoolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRiskPoolForProduct(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRiskpool(
      riskpoolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<IPool.PoolStructOutput>;

    initialize(
      registry: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    processPayout(
      processId: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    processPremium(
      processId: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    registerRiskpool(
      riskpoolId: PromiseOrValue<BigNumberish>,
      wallet: PromiseOrValue<string>,
      erc20Token: PromiseOrValue<string>,
      collateralizationLevel: PromiseOrValue<BigNumberish>,
      sumOfSumInsuredCap: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    release(
      processId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    removeBundleIdFromActiveSet(
      riskpoolId: PromiseOrValue<BigNumberish>,
      bundleId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    riskpools(overrides?: CallOverrides): Promise<BigNumber>;

    setMaximumNumberOfActiveBundles(
      riskpoolId: PromiseOrValue<BigNumberish>,
      maxNumberOfActiveBundles: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setRiskpoolForProduct(
      productId: PromiseOrValue<BigNumberish>,
      riskpoolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    underwrite(
      processId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "LogRiskpoolCollateralReleased(uint256,bytes32,uint256)"(
      riskpoolId?: null,
      processId?: null,
      amount?: null
    ): LogRiskpoolCollateralReleasedEventFilter;
    LogRiskpoolCollateralReleased(
      riskpoolId?: null,
      processId?: null,
      amount?: null
    ): LogRiskpoolCollateralReleasedEventFilter;

    "LogRiskpoolCollateralizationFailed(uint256,bytes32,uint256)"(
      riskpoolId?: null,
      processId?: null,
      amount?: null
    ): LogRiskpoolCollateralizationFailedEventFilter;
    LogRiskpoolCollateralizationFailed(
      riskpoolId?: null,
      processId?: null,
      amount?: null
    ): LogRiskpoolCollateralizationFailedEventFilter;

    "LogRiskpoolCollateralizationSucceeded(uint256,bytes32,uint256)"(
      riskpoolId?: null,
      processId?: null,
      amount?: null
    ): LogRiskpoolCollateralizationSucceededEventFilter;
    LogRiskpoolCollateralizationSucceeded(
      riskpoolId?: null,
      processId?: null,
      amount?: null
    ): LogRiskpoolCollateralizationSucceededEventFilter;

    "LogRiskpoolRegistered(uint256,address,address,uint256,uint256)"(
      riskpoolId?: null,
      wallet?: null,
      erc20Token?: null,
      collateralizationLevel?: null,
      sumOfSumInsuredCap?: null
    ): LogRiskpoolRegisteredEventFilter;
    LogRiskpoolRegistered(
      riskpoolId?: null,
      wallet?: null,
      erc20Token?: null,
      collateralizationLevel?: null,
      sumOfSumInsuredCap?: null
    ): LogRiskpoolRegisteredEventFilter;

    "LogRiskpoolRequiredCollateral(bytes32,uint256,uint256)"(
      processId?: null,
      sumInsured?: null,
      collateral?: null
    ): LogRiskpoolRequiredCollateralEventFilter;
    LogRiskpoolRequiredCollateral(
      processId?: null,
      sumInsured?: null,
      collateral?: null
    ): LogRiskpoolRequiredCollateralEventFilter;
  };

  estimateGas: {
    COLLATERALIZATION_LEVEL_CAP(overrides?: CallOverrides): Promise<BigNumber>;

    DEFAULT_MAX_NUMBER_OF_ACTIVE_BUNDLES(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    FULL_COLLATERALIZATION_LEVEL(overrides?: CallOverrides): Promise<BigNumber>;

    activeBundles(
      riskpoolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    addBundleIdToActiveSet(
      riskpoolId: PromiseOrValue<BigNumberish>,
      bundleId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    calculateCollateral(
      riskpoolId: PromiseOrValue<BigNumberish>,
      sumInsuredAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    defund(
      riskpoolId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    fund(
      riskpoolId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getActiveBundleId(
      riskpoolId: PromiseOrValue<BigNumberish>,
      bundleIdx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFullCollateralizationLevel(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMaximumNumberOfActiveBundles(
      riskpoolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRiskPoolForProduct(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRiskpool(
      riskpoolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      registry: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    processPayout(
      processId: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    processPremium(
      processId: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registerRiskpool(
      riskpoolId: PromiseOrValue<BigNumberish>,
      wallet: PromiseOrValue<string>,
      erc20Token: PromiseOrValue<string>,
      collateralizationLevel: PromiseOrValue<BigNumberish>,
      sumOfSumInsuredCap: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    release(
      processId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    removeBundleIdFromActiveSet(
      riskpoolId: PromiseOrValue<BigNumberish>,
      bundleId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    riskpools(overrides?: CallOverrides): Promise<BigNumber>;

    setMaximumNumberOfActiveBundles(
      riskpoolId: PromiseOrValue<BigNumberish>,
      maxNumberOfActiveBundles: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setRiskpoolForProduct(
      productId: PromiseOrValue<BigNumberish>,
      riskpoolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    underwrite(
      processId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    COLLATERALIZATION_LEVEL_CAP(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    DEFAULT_MAX_NUMBER_OF_ACTIVE_BUNDLES(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    FULL_COLLATERALIZATION_LEVEL(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    activeBundles(
      riskpoolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    addBundleIdToActiveSet(
      riskpoolId: PromiseOrValue<BigNumberish>,
      bundleId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    calculateCollateral(
      riskpoolId: PromiseOrValue<BigNumberish>,
      sumInsuredAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    defund(
      riskpoolId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    fund(
      riskpoolId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getActiveBundleId(
      riskpoolId: PromiseOrValue<BigNumberish>,
      bundleIdx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFullCollateralizationLevel(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMaximumNumberOfActiveBundles(
      riskpoolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRiskPoolForProduct(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRiskpool(
      riskpoolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      registry: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    processPayout(
      processId: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    processPremium(
      processId: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registerRiskpool(
      riskpoolId: PromiseOrValue<BigNumberish>,
      wallet: PromiseOrValue<string>,
      erc20Token: PromiseOrValue<string>,
      collateralizationLevel: PromiseOrValue<BigNumberish>,
      sumOfSumInsuredCap: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    release(
      processId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    removeBundleIdFromActiveSet(
      riskpoolId: PromiseOrValue<BigNumberish>,
      bundleId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    riskpools(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setMaximumNumberOfActiveBundles(
      riskpoolId: PromiseOrValue<BigNumberish>,
      maxNumberOfActiveBundles: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setRiskpoolForProduct(
      productId: PromiseOrValue<BigNumberish>,
      riskpoolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    underwrite(
      processId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
