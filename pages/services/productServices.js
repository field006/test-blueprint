// services/productService.js

import axios from 'axios';

const productService = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL, // Update with your API endpoint
});

export default {
  async getAll() {
    return productService.get('/');
  },

  async getById(id) {
    return productService.get(`/${id}`);
  },

  async create(data) {
    return productService.post('/', data);
  },

  async update(id, data) {
    return productService.put(`/${id}`, data);
  },

  async delete(id) {
    return productService.delete(`/${id}`);
  },
};
