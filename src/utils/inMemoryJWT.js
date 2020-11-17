const inMemoryJWTManager = () => {
    let inMemoryJWT = null;

    const getToken = () => localStorage.getItem('token');

    const getLogin = () => localStorage.getItem('login');

    const setToken = (token) => {
        localStorage.setItem('token', token)
        return true;
    };

    const setLogin = (login) => {
        localStorage.setItem('login', login)
        return true;
    }

    const ereaseToken = () => {
        localStorage.setItem('token', null)
        return true;
    }

    return {
        ereaseToken,
        getToken,
        setToken,
        getLogin,
        setLogin
    }
};

export default inMemoryJWTManager();