import { Router } from "express";
import { productsCollection } from "../models/index.js";

export default ({ config, db }) => {
    let router = Router();
    // POST /products
    router.post('/', async (req, res) => {
        let BreakException = { message: 'My error ! Please fill all info required' };
        try {
            const newProduct = req.body;
            if (newProduct.name && newProduct.price && newProduct.stock && newProduct.category) {
                // Calculate 'stocked' value
                newProduct.stocked = newProduct.stock > 0;

                await productsCollection.create(newProduct).then(response => {
                    res.send({ success: true, payload: response });
                });
            } else {
                throw BreakException;
            }
        } catch (error) {
            if (error == BreakException) {
                res.send({ error });
            } else if (error && error.code === 11000) {
                res.status(400).send({
                    success: false,
                    message: "Product with this name already exists"
                });
            } else {
                res.status(500).send({
                    success: false,
                    message: error && error.errorResponse ? error.errorResponse.errmsg : "Error"
                });
            }
        }
    });

    // PUT /products/update-stocked to update existing documents
    router.put('/update-stocked', async (req, res) => {
        try {
            const result = await productsCollection.updateMany(
                {},
                [
                    {
                        $set: {
                            stocked: { $gt: ['$stock', 0] }
                        }
                    }
                ]
            );

            res.status(200).json({ message: 'Products updated successfully', result });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while updating products' });
        }
    });

    return router;
};
