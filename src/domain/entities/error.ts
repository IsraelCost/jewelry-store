export class ApplicationError extends Error {
    code: number

    constructor(
        message: string,
        code: number,
        name?: string
    ) {
        super(message)
        this.name = name ?? ''
        this.code = code
    }
}