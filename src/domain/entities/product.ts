import { Dimension } from "./dimension";

export class Product {
    constructor (
        private readonly id: string,
        private readonly name: string,
        private readonly description: string,
        private readonly price: number,
        private readonly dimension: Dimension,
        private readonly photos: string[]
    ) {}
}