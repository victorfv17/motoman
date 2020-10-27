<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Escuderias;
header('Access-Control-Allow-Origin: *');
class EscuderiasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Escuderias::get();
    }
    public function indexSort($campo,$direct)
    {
        return Escuderias::orderBy($campo, $direct )->select('id as id_escuderia', 'nombre as nombre_escuderia', 'valorMercado as valorMercado_escuderia', 'puntos as puntos_escuderia')->get();
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
        // $escuderias = $request->all();
        // //Escuderias::create($escuderias);
        // foreach($escuderias as $escuderia){
        //     Escuderias::create($escuderia);
        // }
        Escuderias::insert([
            'nombre'=>$request['nombre'],
            'puntos'=>$request['puntos'],
            'valorMercado'=>$request['valorMercado']
        ]);
     
       
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
         return Escuderias::where('id',$id)->get();
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
        $query = $request->all();
        Escuderias::where('id',$id)->update($query);
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
        Escuderias::where('id',$id)->delete();
    }
}
