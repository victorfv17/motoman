<?php

namespace App\Http\Controllers;
use App\Puntos;
use App\Predicciones;
use App\Clasificacion;
use App\Ligas;
use App\Equipo;
use App\User;
use Illuminate\Http\Request;

class PuntosController extends Controller
{


 
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
          echo 'entro';
            $this->puntuacionPiloto($row);
            
         }else{
          echo 'entroescuderia';
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
      $this-> updatePuntosPredicciones();
       $ligas = Ligas::get();
       foreach($ligas as $liga){
        $usuarios = User::where('liga_id',$liga['id_liga'])->get();
        foreach($usuarios as $usuario){
           $equipo = Equipo::where('usuario_id',$usuario['id'])->where('indicadorEnAlineacion', 1)->get();//cambiar por true
         
           foreach($equipo as $row){
             if(isset($row['piloto_id'])){
                $puntos = Puntos::where('id_piloto', $row['piloto_id'])->get();
                
             }else{
              $puntos = Puntos::where('id_escuderia', $row['escuderia_id'])->get();
             }
                foreach($puntos as $puntuacion){
                    $rowUsuario = Clasificacion::where('id_usuario', $usuario['id'])->first();
                    $puntosTotalesGP = $rowUsuario['puntosGP'] + $puntuacion['puntosGP'];
                    Clasificacion::where('id_usuario', $usuario['id'])->update(['puntosGP'=> $puntosTotalesGP]);
                    $saldoPorPuntos = $puntuacion['puntosGP']  * 20000;
                    $saldo = $usuario['saldo'] + $saldoPorPuntos;
                    User::where('id', $usuario['id'])->update(['saldo'=> $saldo]);
                }
              
              
        
                
                
           }
        }
       }
       return 'correcto';
    }
    public function updatePuntosPredicciones(){
      $predicciones = Predicciones::get();

      foreach($predicciones as $prediccion){
        $idUser = $prediccion['usuario_id'];
        $piloto = $prediccion['piloto_id'];
        $clasificacion = Clasificacion::where('id_usuario', $idUser)->first();
        $puntos = Puntos::where('id_piloto', $piloto)->select('posicion')->first();
       
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
        Clasificacion::where('id_usuario', $idUser)->update(['puntosGP'=> $puntosTotalesGP]);
      // $predicciones = Predicciones::where('piloto_id',$row['id'])->get();

      // foreach($predicciones as $prediccion){
      //   $idUser = $prediccion['usuario_id'];
      //   $clasificacion = Clasificacion::where('id_usuario', $idUser)->first();
      //   if($prediccion['posicion']=== $row['posicion']){
      //     $puntosTotalesGP = 16 + $clasificacion['puntosGP'];
          
      //   }else{
      //     $diferencia = abs($prediccion['posicion'] -$row['posicion']);
      //     switch($diferencia){
      //       case "1":
      //         $puntosTotalesGP = 11 + $clasificacion['puntosGP'];
      //         break;
      //       case "2":
      //         $puntosTotalesGP = 8 + $clasificacion['puntosGP'];
      //         break;
      //       case "3":
      //         $puntosTotalesGP = 5 + $clasificacion['puntosGP'];
      //         break;
      //       case "4":
      //         $puntosTotalesGP = 3 + $clasificacion['puntosGP'];
      //         break;
      //       case "5":
      //         $puntosTotalesGP = 1 + $clasificacion['puntosGP'];
      //         break;
         
      //     }
      //   }
      //   Clasificacion::where('id_usuario', $idUser)->update(['puntosGP'=> $puntosTotalesGP]);

        
      }
    }
}
