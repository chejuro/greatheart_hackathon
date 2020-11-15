const inMemoryJWTManager = () => {
    let inMemoryJWT = null;

    const getToken = () => localStorage.getItem('token');

    const setToken = (token) => {
        localStorage.setItem('token', token)
        return true;
    };

    const ereaseToken = () => {
        localStorage.setItem('token', null)
        return true;
    }

    return {
        ereaseToken,
        getToken,
        setToken,
    }
};

export default inMemoryJWTManager();