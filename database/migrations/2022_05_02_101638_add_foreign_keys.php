<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeys extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('pilotos', function (Blueprint $table) {
         
            $table->foreign('id_escuderia')->references('id')->on('escuderias');

        });
        Schema::table('puntuacion', function (Blueprint $table) {
         
            $table->foreign('id_usuario')->references('id')->on('users');

        });
        Schema::table('users', function (Blueprint $table) {
           
            $table->foreign('liga_id')->references('id_liga')->on('ligas');
     
        });
        Schema::table('equipo', function (Blueprint $table) {  

            $table->foreign('piloto_id')->references('id')->on('pilotos');
            $table->foreign('escuderia_id')->references('id')->on('escuderias');
            $table->foreign('usuario_id')->references('id')->on('users');
     
        });
        Schema::table('mercadoPilotos', function (Blueprint $table) {

           $table->foreign('piloto_id')->references('id')->on('pilotos');
           $table->foreign('liga_id')->references('id_liga')->on('ligas');

        });
        Schema::table('mercadoEscuderias', function (Blueprint $table) {

            $table->foreign('escuderia_id')->references('id')->on('escuderias');

         });
        Schema::table('pujas', function (Blueprint $table) {
         
            $table->foreign('usuario_id')->references('id')->on('users');
            $table->foreign('mercadoPiloto_id')->references('id')->on('mercadoPilotos');
            $table->foreign('mercadoEscuderia_id')->references('id')->on('mercadoEscuderias');
          
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
