<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Equipo;

class EquipoController extends Controller
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
        $usuarioId = $request->usuario;
        $equipo = $request->equipo;
      
        $equipoPiloto = Equipo::where('usuario_id', $usuarioId)->where('id', $equipo['id'])->update(['indicadorEnAlineacion'=> true]);
  
       // $equipoEscuderia = Equipo::where('usuario_id', $usuarioId)->where('escuderia_id', $equipo['idEscuderia'])->update(['indicadorEnAlineacion'=> true]);
       
       
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($user_id)
    {
      
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showPilotos($user_id)
    {
        $listEquipos = [];
        $equipos = Equipo::where('usuario_id', $user_id)->where('piloto_id', '<>','null')->get();
        foreach($equipos as $equipo){
            array_push($listEquipos, Equipo::join('pilotos', 'pilotos.id','=','equipo.piloto_id')->
            where('pilotos.id', $equipo['piloto_id']) ->
            select( 'equipo.id','pilotos.nombre as nombre', 'pilotos.valorMercado as valorMercado', 'pilotos.puntos as puntos')
            ->get()->first());
        }
       
        return $listEquipos;
    }
     /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showEscuderias($user_id)
    {
        $listEquipos = [];
        $equipos = Equipo::where('usuario_id', $user_id)->where('escuderia_id', '<>','null')->get();
        foreach($equipos as $equipo){
            array_push($listEquipos, Equipo::join('escuderias', 'escuderias.id','=','equipo.escuderia_id')->
            where('escuderias.id', $equipo['escuderia_id']) ->
            select( 'equipo.id','escuderias.nombre as nombre', 'escuderias.valorMercado as valorMercado', 'escuderias.puntos as puntos')
            ->get()->first());
        }
       
        return $listEquipos;
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
        Equipo::where('id',$id)->delete();
        
    }
}
