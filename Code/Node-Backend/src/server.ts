import express from "express";
import cors from "cors";
import { billingRouter } from "./routes/billing.routes";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    service: "aamec-billing-node-backend",
    status: "ok",
    endpoints: [
      "GET  /api/products/:code",
      "POST /api/invoices",
      "GET  /api/invoices/:id",
      "POST /api/invoices/:id/cancel",
      "GET  /api/invoices?date=YYYY-MM-DD",
    ],
  });
});

app.use("/api", billingRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log("=================================================");
  console.log(`  AAMEC Billing System - Node/Express backend`);
  console.log(`  Listening on http://localhost:${PORT}`);
  console.log("=================================================");
});
