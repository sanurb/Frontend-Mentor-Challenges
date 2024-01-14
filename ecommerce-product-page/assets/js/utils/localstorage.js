export const localStorageService = {
    get(key) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (e) {
            console.error('Error getting data from localStorage', e);
            return null;
        }
    },

    set(key, value) {
        try {
            const strValue = JSON.stringify(value);
            localStorage.setItem(key, strValue);
        } catch (e) {
            console.error('Error setting data in localStorage', e);
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    },

    isInStorage(key) {
        return localStorage.getItem(key) !== null;
    }
};
