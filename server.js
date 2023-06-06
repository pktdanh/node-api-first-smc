const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    req.setTimeout(45 * 1000, function () {
        res.status(200).json(helper.APIReturn(1, "timeout"));
    });
    next();
});

const routes = require("./routes/APIRoutes");
routes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
