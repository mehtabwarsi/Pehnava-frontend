import { useQuery } from "@tanstack/react-query"
import { filterProductApi, getAllProductsApi, getProductByIdApi } from "./apiservices"

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

