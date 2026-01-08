import { api } from "./api";

export const loginApi = async (token: string) => {
    const response = await api.get("user/login", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data
}

export const getAllProductsApi = async () => {
    const response = await api.get("product/get-all-products");
    return response.data
}

export const getProductByIdApi = async (id: string) => {
    const response = await api.get(`product/${id}`);
    return response.data
}

export const filterProductApi = async (filter: any) => {
    const response = await api.get("product/filter", {
        params: filter
    });
    return response.data
}



