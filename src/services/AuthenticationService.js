import axios from "axios";

const API_URL = 'http://localhost:8082/api/auth/';

class AuthenticationService {
    register(username, email, password) {
        return axios.post(API_URL + 'signup', {
            username,
            email,
            password
        }).then(response => {
            return response.data;
        });
    }
    login(username, password) {
        return axios
            .post(API_URL + 'signin', {
                username,
                password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }
    getCurrentUser() {
        const user = JSON.parse(localStorage.getItem('user'));
        return user;

    }
}
export default new AuthenticationService();