/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IStaking, IStakingInterface } from "../IStaking";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "NftId",
        name: "target",
        type: "uint96",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
    ],
    name: "LogStakingNewStakeCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "UFixed",
        name: "oldRewardRate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "UFixed",
        name: "newRewardRate",
        type: "uint256",
      },
    ],
    name: "LogStakingRewardRateSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    name: "LogStakingRewardReservesDecreased",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    name: "LogStakingRewardReservesIncreased",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    name: "LogStakingRewardsClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    name: "LogStakingRewardsUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "NftId",
        name: "target",
        type: "uint96",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    name: "LogStakingStaked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "ChainId",
        name: "chain",
        type: "bytes5",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "UFixed",
        name: "oldStakingRate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "UFixed",
        name: "newStakingRate",
        type: "uint256",
      },
    ],
    name: "LogStakingStakingRateSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "NftId",
        name: "target",
        type: "uint96",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    name: "LogStakingUnstaked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "oldWallet",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newWallet",
        type: "address",
      },
    ],
    name: "LogStakingWalletChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "Version",
        name: "version",
        type: "uint48",
      },
      {
        indexed: false,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "activatedBy",
        type: "address",
      },
    ],
    name: "LogVersionableActivated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
      {
        internalType: "address",
        name: "activatedBy",
        type: "address",
      },
    ],
    name: "activate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "ChainId",
        name: "chain",
        type: "bytes5",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "dipAmount",
        type: "uint256",
      },
    ],
    name: "calculateCapitalSupport",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "ChainId",
        name: "chain",
        type: "bytes5",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
    ],
    name: "calculateRequiredStaking",
    outputs: [
      {
        internalType: "uint256",
        name: "dipAmount",
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
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    name: "calculateRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "rewardAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "NftId",
            name: "id",
            type: "uint96",
          },
          {
            internalType: "NftId",
            name: "target",
            type: "uint96",
          },
          {
            internalType: "uint256",
            name: "stakeBalance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rewardBalance",
            type: "uint256",
          },
          {
            internalType: "Timestamp",
            name: "createdAt",
            type: "uint40",
          },
          {
            internalType: "Timestamp",
            name: "updatedAt",
            type: "uint40",
          },
          {
            internalType: "Version",
            name: "version",
            type: "uint48",
          },
        ],
        internalType: "struct IStaking.StakeInfo",
        name: "stakeInfo",
        type: "tuple",
      },
    ],
    name: "calculateRewardsIncrement",
    outputs: [
      {
        internalType: "uint256",
        name: "rewardsAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "NftId",
        name: "target",
        type: "uint96",
      },
    ],
    name: "capitalSupport",
    outputs: [
      {
        internalType: "uint256",
        name: "capitalAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
    ],
    name: "claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "NftId",
        name: "target",
        type: "uint96",
      },
      {
        internalType: "uint256",
        name: "dipAmount",
        type: "uint256",
      },
    ],
    name: "createStake",
    outputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "NftId",
        name: "bundle",
        type: "uint96",
      },
    ],
    name: "getBundleInfo",
    outputs: [
      {
        internalType: "bytes32",
        name: "instanceId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "riskpoolId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "string",
        name: "displayName",
        type: "string",
      },
      {
        internalType: "enum IInstanceServiceFacade.BundleState",
        name: "bundleState",
        type: "uint8",
      },
      {
        internalType: "Timestamp",
        name: "expiryAt",
        type: "uint40",
      },
      {
        internalType: "bool",
        name: "stakingSupported",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "unstakingSupported",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "stakeBalance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDip",
    outputs: [
      {
        internalType: "contract IERC20Metadata",
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
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
    ],
    name: "getInfo",
    outputs: [
      {
        components: [
          {
            internalType: "NftId",
            name: "id",
            type: "uint96",
          },
          {
            internalType: "NftId",
            name: "target",
            type: "uint96",
          },
          {
            internalType: "uint256",
            name: "stakeBalance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rewardBalance",
            type: "uint256",
          },
          {
            internalType: "Timestamp",
            name: "createdAt",
            type: "uint40",
          },
          {
            internalType: "Timestamp",
            name: "updatedAt",
            type: "uint40",
          },
          {
            internalType: "Version",
            name: "version",
            type: "uint48",
          },
        ],
        internalType: "struct IStaking.StakeInfo",
        name: "info",
        type: "tuple",
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
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getStakingWallet",
    outputs: [
      {
        internalType: "address",
        name: "stakingWallet",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "idx",
        type: "uint256",
      },
    ],
    name: "getVersion",
    outputs: [
      {
        internalType: "Version",
        name: "",
        type: "uint48",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "Version",
        name: "_version",
        type: "uint48",
      },
    ],
    name: "getVersionInfo",
    outputs: [
      {
        components: [
          {
            internalType: "Version",
            name: "version",
            type: "uint48",
          },
          {
            internalType: "address",
            name: "implementation",
            type: "address",
          },
          {
            internalType: "address",
            name: "activatedBy",
            type: "address",
          },
          {
            internalType: "Blocknumber",
            name: "activatedIn",
            type: "uint32",
          },
          {
            internalType: "Timestamp",
            name: "activatedAt",
            type: "uint40",
          },
        ],
        internalType: "struct IVersionable.VersionInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "implementsIStaking",
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
        internalType: "Version",
        name: "_version",
        type: "uint48",
      },
    ],
    name: "isActivated",
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
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "isStakeOwner",
    outputs: [
      {
        internalType: "bool",
        name: "isOwner",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "NftId",
        name: "target",
        type: "uint96",
      },
    ],
    name: "isStakingSupported",
    outputs: [
      {
        internalType: "bool",
        name: "isSupported",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "ObjectType",
        name: "targetType",
        type: "uint8",
      },
    ],
    name: "isStakingSupportedForType",
    outputs: [
      {
        internalType: "bool",
        name: "isSupported",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "NftId",
        name: "target",
        type: "uint96",
      },
    ],
    name: "isUnstakingSupported",
    outputs: [
      {
        internalType: "bool",
        name: "isSupported",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxRewardRate",
    outputs: [
      {
        internalType: "UFixed",
        name: "rate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rateDecimals",
    outputs: [
      {
        internalType: "uint256",
        name: "decimals",
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
        name: "dipAmount",
        type: "uint256",
      },
    ],
    name: "refillRewardReserves",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "dipAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardRate",
    outputs: [
      {
        internalType: "UFixed",
        name: "rate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardReserves",
    outputs: [
      {
        internalType: "uint256",
        name: "dipAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "UFixed",
        name: "rewardRate",
        type: "uint256",
      },
    ],
    name: "setRewardRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "ChainId",
        name: "chain",
        type: "bytes5",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "UFixed",
        name: "stakingRate",
        type: "uint256",
      },
    ],
    name: "setStakingRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "stakingWalletNew",
        type: "address",
      },
    ],
    name: "setStakingWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
      {
        internalType: "uint256",
        name: "dipAmount",
        type: "uint256",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakeBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "dipAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "NftId",
        name: "target",
        type: "uint96",
      },
    ],
    name: "stakes",
    outputs: [
      {
        internalType: "uint256",
        name: "dipAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "ChainId",
        name: "chain",
        type: "bytes5",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "stakingRate",
    outputs: [
      {
        internalType: "UFixed",
        name: "stakingRate",
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
        name: "chainId",
        type: "uint256",
      },
    ],
    name: "toChain",
    outputs: [
      {
        internalType: "ChainId",
        name: "",
        type: "bytes5",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "int8",
        name: "exp",
        type: "int8",
      },
    ],
    name: "toRate",
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
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
      {
        internalType: "uint256",
        name: "dipAmount",
        type: "uint256",
      },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "NftId",
        name: "id",
        type: "uint96",
      },
    ],
    name: "unstakeAndClaimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "Version",
        name: "",
        type: "uint48",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "versionParts",
    outputs: [
      {
        internalType: "VersionPart",
        name: "major",
        type: "uint16",
      },
      {
        internalType: "VersionPart",
        name: "minor",
        type: "uint16",
      },
      {
        internalType: "VersionPart",
        name: "patch",
        type: "uint16",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "versions",
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
        name: "dipAmount",
        type: "uint256",
      },
    ],
    name: "withdrawRewardReserves",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IStaking__factory {
  static readonly abi = _abi;
  static createInterface(): IStakingInterface {
    return new utils.Interface(_abi) as IStakingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IStaking {
    return new Contract(address, _abi, signerOrProvider) as IStaking;
  }
}
