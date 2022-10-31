import { Product } from "../entities/product";

export interface SaveProductRepository {
    save: (product: Product) => Promise<Product>
}

export interface LoadByCountProductRepository {
    load: (count: number, from: number) => Promise<Product[]>
}

export interface LoadByIdProductRepository {
    loadById: (id: string) => Promise<Product>
}

export interface EditProductRepository {
    edit: (id: string, data: Product) => Promise<Product>
}

export interface DeleteProductRepository {
    delete: (id: string) => Promise<void>
}