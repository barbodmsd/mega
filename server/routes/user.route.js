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
 *   name: Users
 *   description: User management (admin only for list/delete)
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a paginated list of all users (admin only).
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of results per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: createdAt
 *         description: Sort by field (prefix with '-' for descending)
 *     responses:
 *       200:
 *         description: List of all users (password field excluded)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       403:
 *         description: Forbidden (only admin)
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a single user by ID (Admin can access any user, normal user only self).
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user's ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully (password excluded)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user by ID (admin only). Cannot delete yourself.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user's ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: User deleted successfully.
 *       400:
 *         description: You cannot delete yourself
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (only admin)
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
 *           example: 6703eebc74c63feda4717b0d
 *         username:
 *           type: string
 *           example: johndoe
 *         role:
 *           type: string
 *           enum: [admin, user]
 *           example: user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-10-07T12:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-10-07T12:10:00.000Z
 *       required:
 *         - username
 *         - role
 */
