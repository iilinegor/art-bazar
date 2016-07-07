import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _products = [];
let _loadingError = null;
let _isLoading = true;

function formatProduct(data) {
    return {
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
            price: data.price,
            views: data.views,
            bays: data.bays,
            image: data.image,
            likes: data.likes
    };
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getProducts() {
        return _products;
    },

    getProduct(id) {
        return _products[0];
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    switch(action.type) {
        case AppConstants.LOAD_PRODUCT_REQUEST: {
            _isLoading = true;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_PRODUCT_SUCCESS: {
            _isLoading = false;
            _products = action.products.map( formatProduct );
            _loadingError = null;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_PRODUCT_FAIL: {
            _loadingError = action.error;

            TasksStore.emitChange();
            break;
        }

        default: {
            //console.log('No such handler');
        }
    }
});

export default TasksStore;
