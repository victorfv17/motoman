<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Ligas;
use App\User;
use App\Clasificacion;
class LigasController extends Controller
{
    /**
     * Obtiene las ligas
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ligas = Ligas::get();
       return $ligas;

    }


    /**
     * Guarda la liga
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $liga = new Ligas();
        $usuario = $request->usuario;
        $requestLiga = $request->liga;
        $liga->nombre_liga = $requestLiga['nombre_liga'];
        $liga->maxParticipantes =$requestLiga['maxParticipantes'];
        $liga->numParticipantes =$requestLiga['numParticipantes'];
       
        $liga->save();
        
        return $liga;
        
    }
   

    /**
     * Obtiene la liga
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Ligas::where('id_liga',$id)->get();
    }

}
