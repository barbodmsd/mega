import { Router } from "express";
import {
  createFolder,
  deleteFolder,
  getAllFolders,
} from "../controllers/folder.controller.js";

const folderRouter = Router();

folderRouter.route("/").get(getAllFolders).post(createFolder);
folderRouter.route("/:id").delete(deleteFolder);

export default folderRouter;

/**
 * @swagger
 * tags:
 *   name: Folder
 *   description: Folder management (CRUD operations)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Folder:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "652f8b5c1c8f88d91e9d8a34"
 *         folderName:
 *           type: string
 *           example: "Documents"
 *         userId:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "652f8b5c1c8f88d91e9d8a32"
 *             username:
 *               type: string
 *               example: "john_doe"
 *         files:
 *           type: array
 *           items:
 *             type: string
 *             example: "652f8b5c1c8f88d91e9d8a33"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-08T12:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-08T12:00:00.000Z"
 *     FolderListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Folder'
 *         message:
 *           type: string
 *           example: "List of folders"
 *     SingleFolderResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           $ref: '#/components/schemas/Folder'
 *         message:
 *           type: string
 *           example: "Folder created successfully."
 *     DeleteFolderResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         deletedFolder:
 *           $ref: '#/components/schemas/Folder'
 *         message:
 *           type: string
 *           example: "Folder deleted successfully."
 */

/**
 * @swagger
 * /api/folder:
 *   get:
 *     summary: Get all folders
 *     tags: [Folder]
 *     description: Retrieve all folders. Admin can see all folders; normal users can see only their own folders.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched all folders
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FolderListResponse'
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       403:
 *         description: Forbidden - Access denied
 *
 *   post:
 *     summary: Create a new folder
 *     tags: [Folder]
 *     description: Create a new folder for the logged-in user. Folder name must be unique.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - folderName
 *             properties:
 *               folderName:
 *                 type: string
 *                 example: "Documents"
 *     responses:
 *       201:
 *         description: Folder created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleFolderResponse'
 *       400:
 *         description: Validation error or folder already exists
 *       401:
 *         description: Unauthorized
 *
 * /api/folder/{id}:
 *   delete:
 *     summary: Delete a folder by ID
 *     tags: [Folder]
 *     description: Delete a folder. Only the owner or admin can delete a folder.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the folder to delete
 *         example: "652f8b5c1c8f88d91e9d8a34"
 *     responses:
 *       200:
 *         description: Folder deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteFolderResponse'
 *       400:
 *         description: Folder doesn't exist
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - User not allowed to delete this folder
 *       404:
 *         description: Folder not found in DB
 */
