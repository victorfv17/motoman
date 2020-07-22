<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Puntos extends Model
{
    protected $table = 'puntos';
    protected $fillable = ['id_piloto','id_escuderia', 'nombre_piloto', 'nombre_escuderia', 'puntosGP'];

    /**
     * Get the user
     */
	public function piloto(){
        return $this->hasOne('App\Pilotos', 'id');
    }
     /**
     * Get the user
     */
	public function nombrePiloto(){
        return $this->hasOne('App\Pilotos', 'nombre');
    }
  
     /**
     * Get the user
     */
	public function escuderia(){
        return $this->hasOne('App\Escuderias', 'id');
    }
  
     /**
     * Get the user
     */
	public function nombreEscuderia(){
        return $this->hasOne('App\Escuderias', 'nombre');
    }
  
  

}
