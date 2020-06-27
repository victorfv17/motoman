<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pujas extends Model
{
    protected $table = 'pujas';
    protected $fillable = ['usuario_id','mercadoPiloto_id', 'mercadoEscuderia_id', 'valorPuja'];

    /**
     * Get the user
     */
	public function usuario(){
        return $this->hasOne('App\User', 'id');
     }
    /**
     * Get the piloto
     */
	public function mercadoPiloto(){
		return $this->hasOne('App\MercadoPiloto', 'id');
    }
      /**
     * Get the piloto
     */
	public function mercadoEscuderia(){
		return $this->hasOne('App\MercadoEscuderia', 'id');
    }

}
