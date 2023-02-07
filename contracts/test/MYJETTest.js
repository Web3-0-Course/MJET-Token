const MYJET = artifacts.require("MYJET");

contract("MYJET", async accounts => {
    it("should initialize the contract with the correct name and symbol", async () => {
        let instance = await MYJET.deployed();
        let name = await instance.name();
        let symbol = await instance.symbol();


        assert.equal(name, "MY JET", "The name is not correct");
        assert.equal(symbol,"MJET","The symbol is not correct")
    });

    it("should initialize the contract with the correct total supply", async () => {
        let instance  = await MYJET.deployed();
        let totalSupply = await instance.totalSupply();


        assert.equal(totalSupply, 10000000000000, "The total supply is not correct");
    });

    it("should transfer tokens correctly", async() => {
        let instance = await MYJET.deployed();

        let from = accounts[0];
        let to = accounts[1];
        let value = 10000;

        let fromBalanceBefore = (await instance.balanceOf(from)).toNumber();
        
        let toBalanceBefore = (await instance.balanceOf(to)).toNumber();

        await instance.transfer(to, value,{from: from});

        let fromBalanceAfter = (await instance.balanceOf(from)).toNumber();
        let toBalanceAfter = (await instance.balanceOf(to)).toNumber();
        console.log("Sender : Balance Before Transfer :",fromBalanceBefore)
        console.log("Sender : Balance After Transfer :",fromBalanceAfter);
        console.log("Recipient : Balance Before Transfer :",toBalanceBefore)
        console.log("Recipient : Balance After Transfer :",toBalanceAfter);
        assert.equal(fromBalanceAfter, fromBalanceBefore - value, "The from balance after transfer");
        assert.equal(toBalanceAfter, (toBalanceBefore + value), "The to balance after the transaction");
    });
});