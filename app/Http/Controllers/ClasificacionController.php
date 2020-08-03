<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Clasificacion;
use App\Puntos;
use App\Ligas;
use App\Equipo;
use App\User;
class ClasificacionController extends Controller
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

        return Clasificacion::join('users', 'users.id','=','clasificacion.id_usuario')
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
     * @return \Illuminate\Http\Response
     */
    public function updatePuntos()
    {
       $ligas = Ligas::get();
       foreach($ligas as $liga){
        $usuarios = User::get();
        foreach($usuarios as $usuario){
           $equipo = Equipo::where('indicadorEnAlineacion', 0)->get();//cambiar por true
           foreach($equipo as $row){
               $puntos = Puntos::where('id_piloto', $row['piloto_id'])->select('puntosGP')->get();

               Clasificacion::where('id_usuario', $usuario['id'])->update(['puntosGP'=> $puntos[0]['puntosGP']]);
           }
        }
       }
       return 'correcto';
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
