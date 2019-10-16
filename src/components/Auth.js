
import decode from "jwt-decode";

export default class Auth {
    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    setToken(idToken) {
        localStorage.setItem('jwtToken', idToken);
    }

    getToken() {
        return localStorage.getItem('jwtToken')
    }

    getProfile() {
        return decode(this.getToken());
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / '1h') { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('jwtToken');
    }

}