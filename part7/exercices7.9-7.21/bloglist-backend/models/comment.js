const mongoose = require("mongoose");
const commnetSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'blogId required'],
        ref: 'blog'
    },
    listComments: {
        type: [String]
    }
});
commnetSchema.set("toJSON", {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
    },
});

module.exports = mongoose.model("comment", commnetSchema);