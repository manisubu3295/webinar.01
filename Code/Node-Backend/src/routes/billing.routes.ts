import { Router } from "express";
import {
  getProduct,
  createInvoice,
  getInvoice,
  cancelInvoice,
  listInvoices,
} from "../controllers/billing.controller";

export const billingRouter = Router();

billingRouter.get("/products/:code", getProduct);
billingRouter.post("/invoices", createInvoice);
billingRouter.get("/invoices/:id", getInvoice);
billingRouter.post("/invoices/:id/cancel", cancelInvoice);
billingRouter.get("/invoices", listInvoices);
