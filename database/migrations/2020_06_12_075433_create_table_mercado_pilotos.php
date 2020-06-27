<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableMercadoPilotos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mercadoPilotos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('piloto_id')->unsigned();
            $table->integer('valorMercado');
            $table->integer('liga_id')->unsigned();
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
        Schema::dropIfExists('mercadoPilotos');
    }
}
