// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity 0.7.6;
pragma abicoder v2;

import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';

contract DefiGenie {
    ISwapRouter public immutable swapRouter;
    address public constant DAI = 0x3e622317f8C93f7328350cF0B56d9eD4C620C5d6;
    address public constant WETH9 = 0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9;
    uint24 public constant feeTier = 3000;

    constructor(ISwapRouter _swapRouter) {
        swapRouter = _swapRouter;
    }

    function swapWETHForDAI(uint256 amountIn) external returns (uint256 amountOut) {

        // Transfer the specified amount of WETH9 to this contract.
        TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountIn);
        // Approve the router to spend WETH9.
        TransferHelper.safeApprove(WETH9, address(swapRouter), amountIn);
        // Note: To use this example, you should explicitly set slippage limits, omitting for simplicity
        uint256 minOut = /* Calculate min output */ 0;
        uint160 priceLimit = /* Calculate price limit */ 0;
        // Create the params that will be used to execute the swap
        ISwapRouter.ExactInputSingleParams memory params =
            ISwapRouter.ExactInputSingleParams({
                tokenIn: WETH9,
                tokenOut: DAI,
                fee: feeTier,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: minOut,
                sqrtPriceLimitX96: priceLimit
            });
        // The call to `exactInputSingle` executes the swap.
        amountOut = swapRouter.exactInputSingle(params);
    }
}