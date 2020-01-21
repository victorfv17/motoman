<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTablePilotos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pilotos', function (Blueprint $table) {
            $table->increments('id') ->primary;
			$table->string('nombre');
            $table->integer('edad');
            $table->integer('puntos');
			$table->string('pais');
			$table->integer('numero');
            $table->integer('id_escuderia')->unsigned();
            $table->foreign('id_escuderia')->references('id')->on('escuderias');


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
        Schema::dropIfExists('pilotos');
    }
}
