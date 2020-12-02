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
     * Obtiene los pilotos del mercado
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pilotosPujas = [];
        $fecha_actual = date("yy-m-d");
      
        $fecha_anterior = date("yy-m-d",strtotime($fecha_actual."- 7 days")); 
       
        MercadoPiloto::where('fecha','<=',$fecha_anterior)->delete();
    
        $pilotos = MercadoPiloto::
        join('pilotos', 'mercadoPilotos.piloto_id','=','pilotos.id')->
        join('escuderias', 'escuderias.id','=','pilotos.id_escuderia')-> 
        select( 'mercadoPilotos.id as idMercado','pilotos.id as id','pilotos.nombre as nombre','pilotos.puntos as puntos','pilotos.valorMercado', 'id_escuderia', 'escuderias.nombre as escuderia', 'fecha')
        ->orderBy('mercadoPilotos.fecha','desc')
        ->where('fecha',$fecha_actual)
        ->get();

        return $pilotos;
      
    }

    /**
     * Guarda los pilotos en el mercado
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
            })->get()->random(4);
        
        foreach($pilotos as $piloto){
            MercadoPiloto::insert(['piloto_id' => $piloto['id'] , 'valorMercado' => $piloto['valorMercado'], 'liga_id' =>$liga, 'fecha' => $fechaActual ]);
        }
        return $pilotos;

        

        
    }

    /**
     *Obtiene los pilotos del mercado
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {   
        
        $liga = $request->liga;
        $usuario = $request->usuario;
    
        $fecha_actual = date("yy-m-d");
      
        $fecha_anterior = date("yy-m-d",strtotime($fecha_actual."- 7 days")); 
       
        MercadoPiloto::where('fecha','<=',$fecha_anterior)->delete();
    
        $pilotos = MercadoPiloto::
        join('pilotos', 'mercadoPilotos.piloto_id','=','pilotos.id')->
        join('escuderias', 'escuderias.id','=','pilotos.id_escuderia')-> 
        select( 'pilotos.id as id','pilotos.nombre as nombre','pilotos.puntos as puntos','pilotos.valorMercado', 'id_escuderia', 'escuderias.nombre as escuderia', 'fecha')
        ->orderBy('mercadoPilotos.fecha','desc')
        ->where('liga_id',$liga)
        ->where('fecha',$fecha_actual)
        ->get();

        if(count($pilotos) == 0 ){
            
            $fechaActual = new DateTime();
            $pilotos = Pilotos::whereNotExists(function($query)
            {
                $query->select()
                        ->from('Equipo')
                        ->whereRaw('equipo.piloto_id = pilotos.id');
            })->get()->random(4);
        
            foreach($pilotos as $piloto){
                MercadoPiloto::insert(['piloto_id' => $piloto['id'] , 'valorMercado' => $piloto['valorMercado'], 'liga_id' =>$liga, 'fecha' => $fechaActual ]);
            }
        }

        $pilotos = MercadoPiloto::
        join('pilotos', 'mercadoPilotos.piloto_id','=','pilotos.id')->
        join('escuderias', 'escuderias.id','=','pilotos.id_escuderia')-> 
        select('mercadoPilotos.id as idMercado', 'pilotos.id as id','pilotos.nombre as nombre','pilotos.puntos as puntos','pilotos.valorMercado', 'id_escuderia', 'escuderias.nombre as escuderia', 'fecha')
        ->orderBy('mercadoPilotos.fecha','desc')
        ->where('liga_id',$liga)
        ->where('fecha',$fecha_actual)
        ->get();
        foreach($pilotos as $indice => $piloto){
            $pilotos[$indice]->valorPuja = null;
            $puja = Pujas::where('usuario_id',$usuario)->where('mercadoPiloto_id',$piloto['idMercado'])->where('visible',null)->first();
    
            $pilotos[$indice]->valorPuja = $puja ? $puja['valorPuja']:null;

         
        }

        return $pilotos;
    }

   

    /**
     * Elimina los pilotos del mercado
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($idLiga)
    {
       
        MercadoPiloto::where('liga_id',$idLiga)->delete();

        
    }
}
