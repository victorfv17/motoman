<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Equipo;
use App\User;
use App\Pilotos;
use App\Escuderias;
/**
 * Controlador de equipo
 */
class EquipoController extends Controller
{
    /**
     * Obtiene la alineacion de un usuario
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
     * Obtiene las ventas del dia de la liga
     *  @param $liga
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
     * Guarda la alineacion del usuario
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $usuarioId = $request->usuario;
        $equipo = $request->equipo;
                
        $equipoPiloto = Equipo::where('usuario_id', $usuarioId)
        ->where('indicadorEnAlineacion','<>','2')
        ->update(['indicadorEnAlineacion'=> '0']);
        foreach($equipo as $item){
            Equipo::where('usuario_id', $usuarioId)->where('id',$item)->update(['indicadorEnAlineacion'=> '1']);
        }
       
    }
  
    /**
     * Obtiene los pilotos del equipo del usuario
     *
     * @param  int  $user_id
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
     * Obtiene las escuderias del equipo del usuario
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
     * Elimina un piloto escuderia del equipo del usuario
     * Es decir se realiza una venta y se actualiza el saldo
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
        
    }
}
