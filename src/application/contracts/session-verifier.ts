import { Session } from "../models/session";

export interface ISessionVerifier {
    verify: () => Session
}