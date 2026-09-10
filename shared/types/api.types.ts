export type ApiError = {
    error: string
}

export type ApiResult<T> = T | ApiError
