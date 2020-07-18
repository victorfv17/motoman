<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableEquipo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('equipo', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('piloto_id')->unsigned()->nullable();
            $table->integer('escuderia_id')->unsigned()->nullable();
            $table->bigInteger('usuario_id')->unsigned();
            $table->boolean('indicadorEnAlineacion')->default(false);
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
        Schema::dropIfExists('table_equipo');
    }
}
