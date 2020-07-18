<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MercadoEscuderia extends Model
{
    protected $table = 'mercadoEscuderias';
    protected $fillable = ['escuderia_id','valorMercado', 'liga_id', 'fecha'];

    /**
     * Get the escuderia
     */
	public function escuderias(){
		return $this->hasOne('App\Escuderias', 'id');
	}
}
