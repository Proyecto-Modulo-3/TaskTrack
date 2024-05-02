const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports.checkAuth = (req, res, next) => {
    const [schema, token] = req.headers?.authorization.split(' ');
    switch (schema.toUpperCase()) {
        case 'BEARER':

        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).json({ message: error.message });
            }

            const sub = decoded.sub;

            User.findById(sub)
            .populate({
                path: 'lists',
                populate: {
                    path: 'tasks',
                    match: { _id: req.params.id },
                    populate: {
                        path: 'cards',
                        match: { _id: req.params.id }
                    },
                },
            })
                .then((user) => {
                    if (user) {
                        req.user = user;
                        next();
                    } else {
                        res.status(401).json({ message: 'Not authorized' });
                    }
                })
                .catch(next);
        });
        break;
        default:
            res.status(401).json({ message: `Unsupported schema ${schema}`});
    }
};