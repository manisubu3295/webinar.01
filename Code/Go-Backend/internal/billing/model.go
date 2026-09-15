package billing

type Product struct {
	Code    string  `json:"code"`
	Name    string  `json:"name"`
	Price   float64 `json:"price"`
	TaxRate float64 `json:"taxRate"`
}

type Customer struct {
	ID             string             `json:"id"`
	Name           string             `json:"name"`
	SpecialPricing map[string]float64 `json:"specialPricing,omitempty"`
}

type LineItem struct {
	ProductCode  string  `json:"productCode"`
	Quantity     int     `json:"quantity"`
	UnitPrice    float64 `json:"unitPrice"`
	TaxRate      float64 `json:"taxRate"`
	LineSubtotal float64 `json:"lineSubtotal"`
	LineTax      float64 `json:"lineTax"`
	LineTotal    float64 `json:"lineTotal"`
}

type Invoice struct {
	ID         string     `json:"id"`
	BillNumber string     `json:"billNumber"`
	CustomerID string     `json:"customerId,omitempty"`
	Items      []LineItem `json:"items"`
	Subtotal   float64    `json:"subtotal"`
	Tax        float64    `json:"tax"`
	Total      float64    `json:"total"`
	Status     string     `json:"status"` // OPEN | CANCELLED
	CreatedAt  string     `json:"createdAt"`
}

type CreateInvoiceItem struct {
	ProductCode string `json:"productCode"`
	Quantity    int    `json:"quantity"`
}

type CreateInvoiceRequest struct {
	CustomerID string              `json:"customerId"`
	Items      []CreateInvoiceItem `json:"items"`
}
