import axios from 'axios';

export function fetchProduct() {
    return axios.get('http://localhost:3001/products');
}

export function fetchProductByCategory(id: number) {
    return axios.get(`http://localhost:3001/products/category/${id}`);
}
