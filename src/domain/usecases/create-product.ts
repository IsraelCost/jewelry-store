import { Product } from "../entities/product";

export interface ICreateProduct {
    create: (product: CreateProductDTO.Input) => Promise<CreateProductDTO.Output>
}

export namespace CreateProductDTO {
    export type Input = {
        product: {
            name: string
            description: string
            price: number
            photos: string[]
        }
        dimension: {
            weight: number
            size: number
        }
    }

    export type Output = Product
}