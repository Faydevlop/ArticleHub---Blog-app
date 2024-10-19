import axios from 'axios';
import store from './store'; // Import your Redux store
import { logout } from '../redux/feature/userAuthSlice'; // Import the logout action

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
            // Token is invalid or expired, so log the user out
            store.dispatch(logout());
        }
        return Promise.reject(error);
    }
);
