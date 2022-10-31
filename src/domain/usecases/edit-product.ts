import { Product } from "../entities/product";

export interface IEditProduct {
    edit: (input: EditProductDTO.Input) => Promise<EditProductDTO.Output>
}

export namespace EditProductDTO {
    export type Input = {
        id: string
        data: {
            name: string
            description: string
            photos: string[]
            price: number
            dimension: {
                weight: number
                size: number
            }
        }
    }

    export type Output = Product
}