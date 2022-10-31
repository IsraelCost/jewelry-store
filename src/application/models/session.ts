import { User } from "../../domain/entities/user"

export type Session = {
    isLogged: boolean
    user: User
}