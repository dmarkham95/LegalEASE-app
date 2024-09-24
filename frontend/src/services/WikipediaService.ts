import ApiService from './ApiService'

export async function apiGetWikipediaData<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/wikipedia',
        method: 'get',
        params: data,
    })
}
