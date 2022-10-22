import { AuthController } from "../../presentation/controllers/auth";
import { makeAddUser, makeAuthenticate } from "./application";

export const makeAuthController = () => new AuthController(makeAddUser(), makeAuthenticate())