interface HttpError extends Error {
  status: number
}

export const ErrorOwn = (message?: string, status?: number): HttpError => {
  const error = new Error(message) as HttpError
  error.status = status || 500
  return error
}
