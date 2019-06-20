const { Flag } = require('../models/flag.model'); //  Import User Model and Data
const { Database } = require('../helpers/db/auto_mart.db');

const db = new Database();

/* Post a flag */
postFlag = async (req, res) => {
    const result = await db.addFlag({
        'car_id': req.body.car_id,
        'reason': req.body.reason,
        'description': req.body.description,
    });

    if(result.rowCount > 0){
        return res.status(201).send({
            'status': 201,
            'message': 'User registered sucessfuly!',
            'data': result.rows[0] 
        });
    }
    else{
        return res.status(404).send({
            'status': 404,
            'message': 'Failed to add flag'
        });
    }
}

module.exports.postFlag = postFlag;