<?php

namespace App\Http\Controllers;
use App\MercadoEscuderia;
use DateTime;
use App\Escuderias;
use Illuminate\Http\Request;

class MercadoEscuderiaController extends Controller
{
      /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $escuderias = MercadoEscuderia::
        join('escuderias', 'mercadoEscuderias.escuderia_id','=','escuderias.id')->
       
        select( 'escuderias.id as id','escuderias.nombre as nombre','escuderias.valorMercado', 'fecha')
        ->get();
        
        /*$mercadoPilotos = MercadoPiloto::get();
        foreach($mercadoPilotos as $mercadoPiloto){
            $piloto = Pilotos::where('id',$mercadoPiloto['id']);
            var_dump($piloto);
        }*/
        //return 
        return $escuderias;
      
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
       
        MercadoEscuderia::where('liga_id',$idLiga)->delete();
        
    }
}
