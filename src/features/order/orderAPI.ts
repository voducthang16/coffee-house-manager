import axios from 'axios';

export const fetchProduct = () => {
    return axios.get('http://localhost:3001/products');
};

export const insertProductToOrder = (item: any) => {
    return axios.post('http://localhost:3001/orders', item);
};
