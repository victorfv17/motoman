<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Clasificacion extends Model
{
    protected $table = 'clasificacion';
	protected $fillable = ['puntosGP', 'puntosMes', 'puntosCategoria', 'puntosTotales', 'id_usuario'];
	/**
     * Get the escuderia record associated with the piloto.
     */
	public function usuario(){
		return $this->hasOne('App\User', 'id');
	}
}
