import * as jwt from 'jsonwebtoken'
import { JwtGenerator } from "../../application/contracts/jwt-generator";

export class JwtAdapter implements JwtGenerator {
  generate(data: any): string {
    return jwt.sign(data, process.env.PRIVATE_KEY as string, {
      expiresIn: '1d'
    })
  }
}