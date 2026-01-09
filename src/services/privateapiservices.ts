import privateApi from "./privateapi";

export const getWishListApi = async () => {
    try {
        const response = await privateApi.get("/user/wishlist");
        return response.data
    } catch (error) {
        throw error
    }
}

export const addToWishListApi = async (productId: string | number) => {
    try {
        const response = await privateApi.post("/user/wishlist/toggle", { productId });
        return response.data
    } catch (error) {
        throw error
    }
}

// address api
export const addAddressApi = async (addressData: any) => {
    try {
        const response = await privateApi.post("/address/addAddress", addressData);
        return response.data
    } catch (error) {
        throw error
    }
}
export const getAddressesApi = async () => {
    try {
        const response = await privateApi.get("/address/getAddresses");
        return response.data
    } catch (error) {
        throw error
    }
}

export const updateAddressApi = async (addressData: any) => {
    try {
        const response = await privateApi.put(`/address/updateAddress/${addressData._id}`, addressData);
        return response.data
    } catch (error) {
        throw error
    }
}

export const deleteAddressByIdApi = async (addressId: string | number) => {
    try {
        const response = await privateApi.delete(`/address/deleteAddress/${addressId}`);
        return response.data
    } catch (error) {
        throw error
    }
}

export const setDefaultAddressApi = async (addressId: string | number) => {
    try {
        const response = await privateApi.put(`/address/setDefaultAddress/${addressId}`);
        return response.data
    } catch (error) {
        throw error
    }
}

// cart api
export const getCartApi = async () => {
    try {
        const response = await privateApi.get("/cart/get-cart");
        return response.data
    } catch (error) {
        throw error
    }
}

export const addToCartApi = async (productId: string | number, quantity: number, size?: string, color?: string) => {
    try {
        const response = await privateApi.post("/cart/add-to-cart", { productId, quantity, size, color });
        return response.data
    } catch (error) {
        throw error
    }
}

export const updateCartQuantityApi = async (productId: string | number, quantity: number) => {
    try {
        const response = await privateApi.put("/cart/update-cart-quantity", { productId, quantity });
        return response.data
    } catch (error) {
        throw error
    }
}

export const removeFromCartApi = async (productId: string | number) => {
    try {
        const response = await privateApi.delete(`/cart/remove-from-cart/${productId}`);
        return response.data
    } catch (error) {
        throw error
    }
}
