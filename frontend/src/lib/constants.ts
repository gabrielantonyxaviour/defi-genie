import { ColumnDef } from "@tanstack/react-table";
import { Address } from "./type";

export const TOKEN_ADDRESSES: Record<string, Address> = {
  usdc: "0x64544969ed7ebf5f083679233325356ebe738930",
  usdt: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
};

export const COINMARKETCAP_IDS: Record<string, number> = {
  nativeBnb: 1839,
  wrappedBnb: 7192,
  wrappedEth: 2396,
  link: 1975,
  usdc: 3408,
  usdt: 825,
  nativeEth: 1027,
};

export const supportedcoins: Record<string, any> = {
  nativeEth: {
    name: "Ethereum",
    symbol: "ETH",
    image: "/coins/ethereum.png",
    token: {
      1: "0x0000000000000000000000000000000000000000",
      11155111: "0x0000000000000000000000000000000000000000",
    },
  },
  nativeBnb: {
    name: "Binance Coin",
    symbol: "BNB",
    image: "/coins/bnb.png",
  },
  wrappedEth: {
    name: "Wrapped Ethereum",
    symbol: "WETH",
    image: "/coins/weth.png",
    token: {
      1: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      11155111: "0xfff9976782d46cc05630d1f6ebab18b2324d6b14",
    },
  },
  link: {
    name: "Chain Link",
    symbol: "LINK",
    image: "/coins/link.png",
    token: {
      1: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
      11155111: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
      56: "0x404460C6A5EdE2D891e8297795264fDe62ADBB75",
      97: "",
    },
  },
  usdc: {
    name: "USD Stablecoin",
    symbol: "USDC",
    image: "/coins/usdc.png",
    token: {
      1: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      11155111: "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238",
      56: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
      97: "",
    },
  },
  usdt: {
    name: "Tether USD",
    symbol: "USDT",
    image: "/coins/usdt.png",
    token: {
      1: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      11155111: "0x703bd35f91bc3947aac70b4b0c560bee5f06f84c",
      56: "0x55d398326f99059fF775485246999027B3197955",
      97: "",
    },
  },
};

export const supportedchains: Record<string, any> = {
  56: {
    id: 1,
    name: "Binance Smart Chain",
    chainId: 56,
    symbol: "BNB",
    wrapped: "WBNB",
    image: "/coins/bnb.png",
    explorer: "https://bscscan.com/",
    swapRouter: "0xB971eF87ede563556b2ED4b1C0b0019111Dd85d2",
    swapHelper: "",
    poolDisabled: false,
    isTestnet: false,
    stakeDisabled: true,
  },
  97: {
    id: 2,
    name: "Bsc Testnet",
    chainId: 97,
    symbol: "BNB",
    image: "/coins/bnb.png",
    explorer: "https://testnet.bscscan.com/",
    swapHelper: "",
    swapRouter: "",
    poolDisabled: true,
    isTestnet: true,
    stakeDisabled: true,
  },
  1: {
    id: 3,
    name: "Ethereum",
    chainId: 1,
    symbol: "ETH",
    image: "/coins/ethereum.png",
    explorer: "https://etherscan.io/",
    swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
    swapHelper: "",
    stake: "0xA62F9C5af106FeEE069F38dE51098D9d81B90572",
    poolDisabled: false,
    isTestnet: false,
    stakeDisabled: false,
  },
  11155111: {
    id: 4,
    name: "Sepolia",
    chainId: 11155111,
    symbol: "ETH",
    image: "/coins/ethereum.png",
    explorer: "https://sepolia.etherscan.io/",
    swapHelper: "0x615270a5CBA6C1e34D7F8BCB5D26a5BC9285fA20",
    swapRouter: "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E",
    stake: "0xfbbe4d65bd61b778161ed71ec9416988ee21e911",
    poolDisabled: false,
    isTestnet: true,
    stakeDisabled: false,
  },
};

export const swapRouterAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenIn",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenOut",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
    ],
    name: "swap",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];
const home = {
  56: {
    native: 231413413,
    usdc: 231413413,
    usdt: 3423423,
    link: 3235246546536,
    weth: 234234234,
    dai: 1212234,
  },
  97: {
    native: 231413413,
    usdc: 231413413,
    usdt: 3423423,
    link: 3235246546536,
    weth: 234234234,
    dai: 1212234,
  },
  1: {
    native: 231413413,
    usdc: 231413413,
    usdt: 3423423,
    link: 3235246546536,
    weth: 234234234,
    dai: 1212234,
  },
  11155111: {
    native: 231413413,
    usdc: 231413413,
    usdt: 3423423,
    link: 3235246546536,
    weth: 234234234,
    dai: 1212234,
  },
};

