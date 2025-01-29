import axios from 'axios';


export const googleAuth = (code) => axios.get(`/api/auth/google?code=${code}`);