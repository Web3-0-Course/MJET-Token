// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract MYJET{
    address public owner; // '0xC5308Fd7bE9792Af18B34AF0A135cd21d18eBbFc';
    string public name = "MY JET";
    string public symbol = "MJET";
    uint8 public decimals = 18;
    uint256 public totalSupply ;

    constructor(){
        owner = msg.sender;
        totalSupply = 10000000000000;
        balanceOf[owner] = totalSupply;
    }

    mapping(address => uint256) public balanceOf;


    event Transfer(address indexed from, address indexed to, uint256 value);


    function transfer(address _to, uint256 _value) public {
        require(balanceOf[msg.sender] >= _value && _value > 0, "Insufficient funds");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value; 
        emit Transfer(msg.sender, _to, _value);
    }

}