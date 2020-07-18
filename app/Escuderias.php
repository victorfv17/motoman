<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Escuderias extends Model
{
    protected $table = 'escuderias';
	protected $fillable = ['nombre', 'valorMercado', 'puntos'];
}
