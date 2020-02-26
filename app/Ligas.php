<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ligas extends Model
{
    protected $table = 'ligas';
	protected $fillable = ['id_liga','nombre_liga', 'maxParticipantes',  'numParticipantes'];
}
