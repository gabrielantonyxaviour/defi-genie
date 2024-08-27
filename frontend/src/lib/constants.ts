import { ColumnDef } from "@tanstack/react-table";
import { Address } from "./type";

export const TOKEN_ADDRESSES: Record<string, Address> = {
  usdc: "0x64544969ed7ebf5f083679233325356ebe738930",
  usdt: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
};

export const COINMARKETCAP_IDS: Record<string, number> = {
  bnb: 1839,
  weth: 2396,
  link: 1975,
  usdc: 3408,
  usdt: 825,
  dai: 4943,
  eth: 1027,
  matic: 3890,
};
export const supportedcoins: Record<string, any> = {
  weth: {
    name: "Wrapped Ether",
    symbol: "WETH",
    image: "/coins/weth.png",
    token: {
      56: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      97: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    },
  },
  link: {
    name: "Chain Link",
    symbol: "LINK",
    image: "/coins/link.png",
    token: {
      56: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      97: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    },
  },
  usdc: {
    name: "USD Stablecoin",
    symbol: "USDC",
    image: "/coins/usdc.png",
    token: {
      56: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      97: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    },
  },
  usdt: {
    name: "Tether USD",
    symbol: "USDT",
    image: "/coins/usdt.png",
    token: {
      56: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      97: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    },
  },
  dai: {
    name: "Dai Stablecoin",
    symbol: "DAI",
    image: "/coins/dai.png",
    token: {
      56: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      97: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    },
  },
  eth: {
    name: "Ethereum",
    symbol: "ETH",
    image: "/coins/ethereum.png",
  },
  matic: {
    name: "Polygon",
    symbol: "MATIC",
    image: "/coins/polygon.png",
  },
};

export const supportedchains: Record<string, any> = {
  56: {
    id: 1,
    name: "Binance Smart Chain",
    chainId: 56,
    symbol: "BNB",
    image: "/coins/bnb.png",
    explorer: "https://bscscan.com/",
    address: "0x7125e097a72cCf547ED6e9e98bCc09BE3AC61997",
    approve: "0x50751BD8d7b0a84c422DE96A56426a370F31a42D",
    poolDisabled: false,
    isTestnet: false,
  },
  97: {
    id: 2,
    name: "Bsc Testnet",
    chainId: 97,
    symbol: "tBNB",
    image: "/coins/bnb.png",
    explorer: "https://testnet.bscscan.com/",
    address: "0x7125e097a72cCf547ED6e9e98bCc09BE3AC61997",
    approve: "0x50751BD8d7b0a84c422DE96A56426a370F31a42D",
    poolDisabled: true,
    isTestnet: true,
  },

  1: {
    id: 3,
    name: "Ethereum",
    chainId: 11155111,
    symbol: "ETH",
    image: "/coins/ethereum.png",
    explorer: "https://eth-sepolia.blockscout.com/",
    address: "0x9425ab731bdF86c6E02Cad8Ba4AF0005BE0014d0",
    approve: "",
    poolDisabled: false,
    isTestnet: false,
  },
  11155111: {
    id: 4,
    name: "Sepolia",
    chainId: 11155111,
    symbol: "ETH",
    image: "/coins/ethereum.png",
    explorer: "https://eth-sepolia.blockscout.com/",
    address: "0x9425ab731bdF86c6E02Cad8Ba4AF0005BE0014d0",
    approve: "",
    poolDisabled: false,
    isTestnet: true,
  },
};

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
