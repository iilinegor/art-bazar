import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const UserActions = {
    loadUsers() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_USER_REQUEST
        });

        api.listUsers()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_USER_SUCCESS,
                users: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_USER_FAIL,
                error: err
            })
        );
    },

    loadUser(id) {
        AppDispatcher.dispatch({
            type: Constants.LOAD_USER_REQUEST
        });

        api.getUser(id)
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_USER_SUCCESS,
                users: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_USER_FAIL,
                error: err
            })
        );
    },

    inBase(email) {
        AppDispatcher.dispatch({
            type: Constants.LOAD_USER_REQUEST
        });

        api.inBase(email)
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_USER_SUCCESS,
                users: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_USER_FAIL,
                error: err
            })
        );
    },

    createUser(note) {
        api.createUser(note)
        .then(() =>
            this.loadUsers()
        )
        .catch(err =>
            console.error(err)
        );
    },

    updateUser(note) {
        api.updateUser(note)
        .then(() =>
            this.loadUsers()
        )
        .catch(err =>
            console.error(err)
        );
    },

    updateUserLikes(note) {
        api.updateUserLikes(note)
        .then(() =>
            this.loadUsers()
        )
        .catch(err =>
            console.error(err)
        );
    },

    updateUserBasket(note) {
        api.updateUserBasket(note)
        .then(() =>
            this.loadUsers()
        )
        .catch(err =>
            console.error(err)
        );
    },

    updateUserAccess(note) {
        api.updateUserAccess(note)
        .then(() =>
            this.loadUsers()
        )
        .catch(err =>
            console.error(err)
        );
    },

    deleteUser(noteId) {
        api.deleteUser(noteId)
        .then(() =>
            this.loadUsers()
        )
        .catch(err =>
            console.error(err)
        );
    }
};

export default UserActions;
