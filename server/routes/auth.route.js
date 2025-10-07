import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

const authRouter = Router();
authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
export default authRouter;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and authorization
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: user123
 *               password:
 *                 type: string
 *                 example: pass1234
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     role:
 *                       type: string
 *                 token:
 *                   type: string
 *                 message:
 *                   type: string
 *                   example: User successfully created.
 *       400:
 *         description: Invalid input or password does not meet requirements
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Username and Password are required.
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and obtain JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: user123
 *               password:
 *                 type: string
 *                 example: pass1234
 *     responses:
 *       200:
 *         description: Login successful, JWT returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     role:
 *                       type: string
 *                 token:
 *                   type: string
 *                 message:
 *                   type: string
 *                   example: Login successfully.
 *       400:
 *         description: Username or password is incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Username or Password is incorrect.
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Enter JWT token to access protected routes
 */
