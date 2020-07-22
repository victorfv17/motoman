<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTablePuntos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('puntos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_piloto')->unsigned()->nullable();
            $table->integer('id_escuderia')->unsigned()->nullable();
            $table->string('nombre_piloto')->nullable();
            $table->string('nombre_escuderia')->nullable();
            $table->integer('puntosGP');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('table_puntos');
    }
}
