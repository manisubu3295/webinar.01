// Configurable API base URL — point this at whichever backend you want to demo.
// Defaults to the Node.js/Express reference backend.
export const API_BASE_URL = "http://localhost:3000";

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new Error(
      `Could not reach the backend at ${API_BASE_URL}. Is it running?`
    );
  }

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const body = isJson ? await res.json() : null;

  if (!res.ok) {
    throw new Error(body?.error || `Request failed (HTTP ${res.status})`);
  }
  return body;
}

export function getProduct(code) {
  return request(`/api/products/${encodeURIComponent(code)}`);
}

export function createInvoice({ customerId, items }) {
  return request("/api/invoices", {
    method: "POST",
    body: JSON.stringify({ customerId: customerId || undefined, items }),
  });
}

export function getInvoice(id) {
  return request(`/api/invoices/${encodeURIComponent(id)}`);
}

export function cancelInvoice(id) {
  return request(`/api/invoices/${encodeURIComponent(id)}/cancel`, {
    method: "POST",
  });
}

export function listInvoices(date) {
  const qs = date ? `?date=${encodeURIComponent(date)}` : "";
  return request(`/api/invoices${qs}`);
}
