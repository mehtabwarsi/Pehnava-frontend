import axios from "axios";
import { getAuth, signOut } from "firebase/auth";

const privateApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

privateApi.interceptors.request.use(
    async (config) => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

/* ================= RESPONSE INTERCEPTOR ================= */
privateApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            const auth = getAuth();
            await signOut(auth);
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default privateApi;
