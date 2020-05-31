<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableMercado extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('table_mercado', function (Blueprint $table) {
            $table->increments('id');
            $table->string('piloto');
            $table->string('escuderia');
            $table->integer('valorMercado');
            $table->integer('valorPuja');
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
        Schema::dropIfExists('table_mercado');
    }
}
