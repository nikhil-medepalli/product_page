import { getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import * as queries from "../db/queries"

export const createComment = async (req: Request, res: Response) => {
    try {
        const {userId} = getAuth(req);
        if(!userId) return res.status(401).json({error: "Unauthorized"});

        const productId = req.params.productId as string
        const {content} = req.body

        if(!productId || !content) return res.status(400).json({error: "Missing required fields"})

        const product = await queries.getProductById(productId)
        if(!product) return res.status(404).json({error: "Product not found"})

        const comment = await queries.createComment({
            productId,
            content,
            userId
        })

        return res.status(201).json(comment)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Failed to create comment"})
    }
}

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const {userId} = getAuth(req)
        if(!userId) return res.status(401).json({error: "Unauthorized"})

        const commentId = req.params.commentId as string

        const existingComment = await queries.getCommentById(commentId)
        if(!existingComment) return res.status(404).json({error: "Comment not found"})

        if(userId !== existingComment.userId) return res.status(401).json({error: "Unauthorized"})

        await queries.deleteComment(commentId)

        return res.status(200).json({message: "Comment deleted successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Failed to delete comment"})
    }
}