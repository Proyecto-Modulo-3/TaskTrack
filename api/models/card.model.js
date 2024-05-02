const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            minLength: [1, 'Every card must contain at least 1 character'],
            maxLength: [300, 'It can not contain more than 300 characters']
        },
        task: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Task'
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        }
    }
);

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;