const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema(
  {
    title: {
      type: String,
      required: "Every list must contain a title",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    color: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

listSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "list",
  justOne: false,
});

const List = mongoose.model("List", listSchema);
module.exports = List;
