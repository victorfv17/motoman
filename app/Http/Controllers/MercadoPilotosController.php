<?php

namespace App\Http\Controllers;
use App\MercadoPiloto;
use App\Pilotos;
use App\Ligas;
use App\Pujas;
use App\Equipo;
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
        
        $fecha_actual = date("yy-m-d");
      
        $fecha_anterior = date("yy-m-d",strtotime($fecha_actual."- 7 days")); 
       
        MercadoPiloto::where('fecha','<=',$fecha_anterior)->delete();
    
        $pilotos = MercadoPiloto::
        join('pilotos', 'mercadoPilotos.piloto_id','=','pilotos.id')->
        join('escuderias', 'escuderias.id','=','pilotos.id_escuderia')-> 
        select( 'pilotos.id as id','pilotos.nombre as nombre','pilotos.puntos as puntos','pilotos.valorMercado', 'id_escuderia', 'escuderias.nombre as escuderia', 'fecha')
        ->orderBy('mercadoPilotos.fecha','desc')
        ->where('fecha',$fecha_actual)
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
        $fechaActual = new DateTime();
        $pilotos = Pilotos::whereNotExists(function($query)
            {
                $query->select()
                        ->from('Equipo')
                        ->whereRaw('equipo.piloto_id = pilotos.id');
            })->get()->random(3);
        
        foreach($pilotos as $piloto){
            MercadoPiloto::insert(['piloto_id' => $piloto['id'] , 'valorMercado' => $piloto['valorMercado'], 'liga_id' =>$liga, 'fecha' => $fechaActual ]);
        }
        return $pilotos;

        

        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
     
        $fecha_actual = date("yy-m-d");
      
        $fecha_anterior = date("yy-m-d",strtotime($fecha_actual."- 7 days")); 
       
        MercadoPiloto::where('fecha','<=',$fecha_anterior)->delete();
    
        $pilotos = MercadoPiloto::
        join('pilotos', 'mercadoPilotos.piloto_id','=','pilotos.id')->
        join('escuderias', 'escuderias.id','=','pilotos.id_escuderia')-> 
        select( 'pilotos.id as id','pilotos.nombre as nombre','pilotos.puntos as puntos','pilotos.valorMercado', 'id_escuderia', 'escuderias.nombre as escuderia', 'fecha')
        ->orderBy('mercadoPilotos.fecha','desc')
        ->where('liga_id',$id)
        ->where('fecha',$fecha_actual)
        ->get();

        if(count($pilotos) == 0 ){
            $liga = $id;
            $fechaActual = new DateTime();
            $pilotos = Pilotos::whereNotExists(function($query)
            {
                $query->select()
                        ->from('Equipo')
                        ->whereRaw('equipo.piloto_id = pilotos.id');
            })->get()->random(3);
        
            foreach($pilotos as $piloto){
                MercadoPiloto::insert(['piloto_id' => $piloto['id'] , 'valorMercado' => $piloto['valorMercado'], 'liga_id' =>$liga, 'fecha' => $fechaActual ]);
            }
        }

        $pilotos = MercadoPiloto::
        join('pilotos', 'mercadoPilotos.piloto_id','=','pilotos.id')->
        join('escuderias', 'escuderias.id','=','pilotos.id_escuderia')-> 
        select('mercadoPilotos.id as idMercado', 'pilotos.id as id','pilotos.nombre as nombre','pilotos.puntos as puntos','pilotos.valorMercado', 'id_escuderia', 'escuderias.nombre as escuderia', 'fecha')
        ->orderBy('mercadoPilotos.fecha','desc')
        ->where('liga_id',$id)
        ->where('fecha',$fecha_actual)
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
        // foreach($itemsMercado as $item){
        //     Pujas::where('mercadoPiloto_id',$item['id'])
        // }
        
    }
}
