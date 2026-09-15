import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * The billing API contract has no customer-lookup endpoint, so this is a
 * plain "type the memorized customer ID" field (staff already know their
 * regulars, same as the product-code lookup). Optional — leave blank for a
 * walk-in sale.
 */
@Component({
  selector: 'app-customer-search',
  templateUrl: './customer.component.html',
})
export class CustomerComponent {
  @Input() customerId = '';
  @Output() customerIdChange = new EventEmitter<string>();

  onInput(value: string): void {
    this.customerIdChange.emit(value.trim());
  }
}