// export const SAMPLE_GRAPH_RESPONSE = {
//   data: {
//     mints: [
//       {
//         amount: "77491749440909497",
//         amount0: "0.514916974671831865",
//         amount1: "0.001",
//         amountUSD: "1.029361706938517415420758380077364",
//         id: "0x9e8c3ecb775a144197619bed7a9f10ad8c8951a6e123c3925ab4ccec2aa0a916#146252",
//         tickLower: "-69420",
//         tickUpper: "-55560",
//         timestamp: "1723552355",
//         transaction: {
//           id: "0x9e8c3ecb775a144197619bed7a9f10ad8c8951a6e123c3925ab4ccec2aa0a916",
//         },
//       },
//       {
//         amount: "7572458704768971",
//         amount0: "0.049999999999999901",
//         amount1: "0.000098335159933301",
//         amountUSD: "0.1006399647919719263884795154785729",
//         id: "0xdf264630fcf56500b9064f52f65cadbfcab77ab059cb69840b06613e1ef8402c#146259",
//         tickLower: "-69420",
//         tickUpper: "-55560",
//         timestamp: "1723552502",
//         transaction: {
//           id: "0xdf264630fcf56500b9064f52f65cadbfcab77ab059cb69840b06613e1ef8402c",
//         },
//       },
//     ],
//     positions: [
//       {
//         collectedFeesToken0: "0.000446495920536291",
//         collectedFeesToken1: "0.000000819680344976",
//         collectedToken0: "0",
//         collectedToken1: "0",
//         depositedToken0: "0.564916974671831766",
//         depositedToken1: "0.001098335159933301",
//         feeGrowthInside0LastX128:
//           "115792089237316195423570985008687907853203215345156064271489322296691816995158",
//         feeGrowthInside1LastX128:
//           "115792089237316195423570985008687907853269683823558956588219618740048569036465",
//         id: "144693",
//         liquidity: "85064208145678468",
//         owner: "0x5a6b842891032d702517a4e52ec38ee561063539",
//         pool: {
//           feeTier: "3000",
//         },
//         tickLower: {
//           collectedFeesToken0: "0",
//           collectedFeesToken1: "0",
//           collectedFeesUSD: "0",
//           createdAtBlockNumber: "41198613",
//           createdAtTimestamp: "1723165218",
//           feeGrowthOutside0X128: "573633005753341841510859517082663170363",
//           feeGrowthOutside1X128: "977740046570037509474407488693325065",
//           feesUSD: "0",
//           id: "0x7862d9b4be2156b15d54f41ee4ede2d5b0b455e4#-69420",
//           liquidityGross: "4551613414030338626",
//           liquidityNet: "4551613414030338626",
//           liquidityProviderCount: "0",
//           poolAddress: "0x7862d9b4be2156b15d54f41ee4ede2d5b0b455e4",
//           price0: "0.0009666704439429485217331340670044014",
//           price1: "1034.478716366979913585054352063859",
//           tickIdx: "-69420",
//           untrackedVolumeUSD: "0",
//           volumeToken0: "0",
//           volumeToken1: "0",
//           volumeUSD: "0",
//         },
//         tickUpper: {
//           collectedFeesToken0: "0",
//           collectedFeesToken1: "0",
//           collectedFeesUSD: "0",
//           createdAtBlockNumber: "26493761",
//           createdAtTimestamp: "1678906181",
//           feeGrowthOutside0X128: "72111102283790428458002088187279244184",
//           feeGrowthOutside1X128: "311266146726458643769174969048709587",
//           feesUSD: "0",
//           id: "0x7862d9b4be2156b15d54f41ee4ede2d5b0b455e4#-55560",
//           liquidityGross: "7146231394864061010",
//           liquidityNet: "-7146231394864061010",
//           liquidityProviderCount: "0",
//           price0: "0.00386527588745539240705521658221504",
//           price1: "258.7137449219245666128916752717892",
//           tickIdx: "-55560",
//           untrackedVolumeUSD: "0",
//           volumeToken0: "0",
//           volumeToken1: "0",
//           volumeUSD: "0",
//         },
//         token0: {
//           derivedETH: "0.0003834048520653988200841688475286874",
//           feesUSD: "10428604381.66214181604358356196357",
//           name: "Tether USD",
//           symbol: "USDT",
//           totalValueLocked: "4155472.405867510989733169",
//           totalValueLockedUSD: "4141388.86895289773799551707935127",
//           totalValueLockedUSDUntracked: "0",
//         },
//         token1: {
//           derivedETH: "0.1990197455658292068481294979747291",
//           feesUSD: "455347818.4185409482161753366539475",
//           name: "Wrapped BNB",
//           symbol: "WBNB",
//           totalValueLocked: "12466.657595570763861437",
//           totalValueLockedUSD: "6449324.106017774798594793943099401",
//           totalValueLockedUSDUntracked: "0",
//         },
//         transaction: {
//           id: "0x9e8c3ecb775a144197619bed7a9f10ad8c8951a6e123c3925ab4ccec2aa0a916",
//         },
//       },
//     ],
//   },
// };
