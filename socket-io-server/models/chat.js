const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema
const chatSchema = new Schema(
	{
		message: {
			type: String,
			required: true
		},
		sender: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

// Model
const Chat = mongoose.model("Chat", chatSchema); // will look for "Blogs" collection in the db
module.exports = Chat;
