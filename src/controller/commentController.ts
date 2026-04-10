import { Request, Response } from "express";
import { Comments } from "../models/Comments";



export const getComment = async (_req: Request, res: Response) => {
    try {
        const comment = await Comments.findAll();
        return res.json(comment)

    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const getCommentById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const comment = await Comments.findByPk(id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        return res.json(comment);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const createComment = async (req: Request, res: Response) => {
    try {
        console.log("BODY:", req.body);
        const comment = await Comments.create(req.body);
        return res.status(201).json(comment);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateComment = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const comment = await Comments.findByPk(id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        await comment.update(req.body);

        return res.json(comment);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const comment = await Comments.findByPk(id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        await comment.destroy();

        return res.json({ message: "Comment deleted" });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};