import { Cryptor } from "../../infra/cryptography/cryptor";
import { PgAdapter } from "../../infra/db/postgres";
import { UserRepository } from "../../infra/repositories/user";
import { JwtAdapter } from "../../infra/security/jwt";
import { IdGeneratorAdapter } from "../../infra/utils/id-generator";

const connection = new PgAdapter()

export const makeUserRepository = () => new UserRepository(connection)

export const makeCryptor = () => new Cryptor()

export const makeJwtAdapter = () => new JwtAdapter()

export const makeIdGenerator = () => new IdGeneratorAdapter()