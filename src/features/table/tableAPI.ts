import axios from 'axios';

export function fetchTable(id: number) {
    return axios.get(`http://localhost:3001/table/floor/${id}`);
}
