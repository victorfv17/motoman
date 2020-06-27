<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MercadoEscuderia extends Model
{
    protected $table = 'mercado_escuderias';
    protected $fillable = ['escuderia_id','valorMercado'];

    /**
     * Get the escuderia
     */
	public function escuderias(){
		return $this->hasOne('App\Escuderias', 'id');
	}
}
