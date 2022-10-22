import bcryptjs from 'bcryptjs'
import { CryptComparer } from "../../application/contracts/crypt-compare";
import { Encrypter } from "../../application/contracts/encrypter";

export class Cryptor implements Encrypter, CryptComparer {
  encrypt(input: string): string {
    return bcryptjs.hashSync(input, 10)
  }

  compare(encryptedValue: string, input: string): boolean {
    return bcryptjs.compareSync(input, encryptedValue)
  }
}