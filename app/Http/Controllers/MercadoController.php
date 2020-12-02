<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mercado;
use App\Pilotos;
header('Access-Control-Allow-Origin: *');
class MercadoController extends Controller
{
    /**
     * Obtiene los pilotos
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      
        return Pilotos::join('escuderias', 'escuderias.id','=','pilotos.id_escuderia')->
        select( 'pilotos.id as id','pilotos.nombre as nombre','puntos','valorMercado','escuderias.nombre as escuderia')
        ->get()->random(10);
    }


    /**
     * Crea pilotos en el mercado
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {	
        Mercado::create($request);
     
    }


}

