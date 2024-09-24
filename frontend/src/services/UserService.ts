import ApiService from './ApiService'

export async function apiGetUsers<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/users',
        method: 'get',
        params: data,
    })
}

export async function apiDeleteUser<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: `/users/${data.id}`,
        method: 'delete',
        data,
    })
}

export async function apiCreateUser<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/users',
        method: 'post',
        data,
    })
}

export async function apiCreateUsersBulk<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/users',
        method: 'post',
        data,
    })
}

export async function apiGetUser<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: `/users/${params.id}`,
        method: 'get',
        params,
    })
}

export async function apiPutUser<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: `/users/${data.id}`,
        method: 'put',
        data,
    })
}