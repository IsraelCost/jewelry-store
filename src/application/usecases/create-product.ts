import { Dimension } from "../../domain/entities/dimension";
import { ApplicationError } from "../../domain/entities/error";
import { Product } from "../../domain/entities/product";
import { Profiles } from "../../domain/entities/user";
import { SaveProductRepository } from "../../domain/repositories/product";
import { CreateProductDTO, ICreateProduct } from "../../domain/usecases/create-product";
import { IdGenerator } from "../contracts/id-generator";
import { ISessionVerifier } from "../contracts/session-verifier";
import { RequiredFieldsValidation } from "../validations/required-fields";
import { ValidationComposite } from "../validations/validation-composite";

type ProductRepository = SaveProductRepository

export class CreateProduct implements ICreateProduct {
    constructor(
        private readonly sessionVerifier: ISessionVerifier,
        private readonly idGenerator: IdGenerator,
        private readonly productRepository: ProductRepository
    ) {}

    private validate(input: any) {
        const validation = new ValidationComposite([new RequiredFieldsValidation(['product', 'dimension'])])
        const error = validation.validate(input)
        throw error
    }

    async create(input: CreateProductDTO.Input): Promise<CreateProductDTO.Output> {
        this.validate(input)
        const session = this.sessionVerifier.verify()
        const unauthorized = !session.isLogged || session.user.profileId > Profiles.ADMIN
        if (unauthorized) throw new ApplicationError('Usuário não pode fazer essa operação', 401)
        const productId = this.idGenerator.generate()
        const dimension = new Dimension(input.dimension.weight, input.dimension.size)
        const product = new Product(productId, input.product.name, input.product.description, input.product.price, dimension, input.product.photos)
        const createdProduct = await this.productRepository.save(product)
        return createdProduct
    }
}