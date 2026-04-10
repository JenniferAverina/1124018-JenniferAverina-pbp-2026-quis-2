import { Router } from "express";
import postRouter from "./PostRoutes";
import commentRouter from "./CommentRoutes";


const router: Router = Router();

router.use("/post", postRouter);
router.use("/post-comment", commentRouter);

export default router; 