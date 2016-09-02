import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';

export default {
    listProducts() {
        return axios.get(`${apiPrefix}/products`);
    },

    getProduct(productId) {
        return axios.get(`${apiPrefix}/products/${productId}`);
    },

    listUsers() {
        return axios.get(`${apiPrefix}/user`);
    },

    getUser(userId) {
        return axios.get(`${apiPrefix}/user/${userId}`);
    },

    inBase(email) {
        return axios.get(`${apiPrefix}/user/inbase/${email}`);
    },

    gotProducts(id) {
        return axios.get(`${apiPrefix}/user/products/${id}`);
    },

    createProduct(data) {
        return axios.post(`${apiPrefix}/products/new`, data);
    },

    createUser(data) {
        return axios.post(`${apiPrefix}/user/new`, data);
    },

    deleteProduct() {
        return axios.post(`${apiPrefix}/products/delete`, id);
    },

    updateProduct(data) {
        return axios.post(`${apiPrefix}/products/update`, data);
    },



    updateUser(data) {
        return axios.post(`${apiPrefix}/user/update`, data);
    },

    updateUserLikes(data) {
        return axios.post(`${apiPrefix}/user/likes/update`, data);
    },

    updateUserBasket(data) {
        return axios.post(`${apiPrefix}/user/basket/update`, data);
    },

    updateUserOrder(data) {
        return axios.post(`${apiPrefix}/user/order/update`, data);
    },

    updateUserAccess(data) {
        return axios.post(`${apiPrefix}/user/access/update`, data);
    },

    ProductLikesInc(data) {
        return axios.post(`${apiPrefix}/products/likes/inc`, data);
    },

    ProductLikesDec(data) {
        return axios.post(`${apiPrefix}/products/likes/dec`, data);
    },

    upload(data) {
        return axios.post(`${apiPrefix}/upload`, data);
    },
}
