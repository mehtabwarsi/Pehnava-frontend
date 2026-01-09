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
