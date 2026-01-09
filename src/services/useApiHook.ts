import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { filterProductApi, getAllProductsApi, getCategoryApi, getGenderApi, getProductByIdApi } from "./publicapiservice"
import { addToWishListApi, getWishListApi } from "./privateapiservices"

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


