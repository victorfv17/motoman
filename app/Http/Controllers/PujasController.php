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
      
        $pujas = $request ->pujas;
        $usuario = $request ->usuario;
        var_dump($pujas);
        
        foreach($pujas as $puja){

            
            if(array_key_exists('piloto',$puja)){
                $idMercado = MercadoPiloto::where('piloto_id', $puja['piloto'])->first();
               
                Pujas::updateOrCreate(['usuario_id' => $usuario, 'mercadoPiloto_id' => $idMercado['id']],[ 'valorPuja' => $puja['puja']]);
            }else{
                $idMercado = MercadoEscuderia::where('escuderia_id', $puja['escuderia'])->first();
            
                /* $existenPujas = Pujas::where('mercadoPiloto_id', $idMercado[0]['id'])->max('valorPuja');
                    
                var_dump($puja);
                    if($existenPujas < $puja['valorPuja'])*/
                    Pujas::updateOrCreate(['usuario_id' => $usuario, 'mercadoEscuderia_id' => $idMercado['id']], ['valorPuja' => $puja['puja']]);
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
     //
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
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
        //trae todas las pujas existentes
        $todasPujas = Pujas::orderBy('mercadoPiloto_id', 'asc' )->get();
        $maxPuja = 0 ;
        
        //trae todas las pujas con un mercado piloto id determinado
        while(count($todasPujas) >0){
       
            if($todasPujas[0]['mercadoPiloto_id'] != NULL){
                $todasPujasMismoPiloto =  Pujas::where('mercadoPiloto_id', $todasPujas[0]['mercadoPiloto_id'])->get();
                //asigna la primera puja como la de mayor valor
                //recorre las pujas con el mismo mercado piloto id para coger la mas alta
                foreach($todasPujasMismoPiloto as $puja){
                    if( $puja['valorPuja'] > $maxPuja){
                        $id = $puja['id'];
                    
                    }
                    
                }
                // trae el registro con la puja mas alta
                $pujaMaxima = Pujas::where('id',  $id)->get();
                $pujaMaxima = head($pujaMaxima);
                $usuario = $pujaMaxima[0]['usuario_id'];
                //trae el registro del mercado asociado a esa puja
                $rowMercado = MercadoPiloto::where('id', $pujaMaxima[0]['mercadoPiloto_id'])->first();
                //insertamos en el equipo del usuario al piloto comprado
                Equipo::insert(['piloto_id' => $rowMercado['piloto_id'], 'usuario_id' => $usuario]);
                //trae usuario y actualiza el saldo
                $rowUser = User::where('id', $usuario)->first();
                $saldo = $rowUser['saldo'] - $pujaMaxima[0]['valorPuja'];
                User::where('id', $usuario)->update(['saldo' => $saldo]);
                //borramos las pujas con ese piloto del mercado que ya esta asignado
                
                
                Pujas::where('mercadoPiloto_id', $rowMercado['id'])->delete();
                $maxPuja = 0 ;
                
                
                $todasPujas = Pujas::orderBy('mercadoPiloto_id', 'asc' )->get();
            }else{
                $todasPujasMismoEscuderia =  Pujas::where('mercadoEscuderia_id', $todasPujas[0]['mercadoEscuderia_id'])->get();
                //asigna la primera puja como la de mayor valor
                //recorre las pujas con el mismo mercado piloto id para coger la mas alta
                foreach($todasPujasMismoEscuderia as $puja){
                    if( $puja['valorPuja'] > $maxPuja){
                        $id = $puja['id'];
                    
                    }
                    
                }
                // trae el registro con la puja mas alta
        
                $pujaMaxima = Pujas::where('id',  $id)->get();
                $pujaMaxima = head($pujaMaxima);
                $usuario = $pujaMaxima[0]['usuario_id'];
                //trae el registro del mercado asociado a esa puja
                $rowMercado = MercadoEscuderia::where('id', $pujaMaxima[0]['mercadoEscuderia_id'])->first();
         
                //insertamos en el equipo del usuario al piloto comprado
                Equipo::insert(['escuderia_id' => $rowMercado['escuderia_id'], 'usuario_id' => $pujaMaxima[0]['usuario_id']]);
                $rowUser = User::where('id', $usuario)->first();
                $saldo = $rowUser['saldo'] - $rowMercado['valorMercado'];
                User::where('id', $usuario)->update(['saldo' => $saldo]);
                //borramos las pujas con ese piloto del mercado que ya esta asignado
                
                
                Pujas::where('mercadoEscuderia_id', $rowMercado['id'])->delete();
                $maxPuja = 0 ;
                
                
                $todasPujas = Pujas::orderBy('mercadoEscuderia_id', 'asc' )->get();
            }
                
        
            
        }

        return 'borrado completo';
        
    }
}
