<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Equipo extends Model
{
    protected $table = 'equipo';
    protected $fillable = ['piloto_id','escuderia_id','usuario_id','indicadorEnAlineacion'];

    /**
     * Get the user
     */
	public function usuario(){
        return $this->hasOne('App\User', 'id');
     }
    /**
     * Get the piloto
     */
	public function pilotos(){
		return $this->hasOne('App\Pilotos', 'id');
     }
    /**
     * Get the escuderia
     */
	public function escuderias(){
		return $this->hasOne('App\Escuderias', 'id');
	}
}
