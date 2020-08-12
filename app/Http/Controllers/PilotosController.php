<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pilotos;
use App\Escuderias;

header('Access-Control-Allow-Origin: *');
class PilotosController extends Controller
{
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        return Pilotos::get();
    }
    public function join($campo,$direct)
    {   
        return Pilotos::join('escuderias', 'escuderias.id','=','pilotos.id_escuderia')->select( 'pilotos.id as id','pilotos.nombre as nombre','pilotos.puntos','escuderias.nombre as escuderia', 'pais')->orderBy($campo, $direct )->get();
        
       // return Pilotos::with('escuderias')->select( 'nombre','puntos','id_escuderia as id')->orderBy(Escuderias::'nombre', $direct )->get();
        /*$todos =  Escuderias::get();
        foreach($todos as $esc){
            echo 
        }*/
       //return Pilotos::where('id_escuderia', $esc['id'])->get();

        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
		$todos = $request->all();
        Pilotos::create($todos);
		
		// foreach($todos as $pil){
        //     Pilotos::create($pil);
        // }
     
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Pilotos::where('id',$id)->get();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
       
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
        $query = $request->all();
        Pilotos::where('id',$id)->update($query);
        return $query;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Pilotos::where('id',$id)->delete();
    }

  
}
