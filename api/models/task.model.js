const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: "Task title is required",
      minLength: [3, "Task title needs at least 3 chars"],
      maxLength: [50, "Task title needs at most 50 chars"],
    },
    list: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "List",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueTo: {
      type: Date,
      validate: {
        validator: function (dueTo) {
          return dueTo > new Date();
        },
        message: "Due date must be in the future",
      },
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
    },
  }
);

taskSchema.virtual('cards',{
    ref: 'Card',
    localField: '_id',
    foreignField: 'task',
    justOne: false,
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;