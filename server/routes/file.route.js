import { Router } from "express";
import { getAllFiles } from "../controllers/file.controller.js";

const fileRouter = Router();

fileRouter.route("/").get(getAllFiles);

export default fileRouter;

/**
 * @swagger
 * tags:
 *   name: File
 *   description: File management and retrieval
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     File:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "652f8b5c1c8f88d91e9d8a33"
 *         fileName:
 *           type: string
 *           example: "document.pdf"
 *         folderId:
 *           type: string
 *           example: "652f8b5c1c8f88d91e9d8a20"
 *         userId:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "652f8b5c1c8f88d91e9d8a32"
 *             username:
 *               type: string
 *               example: "john_doe"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-08T12:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-08T12:00:00.000Z"
 *     FileListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/File'
 *         message:
 *           type: string
 *           example: "List of files"
 */

/**
 * @swagger
 * /api/file:
 *   get:
 *     summary: Get all files
 *     tags: [File]
 *     description: Retrieve all files. Admin can see all files, normal users can see only their own files.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched all files
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FileListResponse'
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       403:
 *         description: Forbidden - Access denied
 */
