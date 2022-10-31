import { ApplicationError } from "../../domain/entities/error";
import { Profiles } from "../../domain/entities/user";
import { DeleteProductRepository } from "../../domain/repositories/product";
import { IDeleteProduct } from "../../domain/usecases/delete-product";
import { ISessionVerifier } from "../contracts/session-verifier";

type ProductRepository = DeleteProductRepository

export class DeleteProduct implements IDeleteProduct {
    constructor(
        private readonly sessionVerifier: ISessionVerifier,
        private readonly productRepository: ProductRepository
    ) {}

    async delete(id: string) {
        const session = this.sessionVerifier.verify()
        const unauthorized = !session.isLogged || session.user.profileId > Profiles.ADMIN
        if (unauthorized) throw new ApplicationError('Usuário não pode fazer essa operação', 401)
        await this.productRepository.delete(id)
    }
}