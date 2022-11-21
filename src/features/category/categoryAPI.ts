import axios from 'axios';

export function fetchCategory() {
    return axios.get('http://localhost:3001/category');
}
