import mongoose from "mongoose";

const Schema = mongoose.Schema;

var marketSchema = new Schema({
			    id: Number,
				name: String,
				description: String,
				authorId: Number,
				type: Number,
				subtype: String,
				color: String,
				size: String,
				material: String,
				craftTime: String,
				price: Number,
				views: Number,
				bays: Number,
				likes: Number,
				image: [ String ],
				deleted: Boolean 
			});

mongoose.model('market', marketSchema, 'market');