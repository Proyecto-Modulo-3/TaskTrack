const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categories = require("../data/categories.json");

const listSchema = new Schema(
  {
    title: {
      type: String,
      required: "Every list must contain a title",
    },
    category: {
      type: String,
      enum: categories,
      required: "Please, select a category",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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
