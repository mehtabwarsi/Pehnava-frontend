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
