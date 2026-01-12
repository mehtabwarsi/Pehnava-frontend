import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
    filterProductApi,
    getAllProductsApi,
    getCategoryApi,
    getGenderApi,
    getProductByIdApi
} from "./publicapiservice"
import {
    addAddressApi,
    addToCartApi,
    addToWishListApi,
    checkoutApi,
    deleteAddressByIdApi,
    getAddressesApi,
    getCartApi,
    getWishListApi,
    removeFromCartApi,
    setDefaultAddressApi,
    updateAddressApi,
    updateCartQuantityApi,
    placeOrderApi,
    clearCartApi,
    getAllMyOrders,
    getMyOrderById,
    orderCancel
} from "./privateapiservices"

export const useGetAllProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: () => getAllProductsApi(),
    })
}

export const useGetProductById = (id: string) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductByIdApi(id),
    })
}

export const useFilterProduct = (filter: any) => {
    return useQuery({
        queryKey: ["filter", filter],
        queryFn: () => filterProductApi(filter),
    })
}

export const useGetGender = () => {
    return useQuery({
        queryKey: ["gender"],
        queryFn: () => getGenderApi(),
        staleTime: 0,
    })
}

export const useGetCategory = (genderId: string | undefined) => {
    return useQuery({
        queryKey: ["category", genderId],
        queryFn: () => getCategoryApi(genderId!),
        enabled: !!genderId,
        staleTime: 0,
    })
}

// private api

export const useGetWishList = (options = {}) => {
    return useQuery({
        queryKey: ["wishlist"],
        queryFn: () => getWishListApi(),
        ...options
    })
}

export const useAddToWishList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (productId: string | number) => addToWishListApi(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        },
    })
}

// address api

export const useGetAddresses = () => {
    return useQuery({
        queryKey: ["addresses"],
        queryFn: () => getAddressesApi(),
    })
}

export const useAddAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (addressData: any) => addAddressApi(addressData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
        },
    })
}

export const useUpdateAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (addressData: any) => updateAddressApi(addressData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
        },
    })
}

export const useDeleteAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (addressId: string | number) => deleteAddressByIdApi(addressId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
        },
    })
}

export const useSetDefaultAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (addressId: string | number) => setDefaultAddressApi(addressId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
        },
    })
}

// cart api

export const useGetCart = () => {
    return useQuery({
        queryKey: ["cart"],
        queryFn: () => getCartApi(),
    })
}

export const useAddToCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            productId,
            quantity,
            size,
            color,
        }: {
            productId: string;
            quantity: number;
            size: string;
            color: string;
        }) => addToCartApi(productId, quantity, size, color),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
};


export const useUpdateCartQuantity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            productId,
            quantity,
            size,
            color,
        }: {
            productId: string;
            quantity: number;
            size: string;
            color: string;
        }) =>
            updateCartQuantityApi(productId, quantity, size, color),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
};


export const useRemoveFromCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            productId,
            size,
            color,
        }: {
            productId: string;
            size: string;
            color: string;
        }) =>
            removeFromCartApi(productId, size, color),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
};

export const useClearCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => clearCartApi(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
};

export const useCheckout = () => {
    return useQuery({
        queryKey: ["checkout"],
        queryFn: () => checkoutApi(),
    })
}

export const usePlaceOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (orderData: any) => placeOrderApi(orderData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            queryClient.invalidateQueries({ queryKey: ["checkout"] });
        },
    })
}

export const useMyorders = () => {
    return useQuery({
        queryKey: ["myorders"],
        queryFn: () => getAllMyOrders(),
    })
}

export const useMyOrderById = (orderId: string) => {
    return useQuery({
        queryKey: ["myorder", orderId],
        queryFn: () => getMyOrderById(orderId),
    })
}

export const useCancelOrder = () => {
    return useMutation({
        mutationFn: ({ orderId, reason }: { orderId: string, reason: string }) => orderCancel(orderId, reason),
    })
}
