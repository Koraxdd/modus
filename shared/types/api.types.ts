export type ApiError = {
    success: false
    error: string
}

export type ApiResult<T> = { success: true; data: T } | ApiError
