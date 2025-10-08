import { Router } from "express";
import { deleteFile, uploadFile } from "../controllers/upload.controller.js";
import upload from "../utils/upload.js";

const uploadRouter = Router();

uploadRouter.route("/").post(upload.single("file"), uploadFile);
uploadRouter.route("/:id").delete(deleteFile);

export default uploadRouter;

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: File upload and management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UploadFileRequest:
 *       type: object
 *       required:
 *         - folderId
 *         - file
 *       properties:
 *         folderId:
 *           type: string
 *           example: "652f8b5c1c8f88d91e9d8a34"
 *           description: "ID of the folder where the file will be uploaded"
 *         file:
 *           type: string
 *           format: binary
 *           description: "File to upload"
 *     UploadFileResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             fileName:
 *               type: string
 *               example: "file_123e4567-e89b-12d3-a456-426614174000.pdf"
 *             folderName:
 *               type: string
 *               example: "Documents"
 *         message:
 *           type: string
 *           example: "Upload file successfully."
 *     DeleteFileResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "File deleted successfully."
 */

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload a file
 *     tags: [Upload]
 *     description: Upload a single file to a folder. Folder ID must be provided.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UploadFileRequest'
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadFileResponse'
 *       400:
 *         description: Validation error or missing file/folder
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Folder does not exist
 *
 * /api/upload/{id}:
 *   delete:
 *     summary: Delete a file by ID
 *     tags: [Upload]
 *     description: Delete a file. Only the owner or admin can delete the file.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the file to delete
 *         example: "652f8b5c1c8f88d91e9d8a33"
 *     responses:
 *       200:
 *         description: File deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteFileResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - User not allowed to delete this file
 *       404:
 *         description: File or file path not found
 */
