import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios'

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN
const REFRESH_TOKEN = process.env.NEXT_PUBLIC_REFRESH_TOKEN

export class HttpClient {
  private readonly client: AxiosInstance

  constructor(config?: AxiosRequestConfig) {
    this.client = axios.create(config)

    this.client.interceptors.request.use(this.onRequest, this.onError)
    this.client.interceptors.response.use(this.onResponse, this.onError)
  }

  get<T>(...args: Parameters<typeof this.client.get>) {
    return this.client.get<T, T>(...args)
  }

  post<T>(...args: Parameters<typeof this.client.post>) {
    return this.client.post<T, T>(...args)
  }

  put<T>(...args: Parameters<typeof this.client.put>) {
    return this.client.put<T, T>(...args)
  }

  patch<T>(...args: Parameters<typeof this.client.patch>) {
    return this.client.patch<T, T>(...args)
  }

  delete<T>(...args: Parameters<typeof this.client.delete>) {
    return this.client.delete<T, T>(...args)
  }

  private onRequest(config: InternalAxiosRequestConfig) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)

    if (accessToken) {
      config.headers.Authorization = `${accessToken}`
    }

    return config
  }

  private onResponse(response: AxiosResponse) {
    return response.data
  }

  private onError(error: AxiosError) {
    const response = error.response as AxiosResponse

    if (isAxiosError(error)) {
      console.error(response.data)
    }

    return Promise.reject(error)
  }
}
