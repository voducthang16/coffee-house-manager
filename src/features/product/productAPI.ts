import axios from 'axios';

export function fetchProduct() {
    return axios.get('http://localhost:3001/products');
}
