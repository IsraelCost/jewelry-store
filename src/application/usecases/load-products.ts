import { LoadByCountProductRepository } from "../../domain/repositories/product";
import { ILoadProducts, LoadProductsDTO } from "../../domain/usecases/load-products";

type ProductRepository = LoadByCountProductRepository

export class LoadProducts implements ILoadProducts {
    constructor(
        private readonly productsRepository: ProductRepository
    ) {}

    async load(input: LoadProductsDTO.Input): Promise<LoadProductsDTO.Output> {
        const products = await this.productsRepository.load(input.quantity, input.from)
        return products
    }
}