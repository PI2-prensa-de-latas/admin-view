export const isAuthenticated = () => {
    if (localStorage.getItem('tolken')) {
        return true;
    }
    return false;
};

export const getAuth = () => {
    if (isAuthenticated) {
        return {
            Authorization: `Bearer ${localStorage.getItem('tolken')}`
        };
    } else {
        return {};
    }
}

// export const isAuthenticated = () => true;

export const login = (value) => {
    localStorage.setItem('tolken', value);
}

export const logout = (value) => {
    localStorage.removeItem('tolken');
}