import axios from 'axios';

export const fetchProduct = () => {
    return axios.get('http://localhost:3001/products');
};

export const createOrder = (data: any) => {
    return axios.post('http://localhost:3001/orders', data);
};

export const createOrderDetail = (data: any) => {
    return axios.post('http://localhost:3001/orders/order-detail', data);
};
