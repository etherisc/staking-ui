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

export interface IPoolInterface extends utils.Interface {
  functions: {
    "processPayout(bytes32,uint256)": FunctionFragment;
    "processPremium(bytes32,uint256)": FunctionFragment;
    "registerRiskpool(uint256,address,address,uint256,uint256)": FunctionFragment;
    "release(bytes32)": FunctionFragment;
    "setRiskpoolForProduct(uint256,uint256)": FunctionFragment;
    "underwrite(bytes32)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "processPayout"
      | "processPremium"
      | "registerRiskpool"
      | "release"
      | "setRiskpoolForProduct"
      | "underwrite"
  ): FunctionFragment;

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
    functionFragment: "setRiskpoolForProduct",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "underwrite",
    values: [PromiseOrValue<BytesLike>]
  ): string;

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
    functionFragment: "setRiskpoolForProduct",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "underwrite", data: BytesLike): Result;

  events: {
    "LogRiskpoolCollateralReleased(uint256,bytes32,uint256)": EventFragment;
    "LogRiskpoolCollateralizationFailed(uint256,bytes32,uint256)": EventFragment;
    "LogRiskpoolCollateralizationSucceeded(uint256,bytes32,uint256)": EventFragment;
    "LogRiskpoolRegistered(uint256,address,address,uint256,uint256)": EventFragment;
    "LogRiskpoolRequiredCollateral(bytes32,uint256,uint256)": EventFragment;
  };

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

export interface IPool extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IPoolInterface;

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
