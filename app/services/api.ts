
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'http://localhost:8080'
}) 
 const token = Cookies.get('token');
api.interceptors.request.use(
    (config)=>{
        
        // const{token} = useAuth();

       

        if(token){
        config.headers.Authorization=`Bearer ${token}`
        }

        return config;
    }
)

export default api;