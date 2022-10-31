import { Dimension } from "../../domain/entities/dimension";
import { ApplicationError } from "../../domain/entities/error";
import { Product } from "../../domain/entities/product";
import { Profiles } from "../../domain/entities/user";
import { EditProductRepository } from "../../domain/repositories/product";
import { EditProductDTO, IEditProduct } from "../../domain/usecases/edit-product";
import { ISessionVerifier } from "../contracts/session-verifier";
import { RequiredFieldsValidation } from "../validations/required-fields";
import { ValidationComposite } from "../validations/validation-composite";

type ProductRepository = EditProductRepository

export class EditProduct implements IEditProduct {
    constructor(
        private readonly sessionVerifier: ISessionVerifier,
        private readonly productRepository: ProductRepository
    ) {}

    private validate(input: any) {
        const validation = new ValidationComposite([new RequiredFieldsValidation(['id', 'data'])])
        const error = validation.validate(input)
        throw error
    }

    async edit(input: EditProductDTO.Input): Promise<EditProductDTO.Output> {
        this.validate(input)
        const session = this.sessionVerifier.verify()
        const unauthorized = !session.isLogged || session.user.profileId > Profiles.ADMIN
        if (unauthorized) throw new ApplicationError('Usuário não pode fazer essa operação', 401)
        const dimension = new Dimension(input.data.dimension.weight, input.data.dimension.size)
        const product = new Product(input.id, input.data.name, input.data.description, input.data.price, dimension, input.data.photos)
        const updatedProduct = await this.productRepository.edit(input.id, product)
        return updatedProduct
    }
}