import { ColumnDef } from "@tanstack/react-table";
import { Address } from "./type";

export const TOKEN_ADDRESSES: Record<string, Address> = {
  usdc: "0x64544969ed7ebf5f083679233325356ebe738930",
  usdt: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
};

export const COINMARKETCAP_IDS = {
  bnb: 1839,
  usdc: 3408,
  usdt: 825,
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
