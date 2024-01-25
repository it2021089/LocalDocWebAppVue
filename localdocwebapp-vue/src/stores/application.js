import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

function checkJWT(response) {
    return response && response.success === true;
}

export const useApplicationStore = defineStore('application', () => {
    const userData = ref(null);

    const setUserData = (tempUserData) => {
        userData.value = tempUserData;
    };

    const persistUserData = () => {
        localStorage.setItem('userData', JSON.stringify(userData.value));
    };

    const loadUserData = () => {
        const tempUserData = localStorage.getItem('userData');
        try {
            userData.value = JSON.parse(tempUserData) || {};
        } catch (error) {
            console.error('Error parsing user data:', error);
            userData.value = {};
        }
    };

    const clearUserData = () => {
        localStorage.setItem('userData', JSON.stringify(null));
        userData.value = null;
        isAuthenticated.value = false;

    };
    const router = useRouter();
    const loading = ref(false);

    const logout = () => {
        loading.value = true;
        clearUserData();
        loading.value = false;
        router.push({ name: 'login' });

        setTimeout(() => {
            location.reload();
        }, 500);
      };
    const isAuthenticated = computed(() => {
        return checkJWT(userData.value);
    });

    return {
        userData,
        setUserData,
        persistUserData,
        loadUserData,
        clearUserData,
        isAuthenticated,
        checkJWT, 
        logout
    };
});
