import { Product } from "../entities/product"

export interface ILoadProduct {
    load: (id: string) => Promise<LoadProductDTO.Output>
}

export namespace LoadProductDTO {
    export type Output = Product
}