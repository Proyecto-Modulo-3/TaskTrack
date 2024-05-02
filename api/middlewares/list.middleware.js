const List = require('../models/list.model');

module.exports.ownedBy = (req, res, next) => {
    List.findById(req.params.listId)
        .then((list) => {
            if (!list) {
                res.status(404).json({ message: 'List not found'})
            } else if (req.user.id != list.owner) {
                res.status(403).json({ message: 'Forbidden' })
            } else {
                req.list = list;
                next();
            }
        })
        .catch(next);
}