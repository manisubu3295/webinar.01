// The billing API contract has no customer-lookup endpoint, so this is a plain
// "type the memorized customer ID" field (staff already know their regulars,
// same as the product-code lookup). It's optional — leave blank for a walk-in sale.
export default function CustomerSearch({ customerId, onChange }) {
  return (
    <div className="field-group">
      <label htmlFor="customerId">Customer ID (optional)</label>
      <input
        id="customerId"
        type="text"
        placeholder="e.g. C1001"
        value={customerId}
        onChange={(e) => onChange(e.target.value.trim())}
      />
      <p className="hint">Leave blank for a walk-in sale. Regulars get their special pricing automatically.</p>
    </div>
  );
}
