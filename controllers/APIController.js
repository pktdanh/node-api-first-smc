"use strict";

const SmartContractDAO = require("../data/SmartContractDAO");
const helpers = require("./helper");

exports.withdraw = async function (req, res) {
    try {
        // get the address, amount from request body
        let { address, amount } = req.body;
        if (address === undefined || amount === undefined || amount <= 0) {
            return res.status(400).json(helpers.APIReturn(101, "bad request"));
        }
        console.log("call smart contract");
        // send token
        const dao = new SmartContractDAO();
        const trans = await dao.withdraw(address, amount);
        console.log(trans);
        return res.status(200).json(
            helpers.APIReturn(
                0,
                {
                    to: address,
                    amount: amount,
                    txHash: trans,
                },
                "success"
            )
        );
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(helpers.APIReturn(101, "something went wrong"));
    }
};
