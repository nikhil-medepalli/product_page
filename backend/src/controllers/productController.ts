import type { Request, Response } from "express";
import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await queries.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getProductsByUserId = async (req: Request, res: Response) => {
    try {
        const {userId} = getAuth(req);
        if(!userId) return res.status(401).json({error: "Unauthorized"});

        const products = await queries.getProductsByUserId(userId);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch user products" });
    }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const product = await queries.getProductById(id);

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const {userId} = getAuth(req);
        if(!userId) return res.status(401).json({error: "Unauthorized"});

        const {title, description, imageUrl} = req.body;

        if(!title || !description || !imageUrl) return res.status(400).json({error: "Missing required fields"});

        const product = await queries.createProduct({
            title,
            description,
            imageUrl,
            userId
        })

        res.status(201).json(product)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create product" });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const {userId} = getAuth(req);
        if(!userId) return res.status(401).json({error: "Unauthorized"});

        const id = req.params.id as string;
        const {title, description, imageUrl} = req.body

        const existingProduct = await queries.getProductById(id)

        if(!existingProduct) return res.status(404).json({error: "Product not found"})

        if(userId !== existingProduct.userId) return res.status(401).json({error: "Unauthorized"})

        const updatedProduct = await queries.updateProduct(id, {
            title,
            description,
            imageUrl
        })

        res.status(200).json(updatedProduct)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to update product" })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const {userId} = getAuth(req)
        if(!userId) return res.status(401).json({error: "Unauthorized"})

        const id = req.params.id as string;
        const existingProduct = await queries.getProductById(id)

        if(!existingProduct) return res.status(404).json({error: "Product not found"})

        if(userId !== existingProduct.userId) return res.status(401).json({error: "Unauthorized"})

        await queries.deleteProduct(id)

        res.status(200).json({message: "Product deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to delete product" })
    }
}