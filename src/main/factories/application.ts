import { AddUser } from "../../application/usecases/add-user";
import { Authenticate } from "../../application/usecases/authenticate";
import { makeCryptor, makeIdGenerator, makeJwtAdapter, makeUserRepository } from "./infra";

export const makeAddUser = () => new AddUser(makeUserRepository(), makeIdGenerator(), makeCryptor())

export const makeAuthenticate = () => new Authenticate(makeUserRepository(), makeCryptor(), makeJwtAdapter())