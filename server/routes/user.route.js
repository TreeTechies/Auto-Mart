//  Module Imports
const router = require('express').Router();
const { signUp, signIn } = require('../controllers/user.controller');

router.post('/signup', signUp);

router.post('/signin', signIn);

module.exports = router;

/**
 * @swagger
 * definitions:
 *   CreatingUser:
 *     type: object
 *     required:
 *       - last_name
 *       - first_name
 *       - email
 *       - password
 *       - address
 *     properties:
 *       last_name:
 *         type: string
 *       first_name:
 *         type: string
 *       email:
 *         type: string
 *         format: email
 *       password:
 *         type: string
 *         format: password
 *       confirmPassword:
 *         type: string
 *         format: password
 *       is_Admin:
 *         type: boolean
 *         default: false
 *       address:
 *         type: string
 *
 *   GettingUser:
 *     type: object
 *     required:
 *       - id
 *       - isAdmin
 *       - email
 *       - token
 *       - lastname
 *       - firstname
 *     properties:
 *       id:
 *         type: int
 *       isAdmin:
 *         type: boolean
 *         default: false
 *       email:
 *         type: string
 *         format: email
 *       lastname:
 *         type: string
 *       firstname:
 *         type: string
 *       token:
 *         type: any
 */

/**
 * @swagger
 *
 * /api/v1/auth/signup:
 *   post:
 *     description: Creates a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/CreatingUser'
 *     responses:
 *       201:
 *         description: Created
 *         schema:
 *           $ref: '#/definitions/CreatingUser'
 */

/**
 * @swagger
 *
 * /api/v1/auth/login:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Email to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref:  '#/definitions/GettingUser'
 *       400:
 *         description: Bad request
 *         schema:
 *           $ref: '#/definitions/Errors'
 *       401:
 *         description: Unauthorised
 *
 *       404:
 *         description: Not found
 *
 */
