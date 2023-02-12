import axios from 'axios';

export function fetchCoupon(num: number) {
    return axios.get(`http://localhost:3001/coupon?page=${num}`);
}
