import { Router } from "express";
import signupController from "../../controllers/auth/signup.js";

const route: Router = Router();

route.post(`/`, signupController);

export default route;
