import { Router } from "express";
import { signup } from "../controller/user.controller";
import { catchControllerError } from "../utility/catchControllerErrors";
import { login } from "../controller/auth.controller";

const router = Router()

router.route('/signup').post(catchControllerError(signup))
router.route('/login').post(catchControllerError(login))
export {router as userRoute}