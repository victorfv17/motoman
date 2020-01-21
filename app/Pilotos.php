<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pilotos extends Model
{
    protected $table = 'pilotos';
	protected $fillable = ['nombre','edad','puntos','pais','numero', 'id_escuderia'];
	
	
}
