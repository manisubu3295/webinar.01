<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\CustomerSpecialPrice;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed 4 sample products and 1 sample customer with special pricing.
     * Idempotent (updateOrCreate) so re-running it is safe.
     */
    public function run(): void
    {
        $products = [
            ['code' => 'P001', 'name' => 'Basmati Rice 5kg', 'price' => 450.00, 'tax_rate' => 0.05],
            ['code' => 'P002', 'name' => 'Sunflower Oil 1L', 'price' => 180.00, 'tax_rate' => 0.18],
            ['code' => 'P003', 'name' => 'Toothpaste 100g', 'price' => 55.00, 'tax_rate' => 0.18],
            ['code' => 'P004', 'name' => 'Notebook 200pg', 'price' => 40.00, 'tax_rate' => 0.12],
        ];
        foreach ($products as $p) {
            Product::updateOrCreate(['code' => $p['code']], $p);
        }

        $customer = Customer::updateOrCreate(['id' => 'C1001'], ['name' => 'Ramesh Kumar']);
        CustomerSpecialPrice::updateOrCreate(
            ['customer_id' => $customer->id, 'product_code' => 'P002'],
            ['price' => 165.00]
        );

        $this->command->info('Seeded '.count($products).' products and 1 customer (with special pricing on P002).');
    }
}
