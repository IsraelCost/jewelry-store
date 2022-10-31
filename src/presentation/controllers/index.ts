export type HttpRequest = {
  body: any
  params: any
  query: any
}

export type HttpResponse<T> = {
  body: T
  code: number
}

export type Controller = <T>(request: HttpRequest) => Promise<HttpResponse<T>>
