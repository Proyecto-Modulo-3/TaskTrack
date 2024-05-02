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

// OPCION 2:

//  module.exports.checkAuth = (req, res, next) => {
//     const token = req.headers?.authorization.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'Token not provided' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: 'Invalid token' });
//     }
// };

module.exports.checkRole = (role) => {
    return (req, res, next) => {
        const user = req.user;
        if (user && user.role === role) {
            next();
        } else {
            res.status(403).json({ message: 'You are not authorized'});
        }
    }
};