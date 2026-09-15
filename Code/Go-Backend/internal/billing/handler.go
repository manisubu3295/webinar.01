package billing

import (
	"encoding/json"
	"errors"
	"net/http"
	"strings"
)

type Handler struct {
	svc *Service
}

func NewHandler(svc *Service) *Handler {
	return &Handler{svc: svc}
}

// Routes registers all endpoints on the given mux, wrapped with CORS.
func (h *Handler) Routes(mux *http.ServeMux) {
	mux.HandleFunc("/api/products/", h.getProduct)
	mux.HandleFunc("/api/invoices", h.invoicesCollection)  // GET (list) + POST (create)
	mux.HandleFunc("/api/invoices/", h.invoiceItemOrCancel) // /api/invoices/{id} and /{id}/cancel
}

func writeJSON(w http.ResponseWriter, status int, body interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(body)
}

func writeError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, map[string]string{"error": message})
}

func (h *Handler) getProduct(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		writeError(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}
	code := strings.TrimPrefix(r.URL.Path, "/api/products/")
	if code == "" {
		writeError(w, http.StatusBadRequest, "product code is required")
		return
	}
	product, err := h.svc.GetProduct(code)
	if err != nil {
		writeError(w, http.StatusNotFound, "Product not found: "+code)
		return
	}
	writeJSON(w, http.StatusOK, product)
}

func (h *Handler) invoicesCollection(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		date := r.URL.Query().Get("date")
		writeJSON(w, http.StatusOK, h.svc.ListInvoices(date))
	case http.MethodPost:
		var req CreateInvoiceRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			writeError(w, http.StatusBadRequest, "invalid JSON body")
			return
		}
		invoice, err := h.svc.CreateInvoice(req)
		if err != nil {
			h.writeServiceError(w, err)
			return
		}
		writeJSON(w, http.StatusCreated, invoice)
	default:
		writeError(w, http.StatusMethodNotAllowed, "method not allowed")
	}
}

func (h *Handler) invoiceItemOrCancel(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimPrefix(r.URL.Path, "/api/invoices/")
	if strings.HasSuffix(path, "/cancel") {
		id := strings.TrimSuffix(path, "/cancel")
		if r.Method != http.MethodPost {
			writeError(w, http.StatusMethodNotAllowed, "method not allowed")
			return
		}
		invoice, err := h.svc.CancelInvoice(id)
		if err != nil {
			h.writeServiceError(w, err)
			return
		}
		writeJSON(w, http.StatusOK, invoice)
		return
	}

	if r.Method != http.MethodGet {
		writeError(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}
	invoice, err := h.svc.GetInvoice(path)
	if err != nil {
		h.writeServiceError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, invoice)
}

func (h *Handler) writeServiceError(w http.ResponseWriter, err error) {
	switch {
	case errors.Is(err, ErrProductNotFound), errors.Is(err, ErrInvoiceNotFound):
		writeError(w, http.StatusNotFound, err.Error())
	case errors.Is(err, ErrValidation):
		writeError(w, http.StatusBadRequest, err.Error())
	default:
		writeError(w, http.StatusInternalServerError, "internal server error")
	}
}

// CORS wraps a handler, allowing all origins — dev-only, per the shared spec.
func CORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}
