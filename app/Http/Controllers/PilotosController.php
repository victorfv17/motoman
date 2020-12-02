<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pilotos;
use App\Escuderias;

header('Access-Control-Allow-Origin: *');
class PilotosController extends Controller
{
    
    /**
     * Obtiene los pilotos
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        return Pilotos::get();
    }
    /**
     * Obtiene los pilotos con sus escuderias ordenados
     */
    public function join($campo,$direct)
    {   
        return Pilotos::join('escuderias', 'escuderias.id','=','pilotos.id_escuderia')->select( 'pilotos.id as id','pilotos.nombre as nombre','pilotos.puntos','escuderias.nombre as escuderia', 'pais')->orderBy($campo, $direct )->get();
        
    }

  

    /**
     * Crear un piloto
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
	
        Pilotos::insert([
            'nombre'=>$request['nombre'],
            'edad'=>$request['edad'],
            'id_escuderia'=>$request['id_escuderia'],
            'numero'=>$request['numero'],
            'pais'=>$request['pais'],
            'puntos'=>$request['puntos'],
            'valorMercado'=>$request['valorMercado']
        ]);
     
    }
    /**
     * Crear colecccion de pilotos
     */
    public function storeAll(Request $request)
    {
		$todos = $request->all();
       
		
		foreach($todos as $pil){
            Pilotos::create($pil);
        }
        
     
    }

    /**
     * Obtener un piloto
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Pilotos::where('id',$id)->first();
    }


    /**
     * Actualizar un piloto
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
     * Borrar un piloto
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Pilotos::where('id',$id)->delete();
    }

  
}
