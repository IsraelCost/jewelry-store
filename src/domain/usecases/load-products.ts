import { Product } from "../entities/product"

export interface ILoadProducts {
    load: (input: LoadProductsDTO.Input) => Promise<LoadProductsDTO.Output>
}

export namespace LoadProductsDTO {
    export type Input = {
        from: number
        quantity: number
    }

    export type Output = Product[]
}