<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pilotos extends Model
{
    protected $table = 'pilotos';
	protected $fillable = ['nombre','pais','numero', 'id_escuderia'];
	
	
}
