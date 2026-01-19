import express from "express";


import { createemitter } from "./emitter.js";
const routing = express.Router();

routing.post("/send",createemitter);


export default routing;