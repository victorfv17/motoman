<?php
 
namespace App\Http\Controllers;
use App\Pujas;
use App\MercadoPiloto;
use App\MercadoEscuderia;
use App\Equipo;
use App\User;
use Illuminate\Http\Request;

class PujasController extends Controller
{
   
     /**
     * Obtener pujas
     *
     * @return \Illuminate\Http\Response
     */
    
    public function index($idLiga)
    {
        $pujas = [];
        $pujasEscuderias = Pujas::where('visible','1')
        ->join('users', 'users.id','=','pujas.usuario_id')
       
        ->join('mercadoEscuderias', 'mercadoEscuderias.id','=','pujas.mercadoEscuderia_id')
        
        ->join('escuderias', 'escuderias.id','=','mercadoEscuderias.escuderia_id')
        ->where('users.liga_id',$idLiga)
        ->select(
            'pujas.id as id', 
            'pujas.usuario_id as usuarioId', 
            'pujas.mercadoPiloto_id as mercadoPilotoId',
            'pujas.mercadoEscuderia_id as mercadoEscuderiaId',
            'pujas.valorPuja as puja',
            'users.name as usuario',
            
            'mercadoEscuderias.escuderia_id as escuderiaId',
            'escuderias.nombre as escuderia'
            
        
        )->get();

        $pujasPilotos =  Pujas::where('visible','1')
        ->join('users', 'users.id','=','pujas.usuario_id')
        ->join('mercadoPilotos', 'mercadoPilotos.id','=','pujas.mercadoPiloto_id') 
        ->join('pilotos', 'pilotos.id','=','mercadoPilotos.piloto_id')
        ->where('users.liga_id',$idLiga)
        ->select(
            'pujas.id as id', 
            'pujas.usuario_id as usuarioId', 
            'pujas.mercadoPiloto_id as mercadoPilotoId',
            'pujas.mercadoEscuderia_id as mercadoEscuderiaId',
            'pujas.valorPuja as puja',
            'users.name as usuario',
            'mercadoPilotos.piloto_id as pilotoId',
            'pilotos.nombre as piloto',
          
        
        )->get();
           
        foreach($pujasPilotos as $puja){
            array_push($pujas, $puja);
        }
        foreach($pujasEscuderias as $puja){
            array_push($pujas, $puja);
        }
        return $pujas;
        
    
    }

