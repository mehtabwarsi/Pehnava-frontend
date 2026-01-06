import { api } from "./axios";

export const loginApi = async (token: string) => {
    const response = await api.get("user/login", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data
}

