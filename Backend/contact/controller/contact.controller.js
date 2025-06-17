
import { toContactInDetail, toContactInList } from "../dto/contact.dto.js";
import ContactModel from "../model/contact.model.js";
import { contactSchema } from "../validation/contact.validation.js";

export const contactController = {
  getContacts: async (req, res) => {
    try {
      const contacts = await ContactModel.find();

      if (!contacts || contacts.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "Contacts not found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Contacts fetched successfully",
        data: contacts.map(toContactInList),
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  getContactById: async (req, res) => {
    try {
      const { id } = req.params;

      const contact = await ContactModel.findById(id);

      if (!contact) {
        return res.status(404).json({
          status: "error",
          message: "Contact not found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Contact fetched successfully",
        data: toContactInDetail(contact),
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  createContact: async (req, res) => {
    try {
      // ✅ Validate request body using Zod
      const parsed = contactSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          status: "error",
          message: "Validation failed",
          errors: parsed.error.errors,
        });
      }

      const { name, email, phone, message } = parsed.data;

      const contact = await ContactModel.create({
        name,
        email,
        phone,
        message,
      });

      return res.status(201).json({
        status: "success",
        message: "Contact created successfully",
        data: contact,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};
