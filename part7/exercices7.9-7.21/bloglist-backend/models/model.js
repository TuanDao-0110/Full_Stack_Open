const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title required"],
  },
  author: {
    type: String,
    required: [true],
  },
  url: {
    type: String,
    required: [true],
  },
  likes: {
    type: Number,
    required: [true],
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});
blogSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject._id;
    delete returnObject.__v;
  },
});

module.exports = mongoose.model("blog", blogSchema);
