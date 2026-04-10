import { Router } from "express";
import { createComment, deleteComment, getComment, getCommentById, updateComment } from "../controller/commentController";

const commentRouter: Router = Router();

commentRouter.get("/", getComment);
commentRouter.get("/:id", getCommentById);

commentRouter.post("/", createComment);

commentRouter.put("/:id", updateComment);

commentRouter.delete("/:id", deleteComment);


export default commentRouter;