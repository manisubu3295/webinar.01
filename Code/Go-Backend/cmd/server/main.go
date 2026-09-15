package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"aamec-billing-go-backend/internal/billing"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}

	svc := billing.NewService()
	handler := billing.NewHandler(svc)

	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.NotFound(w, r)
			return
		}
		writeIndex(w)
	})
	handler.Routes(mux)

	addr := ":" + port
	fmt.Println("=================================================")
	fmt.Println("  AAMEC Billing System - Go backend")
	fmt.Printf("  Listening on http://localhost:%s\n", port)
	fmt.Println("=================================================")

	log.Fatal(http.ListenAndServe(addr, billing.CORS(mux)))
}

func writeIndex(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
	_, _ = w.Write([]byte(`{
  "service": "aamec-billing-go-backend",
  "status": "ok",
  "endpoints": [
    "GET  /api/products/:code",
    "POST /api/invoices",
    "GET  /api/invoices/:id",
    "POST /api/invoices/:id/cancel",
    "GET  /api/invoices?date=YYYY-MM-DD"
  ]
}`))
}
