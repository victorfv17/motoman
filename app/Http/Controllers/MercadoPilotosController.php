<?php

namespace App\Http\Controllers;
use App\MercadoPiloto;
use App\Pilotos;
use App\Ligas;
use App\Pujas;
use DateTime;
use Illuminate\Http\Request;

class MercadoPilotosController extends Controller
{
      /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pilotos = MercadoPiloto::
        join('pilotos', 'mercadoPilotos.piloto_id','=','pilotos.id')->
        join('escuderias', 'escuderias.id','=','pilotos.id_escuderia')->
        select( 'pilotos.id as id','pilotos.nombre as nombre','pilotos.valorMercado', 'id_escuderia', 'escuderias.nombre as escuderia', 'fecha')
        ->get();
        
        /*$mercadoPilotos = MercadoPiloto::get();
        foreach($mercadoPilotos as $mercadoPiloto){
            $piloto = Pilotos::where('id',$mercadoPiloto['id']);
            var_dump($piloto);
        }*/
        //return 
        return $pilotos;
      
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
      
        $liga = $request->liga_id;
     
        
        
     
        //$todos = $liga->all();

        /*$pilotos = Pilotos::join('escuderias', 'escuderias.id','=','pilotos.id_escuderia')->
         select( 'pilotos.id as id','pilotos.nombre as nombre','puntos','valorMercado','escuderias.nombre as escuderia')
         ->get()->random(2);*/
        //echo $liga;
        $pilotos = Pilotos::get()->random(6);
        $fechaActual = new DateTime();
        
         foreach($pilotos as $piloto){
             MercadoPiloto::insert(['piloto_id' => $piloto['id'] , 'valorMercado' => $piloto['valorMercado'], 'liga_id' =>$liga, 'fecha' => $fechaActual ]);
         }
         return $pilotos;
       /* $todos = $request->all();

		var_dump($todos);
		foreach($todos as $pil){
            MercadoPiloto::create($pil);
        }*/
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
     //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($idLiga)
    {
       
        MercadoPiloto::where('liga_id',$idLiga)->delete();
        
    }
}
