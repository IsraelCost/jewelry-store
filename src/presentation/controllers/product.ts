import { HttpRequest, HttpResponse } from "."
import { ApplicationError } from "../../domain/entities/error"
import { CreateProductDTO, ICreateProduct } from "../../domain/usecases/create-product"
import { IDeleteProduct } from "../../domain/usecases/delete-product"
import { EditProductDTO, IEditProduct } from "../../domain/usecases/edit-product"
import { ILoadProduct, LoadProductDTO } from "../../domain/usecases/load-product"
import { ILoadProducts, LoadProductsDTO } from "../../domain/usecases/load-products"

export class ProductController {
    constructor(
      private readonly addProductUseCase: ICreateProduct,
      private readonly editProductUseCase: IEditProduct,
      private readonly loadProductsUseCase: ILoadProducts,
      private readonly loadProductUseCase: ILoadProduct,
      private readonly deleteProductUseCase: IDeleteProduct
    ) {}
  
    async create(request: HttpRequest): Promise<HttpResponse<CreateProductDTO.Output>> {
      try {
        const createdProduct = await this.addProductUseCase.create(request.body)
        return {
          body: createdProduct,
          code: 201
        }      
      } catch (error: any) {
        if (!(error instanceof ApplicationError)) {
          return {
            body: { message: 'Server error', name: 'ServerError' },
            code: 500
          } as any
        }
        return {
          body: { message: error.message, name: error.name },
          code: error.code
        } as any
      }
    }

    async loadById(request: HttpRequest): Promise<HttpResponse<LoadProductDTO.Output>> {
      try {
        const product = await this.loadProductUseCase.load(request.params.id)
        return {
          body: product,
          code: 200
        }      
      } catch (error: any) {
        if (!(error instanceof ApplicationError)) {
          return {
            body: { message: 'Server error', name: 'ServerError' },
            code: 500
          } as any
        }
        return {
          body: { message: error.message, name: error.name },
          code: error.code
        } as any
      }
    }

    async load(request: HttpRequest): Promise<HttpResponse<LoadProductsDTO.Output>> {
      try {
        const products = await this.loadProductsUseCase.load({ from: request.query.from, quantity: request.query.count })
        return {
          body: products,
          code: 200
        }      
      } catch (error: any) {
        if (!(error instanceof ApplicationError)) {
          return {
            body: { message: 'Server error', name: 'ServerError' },
            code: 500
          } as any
        }
        return {
          body: { message: error.message, name: error.name },
          code: error.code
        } as any
      }
    }

    async update(request: HttpRequest): Promise<HttpResponse<EditProductDTO.Output>> {
      try {
        const updatedProduct = await this.editProductUseCase.edit({ id: request.params.id, data: request.params.body })
        return {
          body: updatedProduct,
          code: 200
        }      
      } catch (error: any) {
        if (!(error instanceof ApplicationError)) {
          return {
            body: { message: 'Server error', name: 'ServerError' },
            code: 500
          } as any
        }
        return {
          body: { message: error.message, name: error.name },
          code: error.code
        } as any
      }
    }

    async delete(request: HttpRequest): Promise<HttpResponse<any>> {
      try {
        await this.deleteProductUseCase.delete(request.params.id)
        return {
          body: 'OK',
          code: 200
        }      
      } catch (error: any) {
        if (!(error instanceof ApplicationError)) {
          return {
            body: { message: 'Server error', name: 'ServerError' },
            code: 500
          } as any
        }
        return {
          body: { message: error.message, name: error.name },
          code: error.code
        } as any
      }
    }
  }