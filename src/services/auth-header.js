export default function authHeader() {

    const user = JSON.parse(localStorage.getItem('user'));
    // alert('access token se pehle auth  header me');
    if (user && user.token) {
        // console.log('user token -> ' + JSON.stringify(user));
        // alert('access token ke andar aa chuke hain');
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
}