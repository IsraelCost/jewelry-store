import * as uuid from 'uuid'
import { IdGenerator } from "../../application/contracts/id-generator";

export class IdGeneratorAdapter implements IdGenerator {
  generate() {
    return uuid.v4()
  }
}