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

export const addToCartApi = async (
    productId: string,
    quantity: number,
    size: string,
    color: string
) => {
    const response = await privateApi.post(
        "/cart/add-to-cart",
        { productId, quantity, size, color }
    );
    return response.data;
};

export const updateCartQuantityApi = async (
    productId: string,
    quantity: number,
    size: string,
    color: string
) => {
    const response = await privateApi.put(
        "/cart/update-cart-quantity",
        { productId, quantity, size, color }
    );
    return response.data;
};

export const removeFromCartApi = async (
    productId: string,
    size: string,
    color: string
) => {
    const response = await privateApi.post(
        "/cart/remove-from-cart",
        { productId, size, color }
    );
    return response.data;
};

export const clearCartApi = async () => {
    try {
        const response = await privateApi.delete("/cart/clear-cart");
        return response.data
    } catch (error) {
        throw error
    }
}

// checkout api

export const checkoutApi = async () => {
    try {
        const response = await privateApi.get(`/checkout/summary`);
        return response.data
    } catch (error) {
        throw error
    }
}

// place order address 
export const placeOrderApi = async (orderData: any) => {
    try {
        const response = await privateApi.post(`/order/place-order`, orderData)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getAllMyOrders = async () => {
    try {
        const response = await privateApi.get(`/order/my-orders`)
        return response.data
    } catch (error) {

    }
}

export const getMyOrderById = async (orderId: string) => {
    try {
        const response = await privateApi.get(`/order/${orderId}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const orderCancel = async (orderId: string) => {
    try {
        const response = await privateApi.put(`/order/${orderId}/cancel`)
        return response.data
    } catch (error) {
        throw error
    }
}

