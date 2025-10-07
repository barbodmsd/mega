import { Router } from "express";
import {
  deleteFile,
  uploadMultiple,
  uploadSingle,
} from "../controllers/upload.controller.js";
import upload from "../utils/upload.js";

const uploadRouter = Router();
uploadRouter.post("/single", upload.single("file"), uploadSingle);
uploadRouter.post("/multiple", upload.array("files"), uploadMultiple);
uploadRouter.delete("/delete", deleteFile);
export default uploadRouter;

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: File upload and deletion
 */

/**
 * @swagger
 * /api/upload/single:
 *   post:
 *     summary: Upload a single file
 *     description: Upload a single file to the server.
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: string
 *                   example: "file_1700000000.png"
 *                 message:
 *                   type: string
 *                   example: "Upload file successfully."
 *       400:
 *         description: File not provided
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/upload/multiple:
 *   post:
 *     summary: Upload multiple files
 *     description: Upload multiple files to the server.
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - files
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Files uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "file_1700000000.png"
 *                 message:
 *                   type: string
 *                   example: "Upload files successfully."
 *       400:
 *         description: No files provided
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/upload/delete:
 *   delete:
 *     summary: Delete a file
 *     description: Delete a file from the server by filename.
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 example: "file_1700000000.png"
 *     responses:
 *       200:
 *         description: File deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "File deleted successfully."
 *       400:
 *         description: File not provided
 *       401:
 *         description: Unauthorized
 */
