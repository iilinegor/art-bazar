import mongoose from "mongoose";

const Schema = mongoose.Schema;

var marketSchema = new Schema({
			    id: Number,
				name: String,
				description: String,
				authorId: Number,
				type: String,
				subtype: String,
				location: String,
				color: String,
				size: {
					width: Number,
					height: Number,
					diametr: String,
					tall: String,
					eurosize: String
				},
				material: [ String ],
				craftTime: Number,
				delivery: String,
				pay: [ String ],
				price: Number,
				views: Number,
				bays: Number,
				image: [ String ]
			});

mongoose.model('market', marketSchema, 'market');