<?php

namespace App\Http\Controllers;
use App\Puntos;
use App\Predicciones;
use App\Clasificacion;
use App\Ligas;
use App\Equipo;
use App\Pilotos;
use App\Escuderias;
use App\User;
use Illuminate\Http\Request;

class PuntosController extends Controller
{  
  /**
  *  Display a listing of the resource.
  *
  * @return \Illuminate\Http\Response
  */

    public function getPuntuacionesPilotos($campo, $direct){
     return Pilotos::leftJoin('puntos', 'pilotos.id','=','puntos.id_piloto')

      ->select('pilotos.id','pilotos.nombre','pilotos.pais','pilotos.puntos as puntosTotales','puntos.puntosGP as puntos')
      ->orderBy($campo,$direct)
      ->get();
    }
    /**
    *  Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */

    public function getPuntuacionesEscuderias($campo, $direct){
      return Escuderias::leftJoin('puntos', 'escuderias.id','=','puntos.id_escuderia')

      ->select('escuderias.id as id_escuderia','escuderias.nombre as nombre_escuderia','escuderias.puntos as puntosTotales','puntos.puntosGP as puntos_escuderia')
      ->orderBy($campo,$direct)
      ->get();
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
         if(array_key_exists('id',$row)){
            $this->puntuacionPiloto($row);
            
         }else{
            $this->puntuacionEscuderia($row);
         }
         
      }

     

    }
    private function puntuacionEscuderia($row){
     
      $existeEscuderia = Puntos::where('id_escuderia',$row['id_escuderia'])-> first();
      if($existeEscuderia){
        Puntos::where('id_escuderia',$row['id_escuderia'])-> delete();
      }
     
      Puntos::insert([
        
        'id_escuderia' => array_key_exists('id_escuderia', $row)  ? $row['id_escuderia'] : null,
      
        'nombre_escuderia' => array_key_exists('nombre_escuderia', $row)  ? $row['nombre_escuderia'] : null,
        'puntosGP' => $row['puntos_escuderia'],
        'posicion' => 0
      ]);

    }
    private function puntuacionPiloto($row){
    
      $existe = Puntos::where('id_piloto',$row['id'])-> first();
      if($existe){
        Puntos::where('id_piloto',$row['id'])-> delete();
      }
      $row['posicion'] = $this->asignarPosicion($row['puntos']);
      Puntos::insert([
        'id_piloto' => array_key_exists('id', $row) ? $row['id'] : null,
        'id_escuderia' => array_key_exists('id_escuderia', $row)  ? $row['id_escuderia'] : null,
        'nombre_piloto' => array_key_exists('nombre', $row)  ? $row['nombre'] : null,
        'nombre_escuderia' => array_key_exists('escuderia', $row)  ? $row['escuderia'] : null,
        'puntosGP' => $row['puntos'],
        'posicion' => $row['posicion']
      ]);
     
    }

    private function updatePuntosPilotoEscuderia(){
      $coleccionPuntos = Puntos::get();
      foreach($coleccionPuntos as $puntos){
        if(isset($puntos['id_piloto'])){
          $piloto = Pilotos::where('id',$puntos['id_piloto'])->first();
          $puntosTotales = $piloto['puntos'] + $puntos['puntosGP'];
          Pilotos::where('id',$piloto['id'])->update(['puntos'=>$puntosTotales]);
        }else{
          $escuderia = Escuderias::where('id',$puntos['id_escuderia'])->first();
          $puntosTotales = $escuderia['puntos'] + $puntos['puntosGP'];
          Escuderias::where('id',$escuderia['id'])->update(['puntos'=>$puntosTotales]);
        }
       
      }
      
    }
    public function destroyPuntos(){
    
      Puntos::where('id','>',0)->delete();
    }
    private function asignarPosicion($puntos){
      switch($puntos){
        case "25":
          $row['posicion'] = 1;
          break;
        case "20":
          $row['posicion'] = 2;
          break;
        case "16":
          $row['posicion'] = 3;
          break;
        case "13":
          $row['posicion'] = 4;
          break;
        case "11":
          $row['posicion'] = 5;
          break;
        case "10":
          $row['posicion'] = 6;
          break;
        case "9":
          $row['posicion'] = 7;
          break;
        case "8":
          $row['posicion'] = 8;
          break;
        case "7":
          $row['posicion'] = 9;
          break;
        case "6":
          $row['posicion'] = 10;
          break;
        case "5":
          $row['posicion'] = 11;
          break;
        case "4":
          $row['posicion'] = 12;
          break;
        case "3":
          $row['posicion'] = 13;
          break;
        case "2":
          $row['posicion'] = 14;
          break;
        case "1":
          $row['posicion'] = 15;
          break;
      }
      return $row['posicion'];
    }
     /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function updatePuntos()
    {
      $this->updatePuntosPilotoEscuderia();
      Clasificacion::where('id','>',0)->update(['puntosGP'=> 0]);
      $this-> updatePuntosPredicciones();
     //obtener todas las ligas
       $ligas = Ligas::get();
       foreach($ligas as $liga){
         //obtener todos los usuarios de la liga
        $usuarios = User::where('liga_id',$liga['id_liga'])->get();
        foreach($usuarios as $usuario){
          $puntosTotalesGP = 0 ;
          $puntosTotales = 0;
         
          //obtener alineados del equipo del usuario
           $equipo = Equipo::where('usuario_id',$usuario['id'])->where('indicadorEnAlineacion', 1)->get();//cambiar por true
  
           if(count($equipo) > 0){
     
           foreach($equipo as $row){
             if(isset($row['piloto_id'])){
                $puntos = Puntos::where('id_piloto', $row['piloto_id'])->first();
                //echo $puntos;
             }else{
              $puntos = Puntos::where('id_escuderia', $row['escuderia_id'])->first();
             }
             if($puntos !==null){
                // foreach($puntos as $puntuacion){
                    $rowUsuario = Clasificacion::where('id_usuario', $usuario['id'])->first();
                 // echo $rowUsuario;
                    $puntosTotalesGP =  $puntosTotalesGP + $puntos['puntosGP'];//0 + 5 + 25 = 30; 30 + 5 +16 = 51
                    //5+25;16 + 30
                    
                    $saldoPorPuntos = $puntos['puntosGP']  * 20000;
                    $saldo = $usuario['saldo'] + $saldoPorPuntos;
                    User::where('id', $usuario['id'])->update(['saldo'=> $saldo]);
                // }
             }
              
              
        
                
                
           }
           $puntosTotalesGP = $puntosTotalesGP +$rowUsuario['puntosGP'];
           $puntosTotales = $rowUsuario['puntosTotales'] +$puntosTotalesGP ;//0+41 = 41
           Clasificacion::where('id_usuario', $usuario['id'])->update(['puntosGP'=> $puntosTotalesGP, 'puntosTotales'=> $puntosTotales]);
          }else{
            $rowUsuario = Clasificacion::where('id_usuario', $usuario['id'])->first();
            $puntosTotales = $rowUsuario['puntosGP'] + $rowUsuario['puntosTotales'];
            Clasificacion::where('id_usuario', $usuario['id'])->update(['puntosTotales'=> $puntosTotales]);
          }
          
           
        }
       }
     
    }
    public function updatePuntosPredicciones(){
      $predicciones = Predicciones::get();
      $puntosTotalesGP = 0 ;

      if(count($predicciones)>0){
      foreach($predicciones as $prediccion){
        $idUser = $prediccion['usuario_id'];
        $piloto = $prediccion['piloto_id'];
        $clasificacion = Clasificacion::where('id_usuario', $idUser)->first();
        $puntos = Puntos::where('id_piloto', $piloto)->select('posicion')->first();
        if(isset($puntos['posicion'])){
          if($prediccion['posicion']=== $puntos['posicion']){
            $puntosTotalesGP = 16 + $clasificacion['puntosGP'];
            
          }else{
        
            $diferencia = abs($prediccion['posicion'] - $puntos['posicion']);
            switch($diferencia){
              case "1":
                $puntosTotalesGP = 11 + $clasificacion['puntosGP'];
                break;
              case "2":
                $puntosTotalesGP = 8 + $clasificacion['puntosGP'];
                break;
              case "3":
                $puntosTotalesGP = 5 + $clasificacion['puntosGP'];
                break;
              case "4":
                $puntosTotalesGP = 3 + $clasificacion['puntosGP'];
                break;
              case "5":
                $puntosTotalesGP = 1 + $clasificacion['puntosGP'];
                break;
          
            }
          }
        
          $puntosTotales = $clasificacion['puntosTotales'] + $puntosTotalesGP;//0+ 5
          Clasificacion::where('id_usuario', $idUser)->update(['puntosGP'=> $puntosTotalesGP]);
        }
        
        
      }
    }
    
  }

 
}
