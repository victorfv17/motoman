<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTablePuntuacion extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      
        if (!Schema::hasTable('puntuacion')){
        Schema::create('puntuacion', function (Blueprint $table) {
            $table->integer('puntosGP');
            $table->integer('puntosMes');
            $table->integer('puntosCategoria');
			$table->integer('puntosTotales');
            $table->bigInteger('id_usuario')->unsigned();
            $table->timestamps();
        });
    }
     
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('puntuacion');
    }
}
