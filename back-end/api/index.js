import { Router } from "express";
import product from "./product.js";
import user from "./user.js";
import order from "./order.js";

export default ({ config, db }) => {
    let api = Router();

    api.use('/product', product({ config, db }));
    api.use('/user', user({ config, db }));
    api.use('/order', order({ config, db }));

    return api;
};
