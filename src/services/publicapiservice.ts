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

export const getAllProductsApi = async (page = 1, limit = 10) => {
    try {
        const response = await publicApi.get("product/get-all-products", {
            params: { page, limit }
        });
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

export const getProductBySlugApi = async (slug: string) => {
    try {
        const response = await publicApi.get(`product/s/${slug}`);
        return response.data
    } catch (error) {
        throw error
    }
}

export const filterProductApi = async (filter: any, page = 1, limit = 10) => {
    try {
        const response = await publicApi.get("product/filter", {
            params: { ...filter, page, limit }
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

export const getSubCategoryApi = async (categoryId: string) => {
    const response = await publicApi.get("category/subcategory", {
        params: {
            categoryId // ✅ backend expects this
        }
    });
    return response.data;
};

// get cateoseos api
export const getCategoriesApi = async () => {
    try {
        const response = await publicApi.get("catalog/getAllCatalogsAdmin");
        return response.data
    } catch (error) {
        throw error
    }
}

export const getCollectionsApi = async () => {
    try {
        const response = await publicApi.get("collection");
        return response.data
    } catch (error) {
        throw error
    }
}

export const getCollectionBySlugApi = async (slug: string) => {
    try {
        const response = await publicApi.get(`collection/s/${slug}`);
        return response.data
    } catch (error) {
        throw error
    }
}

export const getCollectionProductsApi = async (slug: string, page = 1, limit = 10) => {
    try {
        const response = await publicApi.get(`collection/s/${slug}/products`, {
            params: { page, limit }
        });
        return response.data
    } catch (error) {
        throw error
    }
}

export const searchProductsApi = async (search: string, page = 1, limit = 10) => {
    try {
        const response = await publicApi.get("product/search", {
            params: {
                query: search,
                page,
                limit
            }
        });
        return response.data
    } catch (error) {
        throw error
    }
}





