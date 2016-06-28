import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const ProductActions = {
    loadProducts() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_PRODUCT_REQUEST
        });

        api.listProducts()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_PRODUCT_SUCCESS,
                products: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_PRODUCT_FAIL,
                error: err
            })
        );
    },

    gotProducts(id) {
        AppDispatcher.dispatch({
            type: Constants.LOAD_PRODUCT_REQUEST
        });

        api.gotProducts(id)
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_PRODUCT_SUCCESS,
                products: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_PRODUCT_FAIL,
                error: err
            })
        );
    },

    loadProduct(id) {
        AppDispatcher.dispatch({
            type: Constants.LOAD_PRODUCT_REQUEST
        });

        api.getProduct(id)
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_PRODUCT_SUCCESS,
                products: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_PRODUCT_FAIL,
                error: err
            })
        );
    },

    createProduct(note) {
        api.createProduct(note)
        .then(() =>
            this.loadProducts()
        )
        .catch(err =>
            console.error(err)
        );
    },

    ProductLikesInc(note) {
        api.ProductLikesInc(note)
        .then(() =>
            this.loadProducts()
        )
        .catch(err =>
            console.error(err)
        );
    },

    ProductLikesDec(note) {
        api.ProductLikesDec(note)
        .then(() =>
            this.loadProducts()
        )
        .catch(err =>
            console.error(err)
        );
    },

    deleteProduct(noteId) {
        api.deleteProduct(noteId)
        .then(() =>
            this.loadProducts()
        )
        .catch(err =>
            console.error(err)
        );
    }
};

export default ProductActions;
