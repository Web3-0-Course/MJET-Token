const Contracts = artifacts.require('./MYJET.sol');

module.exports = function(deployer){
    deployer.deploy(Contracts);
};