import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/Market';

const Market = mongoose.model('market');

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listProducts(id) {
    return Market.find();
}

export function getProduct(id) {
    return Market.find({ id : id });
}

export function createProduct(data) {
    const product = new Market({
            id: data.id,
            name: data.name,
            description: data.description,
            authorId: data.authorId,
            type: data.type,
            subtype: data.subtype,
            location: data.location,
            color: data.color,
            size: data.size,
            material: data.material,
            craftTime: data.craftTime,
            delivery: data.delivery,
            pay: data.pay,
            price: data.price,
            views: data.views,
            bays: data.bays,
            image: data.image
    });

    return product.save();
}

export function deleteNote(id) {
    return Market.findById(id).remove();
}

