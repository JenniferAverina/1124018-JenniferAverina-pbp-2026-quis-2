import { Request, Response } from "express";
import { Post } from "../models/Post";
import { Comments } from "../models/Comments";



export const getPosts = async (_req: Request, res: Response) => {
    try {
        const posts = await Post.findAll();
        return res.json({
            data: posts
        })

    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const getPostById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const posts = await Post.findByPk(id, {include: [{model: Comments}]});

        if (!posts) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.json({
            data: posts,
        })


    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const createPost = async (req: Request, res: Response) => {
    try {
        console.log("BODY:", req.body);
        const posts = await Post.create(req.body);
        return res.status(201).json(posts);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const posts = await Post.findByPk(id);

        if (!posts) {
            return res.status(404).json({ message: "Post not found" });
        }

        await posts.update(req.body);

        return res.json(posts);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const posts = await Post.findByPk(id);

        if (!posts) {
            return res.status(404).json({ message: "Post not found" });
        }

        await posts.destroy();

        return res.json({ message: "Post deleted" });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};