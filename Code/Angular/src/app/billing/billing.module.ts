import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BillingComponent } from './billing.component';
import { CustomerComponent } from '../customer/customer.component';

@NgModule({
  declarations: [BillingComponent, CustomerComponent],
  imports: [CommonModule, FormsModule],
  exports: [BillingComponent],
})
export class BillingModule {}
