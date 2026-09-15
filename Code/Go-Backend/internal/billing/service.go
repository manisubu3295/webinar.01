package billing

import (
	"crypto/rand"
	"errors"
	"fmt"
	"math"
	"sort"
	"strings"
	"sync"
	"time"
)

const defaultTaxRate = 0.18 // 18% GST unless a product overrides it

var (
	ErrProductNotFound = errors.New("product not found")
	ErrInvoiceNotFound = errors.New("invoice not found")
	ErrValidation      = errors.New("validation error")
)

// Service holds all demo state in memory, guarded by a single mutex.
//
// Bill numbers must never collide, even under concurrent requests. Go's
// net/http serves each request on its own goroutine, so "read the counter,
// then increment it" is a classic data race if left unprotected. We take
// mu.Lock() for the entire create/cancel critical section (read counter,
// assign bill number, append to the map) so only one goroutine can be
// inside it at a time — the same guarantee a DB row lock or a language-level
// synchronized block gives in the other stacks' implementations.
type Service struct {
	mu               sync.Mutex
	products         map[string]Product
	customers        map[string]Customer
	invoices         map[string]*Invoice
	billNumberCounter int
}

func NewService() *Service {
	s := &Service{
		products:          make(map[string]Product),
		customers:         make(map[string]Customer),
		invoices:          make(map[string]*Invoice),
		billNumberCounter: 1000,
	}
	s.seed()
	return s
}

func (s *Service) seed() {
	products := []Product{
		{Code: "P001", Name: "Basmati Rice 5kg", Price: 450, TaxRate: 0.05},
		{Code: "P002", Name: "Sunflower Oil 1L", Price: 180, TaxRate: 0.18},
		{Code: "P003", Name: "Toothpaste 100g", Price: 55, TaxRate: 0.18},
		{Code: "P004", Name: "Notebook 200pg", Price: 40, TaxRate: 0.12},
	}
	for _, p := range products {
		s.products[p.Code] = p
	}
	s.customers["C1001"] = Customer{
		ID:             "C1001",
		Name:           "Ramesh Kumar",
		SpecialPricing: map[string]float64{"P002": 165},
	}
	fmt.Printf("Seeded %d products and %d customer(s).\n", len(products), len(s.customers))
}

func (s *Service) GetProduct(code string) (Product, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	p, ok := s.products[strings.ToUpper(code)]
	if !ok {
		return Product{}, ErrProductNotFound
	}
	return p, nil
}

func (s *Service) GetInvoice(id string) (*Invoice, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	inv, ok := s.invoices[id]
	if !ok {
		return nil, ErrInvoiceNotFound
	}
	return inv, nil
}

func (s *Service) ListInvoices(date string) []*Invoice {
	s.mu.Lock()
	defer s.mu.Unlock()
	result := make([]*Invoice, 0, len(s.invoices))
	for _, inv := range s.invoices {
		if date == "" || strings.HasPrefix(inv.CreatedAt, date) {
			result = append(result, inv)
		}
	}
	sort.Slice(result, func(i, j int) bool { return result[i].CreatedAt > result[j].CreatedAt })
	return result
}

func (s *Service) CreateInvoice(req CreateInvoiceRequest) (*Invoice, error) {
	if len(req.Items) == 0 {
		return nil, fmt.Errorf("%w: at least one line item is required", ErrValidation)
	}
	for _, item := range req.Items {
		if item.ProductCode == "" || item.Quantity <= 0 {
			return nil, fmt.Errorf("%w: each item needs a productCode and a positive quantity", ErrValidation)
		}
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	var customer *Customer
	if req.CustomerID != "" {
		c, ok := s.customers[req.CustomerID]
		if !ok {
			return nil, fmt.Errorf("%w: unknown customerId: %s", ErrValidation, req.CustomerID)
		}
		customer = &c
	}

	lineItems := make([]LineItem, 0, len(req.Items))
	for _, item := range req.Items {
		product, ok := s.products[strings.ToUpper(item.ProductCode)]
		if !ok {
			return nil, fmt.Errorf("%w: %s", ErrProductNotFound, item.ProductCode)
		}
		unitPrice := product.Price
		if customer != nil {
			if special, ok := customer.SpecialPricing[product.Code]; ok {
				unitPrice = special
			}
		}
		taxRate := product.TaxRate
		if taxRate == 0 {
			taxRate = defaultTaxRate
		}
		lineSubtotal := round2(unitPrice * float64(item.Quantity))
		lineTax := round2(lineSubtotal * taxRate)
		lineItems = append(lineItems, LineItem{
			ProductCode:  product.Code,
			Quantity:     item.Quantity,
			UnitPrice:    unitPrice,
			TaxRate:      taxRate,
			LineSubtotal: lineSubtotal,
			LineTax:      lineTax,
			LineTotal:    round2(lineSubtotal + lineTax),
		})
	}

	var subtotal, tax float64
	for _, li := range lineItems {
		subtotal += li.LineSubtotal
		tax += li.LineTax
	}
	subtotal = round2(subtotal)
	tax = round2(tax)

	s.billNumberCounter++
	billNumber := fmt.Sprintf("INV-%06d", s.billNumberCounter)

	invoice := &Invoice{
		ID:         newUUID(),
		BillNumber: billNumber,
		Items:      lineItems,
		Subtotal:   subtotal,
		Tax:        tax,
		Total:      round2(subtotal + tax),
		Status:     "OPEN",
		CreatedAt:  time.Now().UTC().Format(time.RFC3339Nano),
	}
	if customer != nil {
		invoice.CustomerID = customer.ID
	}
	s.invoices[invoice.ID] = invoice
	return invoice, nil
}

func (s *Service) CancelInvoice(id string) (*Invoice, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	inv, ok := s.invoices[id]
	if !ok {
		return nil, ErrInvoiceNotFound
	}
	// Idempotent: cancelling an already-cancelled bill just returns it. The
	// bill number is never reassigned or reused (GST compliance).
	inv.Status = "CANCELLED"
	return inv, nil
}

func round2(v float64) float64 {
	return math.Round(v*100) / 100
}

func newUUID() string {
	b := make([]byte, 16)
	_, _ = rand.Read(b)
	b[6] = (b[6] & 0x0f) | 0x40 // version 4
	b[8] = (b[8] & 0x3f) | 0x80 // variant 10
	return fmt.Sprintf("%x-%x-%x-%x-%x", b[0:4], b[4:6], b[6:8], b[8:10], b[10:16])
}
