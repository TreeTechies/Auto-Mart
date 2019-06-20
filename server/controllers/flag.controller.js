const { Flag } = require('../models/flag.model'); //  Import User Model and Data
const { Database } = require('../helpers/db/auto_mart.db');

const db = new Database();

/* Post a flag */
postFlag = async (req, res) => {

    const result = await db.addFlag(new Flag(req.body.car_id, req.body.reason, req.body.description));

    return res.status(201).send({
        'status': 201,
        'data': result.rows[0] 
    });
}

module.exports.postFlag = postFlag;