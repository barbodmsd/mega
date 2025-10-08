import { Router } from "express";
import IsAdmin from "../middlewares/IsAdmin.js";
import {
  deleteUser,
  getAllUsers,
  getUserById,
} from "../controllers/user.controller.js";
const userRouter = Router();

userRouter.route("/").get(IsAdmin, getAllUsers);
userRouter.route("/:id").get(getUserById).delete(IsAdmin, deleteUser);

export default userRouter;

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management (Admin-only and self-access routes)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "652f8b5c1c8f88d91e9d8a32"
 *         username:
 *           type: string
 *           example: "john_doe"
 *         role:
 *           type: string
 *           enum: [admin, user]
 *           example: "user"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-08T12:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-08T12:00:00.000Z"
 *     UserListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *         message:
 *           type: string
 *           example: "List of users"
 *     SingleUserResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *         message:
 *           type: string
 *           example: "User fetched successfully."
 *     DeleteUserResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         deletedUser:
 *           $ref: '#/components/schemas/User'
 *         message:
 *           type: string
 *           example: "User deleted successfully."
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     description: Retrieve all users (Admin access only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched all users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserListResponse'
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       403:
 *         description: Forbidden - Only admin can access
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     description: Get specific user info. Admin can fetch any user, normal users can only fetch their own info.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *         example: "652f8b5c1c8f88d91e9d8a32"
 *     responses:
 *       200:
 *         description: User fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleUserResponse'
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       404:
 *         description: User not found
 *
 *   delete:
 *     summary: Delete user by ID
 *     tags: [User]
 *     description: Delete a user by ID (Admin only). Cannot delete yourself.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of user to delete
 *         example: "652f8b5c1c8f88d91e9d8a32"
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteUserResponse'
 *       400:
 *         description: Cannot delete yourself
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Only admin can delete
 *       404:
 *         description: User not found
 */
