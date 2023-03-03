<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('meal_name');
            $table->string('meal_size');
            $table->integer('meal_quatity');
            $table->float('meal_price');
            $table->string('meal_name_order')->nullable();
            $table->string('meal_phone');
            $table->string('meal_adresse')->nullable();
            $table->string('meal_drink')->nullable();
            $table->string('meal_status')->default('off');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
