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
