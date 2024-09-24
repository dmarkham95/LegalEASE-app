import ApiService from './ApiService'

export async function apiGetSearchHistories<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/search-history',
        method: 'get',
        params: data,
    })
}

export async function apiDeleteSearchHistories<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: `/search-history/${data.id}`,
        method: 'delete',
        data,
    })
}

export async function apiCreateSearchHistory<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/search-history',
        method: 'post',
        data,
    })
}

export async function apiCreateSearchHistoriesBulk<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/search-history',
        method: 'post',
        data,
    })
}

export async function apiGetSearchHistory<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: `/search-history/${params.id}`,
        method: 'get',
        params,
    })
}

export async function apiPutSearchHistory<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: `/search-history/${data.id}`,
        method: 'put',
        data,
    })
}