    /**
     * Guardar puja
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      
        $pujas = $request ->pujas;
        $usuario = $request ->usuario;
        var_dump($pujas);
        
        foreach($pujas as $puja){

            
            if(array_key_exists('piloto',$puja)){
                $idMercado = MercadoPiloto::where('id', $puja['piloto'])->first();
               
                Pujas::updateOrCreate(['usuario_id' => $usuario, 'mercadoPiloto_id' => $idMercado['id']],[ 'valorPuja' => $puja['puja']]);
            }else{
                $idMercado = MercadoEscuderia::where('id', $puja['escuderia'])->first();
            
                /* $existenPujas = Pujas::where('mercadoPiloto_id', $idMercado[0]['id'])->max('valorPuja');
                    
                var_dump($puja);
                    if($existenPujas < $puja['valorPuja'])*/
                    Pujas::updateOrCreate(['usuario_id' => $usuario, 'mercadoEscuderia_id' => $idMercado['id']], ['valorPuja' => $puja['puja']]);
            }
        }
        return 'correcto';
        
      

		
        
    }

    /**
     * Obtener puja
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {//join('mercadoPilotos', 'mercadoPilotos.id','=','pujas.mercadoPiloto_id')
     return Pujas::
     where('usuario_id',$id)->where('visible',null)
     ->select('mercadoPiloto_id as mercadoPilotoId','mercadoEscuderia_id as mercadoEscuderiaId', 'valorPuja')
     ->get();
    }
    /**
     * eliminar pujas
     */
    public function destroyPujas()
    {
        $fecha_actual = date("yy-m-d");
      
        $fecha_anterior = date("yy-m-d",strtotime($fecha_actual."- 1 days")); 
        Pujas::where('visible', '1')->where('created_at','<=',$fecha_anterior)->delete();
        //trae todas las pujas existentes
        $todasPujas = Pujas::where('visible',null)->get();

        
        
        foreach($todasPujas as $puja){
          
            if($puja['mercadoPiloto_id'] != NULL){
                //trae todas las pujas con un mercado piloto id determinado
                $todasPujasMismoPiloto =  Pujas::where('mercadoPiloto_id', $puja['mercadoPiloto_id'])->where('visible',null)->get()->toArray();
                if(count($todasPujasMismoPiloto)>0){
                    $id = $todasPujasMismoPiloto[0];
                    $maxPuja = $todasPujasMismoPiloto[0];
                    $todasPujasMismoPiloto = array_splice($todasPujasMismoPiloto,1);
                    
                   
               
                    //asigna la primera puja como la de mayor valor
                    //recorre las pujas con el mismo mercado piloto id para coger la mas alta
                    foreach($todasPujasMismoPiloto as $puja){
                        if( $puja['valorPuja'] >= $maxPuja['valorPuja']){
                     
                            Pujas::where('id', $maxPuja['id'])->delete();
                
                          
                            $id = $puja['id'];
                            $maxPuja = $puja;
                        }else{
                            Pujas::where('id',  $puja['id'])->delete();
                        }
                        
                    }
            
                     // trae el registro con la puja mas alta
                     $pujaMaxima = Pujas::where('id',  $id)->get();
                     //$pujaMaxima = head($pujaMaxima);
                     $usuario = $pujaMaxima[0]['usuario_id'];
                     //trae el registro del mercado asociado a esa puja
                     $rowMercado = MercadoPiloto::where('id', $pujaMaxima[0]['mercadoPiloto_id'])->first();
                     //insertamos en el equipo del usuario al piloto comprado
                     Equipo::insert(['piloto_id' => $rowMercado['piloto_id'], 'usuario_id' => $usuario]);
                     // //trae usuario y actualiza el saldo
                     $rowUser = User::where('id', $usuario)->first();
                     $saldo = $rowUser['saldo'] - $pujaMaxima[0]['valorPuja'];
                     User::where('id', $usuario)->update(['saldo' => $saldo]);
                     //borramos las pujas con ese piloto del mercado que ya esta asignado
                     
                     Pujas::where('id',$pujaMaxima[0]['id'])->update(['visible'=>'1']);
                     
                     $maxPuja = 0 ;
                   
                     
                    $this->destroyPujas();
                    //$todasPujas = Pujas::orderBy('mercadoPiloto_id', 'asc' )->get();
                }
               
               
            }else{
                //trae todas las pujas con un mercado piloto id determinado
                $todasPujasMismoPiloto =  Pujas::where('mercadoEscuderia_id', $puja['mercadoEscuderia_id'])->where('visible',null)->get()->toArray();
                if(count($todasPujasMismoPiloto)>0){
                    $id = $todasPujasMismoPiloto[0];
                    $maxPuja = $todasPujasMismoPiloto[0];
                    $todasPujasMismoPiloto = array_splice($todasPujasMismoPiloto,1);
                    
                   
               
                    //asigna la primera puja como la de mayor valor
                    //recorre las pujas con el mismo mercado piloto id para coger la mas alta
                    foreach($todasPujasMismoPiloto as $puja){
                        if( $puja['valorPuja'] >= $maxPuja['valorPuja']){
                     
                            Pujas::where('id', $maxPuja['id'])->delete();
                
                          
                            $id = $puja['id'];
                            $maxPuja = $puja;
                        }else{
                            Pujas::where('id',  $puja['id'])->delete();
                        }
                        
                    }
            
                     // trae el registro con la puja mas alta
                     $pujaMaxima = Pujas::where('id',  $id)->get();
                     //$pujaMaxima = head($pujaMaxima);
                     $usuario = $pujaMaxima[0]['usuario_id'];
                     //trae el registro del mercado asociado a esa puja
                     $rowMercado = MercadoEscuderia::where('id', $pujaMaxima[0]['mercadoEscuderia_id'])->first();
                     //insertamos en el equipo del usuario al piloto comprado
                     Equipo::insert(['escuderia_id' => $rowMercado['escuderia_id'], 'usuario_id' => $usuario]);
                     // //trae usuario y actualiza el saldo
                     $rowUser = User::where('id', $usuario)->first();
                     $saldo = $rowUser['saldo'] - $pujaMaxima[0]['valorPuja'];
                     User::where('id', $usuario)->update(['saldo' => $saldo]);
                     //borramos las pujas con ese piloto del mercado que ya esta asignado
                     
                     Pujas::where('id',$pujaMaxima[0]['id'])->update(['visible'=>'1']);
                     
                     $maxPuja = 0 ;
                   
                     
                    $this->destroyPujas();
                    //$todasPujas = Pujas::orderBy('mercadoPiloto_id', 'asc' )->get();
                }
            }
          
        
        }   
        
        Equipo::where('indicadorEnAlineacion','2')->delete();

    }
    /**
     * Eliminar pujas
     */
    public function destroy($usuarioId, $tipo){
        if($tipo === 'pilotos'){
            Pujas::where('usuario_id',$usuarioId)->where('mercadoPiloto_id', '<>', null)->where('visible',null)->delete();
        }else{
            Pujas::where('usuario_id',$usuarioId)->where('mercadoEscuderia_id', '<>', null)->where('visible',null)->delete();
        }
        
    }

}
