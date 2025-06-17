import express from "express";
import { contactController } from "../controller/contact.controller.js";
const contactRouter = express.Router();




contactRouter.get("/contacts", contactController.getContacts);
contactRouter.get("/contacts/:id", contactController.getContactById);

contactRouter.post("/contacts", contactController.createContact);

export default contactRouter;