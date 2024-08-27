// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity 0.7.6;
pragma abicoder v2;

import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';
import './interface/IWrapped.sol';

contract DefiGenie {
    ISwapRouter public immutable swapRouter;
    uint24 public constant feeTier = 3000;
    IWrapped public immutable wrapped;


    constructor(IWrapped _wrapped, ISwapRouter _swapRouter) {
        swapRouter = _swapRouter;
        wrapped = _wrapped;
    }

    function swap(address tokenIn, address tokenOut, uint256 amountIn) external payable returns (uint256 amountOut) {
        ISwapRouter.ExactInputSingleParams memory params;
        if (tokenIn == address(0)) {
            wrapped.deposit(msg.value);
            TransferHelper.safeApprove(address(wrapped), address(swapRouter), amountIn);
            params = ISwapRouter.ExactInputSingleParams({
                tokenIn: address(wrapped),
                tokenOut: tokenOut,
                fee: feeTier,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });
        } else {
            TransferHelper.safeTransferFrom(tokenIn, msg.sender, address(this), amountIn);
            params = ISwapRouter.ExactInputSingleParams({
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                fee: feeTier,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });
        }
        amountOut = swapRouter.exactInputSingle(params);
    }
}