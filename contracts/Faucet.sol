// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract Faucet is Ownable {
  uint256 public maticAmount;
  uint256 public tokenAmount;
  IERC20 immutable tokenContract;

  mapping(address => uint256) public claimedAddresses;

  constructor(
    address _tokenContract,
    uint256 _tokenAmount,
    uint256 _maticAmount
  ) {
    maticAmount = _maticAmount;
    tokenAmount = _tokenAmount;
    tokenContract = IERC20(_tokenContract);
  }

  function setMATICAmount(uint256 _amount) external onlyOwner {
    maticAmount = _amount;
  }

  function setTokenAmount(uint256 _amount) external onlyOwner {
    tokenAmount = _amount;
  }

  function claim(address payable recipient) external payable onlyOwner {
    require(claimedAddresses[recipient] == 0, 'Address already claimed');

    claimedAddresses[msg.sender] = block.timestamp;
    tokenContract.transfer(recipient, tokenAmount);
    recipient.transfer(maticAmount);
  }

  receive() external payable {}

  function depositToken(uint256 _amount) external {
    tokenContract.transferFrom(msg.sender, address(this), _amount);
  }

  function getMATICBalance() public view returns (uint256) {
    return address(this).balance;
  }

  function getTokenBalance() public view returns (uint256) {
    return tokenContract.balanceOf(address(this));
  }

  function withdrawAll() external payable onlyOwner {
    address payable recipient = payable(owner());
    tokenContract.transfer(recipient, getTokenBalance());
    recipient.transfer(getMATICBalance());
  }
}