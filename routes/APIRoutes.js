"use strict";

module.exports = function (app) {
    const api = require("../controllers/APIController");
    app.post("/api/withdraw", api.withdraw);
};
