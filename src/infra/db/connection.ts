export interface Connection {
  close: () => Promise<void>
  query: (query: string, params: any[]) => Promise<any>
}