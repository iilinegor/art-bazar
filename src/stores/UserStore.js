import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _users = [];
let _loadingError = null;
let _isLoading = true;

function formatProduct(data) {
    return {
            id: data.id,
            email: data.email,
            password: data.password,
            name: data.name,
            lastName: data.lastName,
            description: data.description,
            photo: data.photo,
            location: data.location,
            basket: data.basket,
            order: data.order,
            likes: data.likes,
            delivery: data.delivery,
            pay: data.pay,
            access: data.access,
            registerAt: data.registerAt
    };
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getUsers() {
        return _users;
    },

    getUser(id) {
        return _users.filter((x) => { return x.id === id})[0];
    },

    inBase(email) {
        return _users;
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
        case AppConstants.LOAD_USER_REQUEST: {
            _isLoading = true;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_USER_SUCCESS: {
            _isLoading = false;
            _users = action.users.map( formatProduct );
            _loadingError = null;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_USER_FAIL: {
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
