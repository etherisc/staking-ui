/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type { BaseContract, BigNumber, Signer, utils } from "ethers";
import type { EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export interface TransferHelperInterface extends utils.Interface {
  functions: {};

  events: {
    "LogTransferHelperCallFailed(bool,uint256,bytes)": EventFragment;
    "LogTransferHelperInputValidation1Failed(bool,address,address)": EventFragment;
    "LogTransferHelperInputValidation2Failed(uint256,uint256)": EventFragment;
  };

  getEvent(
    nameOrSignatureOrTopic: "LogTransferHelperCallFailed"
  ): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "LogTransferHelperInputValidation1Failed"
  ): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "LogTransferHelperInputValidation2Failed"
  ): EventFragment;
}

export interface LogTransferHelperCallFailedEventObject {
  callSuccess: boolean;
  returnDataLength: BigNumber;
  returnData: string;
}
export type LogTransferHelperCallFailedEvent = TypedEvent<
  [boolean, BigNumber, string],
  LogTransferHelperCallFailedEventObject
>;

export type LogTransferHelperCallFailedEventFilter =
  TypedEventFilter<LogTransferHelperCallFailedEvent>;

export interface LogTransferHelperInputValidation1FailedEventObject {
  tokenIsContract: boolean;
  from: string;
  to: string;
}
export type LogTransferHelperInputValidation1FailedEvent = TypedEvent<
  [boolean, string, string],
  LogTransferHelperInputValidation1FailedEventObject
>;

export type LogTransferHelperInputValidation1FailedEventFilter =
  TypedEventFilter<LogTransferHelperInputValidation1FailedEvent>;

export interface LogTransferHelperInputValidation2FailedEventObject {
  balance: BigNumber;
  allowance: BigNumber;
}
export type LogTransferHelperInputValidation2FailedEvent = TypedEvent<
  [BigNumber, BigNumber],
  LogTransferHelperInputValidation2FailedEventObject
>;

export type LogTransferHelperInputValidation2FailedEventFilter =
  TypedEventFilter<LogTransferHelperInputValidation2FailedEvent>;

export interface TransferHelper extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TransferHelperInterface;

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

  functions: {};

  callStatic: {};

  filters: {
    "LogTransferHelperCallFailed(bool,uint256,bytes)"(
      callSuccess?: null,
      returnDataLength?: null,
      returnData?: null
    ): LogTransferHelperCallFailedEventFilter;
    LogTransferHelperCallFailed(
      callSuccess?: null,
      returnDataLength?: null,
      returnData?: null
    ): LogTransferHelperCallFailedEventFilter;

    "LogTransferHelperInputValidation1Failed(bool,address,address)"(
      tokenIsContract?: null,
      from?: null,
      to?: null
    ): LogTransferHelperInputValidation1FailedEventFilter;
    LogTransferHelperInputValidation1Failed(
      tokenIsContract?: null,
      from?: null,
      to?: null
    ): LogTransferHelperInputValidation1FailedEventFilter;

    "LogTransferHelperInputValidation2Failed(uint256,uint256)"(
      balance?: null,
      allowance?: null
    ): LogTransferHelperInputValidation2FailedEventFilter;
    LogTransferHelperInputValidation2Failed(
      balance?: null,
      allowance?: null
    ): LogTransferHelperInputValidation2FailedEventFilter;
  };

  estimateGas: {};

  populateTransaction: {};
}
