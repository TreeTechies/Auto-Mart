//  Module Imports
const router = require('express').Router();
const verify = require('../middleware/verify_token.middleware');
const { makeOrder, updateOrder } = require('../controllers/order.controller');

router.post('/', verify, makeOrder);
router.patch('/:id', verify, updateOrder);

module.exports = router;

/**
 * @swagger
 *
 * /api/v1/order/:
 *   post:
 *     description: Create a purchase order
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: order
 *         description: order object
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/CreatingOrder'
 *     responses:
 *       201:
 *         description: Created
 *         schema:
 *           $ref: '#/definitions/GettingOrder'
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
 * definitions:
 *   CreatingOrder:
 *     type: object
 *     required:
 *       - status
 *       - price
 *       - offeredPrice
 *       - carId
 *
 *     properties:
 *       offeredPrice:
 *         type: int
 *         format: int64
 *       status:
 *         type: string
 *         enum:
 *           - sold
 *           - available
 *       price:
 *         type: int
 *         format: int64
 *       carId:
 *         type: int
 *         format: int64
 *
 *   GettingOrder:
 *     type: object
 *     required:
 *       - id
 *       - createdOn
 *       - carId
 *       - offeredPrice
 *       - price
 *       - status
 *
 *     properties:
 *       id:
 *         type: int
 *       createOn:
 *         type: datetime
 *       carId:
 *         type: int
 *         format: int64
 *       price:
 *         type: int
 *         format: int64
 *       offeredPrice:
 *         type: int
 *         format: int64
 *       status:
 *         type: string
 *
 *
 *
 */

/**
 * @swagger
 *
 * /api/v1/order/<:id>/price:
 *   patch:
 *     description: Update the price of a purchase order.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Id of the specific order to update
 *         in: path
 *         type: int
 *         required: true
 *       - name : authorization
 *         description: Access token for authentication
 *         in : header
 *         type: string
 *         required: true
 *       - name : price
 *         description: New offered price
 *         in : body
 *         type: int
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/GettingOrder'
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
 *
 *
 */