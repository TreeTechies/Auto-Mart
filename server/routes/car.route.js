//  Module Imports
const router = require('express').Router();
const verify = require('../middleware/verify_token.middleware');
const { getAll, markCarAsSold, postCar, updatePost, viewCar, deleteCar } = require('../controllers/car.controller');

router.get('/', getAll);
router.get('/:id', viewCar);
router.delete('/:id', verify, deleteCar);
router.post('/', verify, postCar);
router.patch('/:id/price', verify, updatePost);
router.patch('/:id/status', verify, markCarAsSold);

module.exports = router;

/**
 * @swagger
 * definitions:
 *   CreatingCar:
 *     type: object
 *     required:
 *       - state
 *       - status
 *       - price
 *       - manufacturer
 *       - model
 *       - bodyType
 *       - apiKey
 *     properties:
 *       state:
 *         type: string
 *         enum:
 *           - used
 *           - new
 *       status:
 *         type: string
 *         enum:
 *           - sold
 *           - available
 *       price:
 *         type: int
 *         format: int64
 *       manufacturer:
 *         type: string
 *       model:
 *         type: string
 *       bodyType:
 *         type: string
 *
 *
 *   GettingCar:
 *     type: object
 *     required:
 *       - id
 *       - createdOn
 *       - email
 *       - manufacturer
 *       - model
 *       - price
 *       - status
 *       - state
 *     properties:
 *       id:
 *         type: string
 *       createOn:
 *         type: datetime
 *       email:
 *         type: string
 *         format: email
 *       manufacturer:
 *         type: string
 *       model:
 *         type: string
 *       price:
 *          type: float
 *       status:
 *         type: string
 *       state:
 *         type: string
 *
 */

/**
 * @swagger
 *
 * /api/v1/car:
 *   post:
 *     description: Creates a sale Ad
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/CreattingCar'
 *     responses:
 *       201:
 *         description: Created
 *         schema:
 *           $ref: '#/definitions/GettingCar'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *     security:
 *       - apiKey : []
 */

/**
 * @swagger
 *
 * /api/v1/car/<:id>/:
 *   delete:
 *     description: Delete a specific car Ad.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Id of the specific car to delete
 *         in: path
 *         type: int
 *       - name : authorization
 *         description: Access token for authentication
 *         in : header
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       403:
 *         description: Forbidden
 *     security:
 *       - apiKey : []
 */

/**
 * @swagger
 *
 * /api/v1/car/<:id>/:
 *   get:
 *     description: Return  a specific car
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Id of the specific car to return
 *         in: path
 *         type: int
 *       - name : authorization
 *         description: Access token for authentication
 *         in : header
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/GettingCar'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *     security:
 *       - apiKey : []
 */

/**
 * @swagger
 * /api/v1/car?status=available:
 *   get:
 *     description: Returns a list of all unsold cars.
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               description: All unsold cars.
 *               items:
 *                 type: object
 *                 proprties:
 *                     $ref: '#/definitions/GettingCar'
 *       404:
 *         description: Not Found
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *     security:
 *       - apiKey : []
 */

/**
 * @swagger
 * /api/v1/car?status=available&min_price=XXXValue​&max_price=XXXValue:
 *   get:
 *     description: Returns a list of all unsold cars within a price range
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               description: all unsold cars within a price range
 *               items:
 *                 type: object
 *                 proprties:
 *                     $ref: '#/definitions/GettingCar'
 *       404:
 *         description: Not Found
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *     security:
 *       - apiKey : []
 */

/**
 * @swagger
 *
 * /api/v1/car/<:id>/price:
 *   patch:
 *     description: Update the price of a car..
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Id of the specific car to update
 *         in: path
 *         type: int
 *       - name : authorization
 *         description: Access token for authentication
 *         in : header
 *         type: string
 *         required: true
 *       - name : price
 *         description: New  price
 *         in : body
 *         type: int
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/GettingCar'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       403:
 *         description: Forbidden
 *     security:
 *       - apiKey : []
 */

/**
 * @swagger
 *
 * /api/v1/car/<:id>/status:
 *   patch:
 *     description: Mark a posted car Ad as sold.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Id of the specific car to update
 *         in: path
 *         type: int
 *       - name : authorization
 *         description: Access token for authentication
 *         in : header
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/GettingCar'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *     security:
 *       - apiKey : []
 *
 *
 */

/**
 * @swagger
 * /api/v1/car/:
 *   get:
 *     description: Returns a list of all posted ads whether sold or available.
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               description: all posted ads whether sold or available.
 *               items:
 *                 type: object
 *                 proprties:
 *                     $ref: '#/definitions/GettingCar'
 *       404:
 *         description: Not Found
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *     security:
 *       - apiKey : []
 */
/**
 * @swagger
 * Securitydefinitions:
 *   APIKeyHeader:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 */