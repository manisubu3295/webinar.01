<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * A single-row counter table. See BillingService::nextBillNumber() for
     * why this is locked with lockForUpdate() inside a transaction rather
     * than just incremented.
     */
    public function up(): void
    {
        Schema::create('bill_number_sequence', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('last_value')->default(1000);
        });

        DB::table('bill_number_sequence')->insert(['id' => 1, 'last_value' => 1000]);
    }

    public function down(): void
    {
        Schema::dropIfExists('bill_number_sequence');
    }
};
