<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Puntuacion;
use App\Puntos;
use App\User;
class PuntuacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }
    public function join($liga, $campo)
    {   

        return Puntuacion::join('users', 'users.id','=','puntuacion.id_usuario')
        ->where('liga_id',$liga)
        ->select('users.name','puntosTotales','puntosMes','puntosGP','puntosCategoria' )
        ->orderBy($campo,'desc')
        ->get();
        
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
       foreach($todos as $row){
        Puntos::insert([
            'id_piloto' => array_key_exists('id', $row) ? $row['id'] : null,
            'id_escuderia' => array_key_exists('id_escuderia', $row)  ? $row['id_escuderia'] : null,
            'nombre_piloto' => array_key_exists('nombre', $row)  ? $row['nombre'] : null,
            'nombre_escuderia' => array_key_exists('escuderia', $row)  ? $row['escuderia'] : null,
            'puntosGP' => $row['puntos'] 
        ]);
       }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Puntuacion::where('id_usuario', $id)->get();
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
    public function destroy($id)
    {
        //
    }
}
