<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MercadoPiloto extends Model
{
    protected $table = 'mercadoPilotos';
    protected $fillable = ['piloto_id','valorMercado', 'liga_id'];

    /**
     * Get the piloto
     */
	public function pilotos(){
		return $this->hasOne('App\Pilotos', 'id');
     }
     
    /**
     * Get the piloto
     */
	public function ligas(){
		return $this->hasOne('App\Ligas', 'id_liga');
     }
}
