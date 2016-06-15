import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/Market';
import '../models/User';


const Market = mongoose.model('market');
const User = mongoose.model('user');

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);    
}

export function listProducts(id) {
    return Market.find();
}

export function getProduct(id) {
    return Market.find({ id : id });
}

    export function listUsers(id) {
        return User.find();
    }

    export function getUser(id) {
        return User.find({ id : id });
    }

    export function inBase(email) {
        return User.find({ email : email });
    }


export function createUser(data) {
    const user = new User({
            id: data.id,
            email: data.email,
            password: data.password,
            name: data.name,
            lastName: data.lastName,
            description: data.description,
            photo: data.photo,
            location: data.location,
            basket: data.basket,
            access: data.access,
            registerAt: data.registerAt
    });
    return user.save();
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

