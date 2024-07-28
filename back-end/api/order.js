import { Router } from "express"
import { ordersCollection, productsCollection } from "../models/index.js"

export default ({ config, db }) => {
    let router = Router()

    //Retrieve all orders where status = 'ordered'
    //hannah lina manar ibtissem

    //Create a new order for product 2001
    //ibtissem boualam chahd malak

    //Create order
    router.post('/', async (req, res) => {
        const newOrder = req.body;
        await ordersCollection.create(newOrder).then(response => {
            res.send({ payload: response })
        });
    });

    return router
}