<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Clasificacion;
use App\Puntos;
use App\Ligas;
use App\Equipo;
use App\User;
/**
 * Controlador para la clasificacion
 */
class ClasificacionController extends Controller
{
    /**
     * Obtiene los usuarios de una liga 
     * @param $liga
     * @param $campo
     * @param $direct
     */
    public function join($liga, $campo, $direct)
    {   

        return Clasificacion::join('users', 'users.id','=','clasificacion.id_usuario')
        ->where('liga_id',$liga)
        ->select('users.name','puntosTotales','puntosGP' )
        ->orderBy($campo,$direct)
        ->get();
        
    }

    /**
     * Obtiene el usuario de la clasificacion
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Clasificacion::where('id_usuario', $id)->get();
    }

}
