<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Puntuacion extends Model
{
    protected $table = 'puntuacion';
	protected $fillable = ['puntosGP', 'puntosMes', 'puntosCategoria', 'puntosTotales', 'id_usuario'];
	/**
     * Get the escuderia record associated with the piloto.
     */
	public function usuario(){
		return $this->hasOne('App\User', 'id');
	}
}
