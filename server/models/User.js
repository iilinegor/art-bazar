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
				location: String,
				basket: [ 
					{ 
						productId: Number,
						authorId: Number,
						isOrder: Boolean
					}
				],
				order: [
					{
						productId: Number, 
						userId: Number, 
						status: Number
					}
				],
				likes: [ Number ],
				access: Number,
				delivery: String,
				pay: String,
				registerAt: String
			});

mongoose.model('user', userSchema, 'user');