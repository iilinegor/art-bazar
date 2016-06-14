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

    createProduct(data) {
        return axios.post(`${apiPrefix}/products`, data);
    },

    createUser(data) {
        return axios.post(`${apiPrefix}/user`, data);
    },

    deleteProduct(noteId) {
        return axios.delete(`${apiPrefix}/products/${noteId}`);
    }
}
