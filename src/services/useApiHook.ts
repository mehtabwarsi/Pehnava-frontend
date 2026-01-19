import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
    filterProductApi,
    getAllProductsApi,
    getCategoriesApi,
    getGenderApi,
    getProductByIdApi,
    getSubCategoryApi,
    getCollectionsApi,
    getCollectionBySlugApi,
    getCollectionProductsApi,
    searchProductsApi
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
    orderCancel,
    cartCountApi
} from "./privateapiservices"

export const useGetAllProducts = (page = 1, limit = 10) => {
    return useQuery({
        queryKey: ["products", page, limit],
        queryFn: () => getAllProductsApi(page, limit),
    })
}

export const useInfiniteGetAllProducts = (limit = 12) => {
    return useInfiniteQuery({
        queryKey: ["products", "infinite", limit],
        queryFn: ({ pageParam = 1 }) => getAllProductsApi(pageParam, limit),
        initialPageParam: 1,
        getNextPageParam: (lastPage: any) => {
            const pagination = lastPage?.data?.pagination;
            if (pagination && pagination.currentPage < pagination.totalPages) {
                return pagination.currentPage + 1;
            }
            return undefined;
        }
    })
}

export const useGetProductById = (id: string) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductByIdApi(id),
    })
}

export const useFilterProduct = (filter: any, page = 1, limit = 12) => {
    return useQuery({
        queryKey: ["filter", filter, page, limit],
        queryFn: () => filterProductApi(filter, page, limit),
    })
}

export const useInfiniteFilterProduct = (filter: any, limit = 12) => {
    return useInfiniteQuery({
        queryKey: ["filter", "infinite", filter, limit],
        queryFn: ({ pageParam = 1 }) => filterProductApi(filter, pageParam, limit),
        initialPageParam: 1,
        getNextPageParam: (lastPage: any) => {
            const pagination = lastPage?.data?.pagination;
            if (pagination && pagination.currentPage < pagination.totalPages) {
                return pagination.currentPage + 1;
            }
            return undefined;
        }
    })
}

export const useGetGender = () => {
    return useQuery({
        queryKey: ["gender"],
        queryFn: () => getGenderApi(),
        staleTime: 0,
    })
}

export const useGetSubCategory = (categoryId?: string) => {
    return useQuery({
        queryKey: ["subCategory", categoryId],
        queryFn: () => getSubCategoryApi(categoryId!),
        enabled: !!categoryId,
        staleTime: 0,
    });
};

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

export const useGetCart = (options = {}) => {
    return useQuery({
        queryKey: ["cart"],
        queryFn: () => getCartApi(),
        ...options
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
            queryClient.invalidateQueries({ queryKey: ["cartcount"] });
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
            queryClient.invalidateQueries({ queryKey: ["cartcount"] });
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
            queryClient.invalidateQueries({ queryKey: ["cartcount"] });
        },
    });
};

export const useCartCount = (options = {}) => {
    return useQuery({
        queryKey: ["cartcount"],
        queryFn: () => cartCountApi(),
        ...options
    })
}

export const useClearCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => clearCartApi(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            queryClient.invalidateQueries({ queryKey: ["cartcount"] });
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
            queryClient.invalidateQueries({ queryKey: ["myorders"] });
            queryClient.invalidateQueries({ queryKey: ["cartcount"] });
            queryClient.invalidateQueries({ queryKey: ["product"] });
        },
    });
};

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
        mutationFn: ({ orderId, reason }: { orderId: string | undefined, reason: string }) => orderCancel(orderId, reason),
    })
}

export const useGetCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategoriesApi(),
    })
}

export const useGetCollections = () => {
    return useQuery({
        queryKey: ["collections"],
        queryFn: () => getCollectionsApi(),
    })
}

export const useGetCollectionBySlug = (slug: string) => {
    return useQuery({
        queryKey: ["collection", slug],
        queryFn: () => getCollectionBySlugApi(slug),
        enabled: !!slug,
    })
}

export const useGetCollectionProducts = (slug: string, page = 1, limit = 12) => {
    return useQuery({
        queryKey: ["collectionProducts", slug, page, limit],
        queryFn: () => getCollectionProductsApi(slug, page, limit),
        enabled: !!slug,
    })
}

export const useInfiniteGetCollectionProducts = (slug: string, limit = 12) => {
    return useInfiniteQuery({
        queryKey: ["collectionProducts", "infinite", slug, limit],
        queryFn: ({ pageParam = 1 }) => getCollectionProductsApi(slug, pageParam, limit),
        enabled: !!slug,
        initialPageParam: 1,
        getNextPageParam: (lastPage: any) => {
            const pagination = lastPage?.data?.pagination;
            if (pagination && pagination.currentPage < pagination.totalPages) {
                return pagination.currentPage + 1;
            }
            return undefined;
        }
    })
}

export const useSearchProducts = (search: string, page = 1, limit = 10) => {
    return useQuery({
        queryKey: ["search", search, page, limit],
        queryFn: () => searchProductsApi(search, page, limit),
        enabled: !!search,
    })
}
