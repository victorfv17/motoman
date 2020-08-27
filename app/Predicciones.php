<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Predicciones extends Model
{
    protected $table = 'predicciones';
    protected $fillable = ['usuario_id', 'piloto_id', 'posicion'];

    /**
     * Get the usuario record associated with the prediccion.
     */
	public function usuario(){
		return $this->hasOne('App\User', 'id');
    }
      /**
     * Get the usuario record associated with the prediccion.
     */
	public function piloto(){
		return $this->hasOne('App\Pilotos', 'id');
    }

}
