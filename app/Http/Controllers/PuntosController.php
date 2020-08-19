<?php

namespace App\Http\Controllers;
use App\Puntos;
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
        $todos = $request->all();
       foreach($todos as $row){
           $existe = Puntos::where('id_piloto',$row['id'])-> first();
           if($existe){
             Puntos::where('id_piloto',$row['id'])-> delete();
           }
            Puntos::insert([
            'id_piloto' => array_key_exists('id', $row) ? $row['id'] : null,
            'id_escuderia' => array_key_exists('id_escuderia', $row)  ? $row['id_escuderia'] : null,
            'nombre_piloto' => array_key_exists('nombre', $row)  ? $row['nombre'] : null,
            'nombre_escuderia' => array_key_exists('escuderia', $row)  ? $row['escuderia'] : null,
            'puntosGP' => $row['puntos'] 
        ]);
       }
    }
}
