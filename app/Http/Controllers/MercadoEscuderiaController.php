<?php

namespace App\Http\Controllers;
use App\MercadoEscuderia;
use DateTime;
use App\Escuderias;
use App\Pujas;
use Illuminate\Http\Request;

class MercadoEscuderiaController extends Controller
{
      /**
     * Obtiene las escuderias del mercado
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $fecha_actual = date("yy-m-d");
        $fecha_anterior = date("yy-m-d",strtotime($fecha_actual."- 7 days")); 
        MercadoEscuderia::where('fecha','<=',$fecha_anterior)->delete();
        $escuderias = MercadoEscuderia::
        join('escuderias', 'mercadoEscuderias.escuderia_id','=','escuderias.id')->
       
        select( 'escuderias.id as id','escuderias.nombre as nombre','escuderias.puntos as puntos','escuderias.valorMercado', 'fecha')
        ->orderBy('mercadoEscuderias.fecha','desc')
        ->where('fecha',$fecha_actual)
        ->get();
        
        return $escuderias;
      
    }


    /**
     * Crea escuderias para el mercado
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $liga = $request->liga_id;
        $fechaActual = new DateTime();
        $escuderias = Escuderias::whereNotExists(function($query)
            {
                $query->select()
                        ->from('Equipo')
                        ->whereRaw('equipo.escuderia_id = escuderias.id');
            })->get()->random(4);
        
        foreach($escuderias as $escuderia){
            MercadoEscuderia::insert(['escuderia_id' => $escuderia['id'] , 'valorMercado' => $escuderia['valorMercado'], 'liga_id' =>$liga, 'fecha' => $fechaActual ]);
        }
        return $escuderias;

        

        
    }

    /**
     * Obtiene las escuderias del mercado
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
        MercadoEscuderia::where('fecha','<=',$fecha_anterior)->delete();
        $escuderias = MercadoEscuderia::
        join('escuderias', 'mercadoEscuderias.escuderia_id','=','escuderias.id')->
       
        select('escuderias.id as id','escuderias.nombre as nombre','escuderias.puntos as puntos','escuderias.valorMercado', 'fecha')
        ->orderBy('mercadoEscuderias.fecha','desc')
        ->where('liga_id',$liga)
        ->where('fecha',$fecha_actual)
        ->get();
        
  
        if(count($escuderias) == 0 ){
            $fechaActual = new DateTime();
            $escuderias = Escuderias::whereNotExists(function($query)
                {
                    $query->select()
                            ->from('Equipo')
                            ->whereRaw('equipo.escuderia_id = escuderias.id');
                })
                ->get()
                ->random(4);
        
                foreach($escuderias as $escuderia){
                    MercadoEscuderia::insert(['escuderia_id' => $escuderia['id'] , 'valorMercado' => $escuderia['valorMercado'], 'liga_id' =>$liga, 'fecha' => $fechaActual ]);
                }
          
        
        }

        $escuderias = MercadoEscuderia::
        join('escuderias', 'mercadoEscuderias.escuderia_id','=','escuderias.id')->
       
        select(  'mercadoEscuderias.id as idMercado','escuderias.id as id','escuderias.nombre as nombre','escuderias.puntos as puntos','escuderias.valorMercado', 'fecha')
        ->orderBy('mercadoEscuderias.fecha','desc')
        ->where('liga_id',$liga)
        ->where('fecha',$fecha_actual)
        ->get();
        foreach($escuderias as $indice => $escuderia){
            $escuderias[$indice]->puja = null;
            $puja = Pujas::where('usuario_id',$usuario)->where('mercadoEscuderia_id',$escuderia['idMercado'])->first();
    
            $escuderias[$indice]->puja = $puja ? $puja['valorPuja']:null;
            //array_push($pujas, $puja);
         
        }
      
      
        return $escuderias;
    }

    /**
     * Borra las escuderias del mercado
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($idLiga)
    {
       
        MercadoEscuderia::where('liga_id',$idLiga)->delete();
        
    }
}
