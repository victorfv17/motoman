<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PuntosController extends Controller
{
     /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $puntuaciones = $request;

        
        foreach($puntuaciones as $puntuacion){
           
            Puntos::insert(
                [
                    'id_piloto' => $puntuacion['id_escuderia'], 
                    'id_escuderia' => $puntuacion['id_escuderia'], 
                    'nombre_piloto' => $puntuacion['nombre_piloto'], 
                    'nombre_escuderia' => $puntuacion['nombre_escuderia'], 
                    'puntosGP' =>$puntuacion['puntosGP'], 

                ]);
           
        }
    }
}
