import { useQuery } from "@tanstack/react-query"
import { filterProductApi, getAllProductsApi, getCategoryApi, getGenderApi, getProductByIdApi } from "./apiservices"

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
        staleTime: 0, // Ensure data is considered stale immediately
    })
}

export const useGetCategory = (genderId: string | undefined) => {
    return useQuery({
        queryKey: ["category", genderId],
        queryFn: () => getCategoryApi(genderId!),
        enabled: !!genderId, // Only run if genderId is provided
        staleTime: 0, // Ensure data is considered stale immediately
    })
}


