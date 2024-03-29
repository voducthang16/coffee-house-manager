import axios from 'axios';

export function fetchProduct(num: number = 1) {
    return axios.get(`http://localhost:3001/products?page=${num}`);
}

export function fetchProductByCategory(id: number) {
    return axios.get(`http://localhost:3001/products/category/${id}`);
}

export function searchProduct(data: any) {
    return axios.post(`http://localhost:3001/products/search`, data);
}
