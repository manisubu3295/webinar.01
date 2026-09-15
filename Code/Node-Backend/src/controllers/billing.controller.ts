import { Request, Response } from "express";
import {
  billingService,
  ProductNotFoundError,
  InvoiceNotFoundError,
  ValidationError,
} from "../services/billing.service";

function handleError(res: Response, err: unknown): void {
  if (err instanceof ProductNotFoundError || err instanceof InvoiceNotFoundError) {
    res.status(404).json({ error: err.message });
    return;
  }
  if (err instanceof ValidationError) {
    res.status(400).json({ error: err.message });
    return;
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
}

export const getProduct = (req: Request, res: Response): void => {
  try {
    const product = billingService.getProduct(req.params.code);
    res.json(product);
  } catch (err) {
    handleError(res, err);
  }
};

export const createInvoice = async (req: Request, res: Response): Promise<void> => {
  try {
    const invoice = await billingService.createInvoice(req.body);
    res.status(201).json(invoice);
  } catch (err) {
    handleError(res, err);
  }
};

export const getInvoice = (req: Request, res: Response): void => {
  try {
    const invoice = billingService.getInvoice(req.params.id);
    res.json(invoice);
  } catch (err) {
    handleError(res, err);
  }
};

export const cancelInvoice = async (req: Request, res: Response): Promise<void> => {
  try {
    const invoice = await billingService.cancelInvoice(req.params.id);
    res.json(invoice);
  } catch (err) {
    handleError(res, err);
  }
};

export const listInvoices = (req: Request, res: Response): void => {
  const date = typeof req.query.date === "string" ? req.query.date : undefined;
  res.json(billingService.listInvoices(date));
};
