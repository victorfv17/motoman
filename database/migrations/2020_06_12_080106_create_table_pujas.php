<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTablePujas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pujas', function (Blueprint $table) {
            $table->increments('id');
            $table->bigInteger('usuario_id')->unsigned();
            $table->integer('mercadoPiloto_id')->unsigned()->nullable();
            $table->integer('mercadoEscuderia_id')->unsigned()->nullable();
            $table->integer('valorPuja')->unsigned();
            $table->boolean('visible')->default('N');
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
        Schema::dropIfExists('table_pujas');
    }
}
