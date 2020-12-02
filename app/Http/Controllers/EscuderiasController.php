<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Escuderias;
header('Access-Control-Allow-Origin: *');
/**
 * Controlador para las escuderias
 */
class EscuderiasController extends Controller
{
    /**
     * Obtiene todas las escuderias
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Escuderias::get();
    }
    /**
     * Obtiene todas las escuderias ordenadas por un campo y en un sentido
     * @param $campo
     * @param $direct
     * @return \Illuminate\Http\Response
     */
    public function indexSort($campo,$direct)
    {
        return Escuderias::orderBy($campo, $direct )->select('id as id_escuderia', 'nombre as nombre_escuderia', 'valorMercado as valorMercado_escuderia', 'puntos as puntos_escuderia')->get();
    }


    /**
     * Crea la escuderia 
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Escuderias::insert([
            'nombre'=>$request['nombre'],
            'puntos'=>$request['puntos'],
            'valorMercado'=>$request['valorMercado']
        ]);
     
       
    }
    /**
     * Crea varias escuderias de una sola vez (postman)
     */
    public function storeAll(Request $request)
    {
        $escuderias = $request->all();
     
        foreach($escuderias as $escuderia){
            Escuderias::create($escuderia);
        }
       
     
       
    }

    /**
     * Obtiene una escuderia
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
         return Escuderias::where('id',$id)->get();
    }


    /**
     * Actualiza una escuderia
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $query = $request->all();
        Escuderias::where('id',$id)->update($query);
        return $query;
    }

    /**
     * Elimina una escuderia
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Escuderias::where('id',$id)->delete();
    }
}
