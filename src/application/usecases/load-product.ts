import { LoadByIdProductRepository } from "../../domain/repositories/product";
import { ILoadProduct, LoadProductDTO } from "../../domain/usecases/load-product";

type ProductRepository = LoadByIdProductRepository

export class LoadProduct implements ILoadProduct {
    constructor(
        private readonly productRepository: ProductRepository
    ) {}

    async load(id: string): Promise<LoadProductDTO.Output> {
        return await this.productRepository.loadById(id)
    }
}