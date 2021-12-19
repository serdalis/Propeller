/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  Overrides,
  BigNumberish,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Crowdsale, CrowdsaleInterface } from "../Crowdsale";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "__rate",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "__wallet",
        type: "address",
      },
      {
        internalType: "contract ERC20Burnable",
        name: "__token",
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
        name: "purchaser",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TokensPurchased",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
    ],
    name: "buyTokens",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "rate",
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
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "wallet",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "weiRaised",
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
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161099038038061099083398101604081905261002f91610181565b6001600055826100865760405162461bcd60e51b815260206004820152601460248201527f43726f776473616c653a2072617465206973203000000000000000000000000060448201526064015b60405180910390fd5b6001600160a01b0382166100dc5760405162461bcd60e51b815260206004820152601960248201527f43726f776473616c653a2077616c6c6574206973207a65726f00000000000000604482015260640161007d565b6001600160a01b0381166101325760405162461bcd60e51b815260206004820152601860248201527f43726f776473616c653a20746f6b656e206973207a65726f0000000000000000604482015260640161007d565b600392909255600280546001600160a01b039283166001600160a01b031991821617909155600180549290931691161790556101c4565b6001600160a01b038116811461017e57600080fd5b50565b60008060006060848603121561019657600080fd5b8351925060208401516101a881610169565b60408501519092506101b981610169565b809150509250925092565b6107bd806101d36000396000f3fe60806040526004361061005e5760003560e01c8063521eb27311610043578063521eb273146100b5578063ec8ac4d8146100e7578063fc0c546a146100f557610073565b80632c4e722e1461007c5780634042b66f146100a057610073565b366100735761007133610113565b610113565b005b61007133610113565b34801561008857600080fd5b506003545b6040519081526020015b60405180910390f35b3480156100ac57600080fd5b5060045461008d565b3480156100c157600080fd5b506002546001600160a01b03165b6040516001600160a01b039091168152602001610097565b61007161006c366004610657565b34801561010157600080fd5b506001546001600160a01b03166100cf565b6002600054141561016b5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064015b60405180910390fd5b60026000553461017b82826101fb565b6000610186826102a2565b60045490915061019690836102bf565b6004556101a383826102d2565b60408051838152602081018390526001600160a01b0385169133917f6faf93231a456e552dbc9961f58d9713ee4f2e69d15f1975b050ef0911053a7b910160405180910390a36101f16102dc565b5050600160005550565b6001600160a01b0382166102515760405162461bcd60e51b815260206004820152601e60248201527f43726f776473616c653a2062656e6566696369617279206973207a65726f00006044820152606401610162565b8061029e5760405162461bcd60e51b815260206004820152601960248201527f43726f776473616c653a20776569416d6f756e742069732030000000000000006044820152606401610162565b5050565b60006102b96003548361031890919063ffffffff16565b92915050565b60006102cb82846106af565b9392505050565b61029e8282610324565b6002546040516001600160a01b03909116903480156108fc02916000818181858888f19350505050158015610315573d6000803e3d6000fd5b50565b60006102cb82846106c7565b60015461029e906001600160a01b031683836040516001600160a01b0383166024820152604481018290526103de9084907fa9059cbb000000000000000000000000000000000000000000000000000000009060640160408051601f198184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff00000000000000000000000000000000000000000000000000000000909316929092179091526103e3565b505050565b6000610438826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166104c89092919063ffffffff16565b8051909150156103de578080602001905181019061045691906106e6565b6103de5760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152608401610162565b60606104d784846000856104df565b949350505050565b6060824710156105575760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c00000000000000000000000000000000000000000000000000006064820152608401610162565b843b6105a55760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610162565b600080866001600160a01b031685876040516105c19190610738565b60006040518083038185875af1925050503d80600081146105fe576040519150601f19603f3d011682016040523d82523d6000602084013e610603565b606091505b509150915061061382828661061e565b979650505050505050565b6060831561062d5750816102cb565b82511561063d5782518084602001fd5b8160405162461bcd60e51b81526004016101629190610754565b60006020828403121561066957600080fd5b81356001600160a01b03811681146102cb57600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600082198211156106c2576106c2610680565b500190565b60008160001904831182151516156106e1576106e1610680565b500290565b6000602082840312156106f857600080fd5b815180151581146102cb57600080fd5b60005b8381101561072357818101518382015260200161070b565b83811115610732576000848401525b50505050565b6000825161074a818460208701610708565b9190910192915050565b6020815260008251806020840152610773816040850160208701610708565b601f01601f1916919091016040019291505056fea26469706673582212201de612c222b9eab6c73db889c0dc723b68c4b0308c8977a8897510f056c67c1864736f6c634300080a0033";

type CrowdsaleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CrowdsaleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Crowdsale__factory extends ContractFactory {
  constructor(...args: CrowdsaleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    __rate: BigNumberish,
    __wallet: string,
    __token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Crowdsale> {
    return super.deploy(
      __rate,
      __wallet,
      __token,
      overrides || {}
    ) as Promise<Crowdsale>;
  }
  getDeployTransaction(
    __rate: BigNumberish,
    __wallet: string,
    __token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      __rate,
      __wallet,
      __token,
      overrides || {}
    );
  }
  attach(address: string): Crowdsale {
    return super.attach(address) as Crowdsale;
  }
  connect(signer: Signer): Crowdsale__factory {
    return super.connect(signer) as Crowdsale__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CrowdsaleInterface {
    return new utils.Interface(_abi) as CrowdsaleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Crowdsale {
    return new Contract(address, _abi, signerOrProvider) as Crowdsale;
  }
}
