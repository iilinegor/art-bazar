import mongoose from "mongoose";

const Schema = mongoose.Schema;

var userSchema = new Schema({
			    id: Number,
				email: String,
				password: String,
				name: String,
				lastName: String,
				description: String,
				photo: String,
				lacation: String,
				basket: [ Number ]
			});

mongoose.model('user', userSchema, 'user');