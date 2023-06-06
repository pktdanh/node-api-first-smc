require("dotenv").config();
const Web3 = require("web3");
const floppyAbi = require("../contracts/Floppy.json");
const vaultAbi = require("../contracts/Vault.json");

class SmartContractDAO {
    constructor() {
        this.web3 = new Web3("https://data-seed-prebsc-1-s3.binance.org:8545/");
        this.token_address = process.env.TOKEN_ADDRESS;
        this.vault_address = process.env.VAULT_ADDRESS;
        this.withdrawer_private_address = process.env.WITHDRAWER_PRIVATE_KEY;
        this.withdrawer_address = process.env.WITHDRAWER_ADDRESS;
    }
    async withdraw(address, amount) {
        this.web3.eth.accounts.wallet.add(this.withdrawer_private_address);
        const vault_contract = await new this.web3.eth.Contract(
            vaultAbi,
            this.vault_address
        );
        const value = Web3.utils.toWei(amount.toString());
        const rs = await vault_contract.methods.withdraw(value, address).send({
            from: this.withdrawer_address,
            gas: 300000,
        });
        return rs.transactionHash;
    }
}

module.exports = SmartContractDAO;
