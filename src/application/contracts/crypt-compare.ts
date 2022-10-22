export interface CryptComparer {
  compare: (encryptedValue: string, input: string) => boolean
}