import { Router } from "express";
import signupRoute from "./signup.js";

const route: Router = Router();

route.use(`/signup`, signupRoute);
export default route;
