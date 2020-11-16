<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Equipo;
use App\User;
use App\Pilotos;
use App\Escuderias;
class EquipoController extends Controller
{
      /**
     * Display a listing of the resource.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getAlineacion($id)
    {   
        $equipo = [];
       // $equipos = Equipo::where('indicadorEnAlineacion','2')-> where('usuario_id',$id)
        $pilotos = Equipo::join('pilotos','pilotos.id','=','equipo.piloto_id')
        ->where('usuario_id',$id)
        ->where('indicadorEnAlineacion','1')
       
        ->select('equipo.id as idEquipo' ,'pilotos.id as piloto_id', 'pilotos.nombre')
        ->get();
     
        $escuderias = Equipo::join('escuderias','escuderias.id','=','equipo.escuderia_id')
        ->where('usuario_id',$id)
        ->where('indicadorEnAlineacion','1')
       
        ->select('equipo.id as idEquipo', 'escuderias.id as id_escuderia', 'escuderias.nombre')
        ->get();
        foreach($pilotos as $piloto){
            array_push($equipo, $piloto);
        }
        foreach($escuderias as $escuderia){
            array_push($equipo, $escuderia);
        }
        return $equipo;
    }
      /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showVentas($idLiga)
    {

        $equipo = [];
        $pilotos = Equipo::where('indicadorEnAlineacion','2')
        ->join('pilotos', 'pilotos.id','=','equipo.piloto_id')
        ->join('users', 'users.id','=','equipo.usuario_id')
        ->where('users.liga_id',$idLiga)
        ->select('nombre as piloto', 'users.name as usuario', 'valorMercado as valor')
        ->get();
        
        $escuderias = Equipo::where('indicadorEnAlineacion','2')
        ->join('escuderias', 'escuderias.id','=','equipo.escuderia_id')
        ->join('users', 'users.id','=','equipo.usuario_id')
        ->where('users.liga_id',$idLiga)
        ->select('nombre as escuderia', 'users.name as usuario', 'valorMercado as valor')
        ->get();
        foreach($pilotos as $piloto){
          
            array_push($equipo, $piloto);
        }
        foreach($escuderias as $escuderia){
            array_push($equipo, $escuderia);
        }
        return $equipo;
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
     
        // if(date("l") == 'Saturday' ||date("l") == 'Sunday'){
        //     $equipoPiloto = Equipo::where('usuario_id', $usuarioId)->where('id', $equipo['idPrimerPiloto'])->update(['indicadorEnAlineacion'=> '2']);
        //     $equipoPiloto = Equipo::where('usuario_id', $usuarioId)->where('id', $equipo['idSegundoPiloto'])->update(['indicadorEnAlineacion'=> '2']);
        //     $equipoPiloto = Equipo::where('usuario_id', $usuarioId)->where('id', $equipo['idEscuderia'])->update(['indicadorEnAlineacion'=> '2']);
        // }else{
           
        $equipoPiloto = Equipo::where('usuario_id', $usuarioId)->update(['indicadorEnAlineacion'=> '0']);
        foreach($equipo as $item){
            echo $item;
            Equipo::where('usuario_id', $usuarioId)->where('id',$item)->update(['indicadorEnAlineacion'=> '1']);
        }
        // $equipoPiloto = Equipo::where('usuario_id', $usuarioId)->where('id',$equipo['idPrimerPiloto'])->update(['indicadorEnAlineacion'=> '1']);
        // $equipoPiloto = Equipo::where('usuario_id', $usuarioId)->where('id',array_key_exists('idSegundoPiloto', $equipo))->update(['indicadorEnAlineacion'=> '1']);
        // $equipoPiloto = Equipo::where('usuario_id', $usuarioId)->where('id',array_key_exists('idEscuderia', $equipo))->update(['indicadorEnAlineacion'=> '1']);
    
          
        // }
       
  
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
        $equipos = Equipo::where('usuario_id', $user_id)->where('piloto_id', '<>','null')->where('indicadorEnAlineacion','<>','2')->get();
        foreach($equipos as $equipo){
            array_push(
                $listEquipos, Equipo::join('pilotos', 'pilotos.id','=','equipo.piloto_id')->
                where('equipo.id', $equipo['id']) ->
                select('equipo.id as idEquipo','pilotos.nombre as nombre', 'pilotos.valorMercado as valorMercado', 'pilotos.puntos as puntos')
                ->get()->first()
            );
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
        $equipos = Equipo::where('usuario_id', $user_id)->where('escuderia_id', '<>','null')->where('indicadorEnAlineacion','<>','2')->get();
        foreach($equipos as $equipo){
            array_push($listEquipos, Equipo::join('escuderias', 'escuderias.id','=','equipo.escuderia_id')->
            where('equipo.id', $equipo['id']) ->
            select( 'equipo.id as idEquipo','escuderias.nombre as nombre', 'escuderias.valorMercado as valorMercado', 'escuderias.puntos as puntos')
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
        Equipo::where('id',$id)->update(['indicadorEnAlineacion'=> '2']);
        $equipo = Equipo::where('id',$id)->first();
        $rowUser = User::where('id', $equipo['usuario_id'])->first();
        if($equipo['piloto_id']){
            $piloto = Pilotos::where('id',$equipo['piloto_id'])->first();
            $saldo = $rowUser['saldo'] + $piloto['valorMercado'];
        }else{
            $escuderia = Escuderias::where('id',$equipo['escuderia_id'])->first();
            $saldo = $rowUser['saldo'] + $escuderia['valorMercado'];
        }
        
        User::where('id', $rowUser['id'])->update(['saldo' => $saldo]);
       // Equipo::where('id',$id)->delete();
        
    }
}
