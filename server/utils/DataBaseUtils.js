import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/Market';
import '../models/User';

mongoose.Promise = global.Promise;

const Market = mongoose.model('market');
const User = mongoose.model('user');

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);    
}

export function listProducts(id) {
    return Market.find().sort({ id : 1});
}

export function getProduct(id) {
    return Market.find({ id : id }).sort({ id : 1});
}

    export function listUsers(id) {
        return User.find().sort({ id : 1});
    }

    export function getUser(id) {
        return User.find({ id : id }).sort({ id : 1});
    }

    export function inBase(email) {
        return User.find({ email : email });
    }

    export function gotProducts(id) {
        return Market.find({ authorId : id });
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
            order: data.order,
            basket: data.basket,
            likes: data.likes,
            delivery: data.delivery,
            pay: data.pay,
            access: data.access,
            registerAt: Date()
    });
    return user.save();
}

        export function updateUser(data) {
            return User.update( { "id" : data.id } , { 
                $set: { "password": data.password , 
                "name": data.name , 
                "lastName": data.lastName , 
                "description": data.description , 
                "photo": data.photo , 
                "location": data.location , 
                "pay": data.pay , 
                "delivery": data.delivery } },
                { upsert: true }, function(err, doc){ } 
            );
        }

        export function updateUserBasket(data) {
            return User.update( { "id" : data.id } , { 
                $set: { basket: data.basket }
            } );
        }

         export function updateUserOrder(data) {
            return User.update( { "id" : data.id } , { 
                $set: { order: data.order }
            } );
        }

         export function updateUserLikes(data) {
            return User.update( { "id" : data.id } , { 
                $set: { likes: data.likes }
            } );
        }

        export function updateUserAccess(data) {
            return User.update( { "id" : data.id } , { 
                $set: { access: data.access }
            } );
        }

export function createProduct(data) {
    const product = new Market({
            id: data.id,
            name: data.name,
            description: data.description,
            authorId: data.authorId,
            type: data.type,
            subtype: data.subtype,
            color: data.color,
            size: data.size,
            material: data.material,
            craftTime: data.craftTime,
            likes: 0,
            price: data.price,
            views: data.views,
            bays: data.bays,
            image: data.image,
            delete: false
    });
    return product.save();
}

export function deleteNote(id) {
    return Market.findById(id).remove();
}

        export function ProductLikesInc(data) {
            return Market.update( { "id" : data.id } , { 
                $inc : { likes: 1 }
            } );
        }

        export function ProductLikesDec(data) {
            return Market.update( { "id" : data.id } , { 
                $inc : { likes: -1 }
            } );
        }