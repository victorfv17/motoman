<?php

namespace App\Http\Controllers;
use App\Pujas;
use App\MercadoPiloto;
use App\Equipo;
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
        //var_dump($pujas);
        
        foreach($pujas as $puja){
            $idMercado = MercadoPiloto::where('piloto_id', $puja['piloto'])->get();
           
           /* $existenPujas = Pujas::where('mercadoPiloto_id', $idMercado[0]['id'])->max('valorPuja');
            
           var_dump($puja);
            if($existenPujas < $puja['valorPuja'])*/
               Pujas::insert(['usuario_id' => 1, 'mercadoPiloto_id' => $idMercado[0]['id'], 'valorPuja' => $puja['puja']]);
            
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
       
    
            $todasPujasMismoPiloto =  Pujas::where('mercadoPiloto_id', $todasPujas[0]['mercadoPiloto_id'])->get();
        
        
        
            //asigna la primera puja como la de mayor valor
            
        
            //recorre las pujas con el mismo mercado piloto id para coger la mas alta
            foreach($todasPujasMismoPiloto as $puja){
                if( $puja['valorPuja'] > $maxPuja){
                    $id = $puja['id'];
                
                }
                
            }
            // trae el registro con la puja mas alta
            echo $id, ' hola';
            $pujaMaxima = Pujas::where('id',  $id)->get();
            $pujaMaxima = head($pujaMaxima);
            
            //trae el registro del mercado asociado a esa puja
            $rowMercado = MercadoPiloto::where('id', $pujaMaxima[0]['mercadoPiloto_id'])->get();
            $rowMercado = head($rowMercado);
            //insertamos en el equipo del usuario al piloto comprado
            Equipo::insert(['piloto_id' => $rowMercado[0]['piloto_id'], 'usuario_id' => $pujaMaxima[0]['usuario_id']]);
            //borramos las pujas con ese piloto del mercado que ya esta asignado
            
            
            Pujas::where('mercadoPiloto_id', $rowMercado[0]['id'])->delete();
            $maxPuja = 0 ;
            
            
            $todasPujas = Pujas::orderBy('mercadoPiloto_id', 'asc' )->get();
            
            
        
            
        }

        return 'borrado completo';
        
    }
}
