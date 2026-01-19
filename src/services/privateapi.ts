import axios from "axios";
import { getAuth, signOut } from "firebase/auth";

const privateApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
});

/* ================= REQUEST INTERCEPTOR ================= */
privateApi.interceptors.request.use(
    async (config) => {
        const auth = getAuth();

        // 🔥 WAIT until Firebase auth is ready (MOST IMPORTANT)
        await auth.authStateReady();

        const user = auth.currentUser;

        if (user) {
            const token = await user.getIdToken(false); // cached token
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
        if (
            error.response?.status === 401 &&
            !window.location.pathname.includes("/login")
        ) {
            const auth = getAuth();
            await signOut(auth);
            window.location.replace("/login");
        }

        return Promise.reject(error);
    }
);

export default privateApi;
