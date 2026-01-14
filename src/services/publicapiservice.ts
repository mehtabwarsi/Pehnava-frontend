import { publicApi } from "./publicapi";

export const loginApi = async (token: string) => {
    try {
        const response = await publicApi.get("user/login", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
    } catch (error) {
        throw error
    }
}

export const getAllProductsApi = async () => {
    try {
        const response = await publicApi.get("product/get-all-products");
        return response.data
    } catch (error) {
        throw error
    }
}

export const getProductByIdApi = async (id: string) => {
    try {
        const response = await publicApi.get(`product/${id}`);
        return response.data
    } catch (error) {
        throw error
    }
}

export const filterProductApi = async (filter: any) => {
    try {
        const response = await publicApi.get("product/filter", {
            params: filter
        });
        return response.data
    } catch (error) {
        throw error
    }
}

export const getGenderApi = async () => {
    try {
        const response = await publicApi.get("category");
        return response.data
    } catch (error) {
        throw error
    }
}

export const getCategoryApi = async (genderId: string) => {
    try {
        const response = await publicApi.get("category/subcategory", {
            params: {
                genderId
            }
        });
        return response.data
    } catch (error) {
        throw error
    }
}

// get cateoseos api
export const getCategoriesApi = async () => {
    try {
        const response = await publicApi.get("catalog/getAllCatalogsAdmin");
        return response.data
    } catch (error) {
        throw error
    }
}





